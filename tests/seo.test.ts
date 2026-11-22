import assert from 'node:assert/strict';
import test from 'node:test';

import {
  DEFAULT_OG_IMAGE,
  buildCanonicalUrl,
  buildFullTitle,
  formatSocialImage,
  normalizeDescription,
} from '../src/components/SEO.tsx';

test('buildFullTitle appends site name or uses fallback', () => {
  assert.equal(
    buildFullTitle('Boutique Guitar Effects Pedals Made in India'),
    'Boutique Guitar Effects Pedals Made in India | IDIOT Pedals'
  );
  assert.equal(
    buildFullTitle(''),
    'IDIOT Pedals — Boutique Guitar Effects Pedals Made in India'
  );
  assert.equal(
    buildFullTitle(undefined),
    'IDIOT Pedals — Boutique Guitar Effects Pedals Made in India'
  );
});

test('buildCanonicalUrl normalizes slashes and strips query/hash tracking params', () => {
  assert.equal(buildCanonicalUrl('/'), 'https://idiotpedals.shop/');
  assert.equal(buildCanonicalUrl('/about/'), 'https://idiotpedals.shop/about');
  assert.equal(buildCanonicalUrl('contact'), 'https://idiotpedals.shop/contact');
  assert.equal(
    buildCanonicalUrl('/products/neon-fuzz?utm_source=instagram#specs'),
    'https://idiotpedals.shop/products/neon-fuzz'
  );
});

test('formatSocialImage adds ImageKit social card transform when missing', () => {
  assert.equal(formatSocialImage(undefined), DEFAULT_OG_IMAGE);
  assert.equal(formatSocialImage('   '), DEFAULT_OG_IMAGE);

  assert.equal(
    formatSocialImage('https://ik.imagekit.io/demo/products/neon-fuzz.webp'),
    'https://ik.imagekit.io/demo/products/neon-fuzz.webp?tr=w-1200,h-630,c-at_max'
  );

  assert.equal(
    formatSocialImage('https://ik.imagekit.io/demo/products/neon-fuzz.webp?updatedAt=123'),
    'https://ik.imagekit.io/demo/products/neon-fuzz.webp?updatedAt=123&tr=w-1200,h-630,c-at_max'
  );

  assert.equal(
    formatSocialImage('https://ik.imagekit.io/demo/products/neon-fuzz.webp?tr=w-800'),
    'https://ik.imagekit.io/demo/products/neon-fuzz.webp?tr=w-800'
  );

  assert.equal(
    formatSocialImage('https://idiotpedals.shop/frames/web/frame_0001.webp'),
    'https://idiotpedals.shop/frames/web/frame_0001.webp'
  );
});

test('normalizeDescription collapses newlines and extra whitespace', () => {
  assert.equal(
    normalizeDescription('  Handcrafted\n\n  analog   fuzz pedal.  '),
    'Handcrafted analog fuzz pedal.'
  );
});
