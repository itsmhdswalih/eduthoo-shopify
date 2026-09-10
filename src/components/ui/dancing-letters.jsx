import React from 'react';
import { LazyMotion, domAnimation, m } from 'motion/react';

// Sophisticated, playful physics-based micro-interactions for each letter
const letterPhysicsVariants = [
  // 1. Elastic Rubber Band Stretch
  {
    hover: {
      scaleX: [1, 1.22, 0.85, 1.1, 0.96, 1],
      scaleY: [1, 0.78, 1.2, 0.92, 1.04, 1],
      y: [0, -8, 0],
      transition: { duration: 0.65, ease: "easeOut" }
    },
    tap: { scale: 0.9, y: 4 }
  },
  // 2. Squash & Spring Jump
  {
    hover: {
      scaleY: [1, 0.6, 1.25, 0.95, 1],
      scaleX: [1, 1.25, 0.85, 1.05, 1],
      y: [0, 8, -26, 4, 0],
      transition: { duration: 0.6, ease: "easeOut" }
    },
    tap: { scale: 0.9, y: 4 }
  },
  // 3. Elastic Tilt & Pop
  {
    hover: {
      rotate: [0, -14, 12, -6, 2, 0],
      scale: [1, 1.18, 1],
      y: [0, -12, 0],
      transition: { duration: 0.65, ease: "easeOut" }
    },
    tap: { scale: 0.9, y: 4 }
  },
  // 4. Spring Levitation
  {
    hover: {
      y: [0, -20, 0],
      scale: [1, 1.12, 1],
      transition: { duration: 0.55, ease: "easeInOut" }
    },
    tap: { scale: 0.9, y: 4 }
  },
  // 5. Impact Pulse
  {
    hover: {
      scale: [1, 1.28, 0.94, 1.06, 1],
      y: [0, -10, 0],
      transition: { duration: 0.5, ease: "easeOut" }
    },
    tap: { scale: 0.9, y: 4 }
  },
  // 6. Right Twist Bounce
  {
    hover: {
      rotate: [0, 14, -10, 5, 0],
      scale: [1, 1.14, 1],
      y: [0, -15, 0],
      transition: { duration: 0.6, ease: "easeOut" }
    },
    tap: { scale: 0.9, y: 4 }
  },
  // 7. Ripple Snap
  {
    hover: {
      scaleX: [1, 0.82, 1.2, 0.95, 1],
      scaleY: [1, 1.22, 0.86, 1.05, 1],
      y: [0, -14, 0],
      transition: { duration: 0.6, ease: "easeOut" }
    },
    tap: { scale: 0.9, y: 4 }
  }
];

export default function DancingLetters({
  text = "eduthoo",
  className = "",
  style = {},
  letterStyle = {}
}) {
  const letters = text.split("");

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={`hero-brand-title ${className}`}
        style={{
          fontFamily: 'var(--font-logo)',
          display: 'inline-flex',
          alignItems: 'baseline',
          lineHeight: 1,
          ...style
        }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 14 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              staggerChildren: 0.04,
              delayChildren: 0.05
            }
          }
        }}
      >
        {letters.map((letter, id) => {
          const physics = letterPhysicsVariants[id % letterPhysicsVariants.length];

          return (
            <m.span
              key={`${letter}-${id}`}
              className="hero-brand-letter"
              variants={{
                hidden: { opacity: 0, y: 16, scale: 0.92 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 350, damping: 25 }
                }
              }}
              whileHover={physics.hover}
              whileTap={physics.tap}
              style={{
                display: 'inline-block',
                cursor: 'pointer',
                userSelect: 'none',
                lineHeight: 1,
                ...letterStyle
              }}
            >
              {letter}
            </m.span>
          );
        })}
      </m.div>
    </LazyMotion>
  );
}
