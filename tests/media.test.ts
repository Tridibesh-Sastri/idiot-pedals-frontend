import assert from 'node:assert/strict';
import test from 'node:test';

import { buildImageKitSrcSet, isImageKitUrl, optimizeImageKitUrl } from '../src/lib/media.ts';

test('isImageKitUrl detects ImageKit CDN URLs accurately', () => {
  assert.equal(isImageKitUrl('https://ik.imagekit.io/vwtc5dlzf/test.png'), true);
  assert.equal(isImageKitUrl('https://idiotpedals.shop/frames/web/frame_0001.webp'), false);
  assert.equal(isImageKitUrl(undefined), false);
});

test('optimizeImageKitUrl appends responsive width, quality, and f-auto transforms', () => {
  assert.equal(
    optimizeImageKitUrl('https://ik.imagekit.io/demo/pedal.png', { width: 900, quality: 82 }),
    'https://ik.imagekit.io/demo/pedal.png?tr=w-900,q-82,f-auto'
  );

  assert.equal(
    optimizeImageKitUrl('https://ik.imagekit.io/demo/pedal.png?updatedAt=42', {
      width: 480,
      height: 360,
      quality: 80,
      crop: 'at_max',
    }),
    'https://ik.imagekit.io/demo/pedal.png?updatedAt=42&tr=w-480,h-360,c-at_max,q-80,f-auto'
  );

  // Preserves pre-existing ImageKit transforms without double-appending
  assert.equal(
    optimizeImageKitUrl('https://ik.imagekit.io/demo/pedal.png?tr=w-1200', { width: 480 }),
    'https://ik.imagekit.io/demo/pedal.png?tr=w-1200'
  );

  // Leaves non-ImageKit URLs untouched
  assert.equal(
    optimizeImageKitUrl('https://idiotpedals.shop/frames/web/frame_0001.webp', { width: 900 }),
    'https://idiotpedals.shop/frames/web/frame_0001.webp'
  );
});

test('buildImageKitSrcSet builds responsive descriptor lists for ImageKit URLs', () => {
  assert.equal(
    buildImageKitSrcSet('https://ik.imagekit.io/demo/pedal.png', [480, 900], 82),
    'https://ik.imagekit.io/demo/pedal.png?tr=w-480,q-82,f-auto 480w, https://ik.imagekit.io/demo/pedal.png?tr=w-900,q-82,f-auto 900w'
  );

  assert.equal(
    buildImageKitSrcSet('https://idiotpedals.shop/local.webp', [480, 900]),
    undefined
  );
});
