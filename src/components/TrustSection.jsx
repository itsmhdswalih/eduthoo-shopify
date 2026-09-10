import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Lock } from 'lucide-react';

export default function TrustSection() {
  const benefits = [
    {
      icon: <Truck size={24} strokeWidth={1.5} />,
      title: 'FAST DELIVERY',
      desc: 'Quick & safe delivery dispatch'
    },
    {
      icon: <RotateCcw size={24} strokeWidth={1.5} />,
      title: 'EASY RETURNS',
      desc: 'Simple 7-day return process'
    },
    {
      icon: <ShieldCheck size={24} strokeWidth={1.5} />,
      title: 'QUALITY ASSURED',
      desc: 'Products selected with care'
    },
    {
      icon: <Lock size={24} strokeWidth={1.5} />,
      title: 'SECURE PAYMENT',
      desc: '100% encrypted Shopify checkout'
    }
  ];

  return (
    <section
      style={{
        backgroundColor: 'var(--color-primary-white)',
        paddingTop: '60px',
        paddingBottom: '60px',
        borderBottom: '1px solid var(--color-light-gray)'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '32px'
          }}
        >
          {benefits.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px'
              }}
            >
              <div
                style={{
                  color: 'var(--color-primary-black)',
                  paddingTop: '2px'
                }}
              >
                {item.icon}
              </div>
              <div>
                <h4
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                    color: 'var(--color-primary-black)'
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontSize: '12px',
                    color: 'var(--color-medium-gray)',
                    lineHeight: 1.4
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
