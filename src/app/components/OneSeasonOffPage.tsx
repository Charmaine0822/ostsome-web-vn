import { useState } from 'react';
import { ChevronLeft, Star } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../data/products';
import { getProgramItems, getMaxDiscountPct } from '../data/promoPrograms';
import { useAuth } from './AuthContext';
import { getFostPrice } from '../data/pricing';

type Props = {
  onBack?: () => void;
  onSelectProduct?: (product: Product) => void;
};

export function OneSeasonOffPage({ onBack, onSelectProduct }: Props) {
  const { products, loading } = useProducts();
  const { user } = useAuth();
  const isFostMember = Boolean(user);
  const [brand, setBrand] = useState<string>('Tất cả');

  // Every product with a clearance SKU in promoPrograms.ts, at sheet prices.
  const clearance = getProgramItems(products, 'clearance');
  const maxPct = getMaxDiscountPct(clearance);
  const brands = ['Tất cả', ...Array.from(new Set(clearance.map(i => i.product.vendor))).sort((a, b) => a.localeCompare(b))];
  const visible = brand === 'Tất cả' ? clearance : clearance.filter(i => i.product.vendor === brand);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F2' }}>
      {/* Hero banner */}
      <div className="bg-[#111111] text-white">
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
              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: '#F16C10' }}>
                🔥 Xả Kho
              </p>
              <h1 className="text-4xl md:text-6xl font-black uppercase leading-none mb-3">
                Cuối Mùa Giảm Giá.
              </h1>
              <p className="text-neutral-400 text-sm md:text-base max-w-lg">
                Sản phẩm được chọn lọc từ các đợt hàng trước, nay nhường chỗ cho sản phẩm mới.
                Tất cả đều mới 100% — chỉ là hàng mùa trước. Số lượng có hạn.
              </p>
            </div>
            <div className="text-left md:text-right shrink-0">
              <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Ưu Đãi Xả Kho</div>
              <div className="text-6xl md:text-7xl font-black leading-none" style={{ color: '#F16C10' }}>Đến</div>
              <div className="text-6xl md:text-7xl font-black text-white leading-none">{maxPct}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-orange-50 border-b border-orange-100 py-2 px-4 text-center">
        <p className="text-xs font-medium" style={{ color: '#F16C10' }}>
          ⚠️ Giá xả kho là giá cuối cùng. Không áp dụng thêm ưu đãi nào khác. Đến khi hết hàng. Đã bao gồm VAT.
        </p>
      </div>

      {/* Brand filter + product grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
        {!loading && brands.length > 2 && (
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap" style={{ scrollbarWidth: 'none' }}>
            {brands.map(b => {
              const active = b === brand;
              const count = b === 'Tất cả' ? clearance.length : clearance.filter(i => i.product.vendor === b).length;
              return (
                <button
                  key={b}
                  onClick={() => setBrand(b)}
                  className="shrink-0 text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-full border transition-colors"
                  style={active
                    ? { backgroundColor: '#111111', borderColor: '#111111', color: '#FFFFFF' }
                    : { backgroundColor: '#FFFFFF', borderColor: '#E5E0D8', color: '#111111' }}
                >
                  {b} <span style={{ opacity: 0.55 }}>({count})</span>
                </button>
              );
            })}
          </div>
        )}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl aspect-[3/4] animate-pulse" />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <p className="text-center text-sm py-20" style={{ color: '#6F6A63' }}>
            Hiện chưa có sản phẩm xả kho. Quay lại sau nhé!
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {visible.map(({ product, promo }) => {
              const rrp = promo.rrp;
              const pct = promo.pct;
              const soldOut = !product.availableForSale;
              const saving = (rrp - promo.price).toLocaleString('vi-VN');
              return (
                <div
                  key={product.handle}
                  onClick={() => onSelectProduct?.(product)}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative aspect-square bg-neutral-50 overflow-hidden">
                    <img
                      src={product.images?.[0]}
                      alt={product.title}
                      className={`w-full h-full object-contain p-4 group-hover:scale-105 transition duration-500 ${soldOut ? 'opacity-50 grayscale' : ''}`}
                      onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80'; }}
                    />
                    <span
                      className="absolute top-2 left-2 text-white text-[9px] font-black px-2 py-1 rounded-full uppercase"
                      style={{ backgroundColor: soldOut ? '#111111' : '#F16C10' }}
                    >
                      {soldOut ? 'Hết hàng' : pct > 0 ? `-${pct}%` : 'Xả kho'}
                    </span>
                  </div>
                  <div className="p-3 md:p-4">
                    <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: '#6F6A63' }}>{product.vendor}</p>
                    <h3 className="text-xs md:text-sm font-bold line-clamp-2 mb-2" style={{ color: '#111111' }}>{product.title}</h3>
                    <div className="flex items-center gap-0.5 mb-1">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} size={10} className={s <= 4 ? 'text-amber-400 fill-amber-400' : 'text-neutral-200 fill-neutral-200'} />
                      ))}
                    </div>
                    {isFostMember ? (
                      <>
                        <span className="text-xs line-through block" style={{ color: '#6F6A63' }}>{rrp.toLocaleString('vi-VN')}₫</span>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-base font-black" style={{ color: '#F16C10' }}>{getFostPrice(promo.price).toLocaleString('vi-VN')}₫</span>
                        </div>
                        <p className="text-[10px] font-semibold mt-0.5 text-green-600">Bạn tiết kiệm {(rrp - getFostPrice(promo.price)).toLocaleString('vi-VN')}₫</p>
                      </>
                    ) : (
                      <>
                        <span className="text-xs line-through block" style={{ color: '#6F6A63' }}>{rrp.toLocaleString('vi-VN')}₫</span>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-base font-black" style={{ color: '#F16C10' }}>{promo.price.toLocaleString('vi-VN')}₫</span>
                        </div>
                        <p className="text-[10px] font-semibold mt-0.5 text-green-600">Bạn tiết kiệm {saving}₫</p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}