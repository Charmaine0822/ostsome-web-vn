import type { CartItem } from '../components/CartContext';
import { livePriceForVariant } from './catalogDiscounts';

// Saved cart snapshots must never override the current price of a variant.
export function repriceCart(items: CartItem[]): CartItem[] {
  let changed = false;
  const next = items.map(item => {
    const live = item.shopifyVariantId ? livePriceForVariant(item.shopifyVariantId) : null;
    if (!live || (item.variantPrice === live.price && item.variantOriginalPrice === live.rrp)) return item;
    changed = true;
    return { ...item, variantPrice: live.price, variantOriginalPrice: live.rrp };
  });
  return changed ? next : items;
}
