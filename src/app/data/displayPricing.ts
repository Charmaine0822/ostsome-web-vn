import type { Product } from './products';
import { getPromoForProduct } from './promoPrograms';

// Catalog cards have no selected variant; use the best SKU promo, as ProductDetail does.
// Display-only: Shopify checkout prices must be configured separately.
export function getDisplayPricing(product: Product) {
  const promo = getPromoForProduct(product);
  const price = promo ? promo.price : product.price;
  const comparePrice = promo ? promo.rrp : product.comparePrice;
  const hasDiscount = Boolean(comparePrice && comparePrice > price);
  const originalPrice = hasDiscount ? comparePrice! : price;
  const discountPct = hasDiscount ? Math.round((originalPrice - price) / originalPrice * 100) : 0;
  return { price, originalPrice, hasDiscount, discountPct };
}
