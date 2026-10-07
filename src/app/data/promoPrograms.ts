// ─── PROMO PROGRAMS: Clearance / Early Bird / Flash Sale ─────────────────────
// Single source of truth for promo pricing on the VN site, from Mr. Boh's
// sheet "OSTSOME_VN_Selling_price.xlsx" (Program column). Matched by variant
// SKU, so no handles to look up — any Shopify product whose variant SKU is
// listed here shows up in that section automatically.
//
//   rrp   = "RRP Ecom/OSTSOME" column (shown struck out)
//   price = "Selling price" column (the promo price)
//
// ⚠️ These are DISPLAY prices. Until the same prices are set in Shopify
// (price / compare-at, or a Shopify discount), checkout charges whatever
// Shopify has. Once Shopify matches, nothing here needs to change.
//
// To add/remove an item: add/remove its SKU line below. To end a program,
// delete its block.

import type { Product } from './products';

export type PromoProgram = 'clearance' | 'early-bird' | 'flash-sale';

type PromoEntry = { program: PromoProgram; rrp: number; price: number };

const PROMO_PRICES: Record<string, PromoEntry> = {
  // ── CLEARANCE ("Clearance stock") — 89 SKUs ──
  "SR-SMARTMIXER": { program: 'clearance', rrp: 1190000, price: 606900 }, // Saramonic · Bộ thiết bị thu âm cho điện thoại Smart Mixer
  "SR-SMART V2M": { program: 'clearance', rrp: 1190000, price: 606900 }, // Saramonic · Bộ thiết bị thu âm cho điện thoại và PC SmartV2M
  "SR-VLINK2 KIT1": { program: 'clearance', rrp: 1890000, price: 963900 }, // Saramonic · Bộ micro không dây Vlink2 Kit1 (TX+RX)
  "SR-VMIC MINI": { program: 'clearance', rrp: 590000, price: 300900 }, // Saramonic · Micro Saramonic Vmic Mini cho máy ảnh và điện thoại
  "EZ-EZ85010101": { program: 'clearance', rrp: 2290000, price: 1603000 }, // EDIZARD · Hộp đựng phụ kiện kèm sạc Qi2 không dây  4in1 EZ Power Cube - Xám
  "EZ-EZ85010102": { program: 'clearance', rrp: 2290000, price: 1603000 }, // EDIZARD · Hộp đựng phụ kiện kèm sạc Qi2 không dây  4in1 EZ Power Cube - Đen
  "NAT-RECLA-BLK-NP25": { program: 'clearance', rrp: 1290000, price: 877000 }, // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 - Black
  "NAT-RECLA-BLK-NP25A": { program: 'clearance', rrp: 1290000, price: 877000 }, // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 Air - Black
  "NAT-RECLA-BLK-NP25P": { program: 'clearance', rrp: 1290000, price: 877000 }, // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 Pro - Black
  "NAT-RECLA-BLK-NP25PM": { program: 'clearance', rrp: 1290000, price: 877000 }, // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 Pro Max - Black
  "NAT-RECLA-GRN-NP25": { program: 'clearance', rrp: 1290000, price: 877000 }, // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 - Slate Green
  "NAT-RECLA-GRN-NP25A": { program: 'clearance', rrp: 1290000, price: 877000 }, // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 Air - Slate Green
  "NAT-RECLA-GRN-NP25P": { program: 'clearance', rrp: 1290000, price: 877000 }, // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 Pro - Slate Green
  "NAT-RECLA-GRN-NP25PM": { program: 'clearance', rrp: 1290000, price: 877000 }, // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 Pro Max - Slate Green
  "NAT-RECLA-NAV-NP25": { program: 'clearance', rrp: 1290000, price: 877000 }, // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 - Air Navy
  "NAT-RECLA-NAV-NP25A": { program: 'clearance', rrp: 1290000, price: 877000 }, // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 Air - Air Navy
  "NAT-RECLA-NAV-NP25P": { program: 'clearance', rrp: 1290000, price: 877000 }, // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 Pro - Air Navy
  "NAT-RECLA-NAV-NP25PM": { program: 'clearance', rrp: 1290000, price: 877000 }, // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 Pro Max - Air Navy
  "NAT-RECLA-TAN-NP25": { program: 'clearance', rrp: 1290000, price: 877000 }, // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 - Tan
  "NAT-RECLA-TAN-NP25A": { program: 'clearance', rrp: 1290000, price: 877000 }, // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 Air - Tan
  "NAT-RECLA-TAN-NP25P": { program: 'clearance', rrp: 1290000, price: 877000 }, // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 Pro - Tan
  "NAT-RECLA-TAN-NP25PM": { program: 'clearance', rrp: 1290000, price: 877000 }, // NATIVEUNION · Ốp lưng (RE)CLASSIC CASE cho iPhone 17 Pro Max - Tan
  "NAT-RECLE-TRA-NP25": { program: 'clearance', rrp: 890000, price: 587000 }, // NATIVEUNION · Ốp lưng trong suốt (RE)CLEAR CASE cho iPhone 17
  "NAT-RECLE-TRA-NP25A": { program: 'clearance', rrp: 890000, price: 587000 }, // NATIVEUNION · Ốp lưng trong suốt (RE)CLEAR CASE cho iPhone 17 Air
  "NAT-RECLE-TRA-NP25P": { program: 'clearance', rrp: 890000, price: 587000 }, // NATIVEUNION · Ốp lưng trong suốt (RE)CLEAR CASE cho iPhone 17 Pro
  "NAT-RECLE-TRA-NP25PM": { program: 'clearance', rrp: 890000, price: 587000 }, // NATIVEUNION · Ốp lưng trong suốt (RE)CLEAR CASE cho iPhone 17 Pro Max
  "SU 52625": { program: 'clearance', rrp: 650000, price: 487000 }, // SPCONNECT · SPC + Ngàm dán điện thoại (66 x 55mm)
  "SU 52642": { program: 'clearance', rrp: 755000, price: 604000 }, // SPCONNECT · SPC+ Túi đựng điện thoại Universal - size L (165x80 mm)
  "SU 52654": { program: 'clearance', rrp: 955000, price: 764000 }, // SPCONNECT · SPC+ Magsafe ốp iPhone 14 Pro
  "SU 52655": { program: 'clearance', rrp: 955000, price: 764000 }, // SPCONNECT · SPC+ Magsafe ốp iPhone 14 Plus
  "SU 52668": { program: 'clearance', rrp: 955000, price: 764000 }, // SPCONNECT · Ốp lưng SPConnect SPC+ Iphone 15
  "SU 52669": { program: 'clearance', rrp: 955000, price: 764000 }, // SPCONNECT · Ốp lưng SPConnect SPC+ Iphone 15 Pro
  "SU 52670": { program: 'clearance', rrp: 955000, price: 764000 }, // SPCONNECT · Ốp lưng SPConnect SPC+ Iphone 15 Plus
  "SU 52671": { program: 'clearance', rrp: 955000, price: 764000 }, // SPCONNECT · Ốp lưng điện thoại SPC+ iPhone 15 Pro Max
  "SU 52683": { program: 'clearance', rrp: 955000, price: 764000 }, // SPCONNECT · Ốp lưng SPC+ iPhone 16
  "SU 52684": { program: 'clearance', rrp: 955000, price: 764000 }, // SPCONNECT · Ốp lưng  SPC+ iPhone 16 Pro
  "SU 52685": { program: 'clearance', rrp: 955000, price: 764000 }, // SPCONNECT · Ốp lưng  SPC+ iPhone 16 Plus
  "SU 52686": { program: 'clearance', rrp: 955000, price: 764000 }, // SPCONNECT · Ốp lưng  SPC+ iPhone 16 Pro Max
  "SU 52786": { program: 'clearance', rrp: 550000, price: 440000 }, // SPCONNECT · SP Head SPC+ Chrome Moto Pro, Barclamp Pro, Clutch Pro
  "SU 52795": { program: 'clearance', rrp: 290000, price: 232000 }, // SPCONNECT · SPC+ Đầu chuyển ngàm dành cho Handlebar Mount Pro SP Connect
  "SU 52797": { program: 'clearance', rrp: 150000, price: 120000 }, // SPCONNECT · SPC+ Đầu chuyển ngàm dành cho Handlebar SP Connect
  "SU 52798": { program: 'clearance', rrp: 150000, price: 120000 }, // SPCONNECT · SPC+ Đầu chuyển ngàm dành cho Moto LT SP Connect
  "SU 52799": { program: 'clearance', rrp: 150000, price: 120000 }, // SPCONNECT · SPC+ Đầu chuyển ngàm dính Adhesive Mount Pro SP Connect
  "SU 52804": { program: 'clearance', rrp: 2500000, price: 1875000 }, // SPCONNECT · SPC+ Đế sạc điện thoại SP Connect dùng trên ô tô 15W
  "SU 52807": { program: 'clearance', rrp: 1850000, price: 1387000 }, // SPCONNECT · SPC+ Đế sạc điện thoại chống nước 15W IP67 SP Connect
  "SU 52808": { program: 'clearance', rrp: 2850000, price: 2137000 }, // SPCONNECT · SPC+ Module Chống rung CNC 15W IP67
  "SU 52812": { program: 'clearance', rrp: 1990000, price: 1552000 }, // SPCONNECT · SPC + Kẹp xác điện thoại phổ quát 15W IP67
  "SU 52827": { program: 'clearance', rrp: 1050000, price: 787000 }, // SPCONNECT · SPC+ Bộ hộp đựng gắn xe đạp  SP Connect
  "SU 52829": { program: 'clearance', rrp: 790000, price: 592000 }, // SPCONNECT · SPC+ Module Chống Rung CNC
  "SU 52849": { program: 'clearance', rrp: 1850000, price: 1387000 }, // SPCONNECT · Ngàm gắn điện thoại SP Moto Stem Mount Pro
  "SU 53121": { program: 'clearance', rrp: 1050000, price: 787000 }, // SPCONNECT · Ngàm SP Handlebar
  "SU 53128": { program: 'clearance', rrp: 1350000, price: 1012000 }, // SPCONNECT · Ngàm gắn moto SP Moto Mount LT
  "SU 53129": { program: 'clearance', rrp: 2300000, price: 1725000 }, // SPCONNECT · Ngàm gắn SP Connect Moto Pro - Chrome
  "SU 53133": { program: 'clearance', rrp: 1050000, price: 787000 }, // SPCONNECT · Bộ hộp đựng SP Saddle
  "SU 53138": { program: 'clearance', rrp: 1850000, price: 1387000 }, // SPCONNECT · Ngàm gắn SP Moto - Pro
  "SU 53145": { program: 'clearance', rrp: 1250000, price: 875000 }, // SPCONNECT · Đèn led tròn chiếu hậu - Light 200 - Trắng
  "SU 53146": { program: 'clearance', rrp: 950000, price: 665000 }, // SPCONNECT · Đèn LED SP báo hiệu - Đỏ
  "SU 53230": { program: 'clearance', rrp: 1850000, price: 1387000 }, // SPCONNECT · Ngàm gắn Clutch - Pro
  "SU 53231": { program: 'clearance', rrp: 2300000, price: 1725000 }, // SPCONNECT · Ngàm gắn Clutch Pro Chrome
  "SU 53232": { program: 'clearance', rrp: 1850000, price: 1387000 }, // SPCONNECT · Ngàm gắn SP Bar Clamp Pro
  "SU 53235": { program: 'clearance', rrp: 1430000, price: 1144000 }, // SPCONNECT · Ngàm gắn SP Brake  (40.5-61.5mm)
  "SU 53238": { program: 'clearance', rrp: 2300000, price: 1725000 }, // SPCONNECT · Ngàm gắn SP Bar Clamp Pro - Chrome
  "SU 53245": { program: 'clearance', rrp: 1350000, price: 1012000 }, // SPCONNECT · Ngàm ghi đông xe đạp Handlebar Mount Pro
  "SU 55125": { program: 'clearance', rrp: 955000, price: 764000 }, // SPCONNECT · Ốp lưng SP Universal - size M
  "SU 55129": { program: 'clearance', rrp: 955000, price: 764000 }, // SPCONNECT · Ốp lưng SP Samsung S20+
  "SU 55131": { program: 'clearance', rrp: 955000, price: 764000 }, // SPCONNECT · Ốp lưng SP Samsung S20
  "SU 55135": { program: 'clearance', rrp: 955000, price: 764000 }, // SPCONNECT · Ốp lưng SP Samsung Note 20
  "SU 55138": { program: 'clearance', rrp: 955000, price: 764000 }, // SPCONNECT · Ốp lưng SP Samsung S21
  "SU 55144": { program: 'clearance', rrp: 955000, price: 764000 }, // SPCONNECT · Ốp lưng SP iPhone 13
  "SU 55145": { program: 'clearance', rrp: 955000, price: 764000 }, // SPCONNECT · Ốp lưng SP iPhone 13 Pro
  "SU 55233": { program: 'clearance', rrp: 550000, price: 412000 }, // SPCONNECT · Case bảo vệ điện thoại SP Weather iPhone 12 / iPho
  "SU 55234": { program: 'clearance', rrp: 550000, price: 412000 }, // SPCONNECT · Case bảo vệ điện thoại SP Weather iPhone 12 Pro Ma
  "SU 55269": { program: 'clearance', rrp: 550000, price: 412000 }, // SPCONNECT · Vỏ điện thoại chống nước iPhone 15 Pro
  "SU 55271": { program: 'clearance', rrp: 550000, price: 412000 }, // SPCONNECT · Vỏ điện thoại chống nước iPhone 15 Pro Max
  "SU 53142": { program: 'clearance', rrp: 545000, price: 408000 }, // SPCONNECT · Ngàm gắn SP Vent
  "EZ-EZ810201": { program: 'clearance', rrp: 1090000, price: 763000 }, // EDIZARD · Sạc dự phòng không dây 10,000mAh - EXMAG Power Qi2 Powerbank
  "EZ-EZ820101150": { program: 'clearance', rrp: 450000, price: 315000 }, // EDIZARD · Cáp sạc kiêm truyền dữ liệu có nam châm, Flat Coiled dài 1.5m kèm đầu chuyển đổi A,L,M - EZ Disk Cab
  "EZ-Z820102150": { program: 'clearance', rrp: 450000, price: 315000 }, // EDIZARD · Cáp sạc kiêm truyền dữ liệu có nam châm, Stacked Coiled dài 1.5m kèm đầu chuyển đổi A,L,M - EZ Pivot
  "EZ-EZ823001": { program: 'clearance', rrp: 200000, price: 140000 }, // EDIZARD · Đầu chuyển đổi C to A, L, M - EZ Connect Packkage
  "EZ-EZ840101": { program: 'clearance', rrp: 990000, price: 693000 }, // EDIZARD · Củ sạc du lịch - EZ International Travel Wall Charger
  "EZ-EZ880101": { program: 'clearance', rrp: 990000, price: 693000 }, // EDIZARD · Ví magsafe cho điện thoại - EZWallet
  "EZ-TV810101": { program: 'clearance', rrp: 690000, price: 483000 }, // EDIZARD · Sạc dự phòng không dây 5000mAh, thiết bị không dẫn cháy, màu Đen - Tiive MaxSafe Power Bank
  "EZ-TV810102": { program: 'clearance', rrp: 690000, price: 483000 }, // EDIZARD · Sạc dự phòng không dây 5000mAh, thiết bị không dẫn cháy, màu Silver - Tiive MaxSafe Power Bank
  "EZ-TV810103": { program: 'clearance', rrp: 690000, price: 483000 }, // EDIZARD · Sạc dự phòng không dây 5000mAh, thiết bị không dẫn cháy, màu Gold - Tiive MaxSafe Power Bank
  "EZ-TV810202": { program: 'clearance', rrp: 990000, price: 693000 }, // EDIZARD · Sạc dự phòng không dây 10000mAh, thiết bị không dẫn cháy, màu Đen - Tiive MaxSafe Power Bank
  "EZ-TV810203": { program: 'clearance', rrp: 990000, price: 693000 }, // EDIZARD · Sạc dự phòng không dây 10000mAh, thiết bị không dẫn cháy, màu Silver - Tiive MaxSafe Power Bank
  "EZ-TV810204": { program: 'clearance', rrp: 990000, price: 693000 }, // EDIZARD · Sạc dự phòng không dây10000mAh, thiết bị không dẫn cháy, màu Gold - Tiive MaxSafe Power Bank
  "EZ-EZ830101": { program: 'clearance', rrp: 990000, price: 693000 }, // EDIZARD · Ốp điện thoại - EZ Case Air Phone
  "EZ-EZ830201": { program: 'clearance', rrp: 990000, price: 693000 }, // EDIZARD · Ốp điện thoại - EZ Case Pro iPhone
  // ── EARLY BIRD ("Early bird") — 5 SKUs ──
  "SK-S2SPW-T740": { program: 'early-bird', rrp: 1499000, price: 1199200 }, // SKULLCANDY · Tai Nghe Không Dây SMOKIN BUDS 360 Màu Đen
  "SK-S2SPW-T001": { program: 'early-bird', rrp: 1499000, price: 1199200 }, // SKULLCANDY · Tai Nghe Không Dây SMOKIN BUDS 360 Màu Trắng
  "SK-S2SPW-T995": { program: 'early-bird', rrp: 1499000, price: 1199200 }, // SKULLCANDY · Tai Nghe Không Dây SMOKIN BUDS 360 Màu Đỏ
  "SK-S2DPW-T740": { program: 'early-bird', rrp: 2190000, price: 1752000 }, // SKULLCANDY · DIME 360 PEA SHAPE TRUE WIRELESS BLACK
  "SK-S2DPW-T001": { program: 'early-bird', rrp: 2190000, price: 1752000 }, // SKULLCANDY · DIME 360 PEA SHAPE TRUE WIRELESS BONE
  // ── FLASH SALE DAILY ("Flash sale Daily") — 44 SKUs ──
  "SK-S2DTW-S740": { program: 'flash-sale', rrp: 2590000, price: 2072000 }, // SKULLCANDY · DIME EVO TRUE WIRELESS IN-EAR - TRUE BLACK
  "SK-S2DTW-S951": { program: 'flash-sale', rrp: 2590000, price: 2072000 }, // SKULLCANDY · DIME EVO TRUE WIRELESS IN-EAR - BONE/ORANGE GLOW
  "SK-S2DTW-S795": { program: 'flash-sale', rrp: 2590000, price: 2072000 }, // SKULLCANDY · DIME EVO TRUE WIRELESS IN-EAR PREPPY SUMMER
  "SK-S2DTW-T987": { program: 'flash-sale', rrp: 2590000, price: 2072000 }, // SKULLCANDY · DIME EVO TRUE WIRELESS IN-EAR PRIMER
  "SK-S2MTW-T001": { program: 'flash-sale', rrp: 5499000, price: 4399200 }, // SKULLCANDY · METHOD 360 ANC TRUE WIRELESS IN-EAR BONE
  "SK-S2MTW-T009": { program: 'flash-sale', rrp: 5499000, price: 4399200 }, // SKULLCANDY · METHOD 360 ANC TRUE WIRELESS IN-EAR LEOPARD
  "SK-S2MTW-T740": { program: 'flash-sale', rrp: 5499000, price: 4399200 }, // SKULLCANDY · METHOD 360 ANC TRUE WIRELESS IN-EAR TRUE BLACK
  "SK-S2MTW-T987": { program: 'flash-sale', rrp: 5499000, price: 4399200 }, // SKULLCANDY · METHOD 360 ANC TRUE WIRELESS IN-EAR PRIMER
  "SK-S2MTW-T995": { program: 'flash-sale', rrp: 5499000, price: 4399200 }, // SKULLCANDY · METHOD 360 ANC TRUE WIRELESS IN-EAR PLASMA
  "SK-S4EOW-T034": { program: 'flash-sale', rrp: 4690000, price: 3752000 }, // SKULLCANDY · PUSH 720 OPEN EAR TRUE WIRELESS TRUE BLACK
  "SK-S4EOW-T022": { program: 'flash-sale', rrp: 4690000, price: 3752000 }, // SKULLCANDY · PUSH 720 OPEN EAR TRUE WIRELESS BONE/GOLD
  "SK-S4EOW-T992": { program: 'flash-sale', rrp: 4690000, price: 3752000 }, // SKULLCANDY · PUSH 720 OPEN EAR TRUE WIRELESS CHROME
  "SK-S4EOW-T037": { program: 'flash-sale', rrp: 4690000, price: 3752000 }, // SKULLCANDY · PUSH 720 OPEN EAR TRUE WIRELESS GLIMMER
  "SK-S6HOW-T740": { program: 'flash-sale', rrp: 3690000, price: 2952000 }, // SKULLCANDY · HESH 360 WIRELESS OVER EAR TRUE BLACK
  "SK-S6HOW-T001": { program: 'flash-sale', rrp: 3690000, price: 2952000 }, // SKULLCANDY · HESH 360 WIRELESS OVER EAR TRUE BONE
  "ST-BTSX1M": { program: 'flash-sale', rrp: 1590000, price: 1431000 }, // SATECHI · Bàn phím bluetooth  Slim X1 - Xám
  "ST-BTSX2M": { program: 'flash-sale', rrp: 1790000, price: 1646800 }, // SATECHI · Bàn phím bluetooth Slim X2-XÁM
  "ST-BTSX3M": { program: 'flash-sale', rrp: 1990000, price: 1731300 }, // SATECHI · Bàn phím bluetooth Slim X3 -XÁM
  "ST-ACBKM": { program: 'flash-sale', rrp: 1790000, price: 1646800 }, // SATECHI · Bàn phím bluetooth Satechi có đèn nền cho Mac
  "ST-KSM1DK-EN": { program: 'flash-sale', rrp: 2690000, price: 2474800 }, // SATECHI · Bàn phím cơ không dây Satechi SM1 màu Dark
  "ST-KSM1LT-EN": { program: 'flash-sale', rrp: 2690000, price: 2474800 }, // SATECHI · Bàn phím cơ không dây Satechi SM1 màu Light
  "ST-ABTCMM": { program: 'flash-sale', rrp: 790000, price: 726800 }, // SATECHI · Chuột không dây bluetooth  M1 (Màu Xám)
  "ST-ABTCMS": { program: 'flash-sale', rrp: 790000, price: 726800 }, // SATECHI · Chuột không dây bluetooth  M1 (Màu Bạc)
  "ST-ABTCMB": { program: 'flash-sale', rrp: 790000, price: 726800 }, // SATECHI · Chuột không dây bluetooth M1 - XANH DƯƠNG
  "ST-ABTCMG": { program: 'flash-sale', rrp: 790000, price: 726800 }, // SATECHI · Chuột không dây bluetooth M1 - VÀNG GOLD
  "ST-ABTCMR": { program: 'flash-sale', rrp: 790000, price: 726800 }, // SATECHI · Chuột không dây bluetooth M1 - VÀNG HỒNG
  "ST-KOTGK-EN": { program: 'flash-sale', rrp: 2490000, price: 2290800 }, // SATECHI · Bàn Phím Không Dây OntheGo Keyboard (Đen) - US
  "ST-KOTGW-EN": { program: 'flash-sale', rrp: 2490000, price: 2290800 }, // SATECHI · Bàn Phím Không Dây OntheGo Keyboard (Trắng Cát) - US
  "ST-KSM3DK-EN": { program: 'flash-sale', rrp: 2990000, price: 2750800 }, // SATECHI · Bàn phím cơ không dây bluetooth Satechi SM3 màu Dark
  "ST-KSM3LT-EN": { program: 'flash-sale', rrp: 2990000, price: 2750800 }, // SATECHI · Bàn phím cơ không dây bluetooth Satechi SM3 màu Light
  "ST-MOTGK": { program: 'flash-sale', rrp: 790000, price: 726800 }, // SATECHI · Chuột không dây OntheGo Mouse (đen)
  "ST-MOTGW": { program: 'flash-sale', rrp: 790000, price: 726800 }, // SATECHI · Chuột Không dây OntheGo Mouse (trắng cát)
  "TB-TG0004352-3A10": { program: 'flash-sale', rrp: 10890000, price: 10345500 }, // THERABODY · Thiết bị massage Theragun Mini Plus màu đen, EU/UK
  "TB-TG0004128-3A10": { program: 'flash-sale', rrp: 8190000, price: 7780000 }, // THERABODY · Thiết bị massage Theragun Mini Gen 3 màu đen, EU/UK
  "TB-TG0003968-3A40": { program: 'flash-sale', rrp: 5290000, price: 5025000 }, // THERABODY · Súng massage Theragun Relief - Màu Xanh Navy
  "TB-TG0003969-3A50": { program: 'flash-sale', rrp: 5290000, price: 5025000 }, // THERABODY · Súng massage Theragun Relief - Màu Vàng Cát
  "TB-TG0003970-3A10": { program: 'flash-sale', rrp: 22890000, price: 21745000 }, // THERABODY · Súng massage Theragun PRO PLUS - EU/UK
  "TB-TF0004349-3A20": { program: 'flash-sale', rrp: 13890000, price: 12223000 }, // THERABODY · Mặt nạ ánh sáng sinh học TheraFace Mask Glo
  "TB-TF0004132-3A20": { program: 'flash-sale', rrp: 5890000, price: 5183000 }, // THERABODY · Máy massage đẩy tinh chất TheraFace Depuffing Wand (1.5) - White
  "TB-TF0004132-3A40": { program: 'flash-sale', rrp: 5890000, price: 5183000 }, // THERABODY · Máy massage đẩy tinh chất TheraFace Depuffing Wand (1.5) - Indigo
  "TB-RA02097-01": { program: 'flash-sale', rrp: 26890000, price: 25545000 }, // THERABODY · Máy massage bắp chân nén khí RecoveryAir JetBoots
  "TB-JB0004131-3A1M": { program: 'flash-sale', rrp: 18890000, price: 17945000 }, // THERABODY · Máy massage bắp chân nén khí JetBoots Prime M
  "TB-JB0004131-3A1S": { program: 'flash-sale', rrp: 18890000, price: 17945000 }, // THERABODY · Máy massage bắp chân nén khí JetBoots Prime S
  "TB-JB0004130-3A1M": { program: 'flash-sale', rrp: 35690000, price: 33905000 }, // THERABODY · Máy massage bắp chân nén khí JetBoots Pro Plus, EUUK - Regular
};

// SKUs in Shopify sometimes differ from the sheet by case/whitespace.
const normalizeSku = (sku: string) => sku.trim().replace(/\s+/g, ' ').toUpperCase();
const PROMO_BY_SKU = new Map(Object.entries(PROMO_PRICES).map(([sku, e]) => [normalizeSku(sku), e]));

export type Promo = PromoEntry & { pct: number };

const withPct = (e: PromoEntry): Promo => ({ ...e, pct: Math.round(((e.rrp - e.price) / e.rrp) * 100) });

/** Promo for one variant SKU, or null if it isn't in any program. */
export function getPromoForSku(sku: string | null | undefined): Promo | null {
  if (!sku) return null;
  const e = PROMO_BY_SKU.get(normalizeSku(sku));
  return e ? withPct(e) : null;
}

/**
 * Best (lowest-priced) promo across a product's variants — used for cards,
 * where no variant is chosen yet. Optionally limited to one program.
 */
export function getPromoForProduct(product: Product, program?: PromoProgram): Promo | null {
  let best: Promo | null = null;
  for (const sku of product.skus ?? []) {
    const p = getPromoForSku(sku);
    if (!p || (program && p.program !== program)) continue;
    if (!best || p.price < best.price) best = p;
  }
  return best;
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
};
