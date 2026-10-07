import { useProducts } from '../hooks/useProducts';
import type { Product } from '../data/products';
import { useAuth } from './AuthContext';
import { getFostPrice } from '../data/pricing';
import { Star } from 'lucide-react';
import { getProgramItems, getMaxDiscountPct } from '../data/promoPrograms';

type Props = {
  onSelectProduct?: (p: Product) => void;
  onViewAll?: () => void;
};

export function LaunchExclusive({ onSelectProduct, onViewAll }: Props) {
  const { products } = useProducts();
  const { user } = useAuth();
  const isFostMember = Boolean(user);

  // Early Bird SKUs from promoPrograms.ts (Mr. Boh's VN pricing sheet).
  const earlyBird = getProgramItems(products, 'early-bird');
  const featured = earlyBird.slice(0, 5);
  const maxPct = getMaxDiscountPct(earlyBird);

  // Nothing matched yet (or still loading) — hide the section.
  if (featured.length === 0) return null;

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#F16C10] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                ▶ Early Bird · Ưu Đãi Mua Sớm
              </span>
            </div>
            <h2 className="text-[26px] md:text-4xl font-black text-black uppercase leading-tight">
              Mua Sớm.<br className="md:hidden" /> Nhận Giá Tốt Nhất.
            </h2>
            <p className="text-neutral-500 text-sm md:text-base mt-1 max-w-sm">
              Khách hàng mua sớm trên OSTSOME được hưởng giá ưu đãi ra mắt cho các sản phẩm nổi bật. Mua sớm, tiết kiệm nhiều hơn.
            </p>
          </div>
          <div className="hidden md:flex flex-col items-end text-right shrink-0 ml-6">
            <span className="text-4xl font-black text-[#F16C10]">Đến {maxPct}%</span>
            <span className="text-xs text-neutral-400 uppercase tracking-widest">Ưu Đãi Sớm</span>
            {onViewAll && (
              <button
                onClick={onViewAll}
                className="mt-3 text-xs font-bold text-[#F16C10] hover:underline uppercase tracking-wide"
              >
                Xem Tất Cả Ưu Đãi →
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-5 md:overflow-visible md:mx-0 md:px-0">
          {featured.map(({ product, promo }) => {
            const rrp = promo.rrp;
            const pct = promo.pct;
            return (
              <div
                key={product.handle}
                onClick={() => onSelectProduct?.(product)}
                className="shrink-0 w-[46%] sm:w-52 md:w-auto snap-start bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <div className="relative aspect-square bg-neutral-50 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition duration-500"
                    onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80'; }}
                  />
                  <div className="absolute top-2 right-2 bg-[#F16C10] text-white text-[10px] font-black rounded-full w-9 h-9 flex items-center justify-center leading-none">
                    -{pct}%
                  </div>
                </div>
                <div className="p-3 md:p-4">
                  <p className="text-[9px] md:text-[10px] font-bold text-[#F16C10] uppercase tracking-widest mb-1">{product.vendor}</p>
                  <h3 className="text-xs md:text-sm font-bold text-black line-clamp-2 mb-2">{product.title}</h3>
                  <div className="flex items-center gap-0.5 mb-1">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} size={10} className={s <= 4 ? 'text-amber-400 fill-amber-400' : 'text-neutral-200 fill-neutral-200'} />
                    ))}
                  </div>
                  {isFostMember ? (
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-neutral-400 line-through">{rrp.toLocaleString('vi-VN')}₫</span>
                      <span className="text-base md:text-lg font-black text-[#F16C10]">{getFostPrice(promo.price).toLocaleString('vi-VN')}₫</span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-neutral-400 line-through">{rrp.toLocaleString('vi-VN')}₫</span>
                      <span className="text-base md:text-lg font-black text-[#F16C10]">{promo.price.toLocaleString('vi-VN')}₫</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile view-all */}
        {onViewAll && (
          <div className="mt-6 text-center md:hidden">
            <button onClick={onViewAll} className="text-sm font-bold text-[#F16C10] hover:underline uppercase tracking-wide">
              Xem Tất Cả Ưu Đãi Ra Mắt →
            </button>
          </div>
        )}

        <p className="text-center text-xs text-neutral-400 mt-6">
          * Giá ưu đãi ra mắt chỉ áp dụng trong thời gian có hạn. Đến khi hết hàng.
        </p>
      </div>
    </section>
  );
}