import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { preview } from 'vite';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(PROJECT_ROOT, 'dist');
const SITEMAP_PATH = path.resolve(PROJECT_ROOT, 'public/sitemap.xml');
const SITE_ORIGIN = 'https://idiotpedals.shop';
const API_BASE_URL = (process.env.VITE_API_BASE_URL || 'https://api.idiotpedals.shop/api').replace(/\/+$/, '');
const PREVIEW_PORT = 4173;
const PREVIEW_HOST = '127.0.0.1';

function normalizeRoute(route) {
  const pathOnly = String(route || '/').split(/[?#]/)[0] || '/';
  const withLeadingSlash = pathOnly.startsWith('/') ? pathOnly : `/${pathOnly}`;
  return withLeadingSlash === '/' ? '/' : withLeadingSlash.replace(/\/+$/, '');
}

/**
 * Automatically extract all public routes from public/sitemap.xml.
 */
function getRoutesFromSitemap() {
  if (!fs.existsSync(SITEMAP_PATH)) {
    return ['/'];
  }
  const xml = fs.readFileSync(SITEMAP_PATH, 'utf-8');
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)];
  const routes = matches.map((m) => {
    const raw = m[1].trim();
    try {
      return normalizeRoute(new URL(raw).pathname);
    } catch {
      return normalizeRoute(raw.replace(SITE_ORIGIN, '') || '/');
    }
  });
  return [...new Set(routes)];
}

/**
 * Best-effort discovery of active product detail routes (/products/:id) from the live API.
 * Gracefully returns [] if offline or if no API base URL is reachable during build.
 */
async function getLiveProductRoutes() {
  if (!/^https?:\/\//i.test(API_BASE_URL)) {
    return [];
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(`${API_BASE_URL}/products?status=active&limit=50`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return [];
    const payload = await res.json();
    const products = payload?.data?.products;
    if (!Array.isArray(products)) return [];

    return products
      .map((product) => {
        const id = typeof product?._id === 'string' ? product._id : typeof product?.id === 'string' ? product.id : '';
        return id ? `/products/${id}` : null;
      })
      .filter(Boolean);
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

async function prerender() {
  const sitemapRoutes = getRoutesFromSitemap();
  const productRoutes = await getLiveProductRoutes();

  // Deduplicate and render sub-routes first, `/` last so Vite preview always serves
  // the pristine SPA dist/index.html shell while navigating across sub-routes.
  const allRoutes = [...new Set([...sitemapRoutes, ...productRoutes])];
  const orderedRoutes = [
    ...allRoutes.filter((r) => r !== '/'),
    ...(allRoutes.includes('/') ? ['/'] : []),
  ];

  console.log('Prerendering routes:', orderedRoutes);

  // Start Vite preview server serving dist/
  const server = await preview({
    root: PROJECT_ROOT,
    preview: { port: PREVIEW_PORT, host: PREVIEW_HOST, strictPort: false },
  });

  const address = server.httpServer.address();
  const actualPort = typeof address === 'object' && address ? address.port : PREVIEW_PORT;
  const baseUrl = `http://${PREVIEW_HOST}:${actualPort}`;

  /** @type {import('puppeteer').Browser | undefined} */
  let browser;
  /** @type {Map<string, string>} */
  const renderedHtmlByRoute = new Map();

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });
    const page = await browser.newPage();

    /** @type {Map<string, { status: number; contentType: string; body: string }>} */
    const apiCache = new Map();

    // Block heavy 3D (.glb), audio (.mp3/.wav), video, and external font requests
    // during build-time snapshot so prerendering is fast and reliable even offline.
    // Also proxy public GET API requests through Node so 127.0.0.1 preview isn't blocked by CORS.
    await page.setRequestInterception(true);
    page.on('request', async (req) => {
      const url = req.url();
      const lower = url.toLowerCase();
      if (
        lower.endsWith('.glb') ||
        lower.endsWith('.mp3') ||
        lower.endsWith('.wav') ||
        lower.endsWith('.mp4') ||
        lower.endsWith('.webm') ||
        lower.includes('fonts.googleapis.com') ||
        lower.includes('fonts.gstatic.com')
      ) {
        await req.abort();
        return;
      }

      if (/^https?:\/\//i.test(API_BASE_URL) && url.startsWith(API_BASE_URL)) {
        const corsHeaders = {
          'access-control-allow-origin': baseUrl,
          'access-control-allow-credentials': 'true',
          'access-control-allow-methods': 'GET, OPTIONS',
          'access-control-allow-headers': 'Content-Type, Authorization, Accept',
        };

        if (req.method() === 'OPTIONS') {
          await req.respond({ status: 204, headers: corsHeaders, body: '' });
          return;
        }

        if (req.method() === 'GET') {
          try {
            let cached = apiCache.get(url);
            if (!cached) {
              const apiRes = await fetch(url, { headers: { Accept: 'application/json' } });
              cached = {
                status: apiRes.status,
                contentType: apiRes.headers.get('content-type') || 'application/json',
                body: await apiRes.text(),
              };
              apiCache.set(url, cached);
            }
            await req.respond({
              status: cached.status,
              contentType: cached.contentType,
              headers: corsHeaders,
              body: cached.body,
            });
            return;
          } catch {
            await req.abort();
            return;
          }
        }
      }

      await req.continue();
    });

    for (const route of orderedRoutes) {
      const targetUrl = `${baseUrl}${route}`;
      console.log(`Rendering ${route} ...`);

      await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 30000 });

      // Wait until React mounts into #root, static fallbacks are cleared, and <SEO /> hoists canonical
      await page.waitForFunction(
        () => {
          const root = document.getElementById('root');
          const hasRootContent = Boolean(root && root.innerHTML.trim().length > 0);
          const fallbacksCleared = document.head.querySelectorAll('[data-seo-fallback]').length === 0;
          const hasCanonical = Boolean(document.head.querySelector('link[rel="canonical"]'));
          return hasRootContent && fallbacksCleared && hasCanonical;
        },
        { timeout: 15000 }
      );

      // Give React 19 metadata hoisting and any microtask renders a brief tick to settle
      await new Promise((r) => setTimeout(r, 400));

      // Guard 1: Skip routes that client-side redirected (e.g., catch-all * -> /)
      const landedPath = normalizeRoute(new URL(page.url()).pathname);
      if (landedPath !== route) {
        console.warn(`Skipping ${route} — redirected to ${landedPath}`);
        continue;
      }

      // Guard 2: Skip routes that rendered noindex (e.g., 404 product state)
      const robotsContent = await page.evaluate(() => {
        const meta = document.head.querySelector('meta[name="robots"]');
        return meta?.getAttribute('content') || '';
      });
      if (robotsContent.toLowerCase().includes('noindex')) {
        console.warn(`Skipping ${route} — rendered with robots="${robotsContent}"`);
        continue;
      }

      let html = await page.content();

      // Mark document as prerendered so client boot cleans up hoisted SEO tags before mounting
      if (!/<html[^>]*data-prerendered=/i.test(html)) {
        html = html.replace(/<html\b/i, '<html data-prerendered="true"');
      }

      renderedHtmlByRoute.set(route, html);
    }
  } finally {
    if (browser) {
      await browser.close();
    }
    if (typeof server.close === 'function') {
      await server.close();
    } else {
      server.httpServer.close();
    }
  }

  // Write all prerendered HTML files only after preview server has finished serving dist/index.html
  for (const [route, html] of renderedHtmlByRoute.entries()) {
    const outDir =
      route === '/'
        ? DIST_DIR
        : path.join(DIST_DIR, route.replace(/^\/+/, ''));

    fs.mkdirSync(outDir, { recursive: true });
    const outPath = path.join(outDir, 'index.html');
    fs.writeFileSync(outPath, html, 'utf-8');
    console.log(`Saved -> ${outPath}`);
  }

  console.log(`Prerendering complete! (${renderedHtmlByRoute.size} routes written)`);
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
