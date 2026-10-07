import { ChevronLeft, Star } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../data/products';
import { useAuth } from './AuthContext';
import { getFostPrice } from '../data/pricing';
import { getProgramItems, getMaxDiscountPct } from '../data/promoPrograms';

type Props = {
  onBack?: () => void;
  onSelectProduct?: (product: Product) => void;
  onJoinFost?: () => void;
};

export function LaunchExclusivePage({ onBack, onSelectProduct, onJoinFost }: Props) {
  const { products, loading } = useProducts();
  const { user } = useAuth();
  const isFostMember = Boolean(user);

  // Every product with an Early Bird SKU in promoPrograms.ts, at sheet prices.
  const earlyBird = getProgramItems(products, 'early-bird');
  const maxPct = getMaxDiscountPct(earlyBird);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero banner */}
      <div className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-neutral-400 hover:text-white text-sm font-medium mb-6 transition-colors"
            >
              <ChevronLeft size={16} /> Quay lại
            </button>
          )}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#F16C10] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                ▶ Early Bird · Ưu Đãi Mua Sớm
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase leading-none mb-3">
                Mua Sớm.<br />Nhận Giá Tốt Nhất.
              </h1>
              <p className="text-neutral-400 text-sm md:text-base max-w-lg">
                Khách hàng mua sớm trên Ostsome được hưởng giá ưu đãi độc quyền cho sản phẩm mới.
                Mua sớm, tiết kiệm nhiều hơn — thời gian có hạn, đến khi hết hàng.
              </p>
            </div>
            <div className="text-left md:text-right shrink-0">
              <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Ưu Đãi Sớm</div>
              <div className="text-6xl md:text-7xl font-black text-[#F16C10] leading-none">Đến</div>
              <div className="text-6xl md:text-7xl font-black text-white leading-none">{maxPct}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-[#FFF4EC] border-b border-orange-100 py-2 px-4 text-center">
        <p className="text-xs text-[#F16C10] font-medium">
          ⏱ Giá ưu đãi ra mắt chỉ áp dụng trong thời gian có hạn. Đến khi hết hàng. Đã bao gồm VAT.
        </p>
      </div>

      {/* Flat product grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-neutral-100 rounded-2xl aspect-[3/4] animate-pulse" />
            ))}
          </div>
        ) : earlyBird.length === 0 ? (
          <p className="text-center text-sm text-neutral-500 py-20">
            Hiện chưa có ưu đãi mua sớm. Tham gia FOST để là người đầu tiên biết khi có ưu đãi mới!
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {earlyBird.map(({ product, promo }) => {
              const rrp = promo.rrp;
              const pct = promo.pct;
              const saving = (rrp - promo.price).toLocaleString('vi-VN');
              return (
                <div
                  key={product.handle}
                  onClick={() => onSelectProduct?.(product)}
                  className="bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative aspect-square bg-neutral-50 overflow-hidden">
                    <img
                      src={product.images?.[0]}
                      alt={product.title}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition duration-500"
                      onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80'; }}
                    />
                    <div className="absolute top-2 right-2 bg-[#F16C10] text-white text-[10px] font-black rounded-full w-9 h-9 flex items-center justify-center leading-none">
                      -{pct}%
                    </div>
                  </div>
                  <div className="p-3 md:p-4">
                    <p className="text-[9px] font-bold text-[#F16C10] uppercase tracking-widest mb-1">{product.vendor}</p>
                    <h3 className="text-xs md:text-sm font-bold text-black line-clamp-2 mb-2">{product.title}</h3>
                    <div className="flex items-center gap-0.5 mb-1">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} size={10} className={s <= 4 ? 'text-amber-400 fill-amber-400' : 'text-neutral-200 fill-neutral-200'} />
                      ))}
                    </div>
                    {isFostMember ? (
                      <>
                        <span className="text-xs text-neutral-400 line-through block">{rrp.toLocaleString('vi-VN')}₫</span>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-base font-black text-[#F16C10]">{getFostPrice(promo.price).toLocaleString('vi-VN')}₫</span>
                        </div>
                        <p className="text-[10px] text-green-600 font-semibold mt-0.5">Bạn tiết kiệm {(rrp - getFostPrice(promo.price)).toLocaleString('vi-VN')}₫</p>
                      </>
                    ) : (
                      <>
                        <span className="text-xs text-neutral-400 line-through block">{rrp.toLocaleString('vi-VN')}₫</span>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-base font-black text-[#F16C10]">{promo.price.toLocaleString('vi-VN')}₫</span>
                        </div>
                        <p className="text-[10px] text-green-600 font-semibold mt-0.5">Bạn tiết kiệm {saving}₫</p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FOST footer CTA */}
      <div className="bg-black text-white py-14 text-center px-4">
        <p className="text-neutral-400 text-xs mb-2 uppercase tracking-widest font-bold">Bạn Bè Của Ostsome</p>
        <h2 className="text-2xl md:text-3xl font-black mb-3">Thành Viên FOST Được Ưu Tiên</h2>
        <p className="text-neutral-400 text-sm max-w-md mx-auto mb-6">
          Tham gia FOST miễn phí để là người đầu tiên biết về ưu đãi ra mắt, thư mời sự kiện, và giá dành riêng cho thành viên.
        </p>
        <button
          onClick={onJoinFost}
          className="bg-[#F16C10] hover:bg-orange-600 text-white font-black text-sm uppercase tracking-widest px-8 py-3 rounded-full transition-colors"
        >
          Tham Gia FOST — Miễn Phí
        </button>
      </div>
    </div>
  );
}