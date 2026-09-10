import { CURATED_PRODUCTS } from './productsData';

/**
 * Shopify Service Layer
 * Supports connecting dynamically to Shopify Storefront API
 * while falling back gracefully to the curated monochrome gadget catalog.
 */

const SHOPIFY_STORE_DOMAIN = import.meta.env?.VITE_SHOPIFY_STORE_DOMAIN || '';
const SHOPIFY_STOREFRONT_TOKEN = import.meta.env?.VITE_SHOPIFY_STOREFRONT_TOKEN || '';

export const FREE_SHIPPING_THRESHOLD = 999; // in INR (₹999)

export async function fetchProductsFromShopify() {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
    // Return curated products as robust fallback
    return CURATED_PRODUCTS;
  }

  const query = `
    {
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            description
            productType
            tags
            availableForSale
            images(first: 2) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                  }
                  compareAtPrice {
                    amount
                  }
                  availableForSale
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const json = await response.json();
    if (json.data?.products?.edges) {
      return json.data.products.edges.map(({ node }) => {
        const firstVariant = node.variants.edges[0]?.node;
        return {
          id: node.id,
          title: node.title,
          handle: node.handle,
          category: node.productType || 'Gadgets',
          categoryHandle: (node.productType || 'gadgets').toLowerCase(),
          price: parseFloat(node.priceRange.minVariantPrice.amount),
          compareAtPrice: firstVariant?.compareAtPrice ? parseFloat(firstVariant.compareAtPrice.amount) : null,
          image: node.images.edges[0]?.node.url || '/assets/products/hero_desk.jpg',
          description: node.description,
          inStock: node.availableForSale,
          tags: node.tags || []
        };
      });
    }
  } catch (err) {
    console.warn('Shopify Storefront API fetch failed, using fallback:', err);
  }

  return CURATED_PRODUCTS;
}

/**
 * Creates Shopify checkout url or redirects to Shopify cart permalink
 */
export function buildShopifyCheckoutUrl(cartItems) {
  if (!SHOPIFY_STORE_DOMAIN) {
    // If no custom domain is set yet, simulate / notify user
    return null;
  }
  
  // Format: https://store.myshopify.com/cart/{variant_id}:{quantity},{variant_id}:{quantity}
  const lineItemsString = cartItems
    .map(item => `${item.variantId || item.id}:${item.quantity}`)
    .join(',');

  return `https://${SHOPIFY_STORE_DOMAIN}/cart/${lineItemsString}`;
}
