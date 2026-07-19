import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Check, 
  Download, 
  Layers, 
  ShieldCheck, 
  Activity, 
  Award, 
  HardHat,
  Sparkles,
  ArrowUpRight,
  AlertCircle,
  Send
} from 'lucide-react';
import { detailSolutions, DetailSolution } from '../data';
import { useQuoteModal } from '../contexts/QuoteContext';
import { InternalPageHero } from '../components/InternalPageHero';
import { CountryFlag } from '../components/CountryFlag';

export function SolutionDetails() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const setQuoteModalOpen = useQuoteModal();
  
  // Find current solution
  const currentSolution = detailSolutions.find(s => s.slug === slug) || detailSolutions[0];

  // Dynamic Contact & Project Inquiry Form States
  const [phoneCountryCode, setPhoneCountryCode] = useState('+966');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsFormSubmitting(true);
    setTimeout(() => {
      setIsFormSubmitting(false);
      navigate('/thank-you');
    }, 1500);
  };

  // Gallery simulation states
  // Scenario can be: 'default' (uses multiple images), 'single' (uses 1 image), 'none' (uses 0 images/fallback)
  
  
  // Slider states
  
  
  
  
  // Parallax / mouse states
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringHero, setIsHoveringHero] = useState(false);

  // Profile download status
  const [downloadingProfile, setDownloadingProfile] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Auto-play timer ref
  

  // Scroll to top on page or slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
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

  // Get other solutions to show in the recommendations grid
  const otherSolutions = React.useMemo(() => {
    // Groups definitions
    const civilGroup = ['civil-solutions', 'commercial-buildings', 'residential-buildings', 'industrial-buildings-warehouses', 'prefabricated-steel-structures'];
    const fitOutGroup = ['fit-out-solutions'];
    const mepGroup = ['electromechanical-solutions', 'mep-solutions', 'fire-fighting-systems', 'hvac-systems', 'plumbing'];
    const lowCurrentGroup = ['low-current-solutions', 'light-current-solutions', 'cctv-systems', 'data-network-solutions', 'access-control-systems', 'parking-management-systems', 'smart-home-solutions'];
    const fmGroup = ['facility-management'];

    // Determine current active group
    let currentGroup: string[] = [];
    if (civilGroup.includes(slug || '')) currentGroup = civilGroup;
    else if (mepGroup.includes(slug || '')) currentGroup = mepGroup;
    else if (lowCurrentGroup.includes(slug || '')) currentGroup = lowCurrentGroup;
    else if (fitOutGroup.includes(slug || '')) currentGroup = fitOutGroup;
    else if (fmGroup.includes(slug || '')) currentGroup = fmGroup;

    // Filter detailSolutions
    // If the active solution is part of a multi-item group, show other items in that same group first
    let related = detailSolutions.filter(s => s.slug !== slug && currentGroup.includes(s.slug));

    // Exclude duplicates or aliases from recommendations
    related = related.filter(s => {
      if (s.slug === 'mep-solutions' && slug !== 'electromechanical-solutions') return false;
      if (s.slug === 'light-current-solutions' && slug !== 'low-current-solutions') return false;
      return true;
    });

    // If we have fewer than 4 related items, pad with the main solution categories
    if (related.length < 4) {
      const mainSlugs = ['civil-solutions', 'fit-out-solutions', 'electromechanical-solutions', 'low-current-solutions', 'facility-management'];
      const mains = detailSolutions.filter(s => 
        s.slug !== slug && 
        mainSlugs.includes(s.slug) && 
        !currentGroup.includes(s.slug)
      );
      related = [...related, ...mains];
    }

    return related.slice(0, 4);
  }, [slug]);

  // Swipe gesture tracking variables
  let touchStartX = 0;
  let touchEndX = 0;



  const handleSwipe = () => {
    const threshold = 50;
    if (touchStartX - touchEndX > threshold) {
      // Swipe Left (Next Image)
    } else if (touchEndX - touchStartX > threshold) {
      // Swipe Right (Previous Image)
    }
  };

  return (
    <div className="relative bg-white text-neutral-900 min-h-screen">
      
      {/* 1. Hero Header Section */}
      <InternalPageHero
        title={currentSolution.title}
        categoryBadge="Solutions"
        heroImage={currentSolution.image}
        breadcrumbs={
          <>
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/solutions">Solutions</Link>
            <span>/</span>
            <span>{currentSolution.title}</span>
          </>
        }
      />

      {/* 2. Scenario Interactive Selector Panel (UX Detail for Testing) */}

      {/* 3. Image Gallery Component (REMOVED AS PER USER REQUEST) */}

      {/* 4. Solution Description: Two-Column Editorial Layout */}
      <section className="py-12 md:py-20 lg:py-24 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column (Overview & Description) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-8 h-[1px] bg-[#EA8A22]" />
                <span className="text-xs font-mono font-bold text-[#EA8A22] uppercase tracking-widest">
                  OVERVIEW
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight uppercase leading-none font-mono">
                {currentSolution.aboutTitle}
              </h2>
              
              <div className="text-neutral-700 leading-relaxed font-light text-base md:text-lg space-y-6">
                <p>{currentSolution.aboutDesc}</p>
                <p>
                  At Maabany, we utilize state-of-the-art technologies and robust engineering methodologies to ensure that every stage of our work complies with the highest international protocols of quality, safety, and modern performance standards.
                </p>
              </div>

            </div>

            {/* Right Column (Interactive Inquiry Form Card - Glassmorphism style) */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <div className="bg-neutral-50/95 backdrop-blur-xl border border-neutral-200/80 rounded-[24px] p-8 md:p-10 shadow-xl relative overflow-hidden">
                {/* Ambient glow decoration */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#EA8A22]/10 rounded-full blur-2xl pointer-events-none" />
                
                <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight font-mono mb-2 pb-2 border-b border-neutral-200/60 flex items-center justify-between">
                  <span>Ask about this Solution</span>
                  <Send className="w-5 h-5 text-[#EA8A22]" />
                </h3>
                
                <p className="text-xs text-neutral-500 font-light mb-6 leading-relaxed">
                  We're here to help. Complete the form and our experts will contact you soon.
                </p>

                <AnimatePresence mode="wait">
                    <motion.form
                      key="solution-inquiry-form"
                      onSubmit={handleFormSubmit}
                      className="space-y-4"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wide">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          placeholder="e.g. Khalid Al-Otaibi"
                          className={`w-full bg-neutral-50 border p-3.5 rounded-xl text-sm focus:outline-none focus:bg-white text-neutral-800 placeholder-neutral-400 focus:ring-0 transition-all duration-200 shadow-sm ${
                            formErrors.name 
                              ? 'border-red-500 focus:ring-red-500' 
                              : 'border-neutral-200 focus:border-neutral-400'
                          }`}
                        />
                        {formErrors.name && (
                          <p className="text-red-500 text-[10px] flex items-center gap-1 mt-0.5">
                            <AlertCircle className="w-3 h-3" /> {formErrors.name}
                          </p>
                        )}
                      </div>

                      {/* Contact Info (Grid on Desktop, Stacked on Mobile) */}
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                        {/* Email Address */}
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wide">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            placeholder="e.g. name@example.com"
                            className={`w-full bg-neutral-50 border p-3.5 rounded-xl text-sm focus:outline-none focus:bg-white text-neutral-800 placeholder-neutral-400 focus:ring-0 transition-all duration-200 shadow-sm ${
                              formErrors.email 
                                ? 'border-red-500 focus:ring-red-500' 
                                : 'border-neutral-200 focus:border-neutral-400'
                            }`}
                          />
                          {formErrors.email && (
                            <p className="text-red-500 text-[10px] flex items-center gap-1 mt-0.5">
                              <AlertCircle className="w-3 h-3" /> {formErrors.email}
                            </p>
                          )}
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wide">
                            Phone Number *
                          </label>
                          <div className={`relative flex items-center bg-neutral-50 border rounded-xl transition-all duration-200 w-full shadow-sm ${
                            formErrors.phone 
                              ? 'border-red-500 bg-white focus-within:border-red-500' 
                              : 'border-neutral-200 focus-within:border-neutral-400 focus-within:bg-white'
                          }`}>
                            <div className="flex items-center gap-1.5 pl-3.5 pr-2 border-r border-neutral-200 select-none shrink-0">
                              <CountryFlag countryCode={phoneCountryCode} />
                              <select
                                value={phoneCountryCode}
                                onChange={(e) => setPhoneCountryCode(e.target.value)}
                                className="bg-transparent border-none text-xs font-mono text-neutral-600 focus:ring-0 focus:outline-none cursor-pointer p-0 pr-4 appearance-none font-bold"
                                style={{ backgroundImage: 'none' }}
                              >
                                <option value="+966">+966</option>
                                <option value="+20">+20</option>
                                <option value="+218">+218</option>
                                <option value="+971">+971</option>
                              </select>
                            </div>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleFormChange}
                              placeholder="50 123 4567"
                              className="flex-1 bg-transparent p-3.5 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none"
                            />
                          </div>
                          {formErrors.phone && (
                            <p className="text-red-500 text-[10px] flex items-center gap-1 mt-0.5">
                              <AlertCircle className="w-3 h-3" /> {formErrors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Brief Message / Scope Details */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wide">
                          How can we help? (Optional)
                        </label>
                        <textarea
                          name="message"
                          rows={3}
                          value={formData.message}
                          onChange={handleFormChange}
                          placeholder="Tell us what you'd like to know or discuss..."
                          className="w-full bg-neutral-50 border border-neutral-200 focus:border-neutral-400 p-3.5 rounded-xl text-sm focus:outline-none focus:bg-white text-neutral-800 placeholder-neutral-400 focus:ring-0 transition-all duration-200 shadow-sm resize-none"
                        />
                      </div>

                      {/* Action Button */}
                      <button
                        type="submit"
                        disabled={isFormSubmitting}
                        className="w-full mt-2 py-4 bg-[#EA8A22] hover:bg-neutral-900 text-white font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-md cursor-pointer disabled:opacity-50"
                      >
                        {isFormSubmitting ? (
                          <span className="animate-pulse">Sending...</span>
                        ) : (
                          <>
                            Send Message <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </motion.form>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Other Services Section */}
      <section className="py-12 md:py-20 lg:py-24 bg-neutral-50 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#264A8A] font-mono text-xs tracking-[0.2em] font-bold uppercase block mb-3">DISCOVER MORE</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tighter uppercase leading-none font-mono">
                Explore Related Solutions
              </h2>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherSolutions.map((sol, index) => (
              <motion.div
                key={sol.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden border border-neutral-200 hover:border-[#EA8A22] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col relative"
              >
                {/* Trigger entire card click */}
                <Link to={`/solutions/${sol.slug}`} className="absolute inset-0 z-20" />
                
                {/* Thin orange border and lighting on hover */}
                <div className="absolute inset-0 border-2 border-[#EA8A22]/0 group-hover:border-[#EA8A22] transition-colors duration-500 rounded-3xl pointer-events-none z-30" />
                
                {/* Image */}
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={sol.image} 
                    alt={sol.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-neutral-900/10 pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 uppercase font-mono transition-colors group-hover:text-[#EA8A22] line-clamp-1 mb-2">
                      {sol.title}
                    </h3>
                    
                    <p className="text-xs text-neutral-600 font-light leading-relaxed line-clamp-4">
                      {sol.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. CTA Banner */}
      <section className="py-12 md:py-20 lg:py-24 relative bg-neutral-50 overflow-hidden mt-12 z-10">
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
                  className="w-full px-8 py-5 bg-[#EA8A22] hover:bg-[#EA8A22] text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-xl shadow-[#EA8A22]/20 hover:shadow-[#EA8A22]/40 flex items-center justify-center gap-2 font-mono group cursor-pointer"
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

      

      <style>{`
        @keyframes sweep {
          0% { transform: translateX(-150%) skewX(-25deg); }
          100% { transform: translateX(300%) skewX(-25deg); }
        }
      `}</style>
    </div>
  );
}
