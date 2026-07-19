import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Check, 
  X, 
  Download, 
  Layers, 
  ShieldCheck, 
  Activity, 
  Award, 
  HardHat,
  Sparkles,
  ArrowUpRight,
  MapPin,
  Calendar,
  Building,
  Target,
  ChevronDown,
  Sliders,
  Ruler
} from 'lucide-react';
import { projects, Project } from '../data';
import { useQuoteModal } from '../contexts/QuoteContext';
import { InternalPageHero } from '../components/InternalPageHero';

export function ProjectDetails() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const setQuoteModalOpen = useQuoteModal();
  
  // Find current project
  const currentProject = projects.find(p => p.slug === slug) || projects[0];

  // Slider state
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  // Parallax / mouse states
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringHero, setIsHoveringHero] = useState(false);

  // Profile download status
  const [downloadingProfile, setDownloadingProfile] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Specifications consultation form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formTopic, setFormTopic] = useState('General Consultation');
  const [formSpecs, setFormSpecs] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setTimeout(() => {
      setFormSubmitting(false);
      navigate('/thank-you');
    }, 1500);
  };

  // Scroll to top on page or slug change
  useEffect(() => {
    const scroller = document.getElementById('app-scroller');
    if (scroller) {
      scroller.scrollTop = 0;
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Reset index on page change
    setCurrentImgIndex(0);
  }, [slug]);

  // Mouse Parallax Coordinate Generator
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  const handleDownloadProfile = () => {
    setDownloadingProfile(true);
    setTimeout(() => {
      setDownloadingProfile(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1500);
  };

  // Get other projects to show in recommendations
  const otherProjects = projects.filter(p => p.slug !== currentProject.slug).slice(0, 3);

  // Gallery images for the current project
  const projectImages = [
    currentProject.image,
    currentProject.category === 'Commercial'
      ? 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
      : currentProject.category === 'Residential'
      ? 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
      : 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    currentProject.category === 'Industrial'
      ? 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
      : 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80'
  ];

  return (
    <div className="relative bg-white text-neutral-900 min-h-screen">
      
      {/* 1. Hero Header Section */}
      <InternalPageHero
        title={(() => {
          const words = currentProject.name.split(' ');
          if (words.length > 1) {
            const lastWord = words.pop();
            return (
              <>
                {words.join(' ')}{' '}
                <span className="text-[#EA8A22]">{lastWord}</span>
              </>
            );
          }
          return currentProject.name;
        })()}
        categoryBadge="Projects"
        description=""
        heroImage={currentProject.image}
        breadcrumbs={
          <>
            <Link to="/" className="hover:text-[#EA8A22] transition-colors">Home</Link>
            <span className="text-neutral-500">/</span>
            <Link to="/projects" className="hover:text-[#EA8A22] transition-colors">Projects</Link>
            <span className="text-neutral-500">/</span>
            <span className="text-[#264A8A] font-bold uppercase">{currentProject.name}</span>
          </>
        }
      />

      {/* 2. Premium Engineering Project Specification Panel */}
      <section 
        className="relative z-20 bg-white pt-6 pb-0"
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-gradient-to-br from-white via-white to-neutral-50/75 border border-neutral-200/50 rounded-[20px] md:rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.03),0_4px_12px_rgba(0,0,0,0.015)] relative overflow-hidden"
          >
            {/* Subtle blueprint grid engineering overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none font-mono text-[7px] text-neutral-900 select-none">
              {/* Grid axes */}
              <div className="absolute inset-y-0 left-1/4 border-l border-dashed border-neutral-950" />
              <div className="absolute inset-y-0 left-2/4 border-l border-dashed border-neutral-950" />
              <div className="absolute inset-y-0 left-3/4 border-l border-dashed border-neutral-950" />
              <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-neutral-950" />
              
              {/* Architectural CAD crosshairs */}
              <div className="absolute top-3 left-3 border-t border-l border-neutral-950 w-2.5 h-2.5" />
              <div className="absolute top-3 right-3 border-t border-r border-neutral-950 w-2.5 h-2.5" />
              <div className="absolute bottom-3 left-3 border-b border-l border-neutral-950 w-2.5 h-2.5" />
              <div className="absolute bottom-3 right-3 border-b border-r border-neutral-950 w-2.5 h-2.5" />
              
              <div className="absolute top-3 left-8 tracking-widest uppercase">MAABANY ARCHITECTURAL SPEC // VER_2.0</div>
              <div className="absolute bottom-3 right-8 tracking-widest uppercase">SYS_REF: GRID_COORD_DXB</div>
            </div>

            {/* Subtle warm ambient orange glow in the top-right corner */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#EA8A22]/4 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 lg:divide-x lg:divide-y-0 divide-neutral-100/80">
              {[
                {
                  icon: MapPin,
                  label: "Location",
                  value: currentProject.location
                },
                {
                  icon: Building,
                  label: "Category",
                  value: currentProject.category
                },
                {
                  icon: Calendar,
                  label: "Completion Year",
                  value: currentProject.year
                },
                {
                  icon: Target,
                  label: "Project Status",
                  value: "Delivered Successfully"
                }
              ].map((metric, idx) => {
                const IconComponent = metric.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative p-5 md:p-6 lg:p-7 flex flex-col items-center text-center lg:items-start lg:text-left transition-all duration-500 group overflow-hidden hover:bg-neutral-50/40 hover:-translate-y-0.5"
                  >
                    {/* Premium lightweight outline icon */}
                    <div className="mb-3 text-[#EA8A22] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[5deg]">
                      <IconComponent className="w-5.5 h-5.5 stroke-[1.25]" />
                    </div>

                    {/* Small uppercase label with tracking/letter spacing */}
                    <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-neutral-400 mb-1 font-bold">
                      {metric.label}
                    </p>

                    {/* Large bold value or dynamic status label */}
                    {metric.label === "Project Status" ? (
                      <div className="flex flex-col items-center lg:items-start mt-0.5">
                        <div className="flex items-center gap-1.5 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                          <span className="text-xs font-bold tracking-wide text-emerald-600 uppercase">
                            Delivered Successfully
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative inline-block">
                        <h4 className="text-sm md:text-base font-black text-neutral-900 tracking-tight uppercase font-mono group-hover:text-[#EA8A22] transition-colors duration-300">
                          {metric.value}
                        </h4>
                        {/* Animated bottom accent bar */}
                        <div className="h-[1.5px] bg-[#EA8A22] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left mt-0.5 w-8" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Cinematic Multi-Image Layout */}
      <section 
        className="relative z-20 bg-white pt-0 pb-0 -mt-16"
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Primary Large Image (Col-span 12) with Interactive Image Slider */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-12 relative rounded-[28px] overflow-hidden aspect-square md:aspect-[16/10] max-h-[680px] w-full shadow-xl border border-neutral-200/80 bg-neutral-950 group"
            >
              {/* Animated Image Slider */}
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImgIndex}
                  src={projectImages[currentImgIndex]} 
                  alt={`${currentProject.name} Slide ${currentImgIndex + 1}`} 
                  initial={{ opacity: 0, scale: 1.01 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-neutral-950/10 pointer-events-none" />
              
              {/* Slider Left Arrow Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImgIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/90 hover:bg-[#EA8A22] text-neutral-800 hover:text-white shadow-lg transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95 z-20 md:opacity-0 md:group-hover:opacity-100"
                title="Previous image"
              >
                <ChevronLeft className="w-6 h-6 stroke-[2]" />
              </button>

              {/* Slider Right Arrow Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImgIndex((prev) => (prev + 1) % projectImages.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/90 hover:bg-[#EA8A22] text-neutral-800 hover:text-white shadow-lg transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95 z-20 md:opacity-0 md:group-hover:opacity-100"
                title="Next image"
              >
                <ChevronRight className="w-6 h-6 stroke-[2]" />
              </button>

              {/* Lightbox Trigger Icon */}
              <button
                onClick={() => {
                  setIsLightboxOpen(true);
                }}
                className="absolute top-6 right-6 p-3.5 md:p-4 rounded-full bg-white/90 hover:bg-[#EA8A22] text-neutral-800 hover:text-white shadow-lg transition-all duration-300 hover:scale-110 z-20"
                title="Expand fullscreen view"
              >
                <Maximize2 className="w-4.5 h-4.5 md:w-5 md:h-5" />
              </button>

              {/* Text Info (Dynamically changes based on index) */}
              <div className="absolute bottom-8 left-8 text-white z-10 pointer-events-none">
                <h4 className="text-lg md:text-xl font-black font-mono uppercase tracking-tight text-white">
                  {currentProject.name}
                </h4>
              </div>

              {/* Mini Dot Indicators */}
              <div className="absolute bottom-8 right-8 flex items-center gap-1.5 z-20">
                {projectImages.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setCurrentImgIndex(dotIdx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentImgIndex === dotIdx 
                        ? "w-6 bg-[#EA8A22]" 
                        : "w-1.5 bg-white/40 hover:bg-white/70"
                    }`}
                    title={`Slide ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. Project Details: Two-Column Editorial Layout */}
      <section 
        className="bg-white relative pt-4 pb-0 mt-0"
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column (Overview & Detailed Specification) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-8 h-[1px] bg-[#EA8A22]" />
                <span className="text-xs font-mono font-bold text-[#EA8A22] uppercase tracking-widest">
                  CASE STUDY OVERVIEW
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight uppercase leading-none font-mono">
                Delivering High-Precision Engineering Solutions
              </h2>
              
              <div className="text-neutral-700 leading-relaxed font-light text-base md:text-lg space-y-6">
                <p>
                  Every layout element in <strong>{currentProject.name}</strong> was engineered to meet structural, spatial, and functional specifications under a zero-delay plan. Sourced materials and smart HVAC designs ensure that the facility excels in daily operational performance.
                </p>
                <p>
                  At Maabany, we utilize state-of-the-art technologies and robust engineering methodologies to ensure that every stage of our work complies with the highest international protocols of quality, safety, and modern performance standards.
                </p>
              </div>
            </div>

            {/* Right Column (Floating Specification Panel) */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="bg-neutral-50/90 backdrop-blur-xl border border-neutral-200/80 rounded-[24px] p-8 shadow-xl relative overflow-hidden"
              >
                {/* Ambient glow decoration */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#EA8A22]/10 rounded-full blur-2xl pointer-events-none" />
                
                 <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight font-mono mb-6 pb-4 border-b border-neutral-200 flex items-center justify-between">
                  <span>Ask about this Project</span>
                  <Layers className="w-5 h-5 text-[#EA8A22]" />
                </h3>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label htmlFor="spec-name" className="text-[10px] font-mono uppercase tracking-wider text-neutral-600 font-bold block">Your Name *</label>
                      <input
                        id="spec-name"
                        type="text"
                        required
                        placeholder="e.g. Abdullah"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full bg-white border border-neutral-200 focus:border-neutral-400 text-neutral-800 placeholder-neutral-400 p-3 rounded-xl text-sm focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="spec-email" className="text-[10px] font-mono uppercase tracking-wider text-neutral-600 font-bold block">Email Address *</label>
                      <input
                        id="spec-email"
                        type="email"
                        required
                        placeholder="e.g. abdullah@example.com"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full bg-white border border-neutral-200 focus:border-neutral-400 text-neutral-800 placeholder-neutral-400 p-3 rounded-xl text-sm focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="spec-topic" className="text-[10px] font-mono uppercase tracking-wider text-neutral-600 font-bold block">Interest Area</label>
                      <div className="relative">
                        <select
                          id="spec-topic"
                          value={formTopic}
                          onChange={(e) => setFormTopic(e.target.value)}
                          className="w-full bg-white border border-neutral-200 focus:border-neutral-400 text-neutral-700 pl-3 pr-10 py-3 rounded-xl text-sm focus:outline-none transition-colors appearance-none"
                        >
                          <option value="General Consultation">General Question</option>
                          <option value="Material Specifications">Materials used</option>
                          <option value="HVAC & MEP Layouts">System & layout design</option>
                          <option value="Structural Integrity Specs">Structural details</option>
                          <option value="LEED Certification Bids">Sustainability & green standards</option>
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="spec-details" className="text-[10px] font-mono uppercase tracking-wider text-neutral-600 font-bold block">How can we help? (Optional)</label>
                      <textarea
                        id="spec-details"
                        rows={3}
                        placeholder="What would you like to know about this project?"
                        value={formSpecs}
                        onChange={(e) => setFormSpecs(e.target.value)}
                        className="w-full bg-white border border-neutral-200 focus:border-neutral-400 text-neutral-800 placeholder-neutral-400 p-3 rounded-xl text-sm focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="w-full mt-4 py-3.5 bg-[#EA8A22] hover:bg-[#df7d1a] disabled:bg-neutral-200 text-white font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-md shadow-[#EA8A22]/20 cursor-pointer"
                    >
                      {formSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Recommended Projects Grid */}
      <section 
        className="bg-neutral-50 border-t border-neutral-200 pt-12 pb-0"
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[#264A8A] font-mono text-xs tracking-[0.2em] font-bold uppercase block mb-3">MORE PROJECTS</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 tracking-tight uppercase leading-none font-mono">
                Other Completed Works
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherProjects.map((p, index) => (
              <div
                key={p.slug}
                className="group bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:border-[#EA8A22] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col relative cursor-pointer"
              >
                <Link to={`/projects/${p.slug}`} className="absolute inset-0 z-20" />
                
                <div className="h-48 overflow-hidden relative">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                  
                  {/* Category Badge overlay */}
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-200/80 shadow-sm">
                    <span className="text-[10px] font-mono text-[#264A8A] font-bold uppercase">
                      {p.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="text-base font-bold text-neutral-900 uppercase font-mono transition-colors group-hover:text-[#EA8A22] line-clamp-1">{p.name}</h4>
                    <p className="text-xs text-neutral-500 font-light mt-2 line-clamp-2 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. CTA Banner */}
      <section 
        className="relative bg-neutral-50 overflow-hidden py-12"
      >
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
              <div className="lg:col-span-7">
                <span className="text-[#EA8A22] font-mono text-xs tracking-[0.2em] font-bold uppercase block mb-4">READY TO START?</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-[1.1]">
                  Let's Build Your <br />Next Project Together
                </h2>
              </div>
              
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
                      <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8 select-none"
          >
            {/* Close button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-neutral-900/80 border border-neutral-800 text-white hover:bg-[#EA8A22] hover:border-[#EA8A22] transition-all duration-300 z-50 hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left navigation arrow */}
            <button
              onClick={() => setCurrentImgIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length)}
              className="absolute left-4 md:left-8 p-3 rounded-full bg-neutral-900/60 border border-neutral-800 text-white hover:bg-[#EA8A22] hover:border-[#EA8A22] transition-all duration-300 z-50 hover:scale-110"
              title="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right navigation arrow */}
            <button
              onClick={() => setCurrentImgIndex((prev) => (prev + 1) % projectImages.length)}
              className="absolute right-4 md:right-8 p-3 rounded-full bg-neutral-900/60 border border-neutral-800 text-white hover:bg-[#EA8A22] hover:border-[#EA8A22] transition-all duration-300 z-50 hover:scale-110"
              title="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Frame */}
            <motion.div
              key={currentImgIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[75vh] w-full h-full flex flex-col items-center justify-center"
            >
              <img
                src={projectImages[currentImgIndex]}
                alt={`${currentProject.name} Fullscreen view ${currentImgIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              />
            </motion.div>

            {/* Image Indicators */}
            <div className="mt-6 flex gap-3 z-50">
              {projectImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImgIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === currentImgIndex ? 'bg-[#EA8A22] w-8' : 'bg-neutral-700 hover:bg-neutral-500'
                  }`}
                  title={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes sweep {
          0% { transform: translateX(-150%) skewX(-25deg); }
          100% { transform: translateX(300%) skewX(-25deg); }
        }
      `}</style>
    </div>
  );
}
