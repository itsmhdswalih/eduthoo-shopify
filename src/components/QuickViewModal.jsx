import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Heart, Check, ShieldCheck } from 'lucide-react';

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart({ ...product, quantity });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '90%',
          maxWidth: '820px',
          maxHeight: '90vh',
          margin: '40px auto 0',
          backgroundColor: 'var(--color-primary-white)',
          borderRadius: 'var(--radius-card)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-modal)',
          border: '1px solid var(--color-light-gray)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px 20px 0' }}>
          <button onClick={onClose} className="btn-icon" aria-label="Close product view">
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div
          style={{
            padding: '0 32px 32px',
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            alignItems: 'center'
          }}
        >
          {/* Left: Product Image */}
          <div
            style={{
              backgroundColor: 'var(--color-off-white)',
              borderRadius: 'var(--radius-card)',
              aspectRatio: '1 / 1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              border: '1px solid var(--color-light-gray)'
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>

          {/* Right: Product Info */}
          <div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-medium-gray)',
                display: 'block',
                marginBottom: '6px'
              }}
            >
              {product.category}
            </span>

            <h2
              style={{
                fontSize: '22px',
                fontWeight: 700,
                lineHeight: 1.3,
                marginBottom: '12px',
                color: 'var(--color-primary-black)'
              }}
            >
              {product.title}
            </h2>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '22px', fontWeight: 800 }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {hasDiscount && (
                <span style={{ fontSize: '15px', color: 'var(--color-medium-gray)', textDecoration: 'line-through' }}>
                  ₹{product.compareAtPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--color-dark-gray)', marginBottom: '20px' }}>
              {product.description}
            </p>

            {/* Feature List */}
            {product.features && (
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
                  KEY SPECIFICATIONS
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {product.features.map((feat, i) => (
                    <li key={i} style={{ fontSize: '12px', color: 'var(--color-dark-gray)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--color-primary-black)', fontWeight: 'bold' }}>✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity and Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid var(--color-light-gray)',
                  borderRadius: 'var(--radius-btn)'
                }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '8px 14px' }}
                >
                  <Minus size={14} />
                </button>
                <span style={{ fontSize: '14px', fontWeight: 600, minWidth: '32px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ padding: '8px 14px' }}
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={() => onToggleWishlist(product)}
                className="btn-icon"
                style={{
                  border: '1px solid var(--color-light-gray)',
                  width: '42px',
                  height: '42px',
                  color: isWishlisted ? '#E53E3E' : 'var(--color-primary-black)'
                }}
              >
                <Heart size={18} fill={isWishlisted ? '#E53E3E' : 'none'} />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAdd}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '13px',
                marginBottom: '16px'
              }}
            >
              {isAdded ? (
                <>
                  <Check size={16} />
                  <span>ADDED TO CART!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={16} />
                  <span>ADD TO CART — ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                </>
              )}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--color-medium-gray)' }}>
              <ShieldCheck size={14} />
              <span>Official 1-Year Warranty & Free Express Delivery above ₹999</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
