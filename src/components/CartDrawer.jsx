import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD, buildShopifyCheckoutUrl } from '../services/shopify';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onStartShopping
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleCheckout = () => {
    const shopifyUrl = buildShopifyCheckoutUrl(cartItems);
    if (shopifyUrl) {
      window.location.href = shopifyUrl;
    } else {
      // Demo / Localhost mode notification
      alert(`Proceeding to Shopify Checkout:\n\nSubtotal: ₹${subtotal.toLocaleString('en-IN')}\nItems: ${cartItems.length}\nFree Delivery: ${remainingForFreeShipping === 0 ? 'YES' : 'Standard'}\n\n(In production, this redirects directly to your live Shopify checkout domain!)`);
    }
  };

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
          maxWidth: '440px',
          backgroundColor: 'var(--color-primary-white)',
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 250ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
          boxShadow: 'var(--shadow-drawer)'
        }}
        aria-label="Shopping Cart Drawer"
      >
        {/* Drawer Header */}
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
            <ShoppingBag size={20} />
            <h2
              style={{
                fontSize: '15px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              YOUR CART ({cartItems.reduce((total, item) => total + item.quantity, 0)})
            </h2>
          </div>

          <button onClick={onClose} className="btn-icon" aria-label="Close cart drawer">
            <X size={20} />
          </button>
        </div>

        {/* Dynamic Free Shipping Threshold Meter */}
        <div
          style={{
            padding: '16px 24px',
            backgroundColor: 'var(--color-soft-gray)',
            borderBottom: '1px solid var(--color-light-gray)'
          }}
        >
          <div
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--color-primary-black)',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            {remainingForFreeShipping === 0 ? (
              <span>🎉 You've unlocked FREE Delivery!</span>
            ) : (
              <span>Add ₹{remainingForFreeShipping.toLocaleString('en-IN')} more for <strong>FREE Delivery</strong></span>
            )}
            <span>{shippingProgress}%</span>
          </div>

          {/* Meter Bar */}
          <div
            style={{
              width: '100%',
              height: '4px',
              backgroundColor: 'var(--color-light-gray)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: `${shippingProgress}%`,
                height: '100%',
                backgroundColor: 'var(--color-primary-black)',
                transition: 'width 0.4s ease'
              }}
            />
          </div>
        </div>

        {/* Cart Line Items List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px'
          }}
        >
          {cartItems.length === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
                padding: '40px 20px'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-soft-gray)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  color: 'var(--color-medium-gray)'
                }}
              >
                <ShoppingBag size={28} />
              </div>

              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}
              >
                YOUR CART IS EMPTY
              </h3>

              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--color-medium-gray)',
                  marginBottom: '24px',
                  maxWidth: '280px'
                }}
              >
                Looks like you haven't added anything yet. Discover our curated smart gadgets.
              </p>

              <button
                onClick={() => {
                  onClose();
                  onStartShopping();
                }}
                className="btn btn-primary"
                style={{ padding: '14px 28px' }}
              >
                <span>START SHOPPING</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid var(--color-soft-gray)'
                  }}
                >
                  {/* Item Image */}
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      backgroundColor: 'var(--color-off-white)',
                      borderRadius: 'var(--radius-card)',
                      border: '1px solid var(--color-light-gray)',
                      overflow: 'hidden',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '6px' }}
                    />
                  </div>

                  {/* Item Details */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h4
                        style={{
                          fontSize: '13px',
                          fontWeight: 600,
                          lineHeight: 1.3,
                          marginBottom: '4px',
                          color: 'var(--color-primary-black)'
                        }}
                      >
                        {item.title}
                      </h4>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-primary-black)' }}>
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>

                    {/* Quantity Selector & Remove */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1px solid var(--color-light-gray)',
                          borderRadius: 'var(--radius-btn)'
                        }}
                      >
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          style={{ padding: '4px 10px', color: 'var(--color-primary-black)' }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '12px', fontWeight: 600, minWidth: '24px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          style={{ padding: '4px 10px', color: 'var(--color-primary-black)' }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        style={{ color: 'var(--color-medium-gray)', padding: '4px' }}
                        aria-label="Remove item"
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer (Subtotal & Checkout) */}
        {cartItems.length > 0 && (
          <div
            style={{
              padding: '24px',
              borderTop: '1px solid var(--color-light-gray)',
              backgroundColor: 'var(--color-primary-white)'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                SUBTOTAL
              </span>
              <span style={{ fontSize: '18px', fontWeight: 800 }}>
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>

            <p style={{ fontSize: '11px', color: 'var(--color-medium-gray)', marginBottom: '16px' }}>
              Shipping and taxes calculated at secure checkout.
            </p>

            {/* Primary Black Checkout Button */}
            <button
              onClick={handleCheckout}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '13px',
                marginBottom: '12px'
              }}
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight size={16} />
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontSize: '11px',
                color: 'var(--color-medium-gray)'
              }}
            >
              <ShieldCheck size={14} />
              <span>100% Secure Shopify Protected Checkout</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
