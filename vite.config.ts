import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  const env = loadEnv(mode, process.cwd(), '');

  /**
   * Optional dev proxy target (e.g. http://localhost:5000). Never hardcoded —
   * set VITE_API_PROXY_TARGET in .env.local. When present, `/api` requests are
   * proxied so the browser sees a same-origin API and httpOnly cookies work
   * without CORS/SameSite friction.
   */
  /*
   * Both sources are honoured: `loadEnv` only reads .env files, so a value
   * supplied in the process environment (CI, a shell one-liner, `docker run -e`)
   * was previously ignored and the proxy silently stayed off.
   */
  const proxyTarget = (process.env.VITE_API_PROXY_TARGET ?? env.VITE_API_PROXY_TARGET)?.trim();

  const rawDefaultOgImage =
    (process.env.VITE_DEFAULT_OG_IMAGE ?? env.VITE_DEFAULT_OG_IMAGE)?.trim() ||
    'https://ik.imagekit.io/vwtc5dlzf/Idiot_pedals_media/Bold%20Idiot%20Pedals%20Logo.png';

  const defaultOgImage =
    rawDefaultOgImage.includes('ik.imagekit.io') && !/[?&]tr=/.test(rawDefaultOgImage)
      ? `${rawDefaultOgImage}${rawDefaultOgImage.includes('?') ? '&' : '?'}tr=w-1200,h-630,c-at_max`
      : rawDefaultOgImage;

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'inject-default-og-image',
        transformIndexHtml(html) {
          return html.replaceAll('__DEFAULT_OG_IMAGE__', defaultOgImage);
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    esbuild: {
      // Strip console logs and debugger statements in production bundle
      drop: isProd ? ['console', 'debugger'] : [],
    },
    build: {
      // Do not ship source maps to production to prevent reverse-engineering of source files
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            icons: ['lucide-react'],
          },
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      ...(proxyTarget
        ? {
            proxy: {
              '/api': {
                target: proxyTarget,
                changeOrigin: true,
                secure: false,
              },
            },
          }
        : {}),
    },
  };
});
