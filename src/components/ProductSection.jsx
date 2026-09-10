import React from 'react';
import ProductCard from './ProductCard';
import { ArrowRight } from 'lucide-react';

export default function ProductSection({
  title,
  eyebrow = 'CURATED COLLECTION',
  products = [],
  wishlist = [],
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  onViewAll
}) {
  if (!products || products.length === 0) return null;

  return (
    <section
      style={{
        paddingTop: '80px',
        paddingBottom: '80px',
        backgroundColor: 'var(--color-primary-white)',
        borderBottom: '1px solid var(--color-light-gray)'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginBottom: '40px',
            position: 'relative'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--color-medium-gray)',
                  display: 'block',
                  marginBottom: '6px'
                }}
              >
                {eyebrow}
              </span>
              <h2
                style={{
                  fontSize: 'clamp(24px, 3.5vw, 36px)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  color: 'var(--color-primary-black)'
                }}
              >
                {title}
              </h2>
            </div>

            {onViewAll && (
              <button
                onClick={onViewAll}
                className="btn btn-secondary desktop-only"
                style={{ fontSize: '12px', padding: '10px 20px' }}
              >
                <span>VIEW ALL</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Responsive Grid: 4 columns on Desktop, 2 columns on Tablet & Mobile */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '24px'
          }}
          className="product-grid"
        >
          {products.map((product) => (
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

        {/* Mobile View All Button */}
        {onViewAll && (
          <div style={{ marginTop: '36px', textAlign: 'center' }} className="mobile-only">
            <button
              onClick={onViewAll}
              className="btn btn-secondary"
              style={{ width: '100%', padding: '14px 20px' }}
            >
              <span>VIEW ALL {title}</span>
              <ArrowRight size={14} />
            </button>
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
    </section>
  );
}
