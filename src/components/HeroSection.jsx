import React from 'react';
import { ArrowRight } from 'lucide-react';
import DancingLetters from './ui/dancing-letters';

export default function HeroSection({ onShopNow, onExplore }) {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-primary-white)',
        paddingTop: '40px',
        paddingBottom: '80px',
        borderBottom: '1px solid var(--color-light-gray)'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '48px'
          }}
        >
          {/* Left Editorial Copy */}
          <div style={{ maxWidth: '580px' }}>
            {/* Small Label */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-medium-gray)',
                marginBottom: '16px'
              }}
            >
              <span>✦</span>
              <span>SMART THINGS FOR EVERYDAY LIFE</span>
            </div>

            {/* Massive Hero Heading with Interactive Dancing Letters */}
            <div style={{ marginBottom: '24px', lineHeight: 0.95 }}>
              <DancingLetters
                text="EDUTHOO"
                letterClassName="font-extrabold uppercase text-black"
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter"
              />
            </div>

            {/* Supporting Editorial Paragraph */}
            <p
              style={{
                fontSize: 'clamp(16px, 2vw, 18px)',
                lineHeight: 1.6,
                color: 'var(--color-dark-gray)',
                marginBottom: '36px',
                maxWidth: '480px'
              }}
            >
              Discover smart gadgets, useful products and everyday essentials — all curated in one minimalist space.
            </p>

            {/* Call To Action Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              <button onClick={onShopNow} className="btn btn-primary" style={{ padding: '16px 36px' }}>
                <span>SHOP NOW</span>
                <ArrowRight size={16} />
              </button>

              <button onClick={onExplore} className="btn btn-secondary" style={{ padding: '16px 32px' }}>
                <span>EXPLORE PRODUCTS</span>
              </button>
            </div>
          </div>

          {/* Right Hero Studio Photography (Seamless Pure White Integration) */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent'
            }}
          >
            <img
              src="/assets/products/hero_desk.jpg"
              alt="EDUTHOO Minimalist Smart Gadgets"
              style={{
                width: '100%',
                maxWidth: '560px',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
                mixBlendMode: 'multiply'
              }}
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
