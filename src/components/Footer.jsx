import React from 'react';
import { ArrowUp } from 'lucide-react';

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Footer({
  onSelectCategory,
  onNavigateAbout,
  onNavigateContact,
  onNavigatePolicy
}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-primary-black)',
        color: 'var(--color-primary-white)',
        paddingTop: '80px',
        paddingBottom: '40px'
      }}
      role="contentinfo"
    >
      <div className="container">
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px',
            marginBottom: '64px'
          }}
        >
          {/* Brand Column */}
          <div style={{ maxWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <img
                src="/assets/logo/eduthoo-emblem-clean.png"
                alt=""
                style={{ height: '28px', filter: 'brightness(0) invert(1)' }}
              />
              <span
                style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}
              >
                EDUTHOO
              </span>
            </div>

            <p
              style={{
                fontSize: '13px',
                lineHeight: 1.6,
                color: 'var(--color-medium-gray)',
                marginBottom: '24px'
              }}
            >
              Smart finds, useful products and everyday essentials — curated for modern living.
            </p>

            <a
              href="https://www.instagram.com/eduthoo.in/"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--color-primary-white)',
                padding: '8px 14px',
                border: '1px solid var(--color-dark-gray)',
                borderRadius: 'var(--radius-btn)'
              }}
            >
              <InstagramIcon size={16} />
              <span>FOLLOW ON INSTAGRAM</span>
            </a>
          </div>

          {/* Column: SHOP */}
          <div>
            <h4
              style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '20px',
                color: 'var(--color-primary-white)'
              }}
            >
              SHOP
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><button onClick={() => onSelectCategory('all')} style={{ color: 'var(--color-medium-gray)', fontSize: '13px' }}>All Products</button></li>
              <li><button onClick={() => onSelectCategory('Gadgets')} style={{ color: 'var(--color-medium-gray)', fontSize: '13px' }}>Gadgets & Tools</button></li>
              <li><button onClick={() => onSelectCategory('Tech')} style={{ color: 'var(--color-medium-gray)', fontSize: '13px' }}>Tech Accessories</button></li>
              <li><button onClick={() => onSelectCategory('Home')} style={{ color: 'var(--color-medium-gray)', fontSize: '13px' }}>Home & Lighting</button></li>
              <li><button onClick={() => onSelectCategory('Everyday')} style={{ color: 'var(--color-medium-gray)', fontSize: '13px' }}>Everyday Essentials</button></li>
              <li><button onClick={() => onSelectCategory('trending')} style={{ color: 'var(--color-medium-gray)', fontSize: '13px' }}>Trending Drops</button></li>
            </ul>
          </div>

          {/* Column: CUSTOMER CARE */}
          <div>
            <h4
              style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '20px',
                color: 'var(--color-primary-white)'
              }}
            >
              CUSTOMER CARE
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--color-medium-gray)', fontSize: '13px' }}>
              <li><button onClick={onNavigateContact} style={{ color: 'var(--color-medium-gray)', fontSize: '13px' }}>Contact Support</button></li>
              <li><button onClick={() => onNavigatePolicy('shipping')} style={{ color: 'var(--color-medium-gray)', fontSize: '13px' }}>Shipping Policy</button></li>
              <li><button onClick={() => onNavigatePolicy('returns')} style={{ color: 'var(--color-medium-gray)', fontSize: '13px' }}>7-Day Returns & Replacement</button></li>
              <li><button onClick={onNavigateContact} style={{ color: 'var(--color-medium-gray)', fontSize: '13px' }}>Track Order & FAQs</button></li>
            </ul>
          </div>

          {/* Column: INFORMATION */}
          <div>
            <h4
              style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '20px',
                color: 'var(--color-primary-white)'
              }}
            >
              INFORMATION
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--color-medium-gray)', fontSize: '13px' }}>
              <li><button onClick={onNavigateAbout} style={{ color: 'var(--color-medium-gray)', fontSize: '13px' }}>About EDUTHOO</button></li>
              <li><button onClick={() => onNavigatePolicy('privacy')} style={{ color: 'var(--color-medium-gray)', fontSize: '13px' }}>Privacy Policy</button></li>
              <li><button onClick={() => onNavigatePolicy('terms')} style={{ color: 'var(--color-medium-gray)', fontSize: '13px' }}>Terms of Service</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Subtle Owner / Developer Credit */}
        <div
          style={{
            paddingTop: '32px',
            borderTop: '1px solid var(--color-dark-gray)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '12px',
            color: 'var(--color-medium-gray)'
          }}
        >
          <div>
            <p>© {new Date().getFullYear()} EDUTHOO. All rights reserved.</p>
          </div>

          {/* Specification Requirement: Owner / Developer Credit */}
          <div style={{ letterSpacing: '0.04em' }}>
            <span>Developed & managed by </span>
            <strong style={{ color: 'var(--color-primary-white)' }}>Muhammad Swalih</strong>
            <span> & </span>
            <strong style={{ color: 'var(--color-primary-white)' }}>Ajmal Muhammad</strong>
          </div>

          <div>
            <button
              onClick={scrollToTop}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--color-primary-white)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
