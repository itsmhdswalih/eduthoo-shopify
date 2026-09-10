import React, { useState } from 'react';
import { Check } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section
      style={{
        paddingTop: '80px',
        paddingBottom: '80px',
        backgroundColor: 'var(--color-primary-white)',
        borderBottom: '1px solid var(--color-light-gray)',
        textAlign: 'center'
      }}
    >
      <div className="container">
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
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
            VIP EARLY ACCESS
          </span>

          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              marginBottom: '16px',
              color: 'var(--color-primary-black)'
            }}
          >
            DISCOVER WHAT'S NEW
          </h2>

          <p
            style={{
              fontSize: '14px',
              lineHeight: 1.6,
              color: 'var(--color-dark-gray)',
              marginBottom: '32px'
            }}
          >
            Get updates about new product drops, special member pricing, and useful everyday discoveries. No spam.
          </p>

          {isSubscribed ? (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 24px',
                backgroundColor: 'var(--color-soft-gray)',
                borderRadius: 'var(--radius-btn)',
                fontSize: '13px',
                fontWeight: 600
              }}
            >
              <Check size={18} color="var(--color-primary-black)" />
              <span>You're on the VIP list. Welcome to EDUTHOO.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                gap: '8px',
                maxWidth: '440px',
                margin: '0 auto',
                flexWrap: 'wrap'
              }}
            >
              <input
                type="email"
                required
                placeholder="ENTER YOUR EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: '240px',
                  padding: '14px 16px',
                  fontSize: '12px',
                  border: '1px solid var(--color-light-gray)',
                  borderRadius: 'var(--radius-input)',
                  outline: 'none',
                  backgroundColor: 'var(--color-off-white)',
                  color: 'var(--color-primary-black)',
                  letterSpacing: '0.04em'
                }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{ padding: '14px 28px' }}
              >
                <span>JOIN</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
