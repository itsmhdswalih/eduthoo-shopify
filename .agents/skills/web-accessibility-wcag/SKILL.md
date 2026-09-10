---
name: web-accessibility-wcag
description: >-
  WCAG 2.1 AA accessibility standards, keyboard navigation, focus visible rings, ARIA landmarks, screen-reader compatibility, and accessible monochrome contrasts.
---

# Web Accessibility (WCAG 2.1 AA) Standards

## Overview
Practices to ensure the storefront is fully usable by all customers, including those navigating via screen readers, keyboard-only input, or visual impairments.

## Accessibility Requirements
1. **Keyboard Navigability**:
   - Every interactive element (links, buttons, cart triggers, search inputs, modal close buttons) must be reachable via `Tab` key.
   - Maintain a distinct `:focus-visible` outline: `outline: 2px solid #000000; outline-offset: 2px;`.
   - Modals and drawers must trap focus when open and return focus to the trigger element on close (`Esc` key closes drawers).
2. **Accessible Names & Labels**:
   - Every icon-only button (search icon, cart icon, wishlist heart, hamburger menu) must have an `aria-label` (e.g., `aria-label="Open shopping cart, 2 items"`).
   - Form inputs (newsletter email, search bar) must have associated `<label>` elements or `aria-label`.
3. **Contrast Compliance**:
   - Ensure text over backgrounds meets the 4.5:1 minimum contrast ratio for standard text and 3:1 for large text.
   - In monochrome themes, use `#000000` text on `#FFFFFF` / `#F8F8F6` and `#FFFFFF` text on `#000000` / `#111111` sections.
4. **Semantic HTML & Live Regions**:
   - Use `<nav aria-label="Main Navigation">`, `<main id="MainContent">`, `<footer role="contentinfo">`.
   - Cart update notifications and price changes should use `aria-live="polite"` so screen readers announce additions smoothly.
