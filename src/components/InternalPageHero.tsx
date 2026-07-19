import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface FloatingCard {
  icon: LucideIcon;
  value: string;
  label: string;
}

interface InternalPageHeroProps {
  title: React.ReactNode;
  categoryBadge: string;
  categoryIcon?: LucideIcon;
  description?: string | React.ReactNode;
  heroImage: string;
  cards?: FloatingCard[]; // Ignored as per user prompt: "Do NOT add floating statistics cards"
  cta?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
}

export function InternalPageHero({
  title,
  categoryBadge,
  description,
  heroImage,
  cta,
  breadcrumbs
}: InternalPageHeroProps) {
  return (
    <div 
      className="w-full max-w-[1400px] mx-auto transition-all duration-200"
      style={{
        paddingLeft: 'var(--outer-padding-x, 24px)',
        paddingRight: 'var(--outer-padding-x, 24px)',
        paddingTop: 'var(--outer-padding-top, 16px)',
        paddingBottom: 'var(--outer-padding-bottom, 4px)',
      }}
    >
      <section
        className="relative w-full h-[380px] md:h-[460px] lg:h-[540px] flex flex-col justify-center overflow-hidden bg-neutral-50 border border-neutral-200/60 shadow-xl shadow-neutral-100/40 transition-all duration-200"
        style={{
          borderRadius: 'var(--hero-border-radius, 40px)'
        }}
      >
        {/* Background Image with elegant overlay/gradient */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <motion.img 
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.18 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            src={heroImage} 
            alt="Hero Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          
          {/* Subtle blueprints/lines design system style */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ea8a2204_1px,transparent_1px),linear-gradient(to_bottom,#ea8a2205_1px,transparent_1px)] bg-[size:32px_32px]" />
          
          {/* Subtle warm orange glow matching homepage accent style but in light mode */}
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#EA8A22]/5 blur-[120px] rounded-full mix-blend-multiply" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 border border-[#EA8A22]/5 rounded-full animate-pulse-slow" />
        </div>

        {/* Hero content wrapper */}
        <div 
          className="relative max-w-[1400px] w-full mx-auto px-5 md:px-6 lg:px-7 xl:px-8 z-10 my-auto transition-all duration-200"
          style={{
            paddingTop: 'var(--hero-nav-spacing, 120px)'
          }}
        >
          {/* Left-aligned content structure */}
          <div className="max-w-3xl space-y-4">
            
            {/* Elegant Standardized Breadcrumbs */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase flex-wrap font-bold [&_a]:text-neutral-400 [&_a]:transition-colors hover:[&_a]:text-[#EA8A22] [&_span]:text-neutral-400 [&_span:last-child]:text-[#264A8A] [&_span:last-child]:font-bold"
            >
              {breadcrumbs ? (
                breadcrumbs
              ) : (
                <>
                  <Link to="/">Home</Link>
                  <span>/</span>
                  <span>{categoryBadge}</span>
                </>
              )}
            </motion.div>

            {/* Premium Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-neutral-950 tracking-tighter uppercase leading-[0.95] font-sans">
                {typeof title === 'string' ? (
                  (() => {
                    const words = title.trim().split(/\s+/);
                    if (words.length <= 1) return title;
                    const lastWord = words.pop();
                    const remainingText = words.join(' ');
                    return (
                      <>
                        {remainingText}{' '}
                        <span className="text-[#EA8A22]">{lastWord}</span>
                      </>
                    );
                  })()
                ) : (
                  title
                )}
              </h1>
            </motion.div>

            {/* Description */}
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-neutral-600 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl"
              >
                {description}
              </motion.p>
            )}

            {/* CTA controls */}
            {cta && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="pt-2"
              >
                {cta}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
