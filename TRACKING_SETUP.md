# OSTSOME Vietnam tracking changes

- Meta browser Pixel: **890687509103973**; existing `fbq` is not overwritten. Check whether another app/tag already injects this pixel to prevent duplicate PageView/AddToCart events.
- PageView, ViewContent, AddToCart, InitiateCheckout events implemented on React storefront.
- Google dataLayer ecommerce events: page_view, view_item, add_to_cart, begin_checkout.
- Optional Netlify environment variable `VITE_GTM_ID=GTM-XXXXXXX` enables GTM. Configure GA4 tag within GTM. Alternatively `VITE_GA4_ID=G-XXXXXXXXXX` for direct GA4 fallback (not both).
- Shopify-hosted checkout: **Purchase cannot be reliably tracked from the React storefront**. Configure Meta Purchase and GA4 purchase using Shopify Customer Events / official integrations, with transaction ID deduplication. Do NOT infer a purchase from the cart disappearing.
- Consent: ensure tags run only where permitted under applicable privacy/consent requirements. Review consent manager before production deployment.
- Validate Meta Test Events, GTM Preview, GA4 DebugView and actual checkout before relying on conversion numbers.
