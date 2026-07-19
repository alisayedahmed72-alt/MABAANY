import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export function ThankYou() {
  // Auto scroll to top when page is mounted
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="bg-white min-h-screen pb-12 selection:bg-[#EA8A22] selection:text-white">
      {/* HERO CONTAINER LIKE OTHER PAGES CONTAINING ALL CONFIRMATION MESSAGES */}
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
          className="relative w-full min-h-[520px] md:min-h-[580px] lg:min-h-[640px] flex flex-col justify-center overflow-hidden bg-neutral-50 border border-neutral-200/60 shadow-xl shadow-neutral-100/40 transition-all duration-200 rounded-[40px] py-12 md:py-16"
        >
          {/* Background Image with elegant overlay/gradient */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <motion.img 
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.18 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80" 
              alt="Hero Background" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            
            {/* Subtle blueprints/lines design system style */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ea8a2204_1px,transparent_1px),linear-gradient(to_bottom,#ea8a2205_1px,transparent_1px)] bg-[size:32px_32px]" />
            
            {/* Subtle warm orange glow matching homepage accent style but in light mode */}
            <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#EA8A22]/5 blur-[120px] rounded-full mix-blend-multiply" />
            <div className="absolute -bottom-20 -right-20 w-96 h-96 border border-[#EA8A22]/5 rounded-full" />
          </div>

          {/* Content Wrapper */}
          <div 
            className="relative max-w-4xl w-full mx-auto px-6 md:px-12 lg:px-16 z-10 flex flex-col items-center text-center space-y-8"
          >
            {/* 1. Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className="space-y-2"
            >
              <span className="text-xs font-mono font-black uppercase tracking-[0.25em] text-[#EA8A22] block">
                Submission Confirmed
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-neutral-950 tracking-tighter uppercase leading-[0.95] font-sans">
                Inquiry <span className="text-[#EA8A22]">Sent!</span>
              </h1>
            </motion.div>

            {/* 2. Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-neutral-600 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl"
            >
              Thank you. We have received your submission! A member of our regional engineering team in Egypt, Saudi Arabia, or Libya will review your details and contact you within 24 hours.
            </motion.p>

            {/* 3. Buttons with same styling and colors */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center items-center w-full max-w-md pt-2"
            >
              <Link
                to="/"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#EA8A22] hover:bg-[#EA8A22]/90 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-full shadow-lg shadow-[#EA8A22]/10 hover:shadow-[#EA8A22]/25 transition-all duration-300 transform active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>Back to Home</span>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
