import React from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles, Compass } from 'lucide-react';

export default function AboutPage({ onBackToHome, onExploreProducts }) {
  return (
    <main
      style={{
        backgroundColor: 'var(--color-primary-white)',
        minHeight: '80vh',
        paddingTop: '40px',
        paddingBottom: '96px'
      }}
    >
      <div className="container" style={{ maxWidth: '840px' }}>
        {/* Back Link */}
        <div style={{ marginBottom: '36px' }}>
          <button
            onClick={onBackToHome}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-dark-gray)'
            }}
          >
            <ArrowLeft size={16} />
            <span>BACK TO HOME</span>
          </button>
        </div>

        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-medium-gray)',
              display: 'block',
              marginBottom: '12px'
            }}
          >
            OUR STORY & MISSION
          </span>
          <h1
            style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              marginBottom: '20px',
              color: 'var(--color-primary-black)'
            }}
          >
            ABOUT EDUTHOO
          </h1>
          <p
            style={{
              fontSize: '18px',
              lineHeight: 1.6,
              color: 'var(--color-dark-gray)',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            Discovering smart gadgets, useful products and everyday essentials — curated for modern living.
          </p>
        </div>

        {/* Editorial Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', fontSize: '15px', lineHeight: 1.8, color: 'var(--color-dark-gray)' }}>
          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary-black)', marginBottom: '12px', textTransform: 'uppercase' }}>
              What is EDUTHOO?
            </h2>
            <p>
              EDUTHOO is a modern online shopping destination focused on discovering useful, interesting, and practical products for everyday life. We believe everyday items should be well-designed, reliable, and genuinely problem-solving.
            </p>
            <p style={{ marginTop: '12px' }}>
              We are not a clothing or fast-fashion label. Our entire focus is dedicated to the curated world of gadgets, desk setups, smart tech accessories, home ergonomics, and innovative everyday tools.
            </p>
          </section>

          {/* 3 Core Values */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
              margin: '20px 0'
            }}
          >
            <div style={{ padding: '24px', backgroundColor: 'var(--color-soft-gray)', borderRadius: 'var(--radius-card)' }}>
              <Sparkles size={24} style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                Thoughtful Curation
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-medium-gray)', lineHeight: 1.5 }}>
                We test and select only products that add genuine utility and joy to your daily routine.
              </p>
            </div>

            <div style={{ padding: '24px', backgroundColor: 'var(--color-soft-gray)', borderRadius: 'var(--radius-card)' }}>
              <ShieldCheck size={24} style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                Uncompromising Quality
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-medium-gray)', lineHeight: 1.5 }}>
                Every item is backed by our quality guarantee, warranty protection, and reliable customer care.
              </p>
            </div>

            <div style={{ padding: '24px', backgroundColor: 'var(--color-soft-gray)', borderRadius: 'var(--radius-card)' }}>
              <Compass size={24} style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                Minimalist Aesthetic
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-medium-gray)', lineHeight: 1.5 }}>
                A strict monochrome philosophy celebrating clean lines, functional beauty, and zero clutter.
              </p>
            </div>
          </div>

          {/* Founders Section (Spec 35 & 36) */}
          <section
            style={{
              padding: '32px',
              border: '1px solid var(--color-light-gray)',
              borderRadius: 'var(--radius-card)',
              backgroundColor: 'var(--color-off-white)'
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-medium-gray)', display: 'block', marginBottom: '8px' }}>
              LEADERSHIP & CREATION
            </span>
            <h3 style={{ fontSize: '18px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-primary-black)', marginBottom: '12px' }}>
              Developed & Managed by Muhammad Swalih & Ajmal Muhammad
            </h3>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--color-dark-gray)' }}>
              EDUTHOO was founded and architected by <strong>Muhammad Swalih</strong> and <strong>Ajmal Muhammad</strong> with a vision to build a clean, transparent, and technology-driven e-commerce experience designed specifically for the discerning modern shopper.
            </p>
          </section>

          {/* Explore Button */}
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <button onClick={onExploreProducts} className="btn btn-primary" style={{ padding: '16px 36px' }}>
              <span>EXPLORE OUR PRODUCTS</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
