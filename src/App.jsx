import React, { useState, useEffect, useMemo } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CategorySection from './components/CategorySection';
import PromoBanner from './components/PromoBanner';
import TrustSection from './components/TrustSection';
import ProductSection from './components/ProductSection';
import CatalogPage from './components/CatalogPage';
import ProductDetailsPage from './components/ProductDetailsPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import PolicyPage from './components/PolicyPage';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import SearchModal from './components/SearchModal';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

import { CURATED_PRODUCTS } from './services/productsData';
import { fetchProductsFromShopify, buildShopifyCheckoutUrl } from './services/shopify';

export default function App() {
  const [products, setProducts] = useState(CURATED_PRODUCTS);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'catalog' | 'product' | 'about' | 'contact' | 'policies'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [policyTab, setPolicyTab] = useState('shipping');

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('eduthoo_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('eduthoo_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync cart & wishlist with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('eduthoo_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('eduthoo_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Try fetching dynamic Shopify products on mount
  useEffect(() => {
    fetchProductsFromShopify().then(res => {
      if (res && res.length > 0) {
        setProducts(res);
      }
    });
  }, []);

  // Cart operations
  const handleAddToCart = (product, qty = 1) => {
    const addQuantity = product.quantity || qty || 1;
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + addQuantity } : item
        );
      }
      return [...prev, { ...product, quantity: addQuantity }];
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = (product, qty = 1) => {
    const addQuantity = product.quantity || qty || 1;
    const checkoutItems = [{ ...product, quantity: addQuantity }];
    const shopifyUrl = buildShopifyCheckoutUrl(checkoutItems);
    if (shopifyUrl) {
      window.location.href = shopifyUrl;
    } else {
      setIsCartOpen(true);
    }
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Wishlist operations
  const handleToggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleMoveWishlistToCart = (product) => {
    handleAddToCart(product, 1);
    handleToggleWishlist(product);
  };

  // Navigation helpers
  const navigateToHome = () => {
    setCurrentView('home');
    setSelectedCategory('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCatalog = (category = 'all') => {
    setSelectedCategory(category);
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProduct = (product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAbout = () => {
    setCurrentView('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToContact = () => {
    setCurrentView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPolicy = (tab = 'shipping') => {
    setPolicyTab(tab);
    setCurrentView('policies');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered collections for homepage
  const bestSellers = useMemo(() => {
    return products.filter(p => p.tags?.includes('best-seller') || p.price > 1800);
  }, [products]);

  const newArrivals = useMemo(() => {
    return products.filter(p => p.tags?.includes('new-arrival') || p.badge === 'New' || p.category === 'Home');
  }, [products]);

  const trendingProducts = useMemo(() => {
    return products.filter(p => p.tags?.includes('trending') || p.badge === 'Trending');
  }, [products]);

  return (
    <div className="site-wrapper">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar message="FREE DELIVERY ON ORDERS ABOVE ₹999" />

      {/* 2. Main Navigation Header (Center Aligned Single Logo) */}
      <Header
        cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectCategory={(cat) => navigateToCatalog(cat)}
        onNavigateHome={navigateToHome}
        onNavigateAbout={navigateToAbout}
        onNavigateContact={navigateToContact}
      />

      {/* VIEW SWITCHER: HOME vs CATALOG vs PRODUCT DETAILS vs ABOUT vs CONTACT vs POLICIES */}
      {currentView === 'catalog' && (
        <CatalogPage
          products={products}
          initialCategory={selectedCategory}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onSelectProduct={navigateToProduct}
          onBackToHome={navigateToHome}
        />
      )}

      {currentView === 'product' && selectedProduct && (
        <ProductDetailsPage
          product={selectedProduct}
          allProducts={products}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onSelectProduct={navigateToProduct}
          onBackToHome={navigateToHome}
          onNavigateToCatalog={navigateToCatalog}
        />
      )}

      {currentView === 'about' && (
        <AboutPage
          onBackToHome={navigateToHome}
          onExploreProducts={() => navigateToCatalog('all')}
        />
      )}

      {currentView === 'contact' && (
        <ContactPage
          onBackToHome={navigateToHome}
        />
      )}

      {currentView === 'policies' && (
        <PolicyPage
          initialTab={policyTab}
          onBackToHome={navigateToHome}
        />
      )}

      {currentView === 'home' && (
        <>
          {/* Editorial Hero Section (Seamless Pure White Background) */}
          <HeroSection
            onShopNow={() => navigateToCatalog('all')}
            onExplore={() => navigateToCatalog('all')}
          />

          {/* Featured Categories (Clean White Theme) */}
          <CategorySection
            onSelectCategory={(cat) => navigateToCatalog(cat)}
          />

          {/* Large Promotional Spotlight (Clean White Theme) */}
          <PromoBanner
            onExplore={() => navigateToCatalog('Tech')}
          />

          {/* Benefits / Trust Bar */}
          <TrustSection />

          {/* Dynamic Product Sections (Clicking navigates to dedicated Product Details Page) */}
          <div id="products-section">
            <ProductSection
              title="BEST OF EDUTHOO"
              eyebrow="BEST SELLING PRODUCTS"
              products={bestSellers}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={handleAddToCart}
              onSelectProduct={navigateToProduct}
              onViewAll={() => navigateToCatalog('all')}
            />

            <ProductSection
              title="NEW ARRIVALS"
              eyebrow="LATEST DROPS"
              products={newArrivals}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={handleAddToCart}
              onSelectProduct={navigateToProduct}
              onViewAll={() => navigateToCatalog('all')}
            />

            <ProductSection
              title="TRENDING NOW"
              eyebrow="POPULAR RIGHT NOW"
              products={trendingProducts}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={handleAddToCart}
              onSelectProduct={navigateToProduct}
              onViewAll={() => navigateToCatalog('trending')}
            />
          </div>

          {/* VIP Newsletter */}
          <NewsletterSection />
        </>
      )}

      {/* Luxury Footer with Developer Credits */}
      <Footer
        onSelectCategory={(cat) => navigateToCatalog(cat)}
        onNavigateAbout={navigateToAbout}
        onNavigateContact={navigateToContact}
        onNavigatePolicy={navigateToPolicy}
      />

      {/* Interactive Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onStartShopping={() => navigateToCatalog('all')}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlist}
        onRemoveFromWishlist={(id) => setWishlist(prev => prev.filter(i => i.id !== id))}
        onMoveToCart={handleMoveWishlistToCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={navigateToProduct}
      />
    </div>
  );
}
