import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useQuoteModal } from '../contexts/QuoteContext';
import { 
  ArrowRight, ArrowUpRight, Sparkles, FileDown, Briefcase, Clock, Award, HardHat, Settings, ChevronLeft, ChevronRight,
  Building2, Cpu, Shield, Network, Wrench
} from 'lucide-react';
import { InternalPageHero } from '../components/InternalPageHero';
import { detailSolutions } from '../data';
import { FloatingWireframe } from '../components/FloatingWireframe';

const getCategoryIcon = (slug: string) => {
  if (slug === 'civil-solutions') return Building2;
  if (slug === 'fit-out-solutions') return Sparkles;
  if (slug === 'electromechanical-solutions') return Wrench;
  if (slug === 'low-current-solutions') return Network;
  if (slug === 'facility-management') return Briefcase;
  return Settings;
};

const getSubcategoryIcon = (slug: string) => {
  if (slug.includes('building') || slug.includes('structure') || slug.includes('residential') || slug.includes('commercial') || slug.includes('industrial')) {
    return Building2;
  }
  if (slug.includes('fire') || slug.includes('alarm')) {
    return Shield;
  }
  if (slug.includes('hvac') || slug.includes('plumbing') || slug.includes('drainage') || slug.includes('water')) {
    return Wrench;
  }
  if (slug.includes('cctv') || slug.includes('surveillance') || slug.includes('access') || slug.includes('security')) {
    return Shield;
  }
  if (slug.includes('network') || slug.includes('data')) {
    return Network;
  }
  if (slug.includes('smart') || slug.includes('home') || slug.includes('automation')) {
    return Cpu;
  }
  if (slug.includes('parking') || slug.includes('payment') || slug.includes('kiosk')) {
    return Settings;
  }
  return Settings;
};

export function Solutions() {
  const setQuoteModalOpen = useQuoteModal();
  const [downloadingProfile, setDownloadingProfile] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  const handleDownloadProfile = () => {
    setDownloadingProfile(true);
    setTimeout(() => {
      setDownloadingProfile(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1500);
  };

  const solutionsCards = [
    { icon: Briefcase, value: '20+ Services', label: 'Engineering Capabilities' },
    { icon: Clock, value: '24/7 Support', label: 'Technical Operations' },
    { icon: Award, value: 'Certified', label: 'Engineers & Operators' }
  ];

  const solutions = [
    {
      title: "Civil Solutions",
      slug: "civil-solutions",
      desc: "Delivering comprehensive civil construction services for residential, commercial, and industrial projects with a focus on quality, safety, and long-term durability.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
      subcategories: [
        { title: "Commercial Buildings", slug: "commercial-buildings", desc: "State-of-the-art office towers, retail complexes, and commercial facilities." },
        { title: "Residential Buildings", slug: "residential-buildings", desc: "Luxury residential estates, modern multi-family complexes, and sustainable communities." },
        { title: "Industrial Buildings & Warehouses", slug: "industrial-buildings-warehouses", desc: "Robotic gigafactories, logistics centers, and heavy-duty industrial warehouses." },
        { title: "Prefabricated Steel Structures", slug: "prefabricated-steel-structures", desc: "High-precision pre-engineered and prefabricated steel frame systems." }
      ]
    },
    {
      title: "Fit-Out Solutions",
      slug: "fit-out-solutions",
      desc: "Creating functional and premium interior spaces through complete fit-out solutions, from structural finishes to high-quality architectural detailing.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      subcategories: []
    },
    {
      title: "Electromechanical Solutions",
      slug: "electromechanical-solutions",
      desc: "Providing integrated Mechanical, Electrical, and Plumbing (MEP) systems that ensure efficient, reliable, and sustainable building performance.",
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80",
      subcategories: [
        { title: "Fire Fighting Systems", slug: "fire-fighting-systems", desc: "Active fire suppression, smart sprinklers, and early warning alarm networks." },
        { title: "HVAC Systems", slug: "hvac-systems", desc: "High-performance heating, ventilation, and air conditioning systems." },
        { title: "Plumbing", slug: "plumbing", desc: "Comprehensive plumbing engineering, water loops, and smart drainage." }
      ]
    },
    {
      title: "Low Current Solutions",
      slug: "low-current-solutions",
      desc: "Delivering intelligent low-current systems including security, surveillance, networking, access control, parking management, and smart automation to create safer, smarter, and more connected buildings.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      subcategories: [
        { title: "CCTV Systems", slug: "cctv-systems", desc: "High-definition video surveillance and intelligent analytics for physical spaces." },
        { title: "Data Network Solutions", slug: "data-network-solutions", desc: "Fast, secure, and robust enterprise networking backbones." },
        { title: "Access Control Systems", slug: "access-control-systems", desc: "Comprehensive entry management featuring biometrics and RFID tracking." },
        { title: "Parking Management Systems", slug: "parking-management-systems", desc: "Automated entry barriers, smart payment kiosks, and guidance lasers." },
        { title: "Smart Home Solutions", slug: "smart-home-solutions", desc: "Seamless smart home systems unifying climate, lighting, and audio." }
      ]
    },
    {
      title: "Facility Management",
      slug: "facility-management",
      desc: "Providing comprehensive facility management services that maximize building performance through preventive maintenance, technical operations, and efficient asset management.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
      subcategories: []
    }
  ];

  const totalPages = Math.ceil(solutions.length / itemsPerPage);
  const paginatedSolutions = solutions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const element = document.getElementById('what-we-offer-grid-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const renderPaginationRange = () => {
    const range: (number | string)[] = [];
    const maxVisiblePages = 3;
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) range.push(i);
    } else {
      if (currentPage <= maxVisiblePages) {
        for (let i = 1; i <= 4; i++) range.push(i);
        range.push('...');
        range.push(totalPages);
      } else if (currentPage > totalPages - maxVisiblePages) {
        range.push(1);
        range.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) range.push(i);
      } else {
        range.push(1);
        range.push('...');
        range.push(currentPage - 1);
        range.push(currentPage);
        range.push(currentPage + 1);
        range.push('...');
        range.push(totalPages);
      }
    }
    return range;
  };

  return (
    <div className="relative bg-white text-neutral-900 min-h-screen">
      {/* 1. Hero Header Section */}
      <InternalPageHero
        title={<>Engineering <br /> <span className="text-[#EA8A22]">Solutions</span></>}
        categoryBadge="Solutions"
        categoryIcon={Settings}
        description=""
        heroImage="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1920&q=80"
        cards={solutionsCards}
      />

      {/* 2. Solutions Grid */}
      <section id="what-we-offer-grid-section" className="py-12 md:py-20 lg:py-24 bg-white relative overflow-hidden">
        {/* Decorative Floating 3D Wireframes */}
        <div className="absolute -left-12 top-24 w-72 h-72 opacity-15 pointer-events-none hidden xl:block">
          <FloatingWireframe shape="dome" className="w-full h-full" color="#264A8A" />
        </div>
        <div className="absolute -right-12 bottom-36 w-72 h-72 opacity-15 pointer-events-none hidden xl:block">
          <FloatingWireframe shape="icosahedron" className="w-full h-full" color="#EA8A22" />
        </div>

        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#264A8A] font-mono text-xs tracking-[0.2em] font-bold uppercase block mb-4">WHAT WE OFFER</span>
              <h2 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tighter uppercase leading-[1.1] mb-6">
                Integrated Engineering Solutions
              </h2>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {selectedCategory ? (
              <motion.div
                key="subcategories-view"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                {/* Back bar and Category Title header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 pb-8 border-b border-neutral-200">
                  <div className="space-y-4">
                    <h3 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tighter uppercase font-mono">
                      {selectedCategory.title} <span className="text-[#EA8A22]">Sub-Services</span>
                    </h3>
                  </div>
                </div>

                {/* Subcategories grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                  {selectedCategory.subcategories.map((sub: any, sIdx: number) => {
                    const IconComponent = getSubcategoryIcon(sub.slug);
                    const matchingDetail = detailSolutions.find(d => d.slug === sub.slug);
                    const subImage = matchingDetail?.image || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80";
                    return (
                      <motion.div
                        key={sub.slug}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: sIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="group bg-white rounded-[32px] border border-neutral-200/85 hover:border-[#EA8A22] shadow-sm hover:shadow-[0_25px_50px_rgba(234,88,12,0.1)] hover:-translate-y-2 transition-all duration-700 flex flex-col sm:flex-row relative min-h-[300px] overflow-hidden"
                      >
                        <Link to={`/solutions/${sub.slug}`} className="absolute inset-0 z-30" />
                        
                        {/* 1. Stunning Image Left Frame */}
                        <div className="relative w-full sm:w-[42%] h-56 sm:h-auto overflow-hidden bg-neutral-900 flex-shrink-0">
                          <img 
                            src={subImage} 
                            alt={sub.title} 
                            className="w-full h-full object-cover group-hover:scale-[1.12] transition-transform duration-[1200ms] ease-[0.16,1,0.3,1]"
                          />
                          {/* Rich overlays & dynamic tech gradient mask */}
                          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-neutral-950/80 via-neutral-950/30 to-transparent opacity-90 transition-opacity duration-500" />
                          <div className="absolute inset-0 bg-[#EA8A22]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                          
                          {/* Floated Glass Tag */}
                          <div className="absolute top-4 left-4 z-20 bg-neutral-900/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#EA8A22] animate-pulse" />
                            <span className="text-[9px] font-mono font-bold tracking-widest text-neutral-200 uppercase">
                              0{sIdx + 1}
                            </span>
                          </div>

                          {/* Technical drawing vertical line on hover */}
                          <div className="absolute top-0 right-0 w-[1px] h-0 bg-[#EA8A22] group-hover:h-full transition-all duration-700" />
                        </div>

                        {/* 2. Info Right Frame */}
                        <div className="p-8 sm:p-9 flex-1 flex flex-col justify-center relative bg-white group-hover:bg-neutral-50/30 transition-colors duration-500 overflow-hidden">
                          {/* Blueprint background grid accent on hover */}
                          <div className="absolute inset-0 bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:16px_16px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
                          
                          {/* Corner alignment crosshairs on hover */}
                          <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-neutral-300 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                          <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-neutral-300 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                          
                          {/* Large Ghost Serial Number */}
                          <div className="absolute -bottom-10 -right-6 text-[150px] font-mono font-black text-neutral-500/[0.015] group-hover:text-[#EA8A22]/[0.035] select-none pointer-events-none transition-colors duration-500 leading-none">
                            0{sIdx + 1}
                          </div>

                          <div className="space-y-4 relative z-10">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono font-black text-[#EA8A22] tracking-widest uppercase">
                                SUB-SERVICE // MAABANY
                              </span>
                              <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100 text-neutral-400 group-hover:text-[#EA8A22] group-hover:bg-[#EA8A22]/10 group-hover:border-[#EA8A22]/20 transition-all duration-500">
                                <IconComponent className="w-4 h-4" />
                              </div>
                            </div>
                            
                            <h4 className="text-lg sm:text-xl font-black text-neutral-900 uppercase font-mono tracking-tight group-hover:text-[#EA8A22] transition-colors leading-tight">
                              {sub.title}
                            </h4>
                            
                            <p className="text-neutral-500 font-light text-xs sm:text-sm leading-relaxed max-w-xl">
                              {sub.desc}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="categories-view"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16"
              >
                {paginatedSolutions.map((solution, idx) => {
                  const hasSubs = solution.subcategories.length > 0;
                  const IconComp = getCategoryIcon(solution.slug);
                  const globalIdx = (currentPage - 1) * itemsPerPage + idx;
                  return (
                    <motion.div
                      key={solution.title}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.7, delay: idx * 0.1 }}
                      className={`group bg-white rounded-[24px] overflow-hidden border border-neutral-200 shadow-sm hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(234,88_12,0.08)] transition-all duration-500 relative flex flex-col cursor-pointer ${idx % 2 !== 0 ? 'md:mt-16' : ''}`}
                      onClick={() => {
                        if (hasSubs) {
                          setSelectedCategory(solution);
                          const element = document.getElementById('what-we-offer-grid-section');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                      }}
                    >
                      {!hasSubs && (
                        <Link to={`/solutions/${solution.slug}`} className="absolute inset-0 z-30" />
                      )}
                      
                      {/* Thin orange border on hover */}
                      <div className="absolute inset-0 border-[1px] border-[#EA8A22] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[24px] z-20 pointer-events-none" />
                      <div className="absolute inset-0 bg-[#EA8A22]/0 group-hover:bg-[#EA8A22]/5 transition-colors duration-500 z-10 pointer-events-none" />
                      
                      <div className="relative h-64 sm:h-80 overflow-hidden">
                        <img 
                           src={solution.image} 
                          alt={solution.title} 
                          className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/0 opacity-80" />
                      </div>
                      
                      <div className="p-8 md:p-10 flex-1 flex flex-col justify-center relative z-10 bg-white transition-transform duration-500 overflow-hidden">
                        {/* Blueprint background grid accent on hover */}
                        <div className="absolute inset-0 bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:16px_16px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

                        {/* Large, elegant ghost number behind contents */}
                        <div className="absolute -bottom-10 -right-4 text-[150px] font-mono font-black text-neutral-500/[0.02] group-hover:text-[#EA8A22]/[0.03] select-none pointer-events-none transition-colors duration-500 leading-none">
                          0{globalIdx + 1}
                        </div>

                        <div className="relative z-10">
                          {/* Sub-services count indicator badge */}
                          <div className="mb-4">
                            {hasSubs ? (
                              <span className="text-[10px] font-mono font-bold bg-[#EA8A22]/10 text-[#EA8A22] px-3 py-1 rounded-md uppercase tracking-wider">
                                {solution.subcategories.length} Sub-Services Available
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono font-bold bg-neutral-100 text-neutral-500 px-3 py-1 rounded-md uppercase tracking-wider">
                                Comprehensive Direct Solution
                              </span>
                            )}
                          </div>

                          <h3 className="text-2xl md:text-3xl font-black text-neutral-900 tracking-tighter uppercase mb-4 font-mono transition-colors group-hover:text-[#EA8A22]">
                            {solution.title}
                          </h3>
                          <p className="text-neutral-600 leading-relaxed font-light mb-0 text-sm sm:text-base">
                            {solution.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Pagination Footer section */}
      {!selectedCategory && totalPages > 1 && (
        <div className="mt-8 flex justify-center pb-24">
          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-full border border-neutral-200 shadow-sm w-fit">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-9 h-9 flex items-center justify-center rounded-full text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-neutral-600 transition-all cursor-pointer"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {renderPaginationRange().map((page, index) => {
              if (page === '...') {
                return (
                  <span 
                    key={`ellipsis-${index}`} 
                    className="w-9 h-9 flex items-center justify-center text-neutral-400 font-mono text-xs"
                  >
                    ...
                  </span>
                );
              }

              return (
                <button
                  key={`page-${page}`}
                  onClick={() => handlePageChange(Number(page))}
                  className={`w-9 h-9 flex items-center justify-center rounded-full font-mono font-bold text-xs transition-all ${
                    currentPage === page
                      ? 'bg-[#EA8A22] text-white shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 cursor-pointer'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-full text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-neutral-600 transition-all cursor-pointer"
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 5. CTA Banner Section */}
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
                  className="w-full px-8 py-5 bg-[#EA8A22] hover:bg-[#EA8A22] text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-xl shadow-[#EA8A22]/20 hover:shadow-[#EA8A22]/40 flex items-center justify-center gap-2 font-mono group whitespace-nowrap shrink-0"
                >
                  Request a Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button
                  onClick={handleDownloadProfile}
                  disabled={downloadingProfile}
                  className="w-full px-8 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 font-mono group backdrop-blur-sm disabled:opacity-55 cursor-pointer whitespace-nowrap shrink-0"
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
