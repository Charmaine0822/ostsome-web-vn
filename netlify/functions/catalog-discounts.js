// Public, read-only catalog projection. Never returns codes, customer criteria or tokens.
const DOMAIN = '454e76.myshopify.com';
const PAGE = 'nodes { id } pageInfo { hasNextPage endCursor }';
async function queryShopify(query, variables) {
  const response = await fetch(`https://${DOMAIN}/admin/api/2026-01/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_TOKEN },
    body: JSON.stringify({ query, variables }), signal: AbortSignal.timeout(8000),
  });
  const result = await response.json();
  if (!response.ok || result.errors) throw new Error('Discount API unavailable; check read_discounts scope');
  return result.data;
}
async function allIds(id, type, field, connection) {
  const ids = connection.nodes.map(n => n.id);
  while (connection.pageInfo.hasNextPage) {
    const data = await queryShopify(`query($id: ID!, $cursor: String) {
      discountAutomaticNode(id: $id) { automaticDiscount { ... on DiscountAutomaticBasic {
        customerGets { items { ... on ${type} { ${field}(first: 250, after: $cursor) { ${PAGE} } } } }
      } } }
    }`, { id, cursor: connection.pageInfo.endCursor });
    connection = data.discountAutomaticNode.automaticDiscount.customerGets.items[field];
    ids.push(...connection.nodes.map(n => n.id));
  }
  return ids;
}
exports.handler = async event => {
  if (event.httpMethod !== 'GET') return { statusCode: 405, body: '' };
  if (!process.env.SHOPIFY_ADMIN_TOKEN) return { statusCode: 503, body: JSON.stringify({ error: 'Catalog discounts are not configured' }) };
  try {
    const rules = [];
    let cursor = null;
    do {
      const data = await queryShopify(`query($cursor: String) {
        discountAutomaticNodes(first: 10, after: $cursor) {
          pageInfo { hasNextPage endCursor }
          nodes { id automaticDiscount { ... on DiscountAutomaticBasic {
            status startsAt endsAt discountClass context { __typename }
            minimumRequirement { __typename }
            customerGets {
              appliesOnOneTimePurchase
              value { __typename ... on DiscountPercentage { percentage }
                ... on DiscountAmount { amount { amount currencyCode } appliesOnEachItem } }
              items { __typename
                ... on AllDiscountItems { allItems }
                ... on DiscountProducts { products(first: 20) { ${PAGE} } productVariants(first: 20) { ${PAGE} } }
                ... on DiscountCollections { collections(first: 20) { ${PAGE} } }
              }
            }
          } } }
        }
      }`, { cursor });
      for (const node of data.discountAutomaticNodes.nodes) {
        const d = node.automaticDiscount;
        // Conditional, customer-specific, order, BXGY and app discounts belong in the cart.
        if (d.status !== 'ACTIVE' || d.discountClass !== 'PRODUCT' ||
            d.context?.__typename !== 'DiscountBuyerSelectionAll' || d.minimumRequirement ||
            !d.customerGets?.appliesOnOneTimePurchase) continue;
        const v = d.customerGets.value;
        if (v.__typename !== 'DiscountPercentage' &&
            !(v.__typename === 'DiscountAmount' && v.appliesOnEachItem && v.amount.currencyCode === 'VND')) continue;
        const items = d.customerGets.items;
        const rule = { startsAt: d.startsAt, endsAt: d.endsAt,
          percentage: v.percentage ?? null, amount: v.amount ? Number(v.amount.amount) : null,
          all: items.allItems === true, products: [], variants: [], collections: [] };
        if (items.__typename === 'DiscountProducts') {
          rule.products = await allIds(node.id, 'DiscountProducts', 'products', items.products);
          rule.variants = await allIds(node.id, 'DiscountProducts', 'productVariants', items.productVariants);
        } else if (items.__typename === 'DiscountCollections') {
          rule.collections = await allIds(node.id, 'DiscountCollections', 'collections', items.collections);
        }
        rules.push(rule);
      }
      cursor = data.discountAutomaticNodes.pageInfo.hasNextPage ? data.discountAutomaticNodes.pageInfo.endCursor : null;
    } while (cursor);
    return { statusCode: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' }, body: JSON.stringify({ rules }) };
  } catch (error) {
    console.error(error.message);
    return { statusCode: 503, headers: { 'Cache-Control': 'no-store' }, body: JSON.stringify({ error: 'Catalog discounts unavailable' }) };
  }
};
