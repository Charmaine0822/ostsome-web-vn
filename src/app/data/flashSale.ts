// ─── FLASH SALE CONFIG ─────────────────────────────────────────────────────
// "Flash sale Daily" from Mr. Boh's VN pricing sheet. WHICH products and
// their flash prices live in promoPrograms.ts (program: 'flash-sale',
// matched by SKU) — this file only controls the countdown.
//
// Daily flash sale: the countdown runs to 23:59:59 Vietnam time (ICT,
// UTC+7) every day and resets at midnight.

const ICT_OFFSET_MS = 7 * 60 * 60 * 1000;

/** End of today's flash sale window — next 23:59:59 ICT. */
export function getFlashSaleEndDate(now: Date = new Date()): Date {
  const ictNow = new Date(now.getTime() + ICT_OFFSET_MS);
  const endIct = Date.UTC(ictNow.getUTCFullYear(), ictNow.getUTCMonth(), ictNow.getUTCDate(), 23, 59, 59);
  return new Date(endIct - ICT_OFFSET_MS);
}