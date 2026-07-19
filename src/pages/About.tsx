import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, CheckCircle, Shield, Target, Lightbulb, Users, HardHat, Award, Globe, Building2, Briefcase, FileDown, Clock, Hexagon } from 'lucide-react';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { useQuoteModal } from '../contexts/QuoteContext';
import { clientLogos } from '../data';
import { InternalPageHero } from '../components/InternalPageHero';
import { FloatingWireframe } from '../components/FloatingWireframe';

const partnerLogos = [
  { name: 'Holcim Materials', icon: Building2, text: 'HOLCIM' },
  { name: 'Arup Consulting', icon: Shield, text: 'ARUP' },
  { name: 'Trimble Systems', icon: Globe, text: 'TRIMBLE' },
  { name: 'Hilti Equipment', icon: HardHat, text: 'HILTI' },
  { name: 'Autodesk BIM', icon: Award, text: 'AUTODESK' },
  { name: 'Schneider Electric', icon: Briefcase, text: 'SCHNEIDER' },
];

export function About() {
  const setQuoteModalOpen = useQuoteModal();
  const [downloadingProfile, setDownloadingProfile] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const handleDownloadProfile = () => {
    setDownloadingProfile(true);
    setTimeout(() => {
      setDownloadingProfile(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1500);
  };

  const aboutCards = [
    { icon: Clock, value: '13+ Years', label: 'Engineering Excellence' },
    { icon: Building2, value: '250+ Projects', label: 'Megaprojects Completed' },
    { icon: Globe, value: '3 Countries', label: 'International Presence' }
  ];

  return (
    <div className="relative bg-white text-neutral-900 min-h-screen">
      
      {/* 1. Hero Section */}
      <InternalPageHero
        title={<>Building Beyond <br /> <span className="text-[#EA8A22]">Expectations</span></>}
        categoryBadge="About"
        categoryIcon={HardHat}
        description=""
        heroImage="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=80"
        cards={aboutCards}
      />

      {/* 2. Company Overview */}
      <section className="py-12 md:py-20 lg:py-24 relative bg-white overflow-hidden">
        {/* Floating 3D Geodesic Sphere */}
        <div className="absolute -left-12 top-24 w-80 h-80 opacity-15 pointer-events-none hidden xl:block">
          <FloatingWireframe shape="icosahedron" className="w-full h-full" color="#264A8A" />
        </div>

        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative rounded-3xl overflow-hidden aspect-square md:aspect-[4/3] lg:aspect-[4/3] shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
                alt="Maabany Architecture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border border-black/10 rounded-3xl z-10 pointer-events-none" />
            </motion.div>

            {/* Right Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-[#264A8A] font-mono text-sm tracking-[0.2em] font-bold uppercase block mb-4">WHO WE ARE</span>
                <h2 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tighter uppercase leading-[1.1]">
                  About Maabany
                </h2>
                <p className="mt-6 text-neutral-600 leading-relaxed font-light text-lg">
                  Founded in 2013, Maabany Engineering has rapidly evolved into the region's most trusted partner for high-scale, high-complexity structural projects. 
                  Our approach marries aggressive technical innovation with a deep respect for foundational engineering principles.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Established in 2013", icon: <Award className="w-5 h-5" /> },
                  { title: "Multi-disciplinary", icon: <HardHat className="w-5 h-5" /> },
                  { title: "Regional Presence", icon: <Globe className="w-5 h-5" /> },
                  { title: "Trusted Partner", icon: <Shield className="w-5 h-5" /> }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: 'spring', stiffness: 80, damping: 14, delay: idx * 0.12 }}
                    whileHover={{ 
                      y: -12, 
                      scale: 1.03, 
                      boxShadow: "0 30px 60px -15px rgba(234, 138, 34, 0.15)"
                    }}
                    className="relative flex items-center gap-4 bg-white border border-neutral-200/80 p-4 rounded-2xl overflow-hidden group transition-all duration-300 hover:border-[#EA8A22]"
                  >
                    <div className="absolute -right-6 -top-6 w-20 h-20 bg-gradient-to-br from-[#EA8A22]/8 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                    <div className="absolute -left-6 -bottom-6 w-20 h-20 bg-gradient-to-tr from-[#264A8A]/5 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

                    <div className="relative z-10 flex items-center justify-center p-2.5 rounded-xl bg-neutral-50 border border-neutral-150 text-[#EA8A22] transition-all duration-300 group-hover:bg-[#EA8A22] group-hover:text-white group-hover:border-[#EA8A22] group-hover:rotate-3 group-hover:scale-105 shadow-sm group-hover:shadow-[#EA8A22]/20">
                      {item.icon}
                    </div>
                    <span className="relative z-10 text-sm font-semibold text-neutral-800 tracking-wide">{item.title}</span>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Statistics */}
      <section className="py-12 md:py-20 lg:py-24 relative bg-neutral-50 border-y border-neutral-200 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-neutral-200">
            {[
              { end: 13, suffix: "+", label: "Years of Experience" },
              { end: 250, suffix: "+", label: "Completed Projects" },
              { end: 40, suffix: "+", label: "Engineering Experts" },
              { end: 98, suffix: "%", label: "Client Satisfaction" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center px-4"
              >
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                <div className="text-xs md:text-sm font-bold text-[#EA8A22] uppercase tracking-widest font-mono">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Mission / Vision / Values */}
      <section className="py-12 md:py-20 lg:py-24 relative bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {[
              { 
                title: "OUR MISSION", 
                icon: <Target className="w-6 h-6" />, 
                desc: "To deliver uncompromising structural excellence by deploying advanced engineering methodologies, sustainable materials, and rigorous quality controls on every site we operate." 
              },
              { 
                title: "OUR VISION", 
                icon: <Lightbulb className="w-6 h-6" />, 
                desc: "To become the undisputed benchmark for high-scale construction in the Middle East, pioneering the transition toward net-zero megaprojects and intelligent infrastructure." 
              },
              { 
                title: "CORE VALUES", 
                icon: <Shield className="w-6 h-6" />, 
                desc: "Integrity in engineering, absolute safety compliance, continuous technological adoption, and a relentless commitment to exceeding client architectural aspirations." 
              }
            ].map((panel, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: 'spring', stiffness: 80, damping: 14, delay: idx * 0.12 }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.03, 
                  boxShadow: "0 30px 60px -15px rgba(234, 138, 34, 0.15)"
                }}
                className="relative bg-white border border-neutral-200/80 p-10 rounded-[2.5rem] overflow-hidden group transition-all duration-300 hover:border-[#EA8A22]"
              >
                {/* Playful organic glowing blob inside card background */}
                <div className="absolute -right-12 -top-12 w-36 h-36 bg-gradient-to-br from-[#EA8A22]/8 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                <div className="absolute -left-12 -bottom-12 w-36 h-36 bg-gradient-to-tr from-[#264A8A]/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />


                
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    {/* Organic squircle shaped icon badge */}
                    <div className="w-16 h-16 rounded-[1.5rem] bg-neutral-50 border border-neutral-150 text-[#EA8A22] flex items-center justify-center mb-8 transition-all duration-300 group-hover:bg-[#EA8A22] group-hover:text-white group-hover:border-[#EA8A22] group-hover:rotate-3 group-hover:scale-105 shadow-sm group-hover:shadow-[#EA8A22]/20">
                      {panel.icon}
                    </div>
                    
                    <h3 className="text-xl font-extrabold text-neutral-950 tracking-wide uppercase mb-4 font-sans">{panel.title}</h3>
                    <p className="text-neutral-600 leading-relaxed font-light text-sm">
                      {panel.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* 5. Our Partners */}
      <section className="py-12 md:py-20 lg:py-24 bg-white border-t border-neutral-200 overflow-hidden">
        <div className="text-center mb-10">
          <span className="text-[#264A8A] font-mono text-xs tracking-[0.2em] font-bold uppercase block mb-3">TRUSTED BY THE BEST</span>
          <h2 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tighter uppercase">Our Partners</h2>
        </div>
        
        <div className="relative w-full overflow-hidden bg-neutral-50/80 py-12 border-y border-neutral-200">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee-left flex items-center h-10">
            {[...Array(15)].map((_, i) => (
              <div 
                key={i} 
                className="flex items-center justify-center gap-3 px-16 opacity-40 hover:opacity-100 transition-all duration-500 cursor-pointer text-neutral-500 hover:text-[#EA8A22]"
              >
                <Hexagon className="w-8 h-8 stroke-[2.5]" />
                <span className="text-2xl font-bold tracking-widest font-sans uppercase whitespace-nowrap">LOGO</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Maabany */}
      <section className="py-12 md:py-20 lg:py-24 relative bg-neutral-50 border-t border-neutral-200 overflow-hidden">
        {/* Floating 3D Hyperboloid Tower */}
        <div className="absolute right-0 top-12 w-72 h-72 opacity-25 pointer-events-none hidden xl:block">
          <FloatingWireframe shape="tower" className="w-full h-full" color="#EA8A22" />
        </div>

        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-16">
            <span className="text-[#264A8A] font-mono text-xs tracking-[0.25em] font-bold uppercase block mb-3">OUR CORE ADVANTAGES</span>
            <h2 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tighter uppercase leading-[1.1]">
              Why Choose Maabany
            </h2>
            <p className="mt-4 text-neutral-600 leading-relaxed font-light text-lg">
              We don't just execute blueprints; we optimize them. Our multidisciplinary approach ensures every structure is safer, smarter, and more efficient.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
            
            {/* Left sticky column for image */}
            <div className="lg:col-span-5 relative flex flex-col h-full min-h-[450px] lg:min-h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:sticky lg:top-32 h-full flex flex-col"
              >
                <div className="rounded-[2.5rem] overflow-hidden flex-1 h-full min-h-[450px] lg:h-full relative shadow-2xl border border-neutral-200/50 group bg-neutral-100">
                  <img 
                    src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=800&q=80" 
                    alt="Engineering detail" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/15 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </div>

            {/* Right column for cards */}
            <div className="lg:col-span-7 space-y-4">
              {[
                { title: "Experienced Team", desc: "Our engineers and project managers bring decades of specialized tier-1 construction expertise.", icon: Users },
                { title: "Quality Excellence", desc: "Rigorous ISO-certified quality assurance protocols applied to every material and structural node.", icon: Award },
                { title: "On-Time Delivery", desc: "Advanced scheduling and logistics networks ensuring aggressive milestone adherence.", icon: Clock },
                { title: "Innovation", desc: "Deploying the latest in BIM modeling, drone surveying, and automated safety monitoring.", icon: Lightbulb },
                { title: "Safety Commitment", desc: "Zero-tolerance safety culture with comprehensive on-site health matrices.", icon: HardHat }
              ].map((feature, idx) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ type: 'spring', stiffness: 100, damping: 15, delay: idx * 0.1 }}
                    whileHover={{ 
                      y: -6,
                      scale: 1.02,
                      boxShadow: "0 30px 60px -15px rgba(234, 138, 34, 0.15)"
                    }}
                    className="group bg-white border border-neutral-200/80 p-6 rounded-[1.75rem] transition-all duration-300 relative overflow-hidden hover:border-[#EA8A22] cursor-default"
                  >
                    {/* Subtle warm glow on hover */}
                    <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-gradient-to-br from-[#EA8A22]/5 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
                    
                    <div className="flex gap-6 relative z-10 items-start sm:items-center">
                      <div className="flex-shrink-0">
                        {/* Playful squircle badge for icon */}
                        <div className="w-12 h-12 rounded-2xl bg-neutral-50 border border-neutral-150 text-[#EA8A22] flex items-center justify-center transition-all duration-300 group-hover:bg-[#EA8A22] group-hover:text-white group-hover:border-[#EA8A22] group-hover:rotate-3 group-hover:scale-105 shadow-sm group-hover:shadow-[#EA8A22]/20">
                          <IconComponent className="w-5 h-5" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-neutral-900 tracking-tight mb-1 group-hover:text-[#EA8A22] transition-colors">{feature.title}</h4>
                        <p className="text-neutral-600 text-sm leading-relaxed font-light">{feature.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 7. Our Clients */}
      <section className="py-12 md:py-20 lg:py-24 bg-white border-t border-neutral-200 overflow-hidden">
        <div className="text-center mb-10">
          <span className="text-[#264A8A] font-mono text-xs tracking-[0.2em] font-bold uppercase block mb-3">BUILDING WITH EXCELLENCE</span>
          <h2 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tighter uppercase">Our Clients</h2>
        </div>
        
        <div className="relative w-full overflow-hidden bg-neutral-50/80 py-12 border-y border-neutral-200">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee-right flex items-center h-10">
            {[...Array(15)].map((_, i) => (
              <div 
                key={i} 
                className="flex items-center justify-center gap-3 px-16 opacity-40 hover:opacity-100 transition-all duration-500 cursor-pointer text-neutral-500 hover:text-[#EA8A22]"
              >
                <Hexagon className="w-8 h-8 stroke-[2.5]" />
                <span className="text-2xl font-bold tracking-widest font-sans uppercase whitespace-nowrap">LOGO</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA Banner Section */}
      <section className="py-12 md:py-20 lg:py-24 relative bg-neutral-50 overflow-hidden mt-12">
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8 relative z-10">
          <div className="bg-[#0a0f1d] border border-neutral-800/80 p-10 md:p-16 rounded-[32px] shadow-2xl relative overflow-hidden group">
            {/* Premium Construction & Engineering Background Image */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80" 
                alt="Construction and Engineering" 
                className="w-full h-full object-cover opacity-[0.28] mix-blend-luminosity scale-[1.03] group-hover:scale-100 transition-transform duration-[1200ms] ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1d]/75 via-[#0a0f1d]/40 to-[#0a0f1d]/20" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0f1d]/30" />
            </div>
            <div className="absolute inset-0 translate-x-[-150%] skew-x-[-25deg] w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[sweep_2s_ease-in-out_infinite]" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#EA8A22]/15 rounded-full blur-[100px] pointer-events-none" />
            {/* Redesigned Architectural & Engineering Blueprint Background */}
            <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[50%] pointer-events-none select-none overflow-hidden opacity-[0.22] lg:opacity-[0.28]">
              {/* Subtle pulsing/drawing animation styles */}
              <style>{`
                @keyframes blueprintDraw {
                  0% { stroke-dashoffset: 1200; }
                  30% { stroke-dashoffset: 1200; }
                  100% { stroke-dashoffset: 0; }
                }
                @keyframes blueprintDot {
                  0%, 100% { transform: scale(1); opacity: 0.3; }
                  50% { transform: scale(1.5); opacity: 0.95; }
                }
                @keyframes blueprintFade {
                  0%, 100% { opacity: 0.2; }
                  50% { opacity: 0.8; }
                }
                .bp-line-draw {
                  stroke-dasharray: 1200;
                  stroke-dashoffset: 1200;
                  animation: blueprintDraw 9s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
                }
                .bp-pulse-dot {
                  transform-origin: center;
                  animation: blueprintDot 4s ease-in-out infinite;
                }
                .bp-fade-slow {
                  animation: blueprintFade 6s ease-in-out infinite;
                }
              `}</style>

              {/* Layer 1: Additional Technical Grid Tick-marks */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="cta-grid-ticks" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2" />
                    <line x1="0" y1="20" x2="4" y2="20" stroke="white" strokeWidth="0.5" opacity="0.15" />
                    <line x1="20" y1="0" x2="20" y2="4" stroke="white" strokeWidth="0.5" opacity="0.15" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cta-grid-ticks)" />
              </svg>

              {/* Layer 2: Drawing Content */}
              <div className="absolute inset-0 flex items-center justify-end pr-4">
                <svg
                  viewBox="0 0 700 600"
                  className="w-full h-full max-w-none transform translate-x-12 translate-y-8 scale-105"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Structural Steel Frame & Diagonal Bracing */}
                  <g className="bp-line-draw" strokeWidth="1" stroke="white">
                    {/* Horizontal Girders / Beams */}
                    <line x1="50" y1="140" x2="650" y2="140" strokeWidth="1.5" />
                    <line x1="50" y1="150" x2="650" y2="150" strokeWidth="0.5" strokeDasharray="2,2" />
                    <line x1="50" y1="130" x2="650" y2="130" strokeWidth="0.75" />
                    
                    <line x1="50" y1="380" x2="650" y2="380" strokeWidth="1.5" />
                    <line x1="50" y1="390" x2="650" y2="390" strokeWidth="0.5" strokeDasharray="2,2" />
                    
                    {/* Vertical Truss Columns */}
                    <rect x="180" y="80" width="30" height="440" strokeDasharray="4,4" strokeWidth="0.75" />
                    <rect x="480" y="80" width="30" height="440" strokeDasharray="4,4" strokeWidth="0.75" />
                    
                    {/* Cross Structural Steel Framing (X-Bracing) */}
                    <line x1="180" y1="140" x2="480" y2="380" strokeWidth="1.2" />
                    <line x1="480" y1="140" x2="180" y2="380" strokeWidth="1.2" />
                    
                    {/* Minor Truss lines */}
                    <line x1="180" y1="260" x2="480" y2="260" strokeWidth="0.75" strokeDasharray="4,2" />
                    <line x1="330" y1="140" x2="330" y2="380" strokeWidth="0.75" strokeDasharray="8,4" />
                    
                    {/* Isometric Building Structure Outlines */}
                    <path d="M 400,430 L 520,380 L 640,430 L 520,480 Z" strokeWidth="1" />
                    <path d="M 400,310 L 520,260 L 640,310 L 520,360 Z" strokeWidth="1" />
                    <line x1="400" y1="310" x2="400" y2="430" strokeWidth="1" />
                    <line x1="520" y1="260" x2="520" y2="380" strokeWidth="1.5" />
                    <line x1="640" y1="310" x2="640" y2="430" strokeWidth="1" />
                  </g>

                  {/* Layer 3: Floor Plan details */}
                  <g className="bp-fade-slow" stroke="white" strokeWidth="0.75" opacity="0.7">
                    {/* Interior Wall partitions */}
                    <path d="M 80,180 L 220,180 L 220,290 L 360,290 L 360,420" />
                    
                    {/* Door Arc and Swing Indicator */}
                    <path d="M 220,250 A 40,40 0 0,1 260,210" strokeDasharray="3,3" />
                    <line x1="220" y1="250" x2="220" y2="210" />
                    
                    {/* Foundation / Pillar Blocks */}
                    <rect x="75" y="175" width="10" height="10" fill="white" fillOpacity="0.25" />
                    <rect x="215" y="175" width="10" height="10" fill="white" fillOpacity="0.25" />
                    <rect x="215" y="285" width="10" height="10" fill="white" fillOpacity="0.25" />
                    <rect x="355" y="285" width="10" height="10" fill="white" fillOpacity="0.25" />
                  </g>

                  {/* Layer 4: Engineering Annotations & Dimensions */}
                  <g stroke="#EA8A22" strokeWidth="0.75" opacity="0.9">
                    {/* Horizontal dimension bounds */}
                    <line x1="180" y1="60" x2="480" y2="60" />
                    <line x1="180" y1="54" x2="180" y2="66" />
                    <line x1="480" y1="54" x2="480" y2="66" />
                    
                    {/* Vertical dimension bounds */}
                    <line x1="120" y1="140" x2="120" y2="380" />
                    <line x1="114" y1="140" x2="126" y2="140" />
                    <line x1="114" y1="380" x2="126" y2="380" />
                    
                    {/* Annotation text markings */}
                    <text x="330" y="50" fill="#EA8A22" fontSize="10" fontFamily="monospace" textAnchor="middle" letterSpacing="1" stroke="none">
                      L = 12.00 m
                    </text>
                    <text x="95" y="265" fill="#EA8A22" fontSize="10" fontFamily="monospace" textAnchor="middle" letterSpacing="1" stroke="none" transform="rotate(-90 95 265)">
                      H = 6.40 m
                    </text>
                    
                    {/* Section Cut Line Indicator */}
                    <path d="M 60,200 L 640,200" strokeDasharray="14,4,2,4" strokeWidth="1" />
                    <path d="M 60,192 L 60,208 M 640,192 L 640,208" strokeWidth="1.5" />
                    <text x="50" y="204" fill="#EA8A22" fontSize="11" fontFamily="monospace" fontWeight="bold" stroke="none">S-01</text>
                    <text x="652" y="204" fill="#EA8A22" fontSize="11" fontFamily="monospace" fontWeight="bold" stroke="none">S-01</text>

                    {/* Angular slope annotation */}
                    <path d="M 230,140 A 50,50 0 0,1 265,175" fill="none" strokeWidth="0.75" />
                    <text x="280" y="160" fill="#EA8A22" fontSize="9" fontFamily="monospace" stroke="none">38.6°</text>
                  </g>

                  {/* Pulsing blueprint nodes */}
                  <g fill="#EA8A22" opacity="0.85">
                    <circle cx="180" cy="140" r="3.5" className="bp-pulse-dot" style={{ transformOrigin: '180px 140px' }} />
                    <circle cx="480" cy="140" r="3.5" className="bp-pulse-dot" style={{ transformOrigin: '480px 140px' }} />
                    <circle cx="330" cy="140" r="2.5" className="bp-pulse-dot" style={{ transformOrigin: '330px 140px' }} />
                    <circle cx="180" cy="380" r="3.5" className="bp-pulse-dot" style={{ transformOrigin: '180px 380px' }} />
                    <circle cx="480" cy="380" r="3.5" className="bp-pulse-dot" style={{ transformOrigin: '480px 380px' }} />
                    <circle cx="330" cy="380" r="2.5" className="bp-pulse-dot" style={{ transformOrigin: '330px 380px' }} />
                  </g>
                </svg>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              {/* Left text column */}
              <div className="lg:col-span-7">
                <span className="text-[#EA8A22] font-mono text-xs tracking-[0.25em] font-bold uppercase block mb-3">READY TO START?</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-[1.1]">
                  Let's Build Your <br />Next Project Together
                </h2>
              </div>
              
              {/* Right buttons column */}
              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4">
                <button
                  onClick={() => setQuoteModalOpen(true)}
                  className="w-full px-8 py-5 bg-[#EA8A22] hover:bg-[#EA8A22] text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-xl shadow-[#EA8A22]/20 hover:shadow-[#EA8A22]/40 flex items-center justify-center gap-2 font-mono group"
                >
                  Request a Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button
                  onClick={handleDownloadProfile}
                  disabled={downloadingProfile}
                  className="w-full px-8 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 font-mono group backdrop-blur-sm disabled:opacity-55 cursor-pointer"
                >
                  {downloadingProfile ? (
                    <span className="animate-pulse">Preparing file...</span>
                  ) : downloadSuccess ? (
                    <span className="text-[#EA8A22]">Profile Downloaded ✔</span>
                  ) : (
                    <>
                      Download Company Profile 
                      <FileDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
