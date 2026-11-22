import assert from 'node:assert/strict';
import test from 'node:test';

import { serializeJsonLd } from '../src/components/JsonLd.tsx';
import {
  ORGANIZATION_SCHEMA,
  buildFaqSchema,
  buildProductBreadcrumbSchema,
  buildProductFaqSchema,
  buildProductSchema,
} from '../src/lib/structuredData.ts';
import type { Product } from '../src/types/index.ts';

const SAMPLE_PRODUCT: Product = {
  id: '6b01fb7a1b894093dece8351',
  name: 'Distortion ONE',
  slug: 'distortion-one',
  sku: 'IDIOT-DIST-ONE',
  description: 'Pure analog high-gain distortion pedal.\nBuilt in Burdwan.',
  price: 2399,
  currency: 'INR',
  stock: 10,
  reservedStock: 1,
  availableStock: 9,
  status: 'active',
  images: ['https://ik.imagekit.io/vwtc5dlzf/Idiot_pedals_media/IDIOT%20Pedals%20Studio%20Close-Up.png'],
  audio: [],
  specifications: {},
};

test('serializeJsonLd escapes opening angle brackets to prevent script tag breakout', () => {
  const output = serializeJsonLd({ description: 'Heavy </script><script>alert(1)</script> tone' });
  assert.equal(output.includes('</script>'), false);
  assert.equal(output.includes('\\u003c/script>'), true);
  assert.deepEqual(JSON.parse(output), { description: 'Heavy </script><script>alert(1)</script> tone' });
});

test('ORGANIZATION_SCHEMA declares IDIOT Pedals with valid URL, logo, and Instagram sameAs', () => {
  assert.equal(ORGANIZATION_SCHEMA['@type'], 'Organization');
  assert.equal(ORGANIZATION_SCHEMA.name, 'IDIOT Pedals');
  assert.equal(ORGANIZATION_SCHEMA.url, 'https://idiotpedals.shop');
  assert.deepEqual(ORGANIZATION_SCHEMA.logo, {
    '@type': 'ImageObject',
    url: 'https://idiotpedals.shop/icon-512.png',
    width: 512,
    height: 512,
  });
  assert.deepEqual(ORGANIZATION_SCHEMA.sameAs, ['https://www.instagram.com/idiot.pedals/']);
});

test('buildProductSchema populates INR Offer, availability, and normalized description', () => {
  const schema = buildProductSchema(SAMPLE_PRODUCT, { routeId: SAMPLE_PRODUCT.id });
  assert.equal(schema['@type'], 'Product');
  assert.equal(schema.name, 'Distortion ONE');
  assert.equal(schema.description, 'Pure analog high-gain distortion pedal. Built in Burdwan.');

  const offer = schema.offers as Record<string, unknown>;
  assert.equal(offer.priceCurrency, 'INR');
  assert.equal(offer.price, 2399);
  assert.equal(offer.url, 'https://idiotpedals.shop/products/6b01fb7a1b894093dece8351');
  assert.equal(offer.availability, 'https://schema.org/InStock');

  const outOfStockSchema = buildProductSchema({ ...SAMPLE_PRODUCT, availableStock: 0 });
  assert.equal(
    (outOfStockSchema.offers as Record<string, unknown>).availability,
    'https://schema.org/OutOfStock'
  );
});

test('buildProductBreadcrumbSchema creates Home -> Products -> Product trail', () => {
  const schema = buildProductBreadcrumbSchema(SAMPLE_PRODUCT, SAMPLE_PRODUCT.id);
  const items = schema.itemListElement as Array<Record<string, unknown>>;
  assert.equal(items.length, 3);
  assert.equal(items[0].item, 'https://idiotpedals.shop/');
  assert.equal(items[1].item, 'https://idiotpedals.shop/products');
  assert.equal(items[2].name, 'Distortion ONE');
  assert.equal(items[2].item, 'https://idiotpedals.shop/products/6b01fb7a1b894093dece8351');
});

test('buildProductFaqSchema and buildFaqSchema produce valid FAQPage structures', () => {
  const faq = buildProductFaqSchema('Distortion ONE');
  assert.equal(faq['@type'], 'FAQPage');
  const mainEntity = faq.mainEntity as Array<Record<string, unknown>>;
  assert.equal(mainEntity.length, 4);
  assert.match(String(mainEntity[0].name), /Distortion ONE/);

  const custom = buildFaqSchema([{ question: 'Q?', answer: 'A.' }]);
  assert.equal((custom.mainEntity as Array<Record<string, unknown>>).length, 1);
});
