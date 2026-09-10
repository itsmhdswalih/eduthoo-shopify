---
name: micro-interactions-animations
description: >-
  Subtle micro-interactions, CSS transitions (150ms–300ms), card hover image zooms, smooth cart drawer slides, skeleton loaders, and reduced-motion support.
---

# Micro-Interactions & Animation Guidelines

## Overview
Guidelines for implementing fluid, subtle micro-interactions that elevate perceived quality and luxury feel without causing lag, distraction, or motion sickness.

## Interaction Rules
1. **Timing & Easing**:
   - Keep durations fast: `150ms - 300ms` maximum.
   - Use cubic-bezier easing: `cubic-bezier(0.16, 1, 0.3, 1)` or standard `ease-out`.
   - Never use bouncy, cartoonish springs or elastic wobbles.
2. **Product Card Hover Interactions**:
   - Secondary Image Swap: Smooth fade transition between primary and secondary image on desktop hover.
   - Subtle Image Zoom: `transform: scale(1.04);` with `transition: transform 0.4s ease;` enclosed within an `overflow: hidden;` frame.
   - Quick Add / Wishlist Button: Slide or fade up smoothly on card focus/hover.
3. **Cart Drawer & Modals**:
   - Background overlay: Smooth backdrop blur and opacity fade (`opacity: 0` to `1` over 200ms).
   - Drawer slide: Translate from right (`transform: translateX(100%)` to `0` over 250ms).
4. **Accessible Motion**:
   - Always respect user system preferences:
     ```css
     @media (prefers-reduced-motion: reduce) {
       *, ::before, ::after {
         animation-duration: 0.01ms !important;
         animation-iteration-count: 1 !important;
         transition-duration: 0.01ms !important;
         scroll-behavior: auto !important;
       }
     }
     ```
