// OSTSOME Vietnam storefront analytics. Purchase events belong on Shopify checkout.
const META_PIXEL_ID = '890687509103973';
const GTM_ID = import.meta.env.VITE_GTM_ID as string | undefined;
const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined;

type AnalyticsItem = { item_id: string; item_name: string; price: number; quantity: number };
declare global { interface Window { dataLayer?: Record<string, unknown>[]; fbq?: (...args: unknown[]) => void; _fbq?: unknown; } }

function inject(src: string) {
  const script = document.createElement('script'); script.async = true; script.src = src;
  document.head.appendChild(script);
}
export function initTracking() {
  window.dataLayer = window.dataLayer || [];
  if (GTM_ID && /^GTM-[A-Z0-9]+$/.test(GTM_ID)) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    inject(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`);
  } else if (GA4_ID && /^G-[A-Z0-9]+$/.test(GA4_ID)) {
    // GA4 direct fallback only when GTM isn't configured. Don't configure both.
    const gtag = (...args: unknown[]) => window.dataLayer!.push({ event: 'gtag', args });
    inject(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`);
    gtag('js', new Date()); gtag('config', GA4_ID, { send_page_view: false });
  }
  // Do not overwrite an existing pixel installed by a Shopify integration or other tag.
  if (!window.fbq) {
    const q: unknown[][] = [];
    const fbq = ((...args: unknown[]) => { q.push(args); }) as ((...args: unknown[]) => void) & { queue?: unknown[][]; loaded?: boolean; version?: string };
    fbq.queue = q; fbq.loaded = true; fbq.version = '2.0';
    window.fbq = fbq; window._fbq = fbq;
    inject('https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', META_PIXEL_ID);
  }
  trackPageView();
}
export function trackPageView() {
  window.dataLayer?.push({ event: 'page_view', page_location: location.href, page_title: document.title });
  window.fbq?.('track', 'PageView');
}
export function trackViewItem(item: AnalyticsItem) {
  window.dataLayer?.push({ ecommerce: null });
  window.dataLayer?.push({ event: 'view_item', ecommerce: { currency: 'VND', value: item.price, items: [item] } });
  window.fbq?.('track', 'ViewContent', { content_ids: [item.item_id], content_type: 'product', content_name: item.item_name, value: item.price, currency: 'VND' });
}
export function trackAddToCart(item: AnalyticsItem) {
  window.dataLayer?.push({ ecommerce: null });
  window.dataLayer?.push({ event: 'add_to_cart', ecommerce: { currency: 'VND', value: item.price * item.quantity, items: [item] } });
  window.fbq?.('track', 'AddToCart', { content_ids: [item.item_id], content_type: 'product', value: item.price * item.quantity, currency: 'VND' });
}
export function trackBeginCheckout(items: AnalyticsItem[]) {
  window.dataLayer?.push({ ecommerce: null });
  window.dataLayer?.push({ event: 'begin_checkout', ecommerce: { currency: 'VND', value: items.reduce((sum, i) => sum + i.price * i.quantity, 0), items } });
  window.fbq?.('track', 'InitiateCheckout', { content_ids: items.map(i => i.item_id), content_type: 'product', value: items.reduce((sum, i) => sum + i.price * i.quantity, 0), currency: 'VND' });
}
