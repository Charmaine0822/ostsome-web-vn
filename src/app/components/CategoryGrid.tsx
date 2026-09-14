import { Camera, Headphones, Gamepad2, Watch, HeartPulse, Plane, Monitor } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { NAV_CATEGORIES, type NavCategoryKey } from '../data/navCategories';
import type { Product } from '../data/products';

// Icon shown only as a placeholder when a category has no in-stock product
// photo to use as a cover image — matches the emoji already defined
// per-category in navCategories.ts.
const ICONS: Record<NavCategoryKey, React.ComponentType<{ size?: number; className?: string }>> = {
  'Mobile Creator': Camera,
  'Mobile Audio': Headphones,
  'Gaming': Gamepad2,
  'Smart Life': Watch,
  'Wellness': HeartPulse,
  'Travel & Carry': Plane,
  'Desk Setup': Monitor,
};

type CategoryGridProps = {
  onNavToCategory?: (category: NavCategoryKey) => void;
};

export function CategoryGrid({ onNavToCategory }: CategoryGridProps) {
  const { products } = useProducts();

  // Match ProductListing.tsx / NavCategoryPage.tsx: hide sold-out products
  // from counts and cover photos, so this grid's numbers agree with the
  // nav bar's category pages instead of counting unpurchasable items.
  const byCategory = products.filter(p => p.availableForSale).reduce<Partial<Record<NavCategoryKey, Product[]>>>((acc, p) => {
    const key = p.navCategory as NavCategoryKey;
    if (!key) return acc;
    (acc[key] ??= []).push(p);
    return acc;
  }, {});

  // Always show all 7 nav categories as a fixed strip, even ones with no
  // matching products yet — same "full taxonomy always visible" behavior
  // the old 10-category grid had, now mirroring the nav bar's taxonomy
  // instead of the separate genericCategories.ts system.
  const activeCategories = NAV_CATEGORIES.map(cat => {
    const items = byCategory[cat.key] ?? [];
    const cover = items.find(p => p.availableForSale && p.images[0]) ?? items.find(p => p.images[0]);
    return { ...cat, count: items.length, coverImage: cover?.images[0] ?? null };
  });

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-lg md:text-xl font-bold text-black mb-6">Danh Mục Sản Phẩm</h2>
        {/* 7 categories now instead of 10 — grid-cols-4 on mobile settles
            into 2 rows (4 + 3), widens to a single row of 7 from sm up. */}
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-x-2 gap-y-5 md:gap-x-4">
          {activeCategories.map(cat => {
            const Icon = ICONS[cat.key];
            return (
              <button
                key={cat.key}
                onClick={() => onNavToCategory?.(cat.key)}
                className="flex flex-col items-center gap-2 group"
              >
                <span className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white overflow-hidden ring-1 ring-neutral-200 group-hover:ring-2 group-hover:ring-[#F16C10] transition-all shadow-sm group-hover:shadow-md">
                  {cat.coverImage ? (
                    <img
                      src={cat.coverImage}
                      alt={cat.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  ) : (
                    <span className="w-full h-full flex items-center justify-center text-neutral-400">
                      <Icon size={20} />
                    </span>
                  )}
                </span>
                <span className="text-[10px] sm:text-xs text-center text-neutral-700 leading-tight font-medium group-hover:text-[#F16C10] transition-colors">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}