/**
 * Media & ImageKit delivery helpers for Core Web Vitals (LCP, CLS, INP).
 *
 * Ensures every ImageKit image requests responsive dimensions, modern format
 * negotiation (`f-auto`), and controlled quality instead of streaming raw
 * multi-megabyte originals to mobile clients.
 */

export interface ImageKitTransformOptions {
  width: number;
  height?: number;
  quality?: number;
  crop?: 'at_max' | 'maintain_ratio' | 'force';
}

export function isImageKitUrl(url: string | undefined | null): url is string {
  return typeof url === 'string' && url.includes('ik.imagekit.io');
}

export function optimizeImageKitUrl(
  url: string,
  { width, height, quality = 80, crop }: ImageKitTransformOptions
): string {
  const trimmed = url.trim();
  if (!trimmed || !isImageKitUrl(trimmed) || /[?&]tr=/.test(trimmed)) {
    return trimmed;
  }

  const parts = [`w-${Math.round(width)}`];
  if (height) parts.push(`h-${Math.round(height)}`);
  if (crop) parts.push(`c-${crop}`);
  parts.push(`q-${Math.round(quality)}`, 'f-auto');

  const separator = trimmed.includes('?') ? '&' : '?';
  return `${trimmed}${separator}tr=${parts.join(',')}`;
}

export function buildImageKitSrcSet(
  url: string,
  widths: number[],
  quality = 80
): string | undefined {
  const trimmed = url.trim();
  if (!trimmed || !isImageKitUrl(trimmed) || /[?&]tr=/.test(trimmed) || widths.length === 0) {
    return undefined;
  }

  return widths
    .map((width) => `${optimizeImageKitUrl(trimmed, { width, quality })} ${Math.round(width)}w`)
    .join(', ');
}
