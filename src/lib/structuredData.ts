import type { Product } from '../types';

const SITE_URL = 'https://idiotpedals.shop';
const BRAND_NAME = 'IDIOT Pedals';
const BRAND_LOGO =
  'https://ik.imagekit.io/vwtc5dlzf/Idiot_pedals_media/Bold%20Idiot%20Pedals%20Logo.png';
const FALLBACK_PRODUCT_IMAGE =
  'https://ik.imagekit.io/vwtc5dlzf/Idiot_pedals_media/IDIOT%20Pedals%20Studio%20Close-Up.png';

export interface FaqEntry {
  question: string;
  answer: string;
}

export const ORGANIZATION_SCHEMA: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: BRAND_NAME,
  url: SITE_URL,
  logo: BRAND_LOGO,
  description:
    'Handcrafted boutique guitar effects pedals engineered and built in Burdwan, West Bengal, India.',
  email: 'workbench@idiotpedals.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bardhaman',
    addressRegion: 'West Bengal',
    postalCode: '713101',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'workbench@idiotpedals.com',
    url: `${SITE_URL}/contact`,
    availableLanguage: ['English', 'Hindi', 'Bengali'],
  },
  sameAs: ['https://www.instagram.com/idiot.pedals/'],
};

export function buildProductUrl(product: Pick<Product, 'id' | 'slug'>, routeId?: string): string {
  const segment = (routeId || product.id || product.slug || '').replace(/^\/+|\/+$/g, '');
  return segment ? `${SITE_URL}/products/${segment}` : `${SITE_URL}/products`;
}

export function buildProductSchema(
  product: Product,
  options: { routeId?: string; safeImages?: string[] } = {}
): Record<string, unknown> {
  const productUrl = buildProductUrl(product, options.routeId);
  const inStock = product.status === 'active' && product.availableStock > 0;
  const images =
    options.safeImages && options.safeImages.length > 0
      ? options.safeImages
      : product.images.length > 0
        ? product.images
        : [FALLBACK_PRODUCT_IMAGE];

  const cleanDescription =
    product.description?.replace(/\s+/g, ' ').trim() ||
    'Boutique distortion guitar effects pedal handcrafted in India by IDIOT Pedals.';

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name || 'Distortion ONE',
    image: images,
    description: cleanDescription,
    sku: product.sku || 'IDIOT-DIST-ONE',
    brand: {
      '@type': 'Brand',
      name: BRAND_NAME,
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: product.currency || 'INR',
      price: Number(product.price),
      availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: BRAND_NAME,
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: 0,
          currency: product.currency || 'INR',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'IN',
        },
      },
    },
  };
}

export function buildProductBreadcrumbSchema(
  product: Pick<Product, 'id' | 'slug' | 'name'>,
  routeId?: string
): Record<string, unknown> {
  const productUrl = buildProductUrl(product, routeId);

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: `${SITE_URL}/products`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name || 'Distortion ONE',
        item: productUrl,
      },
    ],
  };
}

export function buildFaqSchema(entries: FaqEntry[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.answer,
      },
    })),
  };
}

export function buildProductFaqSchema(productName?: string): Record<string, unknown> {
  const name = productName?.trim() || 'Distortion ONE';

  return buildFaqSchema([
    {
      question: `What power supply does the IDIOT Pedals ${name} require?`,
      answer:
        `${name} runs on a standard 9V DC center-negative pedalboard power supply (2.1mm barrel). Do not use AC or higher-voltage supplies unless explicitly rated.`,
    },
    {
      question: 'Where are IDIOT Pedals designed and built?',
      answer:
        'Every IDIOT Pedals unit is engineered, hand-wired, and bench-tested at our workshop in Burdwan (Bardhaman), West Bengal, India.',
    },
    {
      question: 'Do you offer free shipping across India?',
      answer:
        'Yes, we provide free insured doorstep delivery across India, dispatched directly from our Burdwan workbench to all serviceable PIN codes.',
    },
    {
      question: `What warranty covers the ${name}?`,
      answer:
        `Every IDIOT Pedals ${name} is covered by a 365-day (1-year) bench warranty against component defects, supported directly by our builders.`,
    },
  ]);
}
