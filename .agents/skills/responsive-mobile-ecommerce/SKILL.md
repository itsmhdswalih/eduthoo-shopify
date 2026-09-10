---
name: responsive-mobile-ecommerce
description: >-
  Mobile-first e-commerce responsive design, touch interactions, hamburger navigation drawers, thumb-friendly UI targets (48px+), and adaptive grid systems.
---

# Responsive Mobile E-Commerce Standards

## Overview
Guidelines for ensuring an exceptional mobile shopping experience tailored for smartphone users, fast thumb navigation, and fluid responsive scaling.

## Mobile Layout Rules
1. **Adaptive Navigation Bar**:
   - Mobile Header: `[ Hamburger ☰ ]` on left, `[ EDUTHOO Logo ]` centered, `[ Cart Bag (with count badge) ]` on right.
   - Clean slide-out navigation drawer with touch-friendly links, category accordion, and social links.
2. **Thumb-Zone Optimization**:
   - Touch targets for buttons, selectors, and icons must be at least `44px x 44px` (recommended `48px`).
   - Sticky bottom bar on mobile product pages: `[ ADD TO CART - ₹X,XXX ]` for easy one-thumb purchase.
3. **Grid Breakpoints**:
   - **Mobile (< 768px)**: 2-column compact product grid (`gap: 12px`), full-width hero image with stacked typography.
   - **Tablet (768px - 1024px)**: 2 or 3-column product grid (`gap: 20px`).
   - **Desktop (> 1024px)**: 4-column product grid (`gap: 32px`), editorial multi-column hero with generous whitespace.
4. **Category & Product Scrolling**:
   - Support smooth horizontal swipe/scroll (`overflow-x: auto; scroll-snap-type: x mandatory;`) on mobile category pills and promotional cards to save vertical screen space.
   - Prevent horizontal layout blowouts or unwanted body overflow (`overflow-x: hidden`).
