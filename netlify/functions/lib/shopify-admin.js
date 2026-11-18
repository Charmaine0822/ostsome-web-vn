// Server-only credentials. Client credentials take precedence over legacy tokens.
const DOMAIN = '454e76.myshopify.com';
let cached;
let pending;
function hasAdminCredentials() {
  return Boolean((process.env.SHOPIFY_CLIENT_ID && process.env.SHOPIFY_CLIENT_SECRET) || process.env.SHOPIFY_ADMIN_TOKEN);
}
async function getAdminToken() {
  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;
  if (!clientId && !clientSecret) {
    if (process.env.SHOPIFY_ADMIN_TOKEN) return process.env.SHOPIFY_ADMIN_TOKEN;
    throw new Error('Shopify Admin credentials are not configured');
  }
  if (!clientId || !clientSecret) throw new Error('Both Shopify client credentials are required');
  const credentialKey = clientId + ':' + clientSecret;
  if (cached?.key === credentialKey && cached.expiresAt > Date.now() + 60000) return cached.token;
  if (pending?.key === credentialKey) return pending.promise;
  const promise = (async () => {
    const response = await fetch(`https://${DOMAIN}/admin/oauth/access_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ grant_type: 'client_credentials', client_id: clientId, client_secret: clientSecret }),
      signal: AbortSignal.timeout(10000), redirect: 'error',
    });
    if (!response.ok) throw new Error(`Shopify authentication failed (${response.status}); check app installation and credentials`);
    const data = await response.json();
    if (typeof data.access_token !== 'string' || !(Number(data.expires_in) > 60)) throw new Error('Shopify returned an invalid token response');
    cached = { key: credentialKey, token: data.access_token, expiresAt: Date.now() + Number(data.expires_in) * 1000 };
    return cached.token;
  })();
  const request = { key: credentialKey, promise };
  pending = request;
  try { return await promise; }
  finally { if (pending === request) pending = undefined; }
}
async function adminFetch(url, options = {}) {
  // Never attach a token to a caller-supplied external URL.
  const target = new URL(url);
  if (target.origin !== `https://${DOMAIN}` || !target.pathname.startsWith('/admin/api/')) throw new Error('Invalid Shopify Admin URL');
  let token = await getAdminToken();
  const request = value => fetch(url, { ...options, redirect: 'error',
    headers: { ...options.headers, 'X-Shopify-Access-Token': value } });
  let response = await request(token);
  if (response.status === 401 && process.env.SHOPIFY_CLIENT_ID && process.env.SHOPIFY_CLIENT_SECRET) {
    // Another concurrent request may already have replaced this token.
    if (cached?.token === token) cached = undefined;
    token = await getAdminToken();
    response = await request(token);
  }
  return response;
}
module.exports = { hasAdminCredentials, adminFetch };
