/**
 * ==============================================================================
 * EDUTHOO BRAND CONFIGURATION
 * ==============================================================================
 * Easily customize all text, links, brand descriptions, and images here.
 * Any edits made in this file will automatically reflect across the entire site.
 */

const EDUTHOO_CONFIG = {
  // Brand Identity
  brand: {
    name: "eduthoo",
    logoFull: "assets/logo/eduthoo-logo-clean.png",      // Official logo with wordmark
    logoEmblem: "assets/logo/eduthoo-emblem-clean.png",  // Official standalone emblem
    tagline: "Useful, smart & problem-solving products for everyday life",
  },

  // First Screen (Hero / Coming Soon)
  hero: {
    comingSoonBadge: "COMING SOON",
    eyebrow: "Online Brand Launch",
    tagline: "Useful, smart, and problem-solving products for everyday life.",
    scrollIndicatorText: "SCROLL",
  },

  // Brand Introduction ("What is eduthoo?")
  about: {
    label: "WHAT IS EDUTHOO",
    heading: "Carefully curated for modern living.",
    description: "eduthoo is an upcoming multi-product online brand featuring useful, interesting, and problem-solving products designed to elevate everyday life.",
  },

  // Single Curated Collection (6 Custom AI-Generated White-Background Photos)
  curatedItems: [
    {
      id: "c1",
      number: "01",
      category: "EVERYDAY",
      name: "Minimalist Daily Carry",
      badge: "COMING SOON",
      image: "assets/images/curated/item_01.jpg",
    },
    {
      id: "c2",
      number: "02",
      category: "SMART FINDS",
      name: "Ambient Halo Light",
      badge: "COMING SOON",
      image: "assets/images/curated/item_02.jpg",
    },
    {
      id: "c3",
      number: "03",
      category: "GADGETS",
      name: "Precision Smartwatch",
      badge: "COMING SOON",
      image: "assets/images/curated/item_03.jpg",
    },
    {
      id: "c4",
      number: "04",
      category: "LIFESTYLE",
      name: "Matte Insulated Vessel",
      badge: "COMING SOON",
      image: "assets/images/curated/item_04.jpg",
    },
    {
      id: "c5",
      number: "05",
      category: "TRENDING",
      name: "Acoustic Over-Ear Studio",
      badge: "COMING SOON",
      image: "assets/images/curated/item_05.jpg",
    },
    {
      id: "c6",
      number: "06",
      category: "MORE",
      name: "Geometric Wireless Dock",
      badge: "COMING SOON",
      image: "assets/images/curated/item_06.jpg",
    },
  ],

  // Instagram Integration (shared via Instagram page)
  instagram: {
    handle: "@eduthoo.in",
    url: "https://www.instagram.com/eduthoo.in/?__pwa=1#", // Replace with YOUR_INSTAGRAM_URL if needed
    message: "Follow our journey on Instagram as we curate and reveal upcoming drops.",
    ctaText: "FOLLOW ON INSTAGRAM",
  },

  // Promotional Link Section
  promotional: {
    badge: "VIP LAUNCH ACCESS",
    heading: "Be First to Know",
    placeholderText: "Join our priority notification list to receive private access when the store officially opens.",
    ctaText: "Join Waitlist",
    targetUrl: "PROMOTIONAL_LINK", // Replace with PROMOTIONAL_LINK URL
  },

  // Footer Details
  footer: {
    copyright: `© ${new Date().getFullYear()} eduthoo. All rights reserved.`,
    subtext: "Curated for modern living.",
  }
};
