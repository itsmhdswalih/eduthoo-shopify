---
name: shopify-theme-architecture
description: >-
  Shopify Theme 2.0 architecture, Liquid templating, JSON templates, section schemas, blocks, presets, settings, and CLI/GitHub sync workflows.
---

# Shopify Theme 2.0 Architecture & Liquid Standards

## Overview
Guidelines and best practices for building production-ready Shopify Online Store 2.0 themes with modular Liquid sections, JSON templates, and dynamic customizer schemas.

## Core Rules
1. **JSON Templates First**: Every page template (`index.json`, `product.json`, `collection.json`, `cart.json`, `page.about.json`, `page.contact.json`) must be a JSON template defining section order and settings.
2. **Modular Sections**:
   - Keep sections reusable and self-contained in `/sections/`.
   - Use Shopify schema settings (`text`, `richtext`, `image_picker`, `collection`, `product`, `color`, `range`) to allow full merchant customization in the Shopify Theme Editor.
   - Support blocks with `max_blocks` where appropriate (e.g., category cards, benefits, promotional highlights).
3. **Reusable Snippets**:
   - Extract recurring markup (e.g., `product-card.liquid`, `icon.liquid`, `price.liquid`, `pagination.liquid`) into `/snippets/`.
   - Pass parameters explicitly: `{% render 'product-card', product: product %}`.
4. **Dynamic Shopify Objects**:
   - Never hardcode prices, inventory, titles, or currencies.
   - Always use Liquid object filters: `{{ product.price | money }}`, `{{ product.featured_image | image_url }}`, `{{ collection.title | escape }}`.
5. **Clean Asset Bundling**:
   - Keep theme assets in `/assets/`.
   - Use CSS custom properties for theme colors and typography so merchant settings propagate instantly.
