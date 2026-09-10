import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';

export default function CatalogPage({
  products = [],
  initialCategory = 'all',
  wishlist = [],
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  onBackToHome
}) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('featured');

  const categories = [
    { id: 'all', label: 'ALL PRODUCTS' },
    { id: 'Gadgets', label: 'GADGETS' },
    { id: 'Tech', label: 'TECH & DESK' },
    { id: 'Home', label: 'HOME & LIVING' },
    { id: 'Everyday', label: 'EVERYDAY' },
    { id: 'trending', label: 'TRENDING' }
  ];

  // Filter products by category
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (activeCategory === 'trending') {
      list = list.filter(p => p.tags?.includes('trending') || p.badge === 'Trending');
    } else if (activeCategory !== 'all') {
      list = list.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());
    }

    // Sort products
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return list;
  }, [products, activeCategory, sortBy]);

  return (
    <main
      style={{
        backgroundColor: 'var(--color-primary-white)',
        minHeight: '80vh',
        paddingTop: '32px',
        paddingBottom: '96px'
      }}
    >
      <div className="container">
        {/* Navigation Breadcrumb & Back button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '32px'
          }}
        >
          <button
            onClick={onBackToHome}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-dark-gray)'
            }}
          >
            <ArrowLeft size={16} />
            <span>BACK TO HOME</span>
          </button>

          <span style={{ fontSize: '12px', color: 'var(--color-medium-gray)' }}>
            HOME / <strong>{activeCategory === 'all' ? 'ALL PRODUCTS' : activeCategory.toUpperCase()}</strong>
          </span>
        </div>

        {/* Page Title & Count */}
        <div style={{ marginBottom: '32px' }}>
          <h1
            style={{
              fontSize: 'clamp(32px, 4.5vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              marginBottom: '8px',
              color: 'var(--color-primary-black)'
            }}
          >
            {activeCategory === 'all' ? 'ALL PRODUCTS' : `${activeCategory.toUpperCase()} COLLECTION`}
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-medium-gray)' }}>
            Showing {filteredProducts.length} curated products with pure white studio presentation.
          </p>
        </div>

        {/* Filters and Sorting Controls Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            paddingBottom: '24px',
            borderBottom: '1px solid var(--color-light-gray)',
            marginBottom: '36px'
          }}
        >
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: '8px 16px',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    borderRadius: 'var(--radius-btn)',
                    backgroundColor: isActive ? 'var(--color-primary-black)' : 'var(--color-soft-gray)',
                    color: isActive ? 'var(--color-primary-white)' : 'var(--color-primary-black)',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--color-primary-black)' : 'var(--color-light-gray)',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Sort Selector Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <SlidersHorizontal size={16} color="var(--color-dark-gray)" />
            <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              SORT:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '8px 12px',
                fontSize: '12px',
                fontWeight: 600,
                border: '1px solid var(--color-light-gray)',
                borderRadius: 'var(--radius-input)',
                backgroundColor: 'var(--color-primary-white)',
                color: 'var(--color-primary-black)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid: 4 columns desktop, 2 columns mobile */}
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
              NOTHING HERE YET
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-medium-gray)', marginBottom: '24px' }}>
              We're adding new products soon. Explore all other categories.
            </p>
            <button onClick={() => setActiveCategory('all')} className="btn btn-primary">
              EXPLORE ALL PRODUCTS
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '24px'
            }}
            className="product-grid"
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.some((item) => item.id === product.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </main>
  );
}
