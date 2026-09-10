import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../services/productsData';

export default function CategorySection({ onSelectCategory }) {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-primary-white)',
        color: 'var(--color-primary-black)',
        paddingTop: '80px',
        paddingBottom: '80px',
        borderBottom: '1px solid var(--color-light-gray)'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-medium-gray)',
              display: 'block',
              marginBottom: '8px'
            }}
          >
            DISCOVER BY SPACE
          </span>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 38px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: 'var(--color-primary-black)'
            }}
          >
            FEATURED CATEGORIES
          </h2>
        </div>

        {/* 3 Clean Category Cards Grid (White Theme) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}
        >
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.handle)}
              style={{
                backgroundColor: 'var(--color-primary-white)',
                border: '1px solid var(--color-light-gray)',
                borderRadius: 'var(--radius-card)',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal)'
              }}
              className="category-card-white"
            >
              {/* Category Image Box */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4 / 3',
                  overflow: 'hidden',
                  backgroundColor: 'var(--color-off-white)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottom: '1px solid var(--color-light-gray)'
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    padding: '24px',
                    transition: 'transform 0.5s ease'
                  }}
                  className="cat-img"
                  loading="lazy"
                />
              </div>

              {/* Card Meta */}
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                      color: 'var(--color-primary-black)'
                    }}
                  >
                    {cat.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--color-dark-gray)', lineHeight: 1.5, marginBottom: '20px' }}>
                    {cat.description}
                  </p>
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: 'var(--color-primary-black)',
                    textTransform: 'uppercase'
                  }}
                >
                  <span>{cat.linkText}</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .category-card-white:hover {
          border-color: var(--color-primary-black);
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05);
        }
        .category-card-white:hover .cat-img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
