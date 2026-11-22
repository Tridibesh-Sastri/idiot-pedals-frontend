const SITE_NAME = 'IDIOT Pedals';
const SITE_URL = 'https://idiotpedals.shop';

const readEnv = (key: string): string | undefined => {
  const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
  const value = env?.[key];
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
};

/**
 * Default social sharing card image.
 * Can be overridden at build time via `VITE_DEFAULT_OG_IMAGE`.
 * ImageKit URLs automatically receive `?tr=w-1200,h-630,c-at_max`.
 */
export const DEFAULT_OG_IMAGE =
  readEnv('VITE_DEFAULT_OG_IMAGE') ??
  'https://ik.imagekit.io/vwtc5dlzf/Idiot_pedals_media/Bold%20Idiot%20Pedals%20Logo.png';

export interface SEOProps {
  title?: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'product';
  noindex?: boolean;
}

export function buildFullTitle(title?: string): string {
  const trimmed = title?.trim();
  return trimmed
    ? `${trimmed} | ${SITE_NAME}`
    : `${SITE_NAME} — Boutique Guitar Effects Pedals Made in India`;
}

export function buildCanonicalUrl(canonicalPath = '/'): string {
  const pathOnly = canonicalPath.split(/[?#]/)[0] || '/';
  const cleanPath = pathOnly.startsWith('/') ? pathOnly : `/${pathOnly}`;
  return `${SITE_URL}${cleanPath === '/' ? '/' : cleanPath.replace(/\/+$/, '')}`;
}

export function formatSocialImage(ogImage?: string): string {
  const candidate = ogImage?.trim() || DEFAULT_OG_IMAGE;
  if (candidate.includes('ik.imagekit.io') && !/[?&]tr=/.test(candidate)) {
    const separator = candidate.includes('?') ? '&' : '?';
    return `${candidate}${separator}tr=w-1200,h-630,c-at_max`;
  }
  return candidate;
}

export function normalizeDescription(description: string): string {
  return description.replace(/\s+/g, ' ').trim();
}

export default function SEO({
  title,
  description,
  canonicalPath = '/',
  ogImage,
  ogType = 'website',
  noindex = false,
}: SEOProps) {
  const fullTitle = buildFullTitle(title);
  const cleanDescription = normalizeDescription(description);
  const canonicalUrl = buildCanonicalUrl(canonicalPath);
  const socialImage = formatSocialImage(ogImage);

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={cleanDescription} />
      <link rel="canonical" href={canonicalUrl} />

      <meta
        name="robots"
        content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}
      />

      {/* Open Graph (WhatsApp, Instagram, Facebook, LinkedIn) */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={cleanDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:secure_url" content={socialImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter / X Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={cleanDescription} />
      <meta name="twitter:image" content={socialImage} />
    </>
  );
}
