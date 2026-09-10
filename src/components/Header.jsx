import React, { useState, useEffect } from 'react';
import { Menu, Search, Heart, ShoppingBag, User } from 'lucide-react';
import MobileMenuDrawer from './MobileMenuDrawer';

export default function Header({
  cartCount = 0,
  wishlistCount = 0,
  onOpenCart,
  onOpenSearch,
  onOpenWishlist,
  onSelectCategory,
  onNavigateHome,
  onNavigateAbout,
  onNavigateContact
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 900,
          backgroundColor: 'var(--color-primary-white)',
          borderBottom: isScrolled ? '1px solid var(--color-light-gray)' : '1px solid transparent',
          transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
          boxShadow: isScrolled ? '0 2px 10px rgba(0,0,0,0.03)' : 'none'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'center',
              height: '76px',
              width: '100%'
            }}
          >
            {/* LEFT COLUMN: Desktop Navigation or Mobile Hamburger */}
            <div style={{ justifySelf: 'start', display: 'flex', alignItems: 'center' }}>
              {/* Mobile Hamburger Menu */}
              <div className="mobile-only">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="btn-icon"
                  aria-label="Open mobile navigation"
                >
                  <Menu size={22} />
                </button>
              </div>

              {/* Desktop Left Navigation Links */}
              <nav
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.08em'
                }}
                className="desktop-only"
                aria-label="Main Store Navigation"
              >
                <button onClick={() => onSelectCategory('all')} style={{ padding: '6px 0', textTransform: 'uppercase' }}>
                  SHOP
                </button>
                <button onClick={() => onSelectCategory('Gadgets')} style={{ padding: '6px 0', textTransform: 'uppercase' }}>
                  GADGETS
                </button>
                <button onClick={() => onSelectCategory('Tech')} style={{ padding: '6px 0', textTransform: 'uppercase' }}>
                  TECH
                </button>
                <button onClick={() => onSelectCategory('Home')} style={{ padding: '6px 0', textTransform: 'uppercase' }}>
                  HOME
                </button>
                <button onClick={() => onSelectCategory('trending')} style={{ padding: '6px 0', textTransform: 'uppercase' }}>
                  TRENDING
                </button>
              </nav>
            </div>

            {/* CENTER COLUMN: Perfectly Dead-Centered Logo (Emblem Only) */}
            <div
              style={{
                justifySelf: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateHome();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px'
                }}
                aria-label="EDUTHOO Home"
              >
                <img
                  src="/assets/logo/eduthoo-emblem-clean.png"
                  alt="EDUTHOO"
                  style={{
                    height: '46px',
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              </a>
            </div>

            {/* RIGHT COLUMN: Action & Utility Icons */}
            <div
              style={{
                justifySelf: 'end',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {/* Search */}
              <button
                onClick={onOpenSearch}
                className="btn-icon"
                aria-label="Search products"
                title="Search"
              >
                <Search size={20} />
              </button>

              {/* Account (Desktop) */}
              <button
                onClick={() => alert("Shopify Customer Accounts: In production, customers can log in to view their order history.")}
                className="btn-icon desktop-only"
                aria-label="Account"
                title="Account"
              >
                <User size={20} />
              </button>

              {/* Wishlist */}
              <button
                onClick={onOpenWishlist}
                className="btn-icon"
                aria-label="Wishlist"
                title="Wishlist"
                style={{ position: 'relative' }}
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      backgroundColor: 'var(--color-primary-black)',
                      color: 'var(--color-primary-white)',
                      fontSize: '10px',
                      fontWeight: 700,
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Bag */}
              <button
                onClick={onOpenCart}
                className="btn-icon"
                aria-label={`Shopping cart with ${cartCount} items`}
                title="Shopping Bag"
                style={{ position: 'relative' }}
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      backgroundColor: 'var(--color-primary-black)',
                      color: 'var(--color-primary-white)',
                      fontSize: '10px',
                      fontWeight: 700,
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Responsive media query helper for Header */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: flex !important; }
        }
        @media (min-width: 769px) {
          .desktop-only { display: flex !important; }
          .mobile-only { display: none !important; }
        }
      `}</style>

      {/* Mobile Drawer */}
      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onSelectCategory={onSelectCategory}
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateContact={onNavigateContact}
      />
    </>
  );
}
