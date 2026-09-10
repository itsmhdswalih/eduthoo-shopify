---
name: shopify-cart-drawer-ajax
description: >-
  Shopify AJAX Cart Drawer API, instant quantity updates without page refresh, free shipping threshold progress bar, item removal, and native Shopify checkout handoff.
---

# Shopify AJAX Cart Drawer & Checkout Flow

## Overview
Implementation architecture for a lightning-fast slide-out Cart Drawer powered by Shopify's AJAX Cart API (`/cart/add.js`, `/cart/change.js`, `/cart.js`) with instant feedback and dynamic free shipping calculation.

## Architecture & Workflows
1. **AJAX Cart API Operations**:
   - **Add to Cart**: `POST /cart/add.js` with `{ id: variantId, quantity: 1 }`.
   - **Update Quantity / Remove**: `POST /cart/change.js` with `{ id: lineItemKey, quantity: newQty }`. Setting `quantity: 0` removes the item.
   - **Fetch State**: `GET /cart.js` returns full cart JSON (total price, items, token).
2. **Free Shipping Threshold Calculation**:
   - Configurable threshold (e.g., `₹999` or `99900` paise):
     ```javascript
     const threshold = 99900; // in paise
     const remaining = threshold - cart.total_price;
     if (remaining <= 0) {
       message = "🎉 You've unlocked FREE Delivery!";
       progressPercent = 100;
     } else {
       message = `Add ₹${(remaining / 100).toFixed(0)} more for FREE Delivery`;
       progressPercent = Math.min(100, (cart.total_price / threshold) * 100);
     }
     ```
3. **Cart Drawer UI Elements**:
   - Header with item count and close button (`X`).
   - Free shipping dynamic progress bar.
   - Line items list: thumbnail, title, selected variant, quantity stepper (`-`, qty, `+`), line total, remove button.
   - Drawer footer: Subtotal, shipping notice ("Taxes and shipping calculated at checkout"), and full-width black `CHECKOUT` button routing directly to `/checkout`.
4. **Error Handling**:
   - If a product is sold out or maximum available quantity is exceeded, display an inline error toast inside the drawer rather than breaking the UI.
