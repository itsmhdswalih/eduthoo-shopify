import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistItems = [],
  onRemoveFromWishlist,
  onMoveToCart
}) {
  if (!isOpen) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'var(--color-primary-white)',
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 250ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
          boxShadow: 'var(--shadow-drawer)'
        }}
        aria-label="Wishlist Drawer"
      >
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--color-light-gray)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart size={20} fill="#E53E3E" color="#E53E3E" />
            <h2 style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              YOUR WISHLIST ({wishlistItems.length})
            </h2>
          </div>
          <button onClick={onClose} className="btn-icon" aria-label="Close wishlist">
            <X size={20} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {wishlistItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <p style={{ fontSize: '14px', color: 'var(--color-medium-gray)' }}>
                Your wishlist is empty. Tap the heart on any product to save it for later.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    border: '1px solid var(--color-light-gray)',
                    borderRadius: 'var(--radius-card)'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '56px', height: '56px', objectFit: 'contain', backgroundColor: 'var(--color-off-white)' }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{item.title}</h4>
                    <p style={{ fontSize: '13px', fontWeight: 700 }}>₹{item.price.toLocaleString('en-IN')}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <button
                      onClick={() => onMoveToCart(item)}
                      className="btn-icon"
                      title="Move to Cart"
                      style={{ border: '1px solid var(--color-light-gray)' }}
                    >
                      <ShoppingBag size={14} />
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(item.id)}
                      className="btn-icon"
                      title="Remove"
                    >
                      <Trash2 size={14} color="var(--color-medium-gray)" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
