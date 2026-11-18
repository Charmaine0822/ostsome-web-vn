// Curated campaign membership only. Prices and discounts come from Shopify.
import type { Product } from './products';
import { livePriceForSku, livePriceForHandle } from './catalogDiscounts';

export type PromoProgram = 'clearance' | 'early-bird' | 'flash-sale' | 'special-offer';

type PromoEntry = { program: PromoProgram; rrp: number; price: number };

const PROGRAM_BY_SKU_RAW: Record<string, PromoProgram> = {
  "SR-SMARTMIXER": 'clearance', // Saramonic · Bộ thiết bị thu âm cho điện thoại Smart Mixer
  "SR-SMART V2M": 'clearance', // Saramonic · Bộ thiết bị thu âm cho điện thoại và PC SmartV2M
  "SR-VLINK2 KIT1": 'clearance', // Saramonic · Bộ micro không dây Vlink2 Kit1 (TX+RX)
  "SR-VMIC MINI": 'clearance', // Saramonic · Micro Saramonic Vmic Mini cho máy ảnh và điện thoại
  "EZ-EZ85010101": 'clearance', // EDIZARD · Hộp đựng phụ kiện kèm sạc Qi2 không dây  4in1 EZ Power Cube - Xám
  "EZ-EZ85010102": 'clearance', // EDIZARD · Hộp đựng phụ kiện kèm sạc Qi2 không dây  4in1 EZ Power Cube - Đen
  "NAT-RECLA-BLK-NP25": 'clearance', // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 - Black
  "NAT-RECLA-BLK-NP25A": 'clearance', // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 Air - Black
  "NAT-RECLA-BLK-NP25P": 'clearance', // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 Pro - Black
  "NAT-RECLA-BLK-NP25PM": 'clearance', // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 Pro Max - Black
  "NAT-RECLA-GRN-NP25": 'clearance', // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 - Slate Green
  "NAT-RECLA-GRN-NP25A": 'clearance', // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 Air - Slate Green
  "NAT-RECLA-GRN-NP25P": 'clearance', // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 Pro - Slate Green
  "NAT-RECLA-GRN-NP25PM": 'clearance', // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 Pro Max - Slate Green
  "NAT-RECLA-NAV-NP25": 'clearance', // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 - Air Navy
  "NAT-RECLA-NAV-NP25A": 'clearance', // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 Air - Air Navy
  "NAT-RECLA-NAV-NP25P": 'clearance', // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 Pro - Air Navy
  "NAT-RECLA-NAV-NP25PM": 'clearance', // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 Pro Max - Air Navy
  "NAT-RECLA-TAN-NP25": 'clearance', // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 - Tan
  "NAT-RECLA-TAN-NP25A": 'clearance', // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 Air - Tan
  "NAT-RECLA-TAN-NP25P": 'clearance', // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 Pro - Tan
  "NAT-RECLA-TAN-NP25PM": 'clearance', // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 Pro Max - Tan
  "NAT-RECLE-TRA-NP25": 'clearance', // NATIVEUNION · Ốp lưng trong suốt (RE)CLEAR CASE cho iPhone 17
  "NAT-RECLE-TRA-NP25A": 'clearance', // NATIVEUNION · Ốp lưng trong suốt (RE)CLEAR CASE cho iPhone 17 Air
  "NAT-RECLE-TRA-NP25P": 'clearance', // NATIVEUNION · Ốp lưng trong suốt (RE)CLEAR CASE cho iPhone 17 Pro
  "NAT-RECLE-TRA-NP25PM": 'clearance', // NATIVEUNION · Ốp lưng trong suốt (RE)CLEAR CASE cho iPhone 17 Pro Max
  "SU 52625": 'clearance', // SPCONNECT · SPC + Ngàm dán điện thoại (66 x 55mm)
  "SU 52642": 'clearance', // SPCONNECT · SPC+ Túi đựng điện thoại Universal - size L (165x80 mm)
  "SU 52654": 'clearance', // SPCONNECT · SPC+ Magsafe ốp iPhone 14 Pro
  "SU 52655": 'clearance', // SPCONNECT · SPC+ Magsafe ốp iPhone 14 Plus
  "SU 52668": 'clearance', // SPCONNECT · Ốp lưng SPConnect SPC+ Iphone 15
  "SU 52669": 'clearance', // SPCONNECT · Ốp lưng SPConnect SPC+ Iphone 15 Pro
  "SU 52670": 'clearance', // SPCONNECT · Ốp lưng SPConnect SPC+ Iphone 15 Plus
  "SU 52671": 'clearance', // SPCONNECT · Ốp lưng điện thoại SPC+ iPhone 15 Pro Max
  "SU 52683": 'clearance', // SPCONNECT · Ốp lưng SPC+ iPhone 16
  "SU 52684": 'clearance', // SPCONNECT · Ốp lưng  SPC+ iPhone 16 Pro
  "SU 52685": 'clearance', // SPCONNECT · Ốp lưng  SPC+ iPhone 16 Plus
  "SU 52686": 'clearance', // SPCONNECT · Ốp lưng  SPC+ iPhone 16 Pro Max
  "SU 52786": 'clearance', // SPCONNECT · SP Head SPC+ Chrome Moto Pro, Barclamp Pro, Clutch Pro
  "SU 52795": 'clearance', // SPCONNECT · SPC+ Đầu chuyển ngàm dành cho Handlebar Mount Pro SP Connect
  "SU 52797": 'clearance', // SPCONNECT · SPC+ Đầu chuyển ngàm dành cho Handlebar SP Connect
  "SU 52798": 'clearance', // SPCONNECT · SPC+ Đầu chuyển ngàm dành cho Moto LT SP Connect
  "SU 52799": 'clearance', // SPCONNECT · SPC+ Đầu chuyển ngàm dính Adhesive Mount Pro SP Connect
  "SU 52804": 'clearance', // SPCONNECT · SPC+ Đế sạc điện thoại SP Connect dùng trên ô tô 15W
  "SU 52807": 'clearance', // SPCONNECT · SPC+ Đế sạc điện thoại chống nước 15W IP67 SP Connect
  "SU 52808": 'clearance', // SPCONNECT · SPC+ Module Chống rung CNC 15W IP67
  "SU 52812": 'clearance', // SPCONNECT · SPC + Kẹp xác điện thoại phổ quát 15W IP67
  "SU 52827": 'clearance', // SPCONNECT · SPC+ Bộ hộp đựng gắn xe đạp  SP Connect
  "SU 52829": 'clearance', // SPCONNECT · SPC+ Module Chống Rung CNC
  "SU 52849": 'clearance', // SPCONNECT · Ngàm gắn điện thoại SP Moto Stem Mount Pro
  "SU 53121": 'clearance', // SPCONNECT · Ngàm SP Handlebar
  "SU 53128": 'clearance', // SPCONNECT · Ngàm gắn moto SP Moto Mount LT
  "SU 53129": 'clearance', // SPCONNECT · Ngàm gắn SP Connect Moto Pro - Chrome
  "SU 53133": 'clearance', // SPCONNECT · Bộ hộp đựng SP Saddle
  "SU 53138": 'clearance', // SPCONNECT · Ngàm gắn SP Moto - Pro
  "SU 53145": 'clearance', // SPCONNECT · Đèn led tròn chiếu hậu - Light 200 - Trắng
  "SU 53146": 'clearance', // SPCONNECT · Đèn LED SP báo hiệu - Đỏ
  "SU 53230": 'clearance', // SPCONNECT · Ngàm gắn Clutch - Pro
  "SU 53231": 'clearance', // SPCONNECT · Ngàm gắn Clutch Pro Chrome
  "SU 53232": 'clearance', // SPCONNECT · Ngàm gắn SP Bar Clamp Pro
  "SU 53235": 'clearance', // SPCONNECT · Ngàm gắn SP Brake  (40.5-61.5mm)
  "SU 53238": 'clearance', // SPCONNECT · Ngàm gắn SP Bar Clamp Pro - Chrome
  "SU 53245": 'clearance', // SPCONNECT · Ngàm ghi đông xe đạp Handlebar Mount Pro
  "SU 55125": 'clearance', // SPCONNECT · Ốp lưng SP Universal - size M
  "SU 55129": 'clearance', // SPCONNECT · Ốp lưng SP Samsung S20+
  "SU 55131": 'clearance', // SPCONNECT · Ốp lưng SP Samsung S20
  "SU 55135": 'clearance', // SPCONNECT · Ốp lưng SP Samsung Note 20
  "SU 55138": 'clearance', // SPCONNECT · Ốp lưng SP Samsung S21
  "SU 55144": 'clearance', // SPCONNECT · Ốp lưng SP iPhone 13
  "SU 55145": 'clearance', // SPCONNECT · Ốp lưng SP iPhone 13 Pro
  "SU 55233": 'clearance', // SPCONNECT · Case bảo vệ điện thoại SP Weather iPhone 12 / iPho
  "SU 55234": 'clearance', // SPCONNECT · Case bảo vệ điện thoại SP Weather iPhone 12 Pro Ma
  "SU 55269": 'clearance', // SPCONNECT · Vỏ điện thoại chống nước iPhone 15 Pro
  "SU 55271": 'clearance', // SPCONNECT · Vỏ điện thoại chống nước iPhone 15 Pro Max
  "SU 53142": 'clearance', // SPCONNECT · Ngàm gắn SP Vent
  "EZ-EZ810201": 'clearance', // EDIZARD · Sạc dự phòng không dây 10,000mAh - EXMAG Power Qi2 Powerbank
  "EZ-EZ820101150": 'clearance', // EDIZARD · Cáp sạc kiêm truyền dữ liệu có nam châm, Flat Coiled dài 1.5m kèm đầu chuyển đổi A,L,M - EZ Disk Cab
  "EZ-Z820102150": 'clearance', // EDIZARD · Cáp sạc kiêm truyền dữ liệu có nam châm, Stacked Coiled dài 1.5m kèm đầu chuyển đổi A,L,M - EZ Pivot
  "EZ-EZ823001": 'clearance', // EDIZARD · Đầu chuyển đổi C to A, L, M - EZ Connect Packkage
  "EZ-EZ840101": 'clearance', // EDIZARD · Củ sạc du lịch - EZ International Travel Wall Charger
  "EZ-EZ880101": 'clearance', // EDIZARD · Ví magsafe cho điện thoại - EZWallet
  "EZ-TV810101": 'clearance', // EDIZARD · Sạc dự phòng không dây 5000mAh, thiết bị không dẫn cháy, màu Đen - Tiive MaxSafe Power Bank
  "EZ-TV810102": 'clearance', // EDIZARD · Sạc dự phòng không dây 5000mAh, thiết bị không dẫn cháy, màu Silver - Tiive MaxSafe Power Bank
  "EZ-TV810103": 'clearance', // EDIZARD · Sạc dự phòng không dây 5000mAh, thiết bị không dẫn cháy, màu Gold - Tiive MaxSafe Power Bank
  "EZ-TV810202": 'clearance', // EDIZARD · Sạc dự phòng không dây 10000mAh, thiết bị không dẫn cháy, màu Đen - Tiive MaxSafe Power Bank
  "EZ-TV810203": 'clearance', // EDIZARD · Sạc dự phòng không dây 10000mAh, thiết bị không dẫn cháy, màu Silver - Tiive MaxSafe Power Bank
  "EZ-TV810204": 'clearance', // EDIZARD · Sạc dự phòng không dây10000mAh, thiết bị không dẫn cháy, màu Gold - Tiive MaxSafe Power Bank
  "EZ-EZ830101": 'clearance', // EDIZARD · Ốp điện thoại - EZ Case Air Phone
  "EZ-EZ830201": 'clearance', // EDIZARD · Ốp điện thoại - EZ Case Pro iPhone
  "SK-S2SPW-T740": 'early-bird', // SKULLCANDY · Tai Nghe Không Dây SMOKIN BUDS 360 Màu Đen
  "SK-S2SPW-T001": 'early-bird', // SKULLCANDY · Tai Nghe Không Dây SMOKIN BUDS 360 Màu Trắng
  "SK-S2SPW-T995": 'early-bird', // SKULLCANDY · Tai Nghe Không Dây SMOKIN BUDS 360 Màu Đỏ
  "SK-S2DPW-T740": 'early-bird', // SKULLCANDY · DIME 360 PEA SHAPE TRUE WIRELESS BLACK
  "SK-S2DPW-T001": 'early-bird', // SKULLCANDY · DIME 360 PEA SHAPE TRUE WIRELESS BONE
  "SK-S2DTW-S740": 'flash-sale', // SKULLCANDY · DIME EVO TRUE WIRELESS IN-EAR - TRUE BLACK
  "SK-S2DTW-S951": 'flash-sale', // SKULLCANDY · DIME EVO TRUE WIRELESS IN-EAR - BONE/ORANGE GLOW
  "SK-S2DTW-S795": 'flash-sale', // SKULLCANDY · DIME EVO TRUE WIRELESS IN-EAR PREPPY SUMMER
  "SK-S2DTW-T987": 'flash-sale', // SKULLCANDY · DIME EVO TRUE WIRELESS IN-EAR PRIMER
  "SK-S2MTW-T001": 'flash-sale', // SKULLCANDY · METHOD 360 ANC TRUE WIRELESS IN-EAR BONE
  "SK-S2MTW-T009": 'flash-sale', // SKULLCANDY · METHOD 360 ANC TRUE WIRELESS IN-EAR LEOPARD
  "SK-S2MTW-T740": 'flash-sale', // SKULLCANDY · METHOD 360 ANC TRUE WIRELESS IN-EAR TRUE BLACK
  "SK-S2MTW-T987": 'flash-sale', // SKULLCANDY · METHOD 360 ANC TRUE WIRELESS IN-EAR PRIMER
  "SK-S2MTW-T995": 'flash-sale', // SKULLCANDY · METHOD 360 ANC TRUE WIRELESS IN-EAR PLASMA
  "SK-S4EOW-T034": 'flash-sale', // SKULLCANDY · PUSH 720 OPEN EAR TRUE WIRELESS TRUE BLACK
  "SK-S4EOW-T022": 'flash-sale', // SKULLCANDY · PUSH 720 OPEN EAR TRUE WIRELESS BONE/GOLD
  "SK-S4EOW-T992": 'flash-sale', // SKULLCANDY · PUSH 720 OPEN EAR TRUE WIRELESS CHROME
  "SK-S4EOW-T037": 'flash-sale', // SKULLCANDY · PUSH 720 OPEN EAR TRUE WIRELESS GLIMMER
  "SK-S6HOW-T740": 'flash-sale', // SKULLCANDY · HESH 360 WIRELESS OVER EAR TRUE BLACK
  "SK-S6HOW-T001": 'flash-sale', // SKULLCANDY · HESH 360 WIRELESS OVER EAR TRUE BONE
  "ST-BTSX1M": 'flash-sale', // SATECHI · Bàn phím bluetooth  Slim X1 - Xám
  "ST-BTSX2M": 'flash-sale', // SATECHI · Bàn phím bluetooth Slim X2-XÁM
  "ST-BTSX3M": 'flash-sale', // SATECHI · Bàn phím bluetooth Slim X3 -XÁM
  "ST-ACBKM": 'flash-sale', // SATECHI · Bàn phím bluetooth Satechi có đèn nền cho Mac
  "ST-KSM1DK-EN": 'flash-sale', // SATECHI · Bàn phím cơ không dây Satechi SM1 màu Dark
  "ST-KSM1LT-EN": 'flash-sale', // SATECHI · Bàn phím cơ không dây Satechi SM1 màu Light
  "ST-ABTCMM": 'flash-sale', // SATECHI · Chuột không dây bluetooth  M1 (Màu Xám)
  "ST-ABTCMS": 'flash-sale', // SATECHI · Chuột không dây bluetooth  M1 (Màu Bạc)
  "ST-ABTCMB": 'flash-sale', // SATECHI · Chuột không dây bluetooth M1 - XANH DƯƠNG
  "ST-ABTCMG": 'flash-sale', // SATECHI · Chuột không dây bluetooth M1 - VÀNG GOLD
  "ST-ABTCMR": 'flash-sale', // SATECHI · Chuột không dây bluetooth M1 - VÀNG HỒNG
  "ST-KOTGK-EN": 'flash-sale', // SATECHI · Bàn Phím Không Dây OntheGo Keyboard (Đen) - US
  "ST-KOTGW-EN": 'flash-sale', // SATECHI · Bàn Phím Không Dây OntheGo Keyboard (Trắng Cát) - US
  "ST-KSM3DK-EN": 'flash-sale', // SATECHI · Bàn phím cơ không dây bluetooth Satechi SM3 màu Dark
  "ST-KSM3LT-EN": 'flash-sale', // SATECHI · Bàn phím cơ không dây bluetooth Satechi SM3 màu Light
  "ST-MOTGK": 'flash-sale', // SATECHI · Chuột không dây OntheGo Mouse (đen)
  "ST-MOTGW": 'flash-sale', // SATECHI · Chuột Không dây OntheGo Mouse (trắng cát)
  "TB-TG0004352-3A10": 'flash-sale', // THERABODY · Thiết bị massage Theragun Mini Plus màu đen, EU/UK
  "TB-TG0004128-3A10": 'flash-sale', // THERABODY · Thiết bị massage Theragun Mini Gen 3 màu đen, EU/UK
  "TB-TG0003968-3A40": 'flash-sale', // THERABODY · Súng massage Theragun Relief - Màu Xanh Navy
  "TB-TG0003969-3A50": 'flash-sale', // THERABODY · Súng massage Theragun Relief - Màu Vàng Cát
  "TB-TG0003970-3A10": 'flash-sale', // THERABODY · Súng massage Theragun PRO PLUS - EU/UK
  "TB-TF0004349-3A20": 'flash-sale', // THERABODY · Mặt nạ ánh sáng sinh học TheraFace Mask Glo
  "TB-TF0004132-3A20": 'flash-sale', // THERABODY · Máy massage đẩy tinh chất TheraFace Depuffing Wand (1.5) - White
  "TB-TF0004132-3A40": 'flash-sale', // THERABODY · Máy massage đẩy tinh chất TheraFace Depuffing Wand (1.5) - Indigo
  "TB-RA02097-01": 'flash-sale', // THERABODY · Máy massage bắp chân nén khí RecoveryAir JetBoots
  "TB-JB0004131-3A1M": 'flash-sale', // THERABODY · Máy massage bắp chân nén khí JetBoots Prime M
  "TB-JB0004131-3A1S": 'flash-sale', // THERABODY · Máy massage bắp chân nén khí JetBoots Prime S
  "TB-JB0004130-3A1M": 'flash-sale', // THERABODY · Máy massage bắp chân nén khí JetBoots Pro Plus, EUUK - Regular
};

const PROGRAM_BY_HANDLE_RAW: Record<string, PromoProgram> = {
  'tai-nghe-chụp-tai-tdm-neo-hybrid-2-trong-1-xoay-thanh-loa-bluetooth': 'special-offer',
};

const normalizeHandle = (h: string) => {
  let v = h;
  try { v = decodeURIComponent(h); } catch { /* keep raw */ }
  return v.normalize('NFC').trim().toLowerCase();
};
const PROGRAM_BY_HANDLE = new Map(
  Object.entries(PROGRAM_BY_HANDLE_RAW).map(([h, program]) => [normalizeHandle(h), program])
);

// SKUs in Shopify sometimes differ from the sheet by case/whitespace.
const normalizeSku = (sku: string) => sku.trim().replace(/\s+/g, ' ').toUpperCase();
const PROGRAM_BY_SKU = new Map(Object.entries(PROGRAM_BY_SKU_RAW).map(([sku, program]) => [normalizeSku(sku), program]));

export type Promo = PromoEntry & { pct: number };

const withPct = (e: PromoEntry): Promo => ({ ...e, pct: Math.round(((e.rrp - e.price) / e.rrp) * 100) });

// Program membership does not depend on whether a discount was fetched.
// All amounts come from the same live Shopify variant quote. No legacy prices.
function pricedPromo(program: PromoProgram | undefined, live: { price: number; rrp: number } | null): Promo | null {
  if (!live || (!program && live.price >= live.rrp)) return null;
  return withPct({ ...live, program: program ?? 'special-offer' });
}

export function getPromoForSku(sku: string | null | undefined): Promo | null {
  if (!sku) return null;
  return pricedPromo(PROGRAM_BY_SKU.get(normalizeSku(sku)), livePriceForSku(sku));
}

export function getPromoForHandle(handle: string | null | undefined): Promo | null {
  if (!handle) return null;
  return pricedPromo(PROGRAM_BY_HANDLE.get(normalizeHandle(handle)), livePriceForHandle(handle));
}

export function getPromoForProduct(product: Product, program?: PromoProgram): Promo | null {
  const memberships = (product.skus ?? []).map(sku => PROGRAM_BY_SKU.get(normalizeSku(sku))).filter(Boolean);
  const handleProgram = PROGRAM_BY_HANDLE.get(normalizeHandle(product.handle));
  const classification = program
    ? memberships.includes(program) || handleProgram === program ? program : undefined
    : memberships[0] ?? handleProgram;
  if (program && !classification) return null;
  // Catalog cards quote the lowest-priced available variant, with its own RRP.
  return pricedPromo(classification, livePriceForHandle(product.handle));
}

export type PromoItem = { product: Product; promo: Promo };

/** All products in a program: in-stock first, then biggest discount first. */
export function getProgramItems(products: Product[], program: PromoProgram): PromoItem[] {
  return products
    .map(product => ({ product, promo: getPromoForProduct(product, program) }))
    .filter((i): i is PromoItem => i.promo !== null)
    .sort((a, b) =>
      Number(b.product.availableForSale) - Number(a.product.availableForSale) ||
      b.promo.pct - a.promo.pct
    );
}

/** Biggest discount in a list — drives the "Đến X%" headlines. */
export function getMaxDiscountPct(items: PromoItem[]): number {
  return items.reduce((max, i) => Math.max(max, i.promo.pct), 0);
}

export const PROGRAM_LABELS: Record<PromoProgram, string> = {
  clearance: 'Xả kho',
  'early-bird': 'Early Bird',
  'flash-sale': 'Flash Sale',
  'special-offer': 'Ưu đãi',
};
