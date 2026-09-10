import React, { useState } from 'react';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export default function ProductCard({
  product,
  isWishlisted = false,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate discount percentage if compareAtPrice exists
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--color-primary-white)',
        border: '1px solid var(--color-light-gray)',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        position: 'relative',
        transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)'
      }}
      className="product-card"
    >
      {/* Product Image Frame (Click opens dedicated Product Details Page) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          backgroundColor: 'var(--color-primary-white)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          borderBottom: '1px solid var(--color-light-gray)'
        }}
        onClick={() => onSelectProduct(product)}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            padding: '24px',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform var(--transition-slow)',
            mixBlendMode: 'multiply'
          }}
          loading="lazy"
        />

        {/* Badge (e.g. Best Seller / New / Save %) */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {product.badge && (
            <span className="badge-tag">
              {product.badge}
            </span>
          )}
          {hasDiscount && (
            <span className="badge-tag" style={{ backgroundColor: 'var(--color-dark-gray)' }}>
              SAVE {discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Heart Button (Top Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--color-light-gray)',
            color: isWishlisted ? '#E53E3E' : 'var(--color-primary-black)',
            transition: 'transform var(--transition-fast)'
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} fill={isWishlisted ? '#E53E3E' : 'none'} />
        </button>

        {/* View Details Button on Desktop Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectProduct(product);
          }}
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '50%',
            transform: isHovered ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(20px)',
            opacity: isHovered ? 1 : 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            color: 'var(--color-primary-white)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            padding: '8px 16px',
            borderRadius: 'var(--radius-btn)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            pointerEvents: isHovered ? 'auto' : 'none',
            transition: 'all var(--transition-fast)',
            whiteSpace: 'nowrap'
          }}
          className="desktop-only"
        >
          <span>VIEW PRODUCT</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Product Details */}
      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-medium-gray)',
              display: 'block',
              marginBottom: '4px'
            }}
          >
            {product.category}
          </span>

          <h3
            style={{
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: 1.4,
              marginBottom: '8px',
              cursor: 'pointer',
              color: 'var(--color-primary-black)'
            }}
            onClick={() => onSelectProduct(product)}
          >
            {product.title}
          </h3>
        </div>

        <div>
          {/* Price Layout */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '8px',
              marginBottom: '16px'
            }}
          >
            <span
              style={{
                fontSize: '16px',
                fontWeight: 800,
                color: 'var(--color-primary-black)'
              }}
            >
              ₹{product.price.toLocaleString('en-IN')}
            </span>

            {hasDiscount && (
              <span
                style={{
                  fontSize: '13px',
                  color: 'var(--color-medium-gray)',
                  textDecoration: 'line-through'
                }}
              >
                ₹{product.compareAtPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Quick Add Button */}
          <button
            onClick={() => onAddToCart(product)}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '11px 16px',
              fontSize: '12px'
            }}
          >
            <ShoppingBag size={14} />
            <span>ADD TO CART</span>
          </button>
        </div>
      </div>
    </article>
  );
}
