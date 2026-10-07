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

export function OneSeasonOff({ onSelectProduct, onViewAll }: Props) {
  const { products } = useProducts();
  const { user } = useAuth();
  const isFostMember = Boolean(user);

  // Clearance SKUs from promoPrograms.ts (Mr. Boh's VN pricing sheet).
  // Homepage shows the 6 biggest in-stock discounts; /clearance shows all.
  const clearance = getProgramItems(products, 'clearance');
  const homepageDeals = clearance.filter(i => i.product.availableForSale).slice(0, 6);
  const maxPct = getMaxDiscountPct(clearance);

  // Nothing matched yet (or still loading) — hide the section rather than
  // showing an empty block.
  if (homepageDeals.length === 0) return null;

  const trustItems = [
    { icon: '🏷️', title: 'CÔNG NGHỆ ĐỘC QUYỀN', sub: 'Thương hiệu lớn. Tiết kiệm thật.' },
    { icon: '%',   title: 'GIÁ KHÔNG THỂ TỐT HƠN', sub: `Giảm đến ${maxPct}% so với giá bán lẻ gốc.` },
    { icon: '⏱️', title: 'ĐẾN KHI HẾT HÀNG', sub: 'Hết là hết, không còn cơ hội.' },
  ];

  return (
    <section className="overflow-hidden" style={{ backgroundColor: '#FFF8F5' }}>
      {/* Top red bar */}
      <div style={{ height: 5, backgroundColor: '#F16C10' }} />

      {/* ── DESKTOP (md+) ── */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-stretch gap-6" style={{ minHeight: 500 }}>

            {/* LEFT */}
            <div className="relative flex flex-col justify-center py-5 shrink-0 overflow-hidden" style={{ width: 300 }}>
              {/* Ghost watermark */}
              <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
                <span className="font-black absolute" style={{ fontSize: '13rem', color: 'rgba(241,108,16,0.055)', right: '-2.5rem', top: '50%', transform: 'translateY(-50%)', letterSpacing: '-0.05em', lineHeight: 1 }}>{maxPct}%</span>
                <span className="font-black absolute" style={{ fontSize: '8rem', color: 'rgba(241,108,16,0.11)', right: '-0.5rem', top: '50%', transform: 'translateY(-44%) rotate(-7deg)', letterSpacing: '-0.05em', lineHeight: 1 }}>{maxPct}%</span>
              </div>
              <div className="relative z-10 flex flex-col gap-4">
                <p className="text-xs font-black uppercase tracking-[0.25em] flex items-center gap-1.5" style={{ color: '#F16C10' }}>🔥 Xả Kho</p>
                <div>
                  <h2 className="font-black leading-none mb-2" style={{ fontSize: '2.4rem', color: '#111111' }}>Cuối Mùa Giảm Giá.</h2>
                  <p className="text-sm" style={{ color: '#6F6A63', lineHeight: 1.6 }}>Công nghệ cao cấp, thương hiệu huyền thoại —<br />nay với mức giá không tưởng.</p>
                </div>
                {/* 50% + stamp */}
                <div className="flex items-center gap-3">
                  <div className="flex items-start gap-1 leading-none">
                    <div className="flex flex-col font-black uppercase" style={{ fontSize: '0.65rem', color: '#111111', lineHeight: 1.3, paddingTop: '0.7rem' }}>
                      <span>ĐẾN</span>
                    </div>
                    <span className="font-black" style={{ fontSize: '4.5rem', color: '#F16C10', lineHeight: 1 }}>{maxPct}%</span>
                    <span className="font-black uppercase self-end" style={{ fontSize: '0.85rem', color: '#111111', paddingBottom: '0.4rem' }}>GIẢM</span>
                  </div>
                  <div className="flex-shrink-0 flex items-center justify-center rounded-full border-[3px]" style={{ width: 76, height: 76, borderColor: '#111111', transform: 'rotate(-10deg)' }}>
                    <div className="text-center leading-snug">
                      <div className="font-black uppercase" style={{ fontSize: '0.55rem', letterSpacing: '0.08em', color: '#111111' }}>SỐ LƯỢNG</div>
                      <div className="font-black uppercase" style={{ fontSize: '0.55rem', letterSpacing: '0.08em', color: '#111111' }}>CÓ HẠN</div>
                    </div>
                  </div>
                </div>
                <button onClick={onViewAll} className="inline-flex items-center gap-1.5 font-black uppercase tracking-widest px-5 py-2.5 rounded-full border-2 transition-all duration-200 self-start" style={{ fontSize: '0.65rem', borderColor: '#111111', color: '#111111', backgroundColor: 'transparent' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#111111'; (e.currentTarget as HTMLButtonElement).style.color = '#FFF8F5'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#111111'; }}
                >
                  Xem Tất Cả Ưu Đãi →
                </button>
              </div>
            </div>

            {/* RIGHT — 3×2 grid, fills full height */}
            <div className="flex-1 py-5">
              <div className="grid gap-3 h-full" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)' }}>
                {homepageDeals.map(({ product, promo }) => {
                  const pct = promo.pct;
                  return (
                    <div key={product.handle} onClick={() => onSelectProduct?.(product)} className="bg-white rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-row">
                      <div className="relative bg-neutral-50 overflow-hidden shrink-0" style={{ width: '45%' }}>
                        <img src={product.images[0]} alt={product.title} className="w-full h-full object-contain p-3 group-hover:scale-105 transition duration-500" onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80'; }} />
                        <span className="absolute top-2 left-2 text-white font-black px-2.5 py-1 rounded-full" style={{ fontSize: '0.75rem', backgroundColor: '#F16C10' }}>{pct > 0 ? `-${pct}%` : 'XẢ KHO'}</span>
                      </div>
                      <div className="flex flex-col justify-center p-3 flex-1 min-w-0">
                        <p className="font-bold uppercase tracking-widest mb-1 truncate" style={{ fontSize: '0.58rem', color: '#6F6A63' }}>{product.vendor}</p>
                        <h3 className="font-bold line-clamp-2 mb-2 leading-snug" style={{ fontSize: '0.78rem', color: '#111111' }}>{product.title}</h3>
                        <div className="flex items-center gap-0.5 mb-1">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} size={9} className={s <= 4 ? 'text-amber-400 fill-amber-400' : 'text-neutral-200 fill-neutral-200'} />
                          ))}
                        </div>
                        {isFostMember ? (
                          <>
                            <span className="line-through block" style={{ fontSize: '0.68rem', color: '#9CA3AF' }}>{promo.rrp.toLocaleString('vi-VN')}₫</span>
                            <span className="font-black block" style={{ fontSize: '1rem', color: '#F16C10' }}>{getFostPrice(promo.price).toLocaleString('vi-VN')}₫</span>
                          </>
                        ) : (
                          <>
                            <span className="line-through block" style={{ fontSize: '0.68rem', color: '#9CA3AF' }}>{promo.rrp.toLocaleString('vi-VN')}₫</span>
                            <span className="font-black block" style={{ fontSize: '1rem', color: '#F16C10' }}>{promo.price.toLocaleString('vi-VN')}₫</span>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop trust bar */}
        <div className="border-t" style={{ borderColor: '#EDE8E1' }}>
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-3">
              {trustItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3" style={{ borderRight: i < 2 ? '1px solid #EDE8E1' : 'none' }}>
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-black uppercase tracking-widest leading-tight" style={{ fontSize: '0.6rem', color: '#111111' }}>{item.title}</p>
                    <p className="mt-0.5" style={{ fontSize: '0.65rem', color: '#6F6A63' }}>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE (below md) ── */}
      <div className="block md:hidden">
        {/* Compact info strip */}
        <div className="px-4 pt-5 pb-4 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-1 mb-1" style={{ color: '#F16C10' }}>🔥 Xả Kho</p>
            <h2 className="text-2xl font-black leading-tight" style={{ color: '#111111' }}>Cuối Mùa Giảm Giá.</h2>
            <p className="text-xs mt-0.5" style={{ color: '#6F6A63' }}>Công nghệ cao cấp với mức giá không tưởng.</p>
          </div>
          {/* Compact 50% badge */}
          <div className="shrink-0 ml-4 text-right">
            <div className="flex items-start justify-end gap-0.5 leading-none">
              <span className="font-black text-[0.5rem] uppercase mt-1" style={{ color: '#111111' }}>ĐẾN</span>
              <span className="font-black" style={{ fontSize: '3rem', color: '#F16C10', lineHeight: 1 }}>{maxPct}%</span>
            </div>
            <div className="text-[0.5rem] font-black uppercase" style={{ color: '#111111' }}>GIẢM · SỐ LƯỢNG CÓ HẠN</div>
          </div>
        </div>

        {/* Mobile product strip — horizontal scroll, ~2.5 cards visible */}
        <div className="px-4 pb-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          <div className="flex gap-3" style={{ width: 'max-content' }}>
            {homepageDeals.map(({ product, promo }) => {
              const pct = promo.pct;
              return (
                <div key={product.handle} onClick={() => onSelectProduct?.(product)} className="bg-white rounded-xl overflow-hidden hover:shadow-md cursor-pointer flex-shrink-0" style={{ width: 140 }}>
                  <div className="relative bg-neutral-50 overflow-hidden" style={{ aspectRatio: '1/1' }}>
                    <img src={product.images[0]} alt={product.title} className="w-full h-full object-contain p-3" onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80'; }} />
                    <span className="absolute top-1.5 left-1.5 text-white font-black px-2 py-0.5 rounded-full" style={{ fontSize: '0.7rem', backgroundColor: '#F16C10' }}>{pct > 0 ? `-${pct}%` : 'XẢ KHO'}</span>
                  </div>
                  <div className="p-2.5">
                    <p className="font-bold uppercase truncate mb-0.5" style={{ fontSize: '0.55rem', color: '#6F6A63' }}>{product.vendor}</p>
                    <h3 className="font-bold line-clamp-2 leading-snug mb-1.5" style={{ fontSize: '0.72rem', color: '#111111' }}>{product.title}</h3>
                    <div className="flex items-center gap-0.5 mb-1">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} size={9} className={s <= 4 ? 'text-amber-400 fill-amber-400' : 'text-neutral-200 fill-neutral-200'} />
                      ))}
                    </div>
                    {isFostMember ? (
                      <>
                        <span className="line-through block" style={{ fontSize: '0.65rem', color: '#9CA3AF' }}>{promo.rrp.toLocaleString('vi-VN')}₫</span>
                        <span className="font-black block" style={{ fontSize: '0.9rem', color: '#F16C10' }}>{getFostPrice(promo.price).toLocaleString('vi-VN')}₫</span>
                      </>
                    ) : (
                      <>
                        <span className="line-through block" style={{ fontSize: '0.65rem', color: '#9CA3AF' }}>{promo.rrp.toLocaleString('vi-VN')}₫</span>
                        <span className="font-black block" style={{ fontSize: '0.9rem', color: '#F16C10' }}>{promo.price.toLocaleString('vi-VN')}₫</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
            {/* Peek card to signal more */}
            <div className="flex-shrink-0 flex items-center justify-center rounded-xl cursor-pointer" style={{ width: 100, backgroundColor: '#111111' }} onClick={onViewAll}>
              <div className="text-center px-3">
                <div className="text-white font-black text-lg mb-1">→</div>
                <div className="text-white font-black uppercase text-[0.55rem] tracking-wide leading-tight">Xem Tất Cả<br/>Ưu Đãi</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile trust bar — single row */}
        <div className="border-t grid grid-cols-3" style={{ borderColor: '#EDE8E1' }}>
          {trustItems.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center px-2 py-2.5" style={{ borderRight: i < 2 ? '1px solid #EDE8E1' : 'none' }}>
              <span className="text-base mb-1">{item.icon}</span>
              <p className="font-black uppercase leading-tight" style={{ fontSize: '0.5rem', color: '#111111' }}>{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom red bar */}
      <div style={{ height: 5, backgroundColor: '#F16C10' }} />
    </section>
  );
}