import type { ShopifyProduct } from './shopify';
export type CatalogRule = {
  startsAt: string; endsAt: string | null; percentage: number | null; amount: number | null;
  all: boolean; products: string[]; variants: string[]; collections: string[];
};
export type LivePrice = { price: number; rrp: number };
let lastRules: CatalogRule[] | null = null;
const byVariant = new Map<string, LivePrice>();
export const livePriceForVariant = (id: string) => byVariant.get(id) ?? null;
const bySku = new Map<string, LivePrice>();
const byHandle = new Map<string, LivePrice>();
export const livePriceForSku = (sku: string) => bySku.get(sku.trim().replace(/\s+/g, ' ').toUpperCase()) ?? null;
export const livePriceForHandle = (handle: string) => byHandle.get(handle) ?? null;

export function calculatePrice(p: ShopifyProduct, variant: ShopifyProduct['variants']['edges'][number]['node'], rules: CatalogRule[], now = Date.now()): LivePrice {
  const base = Number(variant.price.amount);
  let price = base;
  for (const rule of rules) {
    if (Date.parse(rule.startsAt) > now || (rule.endsAt && Date.parse(rule.endsAt) <= now)) continue;
    if (!rule.all && !rule.products.includes(p.id) && !rule.variants.includes(variant.id) &&
        !p.collections.edges.some(e => rule.collections.includes(e.node.id))) continue;
    const candidate = rule.percentage !== null ? base * (1 - rule.percentage) : base - (rule.amount ?? 0);
    // Native product discounts choose the best value; never compound them.
    price = Math.min(price, Math.max(0, Math.round(candidate)));
  }
  return { price, rrp: Math.max(base, Number(variant.compareAtPrice?.amount ?? 0)) };
}

export async function loadCatalogPrices(products: ShopifyProduct[]) {
  let rules: CatalogRule[] = [];
  try {
    const response = await fetch('/.netlify/functions/catalog-discounts', { cache: 'no-cache', signal: AbortSignal.timeout(15000) });
    if (!response.ok) throw new Error('Catalog discounts unavailable');
    const result = await response.json();
    if (!Array.isArray(result.rules)) throw new Error('Invalid catalog discounts');
    rules = result.rules;
    lastRules = rules;
  } catch (error) {
    // Use current Shopify base prices on failure; never revive old campaign amounts.
    rules = [];
    console.error('Automatic discount display unavailable. Check SHOPIFY_CLIENT_ID, SHOPIFY_CLIENT_SECRET and read_discounts.', error);
  }
  bySku.clear(); byHandle.clear(); byVariant.clear();
  for (const p of products) {
    let best: LivePrice | null = null;
    for (const { node } of p.variants.edges) {
      const value = calculatePrice(p, node, rules);
      byVariant.set(node.id, value);
      if (node.sku) bySku.set(node.sku.trim().replace(/\s+/g, ' ').toUpperCase(), value);
      if ((!best || value.price < best.price) && node.availableForSale) best = value;
    }
    best ??= p.variants.edges[0] ? calculatePrice(p, p.variants.edges[0].node, rules) : null;
    if (best) byHandle.set(p.handle, best);
  }
}
