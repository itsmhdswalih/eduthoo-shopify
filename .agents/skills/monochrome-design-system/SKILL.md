---
name: monochrome-design-system
description: >-
  Strict monochrome color palette rules (#000000 to #FFFFFF), contrast standards, dark accent sections, and sharp border radius tokens (0-4px).
---

# Monochrome Design System Guidelines

## Color Palette Tokens
```css
:root {
  --color-primary-black:   #000000;
  --color-secondary-black: #111111;
  --color-dark-gray:       #333333;
  --color-medium-gray:     #777777;
  --color-light-gray:      #E5E5E5;
  --color-soft-gray:       #F3F3F3;
  --color-off-white:       #F8F8F6;
  --color-primary-white:   #FFFFFF;
}
```

## Application Rules
1. **Primary Canvas**:
   - Main page background must be Pure White (`#FFFFFF`) or subtle Off-White (`#F8F8F6`).
   - Content and product sections sit on clean white backgrounds.
2. **Dark Accent Inversions**:
   - Announcement bar: Solid black (`#000000`) with crisp white text.
   - Category cards: Black background (`#111111`) with white headings and borders.
   - Footer: Deep black (`#000000`) with medium gray supporting text.
   - Promotional editorial banners: Selective black/dark gray backdrops for high visual impact.
3. **Sharp Edge Geometry**:
   - Border radius must remain between `0px` and `4px` maximum across the entire UI.
   - Buttons: `0px - 2px`.
   - Cards, images, input fields: `0px - 4px`.
   - Never use bubbly, heavily rounded pill buttons or cartoonish corners.
4. **Contrast & Line Weights**:
   - Dividers and borders must be hairline and subtle (`1px solid #E5E5E5`).
   - Maintain strict WCAG AA contrast compliance (4.5:1 minimum text contrast).
