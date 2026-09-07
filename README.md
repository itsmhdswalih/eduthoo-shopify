# eduthoo — Official Promotional Website

A standalone, premium Coming Soon promotional website for the multi-product brand **eduthoo** (`https://www.instagram.com/eduthoo.in/`).

## Features

- **Strict White-First Design System**: Pure white background (`#FFFFFF`), high-contrast black typography, and subtle gray accents.
- **Official Brand Assets**: Exact eduthoo logo and emblem.
- **Cinematic Reveal**: Smooth blur-to-focus animation on the "COMING SOON" announcement.
- **Curated Collections**: Custom AI-generated product photography showcasing upcoming drops (Everyday, Smart Finds, Gadgets, Lifestyle, Trending, More).
- **Instagram Integration**: Direct follow card tailored for Instagram bio traffic.
- **VIP Early Access**: Lightweight newsletter/waitlist subscription interface.
- **Easy Customization**: Centralized in `js/config.js` for quick non-technical edits.
- **Mobile-First**: Fully responsive and optimized for smartphone screens.

## Project Structure

```
├── index.html           # Main semantic HTML5 markup
├── css/
│   ├── style.css        # Pure white design system & typography
│   └── animations.css   # Blur reveal & micro-interactions
├── js/
│   ├── config.js        # Central brand configuration
│   └── app.js           # Interactive functionality & scroll reveals
└── assets/
    ├── logo/            # Official eduthoo logos
    └── images/curated/  # 6 curated product images
```

## Deploying to Vercel

1. Push this repository to GitHub: `https://github.com/itsmhdswalih/eduthoo.git`
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Select **Import Project** and choose the `eduthoo` repository.
4. Framework Preset: **Other** (Root directory: `./`).
5. Click **Deploy**. Vercel will instantly publish the static site with free SSL and global CDN.
