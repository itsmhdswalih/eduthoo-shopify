---
name: ecommerce-seo-schema
description: >-
  E-commerce SEO best practices, JSON-LD schema markup (Product, Offer, Organization, BreadcrumbList), Open Graph / Twitter cards, and semantic HTML structure.
---

# E-Commerce SEO & Structured Data Standards

## Overview
Guidelines for maximizing search engine indexing, click-through rates (CTR), and social media link previews for Shopify product catalogs and brand pages.

## Schema Markup & Meta Standards
1. **JSON-LD Product Schema**:
   - Every product page must output valid Schema.org Product data in `<script type="application/ld+json">`:
     - `name`: Product title
     - `image`: Array of image URLs
     - `description`: Clean text description (stripped of HTML)
     - `brand`: `{"@type": "Brand", "name": "EDUTHOO"}`
     - `offers`: `{"@type": "Offer", "price": "...", "priceCurrency": "INR", "availability": "https://schema.org/InStock", "url": "..."}`
2. **Organization & Local Business Schema**:
   - Output brand metadata on the homepage linking to official social profiles and contact info.
3. **Open Graph & Twitter Meta Tags**:
   - `og:site_name`: EDUTHOO
   - `og:title`, `og:description`, `og:image`, `og:url`
   - `twitter:card`: `summary_large_image`
4. **Canonical URLs & Semantic Hierarchy**:
   - Always output `<link rel="canonical" href="{{ canonical_url }}">`.
   - Exactly one `<h1>` tag per page (Store name or Page title on home, Product title on product page).
   - Use meaningful semantic elements: `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`.
