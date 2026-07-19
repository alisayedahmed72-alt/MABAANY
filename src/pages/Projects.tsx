import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Grid, 
  Layers,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  FileDown,
  Building,
  CheckCircle,
  HelpCircle,
  Sparkles,
  ArrowUpRight,
  Users,
  Award,
  Building2
} from 'lucide-react';
import { projects, Project } from '../data';
import { useQuoteModal } from '../contexts/QuoteContext';
import { InternalPageHero } from '../components/InternalPageHero';
import { InteractiveBlueprint } from '../components/InteractiveBlueprint';

export function Projects() {
  const setQuoteModalOpen = useQuoteModal();
  
  // States
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(6);
  const [hasLoadedMore, setHasLoadedMore] = useState<boolean>(false);
  const [paginationMode, setPaginationMode] = useState<'pagination' | 'loadmore'>('pagination');
  const [downloadingProfile, setDownloadingProfile] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const projectCards = [
    { icon: Building2, value: '250+ Completed', label: 'Mega Projects' },
    { icon: Users, value: '98% Rating', label: 'Satisfaction Index' },
    { icon: Award, value: 'Award Winning', label: 'Engineering Honors' }
  ];

  // Scroll to top on load/filter/page change
  useEffect(() => {
    const scroller = document.getElementById('app-scroller');
    if (scroller) {
      scroller.scrollTop = 0;
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedCategory, currentPage, paginationMode]);

  // Categories extraction
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  // Filter projects
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  // Pagination Logic
  const totalItems = filteredProjects.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Slice projects depending on pagination vs loadmore
  const displayedProjects = paginationMode === 'pagination'
    ? filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : filteredProjects.slice(0, hasLoadedMore ? totalItems : itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate pagination items with ellipses
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

  const handleDownloadProfile = () => {
    setDownloadingProfile(true);
    setTimeout(() => {
      setDownloadingProfile(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="relative bg-white text-neutral-900 min-h-screen selection:bg-[#EA8A22] selection:text-white">
      
      {/* 1. Hero Header Section */}
      <InternalPageHero
        title={<>Engineering Excellence <br /> <span className="text-[#EA8A22]">Projects</span></>}
        categoryBadge="Our Projects"
        categoryIcon={Building2}
        description=""
        heroImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
        cards={projectCards}
      />

      {/* 3. Our Projects Section */}
      <section className="pt-[104px] pb-12 md:pb-20 lg:pb-24 bg-white" id="projects-section">
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8">
          
          {/* Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-[104px]">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2">
                <span className="w-8 h-[1px] bg-[#EA8A22]" />
                <span className="text-xs font-mono font-bold text-[#264A8A] uppercase tracking-widest">
                  OUR PROJECTS
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight uppercase font-mono">
                Completed Projects
              </h2>
              <p className="text-neutral-600 text-base md:text-lg font-light leading-relaxed">
                Discover a selection of engineering and construction projects successfully delivered by Maabany across multiple sectors, demonstrating our expertise, precision, and commitment to excellence.
              </p>
            </div>
            
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-[450px]"
              >
                <InteractiveBlueprint />
              </motion.div>
            </div>
          </div>

          {/* Premium Category Filter Bar */}
          <div className="mb-12 flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-full border border-neutral-200 shadow-sm w-fit">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                  setHasLoadedMore(false);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#EA8A22] text-white'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Editorial Masonry-Style Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((proj, idx) => {
                // Alternating card heights to establish an elegant editorial masonry layout
                const isTall = idx % 3 === 1;
                
                return (
                  <motion.div
                    key={proj.slug}
                    layout
                    initial={{ opacity: 0, y: 60, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 100, 
                      damping: 18,
                      delay: (idx % 3) * 0.08
                    }}
                    className={`group bg-white rounded-[24px] overflow-hidden border border-neutral-100 hover:border-[#EA8A22] shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col relative ${
                      isTall ? 'lg:translate-y-6' : ''
                    }`}
                    style={{ height: isTall ? '540px' : '490px' }}
                  >
                    {/* Link to details (simulated with standard state or custom page slug routing) */}
                    <Link to={`/projects/${proj.slug}`} className="absolute inset-0 z-20" />
                    
                    {/* Thin Orange border on hover */}
                    <div className="absolute inset-0 border-[2.5px] border-[#EA8A22]/0 group-hover:border-[#EA8A22] transition-colors duration-500 rounded-[24px] pointer-events-none z-30" />

                    {/* Image Area - occupies ~65% of card */}
                    <div className="relative overflow-hidden w-full h-[62%] bg-neutral-950">
                      <img 
                        src={proj.image} 
                        alt={proj.name} 
                        className="w-full h-full object-cover filter brightness-[0.9] group-hover:scale-108 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      {/* Gradient overlay on image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Top Category Badge */}
                      <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-200/80 shadow-sm">
                        <span className="text-[10px] font-mono text-[#264A8A] font-bold uppercase">
                          {proj.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Area - occupies rest */}
                    <div className="p-6 md:p-7 flex-1 flex flex-col justify-center">
                      <div className="relative z-10">
                        <h3 className="text-xl font-bold text-neutral-900 uppercase font-mono transition-colors duration-300 line-clamp-1 group-hover:text-[#EA8A22]">
                          {proj.name}
                        </h3>
                        <p className="text-xs text-neutral-500 font-light mt-2 line-clamp-3 leading-relaxed">
                          {proj.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20 bg-neutral-50 rounded-3xl border border-neutral-200">
              <Layers className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-lg font-bold uppercase font-mono text-neutral-700">No projects found</p>
              <p className="text-sm text-neutral-500 mt-1">There are no completed projects in the "{selectedCategory}" category.</p>
            </div>
          )}

          {/* 4. Pagination / Load More Footer section */}
          {filteredProjects.length > 0 && (
            <div className="mt-20 flex justify-center">
              {paginationMode === 'pagination' ? (
                // CLASSIC PAGINATION
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
              ) : (
                // LOAD MORE BUTTON
                !hasLoadedMore && filteredProjects.length > itemsPerPage && (
                  <button
                    onClick={() => setHasLoadedMore(true)}
                    className="px-8 py-4 bg-neutral-900 hover:bg-[#EA8A22] text-white text-xs font-mono font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md hover:scale-105 active:scale-95 flex items-center gap-2"
                  >
                    Load More Projects
                    <motion.div
                      animate={{ y: [0, 3, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    >
                      <ChevronRight className="w-4 h-4 rotate-90" />
                    </motion.div>
                  </button>
                )
              )}
            </div>
          )}

        </div>
      </section>

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
