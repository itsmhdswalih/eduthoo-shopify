---
name: shopify-liquid-performance
description: >-
  Shopify theme performance optimization, sub-second load times, Liquid image_tag filters with responsive srcsets, lazy loading, and zero Cumulative Layout Shift (CLS).
---

# Shopify Liquid Performance & Speed Guidelines

## Overview
Techniques and patterns to achieve 90+ Google Lighthouse performance scores on Shopify storefronts, ensuring fast initial render, rapid navigation, and minimal layout shift.

## Performance Optimization Rules
1. **Responsive Image Optimization**:
   - Never render raw image URLs without width constraints.
   - Use Shopify's `image_tag` or `image_url` filter with proper `widths` and `sizes`:
     ```liquid
     {{ product.featured_image | image_url: width: 600 | image_tag: 
       widths: '300, 450, 600, 900, 1200', 
       sizes: '(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw',
       loading: 'lazy', 
       fetchpriority: 'auto',
       alt: product.title | escape }}
     ```
   - First hero image must have `loading="eager"` and `fetchpriority="high"` for high LCP (Largest Contentful Paint).
2. **Prevent Cumulative Layout Shift (CLS)**:
   - Always declare explicit `aspect-ratio` or `width` and `height` attributes on all image containers.
   - Use skeleton card wrappers or CSS aspect-ratio boxes (`aspect-ratio: 1 / 1;`) to reserve layout space before images load.
3. **Critical CSS & Minimal JavaScript**:
   - Keep core layout CSS inlined or preloaded.
   - Avoid bulky third-party libraries (no jQuery, no giant carousel plugins). Use native CSS scroll-snap and lightweight vanilla JavaScript.
   - Defer non-critical scripts (`defer` attribute).
4. **Liquid Loop Efficiency**:
   - Avoid deep nested loops over collections or products inside loops.
   - Paginate product lists using `{% paginate collection.products by 16 %}`.
