import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function PromoBanner({ onExplore }) {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-primary-white)',
        paddingTop: '60px',
        paddingBottom: '80px',
        borderBottom: '1px solid var(--color-light-gray)'
      }}
    >
      <div className="container">
        <div
          style={{
            backgroundColor: 'var(--color-off-white)',
            color: 'var(--color-primary-black)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-light-gray)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center'
          }}
        >
          {/* Left Text Block */}
          <div style={{ padding: 'clamp(36px, 6vw, 64px)' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-medium-gray)',
                display: 'block',
                marginBottom: '16px'
              }}
            >
              NEW & USEFUL
            </span>

            <h2
              style={{
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.0,
                textTransform: 'uppercase',
                marginBottom: '20px',
                color: 'var(--color-primary-black)'
              }}
            >
              SMART<br />FINDS
            </h2>

            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.6,
                color: 'var(--color-dark-gray)',
                marginBottom: '32px',
                maxWidth: '420px'
              }}
            >
              Discover products designed to make everyday life easier, organized, and more efficient. Curated with care.
            </p>

            <button
              onClick={onExplore}
              className="btn btn-primary"
              style={{ padding: '14px 28px' }}
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Right Product Spotlight Image */}
          <div
            style={{
              backgroundColor: 'var(--color-primary-white)',
              height: '100%',
              minHeight: '340px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
              borderLeft: '1px solid var(--color-light-gray)'
            }}
          >
            <img
              src="/assets/products/keyboard.jpg"
              alt="Low-Profile Mechanical Keyboard"
              style={{
                maxWidth: '100%',
                maxHeight: '340px',
                objectFit: 'contain'
              }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
