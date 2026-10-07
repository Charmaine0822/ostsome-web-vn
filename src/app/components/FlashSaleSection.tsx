import { useAuth } from './AuthContext';
import { useProducts } from '../hooks/useProducts';
import { Star } from 'lucide-react';
import { getFostPrice } from '../data/pricing';
import { getProgramItems } from '../data/promoPrograms';
import { FlashSaleHeading } from './FlashSaleCountdown';
import type { Product } from '../data/products';

type FlashSaleSectionProps = {
  onSelectProduct?: (product: Product) => void;
  onViewAll?: () => void;
};

// Homepage teaser — shows the 3 biggest flash sale discounts with a "View
// All" link to the full FlashSalePage. SKUs in promoPrograms.ts that don't
// match a live Shopify product are simply skipped.
export function FlashSaleSection({ onSelectProduct, onViewAll }: FlashSaleSectionProps) {
  const { products } = useProducts();
  const { user } = useAuth();

  // Flash Sale Daily SKUs from promoPrograms.ts (Mr. Boh's VN pricing sheet).
  const flashProducts = getProgramItems(products, 'flash-sale');

  if (flashProducts.length === 0) return null;

  return (
    <section className="py-8 md:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <FlashSaleHeading />
          <button
            onClick={onViewAll}
            className="text-sm font-semibold text-[#F16C10] hover:text-black transition-colors whitespace-nowrap"
          >
            Xem tất cả →
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:mx-0 md:px-0">
          {flashProducts.slice(0, 3).map(({ product, promo }) => {
            const displayPrice = user ? getFostPrice(promo.price) : promo.price;
            return (
              <div
                key={product.handle}
                onClick={() => onSelectProduct?.(product)}
                className="shrink-0 w-[46%] sm:w-52 md:w-auto snap-start bg-white rounded-xl overflow-hidden border border-neutral-200 hover:shadow-xl transition group cursor-pointer"
              >
                <div className="relative aspect-square bg-neutral-50 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <span className="absolute top-2 right-2 bg-[#F16C10] text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{promo.pct}%
                  </span>
                </div>
                <div className="p-3 md:p-4">
                  <p className="text-[10px] font-semibold text-[#F16C10] uppercase tracking-widest mb-1">{product.vendor}</p>
                  <h3 className="text-sm font-bold text-black mb-2 line-clamp-2 min-h-[2.5em]">{product.title}</h3>
                  <div className="flex items-center gap-0.5 mb-1">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} size={10} className={s <= 4 ? 'text-amber-400 fill-amber-400' : 'text-neutral-200 fill-neutral-200'} />
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-neutral-400 line-through">{promo.rrp.toLocaleString('vi-VN')}₫</span>
                    <span className="text-base md:text-lg font-bold text-[#F16C10]">{displayPrice.toLocaleString('vi-VN')}₫</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}