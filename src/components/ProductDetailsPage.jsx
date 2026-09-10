import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Lock, 
  Plus, 
  Minus, 
  ChevronDown,
  ChevronUp,
  Star
} from 'lucide-react';
import ProductCard from './ProductCard';
import AddBuyControl from './AddBuyControl';

export default function ProductDetailsPage({
  product,
  allProducts = [],
  wishlist = [],
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
  onBackToHome,
  onNavigateToCatalog
}) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) return null;

  const isWishlisted = wishlist.some(item => item.id === product.id);
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;
  const productRating = Number(product.rating) || 0;
  const reviewsCount = Number(product.reviewsCount) || 0;

  // Recommended products in same or similar category
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuy = () => {
    onAddToCart(product, quantity);
    onBuyNow(product, quantity);
  };

  return (
    <main
      style={{
        backgroundColor: 'var(--color-primary-white)',
        minHeight: '90vh',
        paddingTop: '32px',
        paddingBottom: '96px'
      }}
    >
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '36px',
            fontSize: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-medium-gray)' }}>
            <button
              onClick={onBackToHome}
              style={{ color: 'var(--color-dark-gray)', fontWeight: 600 }}
            >
              HOME
            </button>
            <span>/</span>
            <button
              onClick={() => onNavigateToCatalog(product.category)}
              style={{ color: 'var(--color-dark-gray)', fontWeight: 600, textTransform: 'uppercase' }}
            >
              {product.category}
            </button>
            <span>/</span>
            <span style={{ color: 'var(--color-primary-black)', fontWeight: 700 }}>
              {product.title}
            </span>
          </div>

          <button
            onClick={() => onNavigateToCatalog('all')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              color: 'var(--color-dark-gray)'
            }}
          >
            <ArrowLeft size={14} />
            <span>BACK TO ALL PRODUCTS</span>
          </button>
        </div>

        {/* Main Product Layout (Left: Image Gallery, Right: Purchase Details) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'start',
            marginBottom: '96px'
          }}
        >
          {/* Left Column: Product Studio Showcase */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div
              style={{
                backgroundColor: 'var(--color-primary-white)',
                border: '1px solid var(--color-light-gray)',
                borderRadius: 'var(--radius-card)',
                aspectRatio: '1 / 1',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px',
                position: 'relative'
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  mixBlendMode: 'multiply'
                }}
              />

              {/* Wishlist Floating Button */}
              <button
                onClick={() => onToggleWishlist(product)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(6px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--color-light-gray)',
                  color: isWishlisted ? '#E53E3E' : 'var(--color-primary-black)',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.06)'
                }}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={20} fill={isWishlisted ? '#E53E3E' : 'none'} />
              </button>

              {/* Badge */}
              {product.badge && (
                <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                  <span className="badge-tag">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Product Order & Details */}
          <div>
            {/* Category Tag */}
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-medium-gray)',
                display: 'block',
                marginBottom: '8px'
              }}
            >
              {product.category}
            </span>

            {/* Title */}
            <h1
              style={{
                fontSize: 'clamp(28px, 4vw, 38px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                color: 'var(--color-primary-black)',
                marginBottom: '16px'
              }}
            >
              {product.title}
            </h1>

            {/* Pricing Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '12px',
                marginBottom: '12px'
              }}
            >
              <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary-black)' }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>

              {hasDiscount && (
                <>
                  <span
                    style={{
                      fontSize: '18px',
                      color: 'var(--color-medium-gray)',
                      textDecoration: 'line-through'
                    }}
                  >
                    ₹{product.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                  <span
                    className="badge-tag"
                    style={{ backgroundColor: 'var(--color-dark-gray)', fontSize: '11px' }}
                  >
                    SAVE {discountPercent}%
                  </span>
                </>
              )}
            </div>

            {/* Tax & Free Delivery notice */}
            <p style={{ fontSize: '12px', color: 'var(--color-medium-gray)', marginBottom: '24px' }}>
              Inclusive of all taxes. Free shipping on orders above ₹999.
            </p>

            {/* Stock status indicator */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#2E7D32',
                marginBottom: '28px',
                padding: '8px 12px',
                backgroundColor: 'var(--color-soft-gray)',
                borderRadius: 'var(--radius-btn)',
                width: 'fit-content'
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2E7D32' }} />
              <span>In Stock — Dispatches within 24 Hours</span>
            </div>

            {/* Product Short Description */}
            <section className="product-description" aria-labelledby="product-description-heading">
              <span id="product-description-heading" className="product-description-eyebrow">
                DESIGNED FOR EVERYDAY
              </span>
              <p>{product.description || 'Thoughtfully selected technology for a simpler everyday setup.'}</p>
            </section>

            {/* Quantity Selector & Purchase CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  QUANTITY:
                </span>
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
                    style={{ padding: '8px 14px', color: 'var(--color-primary-black)' }}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ fontSize: '14px', fontWeight: 700, minWidth: '36px', textAlign: 'center' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ padding: '8px 14px', color: 'var(--color-primary-black)' }}
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <AddBuyControl
                isAdded={isAdded}
                onAdd={handleAdd}
                onBuy={handleBuy}
              />
            </div>

            {/* 4 Trust & Guarantee Badges */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                padding: '20px',
                backgroundColor: 'var(--color-soft-gray)',
                borderRadius: 'var(--radius-card)',
                marginBottom: '40px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Truck size={18} />
                <div>
                  <h4 style={{ fontSize: '12px', fontWeight: 700 }}>Free Delivery</h4>
                  <p style={{ fontSize: '11px', color: 'var(--color-medium-gray)' }}>On orders above ₹999</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <RotateCcw size={18} />
                <div>
                  <h4 style={{ fontSize: '12px', fontWeight: 700 }}>7-Day Easy Returns</h4>
                  <p style={{ fontSize: '11px', color: 'var(--color-medium-gray)' }}>Simple, stress-free support</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={18} />
                <div>
                  <h4 style={{ fontSize: '12px', fontWeight: 700 }}>1-Year Brand Warranty</h4>
                  <p style={{ fontSize: '11px', color: 'var(--color-medium-gray)' }}>100% Genuine product</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Lock size={18} />
                <div>
                  <h4 style={{ fontSize: '12px', fontWeight: 700 }}>Secure Checkout</h4>
                  <p style={{ fontSize: '11px', color: 'var(--color-medium-gray)' }}>Shopify SSL 256-bit encryption</p>
                </div>
              </div>
            </div>

            {/* Product Review Summary */}
            <section className="product-reviews" aria-labelledby="product-reviews-title">
              <div className="product-reviews-heading">
                <div>
                  <span className="product-description-eyebrow">CUSTOMER FEEDBACK</span>
                  <h2 id="product-reviews-title">REVIEWS</h2>
                </div>
                {reviewsCount > 0 && <span className="product-reviews-count">{reviewsCount} RATINGS</span>}
              </div>

              {productRating > 0 ? (
                <div className="product-rating-summary">
                  <strong>{productRating.toFixed(1)}</strong>
                  <div>
                    <div className="product-rating-stars" aria-label={`${productRating.toFixed(1)} out of 5 stars`}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} size={15} fill="currentColor" strokeWidth={1.7} />
                      ))}
                    </div>
                    <p>Based on {reviewsCount} customer ratings</p>
                  </div>
                </div>
              ) : (
                <p className="product-reviews-empty">Reviews will appear here as customers share their experience.</p>
              )}
            </section>

            {/* Accordion Tabs for Specs and Details */}
            <div style={{ borderTop: '1px solid var(--color-light-gray)' }}>
              {/* Features Tab */}
              <div style={{ borderBottom: '1px solid var(--color-light-gray)' }}>
                <button
                  onClick={() => setActiveTab(activeTab === 'features' ? '' : 'features')}
                  style={{
                    width: '100%',
                    padding: '16px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}
                >
                  <span>KEY SPECIFICATIONS & FEATURES</span>
                  {activeTab === 'features' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {activeTab === 'features' && product.features && (
                  <div style={{ paddingBottom: '20px' }}>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {product.features.map((feat, i) => (
                        <li key={i} style={{ fontSize: '13px', color: 'var(--color-dark-gray)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: 'var(--color-primary-black)', fontWeight: 'bold' }}>✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Shipping Tab */}
              <div style={{ borderBottom: '1px solid var(--color-light-gray)' }}>
                <button
                  onClick={() => setActiveTab(activeTab === 'shipping' ? '' : 'shipping')}
                  style={{
                    width: '100%',
                    padding: '16px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}
                >
                  <span>SHIPPING & EASY RETURNS</span>
                  {activeTab === 'shipping' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {activeTab === 'shipping' && (
                  <div style={{ paddingBottom: '20px', fontSize: '13px', color: 'var(--color-dark-gray)', lineHeight: 1.6 }}>
                    <p>All orders are dispatched from our fulfillment center within 24-48 business hours. You will receive live tracking updates on WhatsApp and Email.</p>
                    <p style={{ marginTop: '8px' }}>If you receive a defective or damaged product, simply reach out to our team within 7 days for a full replacement or refund.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products Section */}
        <div>
          <div style={{ marginBottom: '32px' }}>
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
              SIMILAR DISCOVERIES
            </span>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: 'var(--color-primary-black)'
              }}
            >
              YOU MAY ALSO LIKE
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '24px'
            }}
          >
            {relatedProducts.map(rel => (
              <ProductCard
                key={rel.id}
                product={rel}
                isWishlisted={wishlist.some(w => w.id === rel.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onQuickView={() => onSelectProduct(rel)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
