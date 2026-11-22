export interface JsonLdProps {
  data: Record<string, unknown> | null | undefined;
}

/**
 * Serializes a JSON-LD payload safely for inline `<script type="application/ld+json">`.
 * Escapes `<` so untrusted text (e.g. product descriptions from the API) can never
 * break out of the script tag.
 */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export default function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
