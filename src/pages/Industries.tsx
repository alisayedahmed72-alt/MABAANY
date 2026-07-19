import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Home, 
  HeartPulse, 
  Hotel, 
  Factory, 
  Milestone, 
  GraduationCap, 
  Compass, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  ChevronDown, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  Award, 
  Settings, 
  Plus, 
  Trash2, 
  Eye, 
  Grid,
  CheckCircle2
} from 'lucide-react';
import { useQuoteModal } from '../contexts/QuoteContext';
import { InternalPageHero } from '../components/InternalPageHero';
import { FloatingWireframe } from '../components/FloatingWireframe';
import { CountryFlag } from '../components/CountryFlag';

// Define the industry item schema for the CMS
interface IndustryItem {
  id: string;
  name: string;
  description: string;
  images: string[]; // empty is Scenario 1, single is Scenario 2, multiple is Scenario 3
  displayOrder: number;
  featured: boolean;
  icon: React.ComponentType<any>;
}

export function Industries() {
  const navigate = useNavigate();
  const openGlobalQuoteModal = useQuoteModal();

  const industriesCards = [
    { icon: Grid, value: '8+ Sectors', label: 'Specialized Markets' },
    { icon: Settings, value: 'Custom Built', label: 'Adaptive Systems' },
    { icon: ShieldCheck, value: 'ISO Compliant', label: 'Quality Standards' }
  ];

  // Scroll to top of scroller container on mount
  useEffect(() => {
    const scroller = document.getElementById('app-scroller');
    if (scroller) {
      scroller.scrollTo({ top: 0, behavior: 'instant' as any });
    }
  }, []);

  // Default premium image pool for fallback scenarios
  const defaultImages = {
    commercial: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    residential: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    healthcare: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    hospitality: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    industrial: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    government: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=800&q=80',
    education: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    infrastructure: 'https://images.unsplash.com/photo-1473876988266-ca0860a443b8?auto=format&fit=crop&w=800&q=80'
  };

  // Initial CMS state list of 8 pre-seeded industries
  const [industries, setIndustries] = useState<IndustryItem[]>([
    {
      id: 'commercial',
      name: 'Commercial Buildings',
      description: 'Modern office towers, mixed-use developments, retail centers, and commercial complexes built to international engineering standards.',
      images: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80'
      ], // Scenario 3: Multiple Images
      displayOrder: 1,
      featured: true,
      icon: Building2
    },
    {
      id: 'residential',
      name: 'Residential Developments',
      description: 'Luxury villas, residential compounds, apartment buildings, and integrated housing communities designed for long-term performance.',
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
      ], // Scenario 2: Single Image
      displayOrder: 2,
      featured: true,
      icon: Home
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      description: 'Hospitals, medical centers, laboratories, and healthcare facilities requiring advanced engineering systems and specialized infrastructure.',
      images: [
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'
      ], // Scenario 2: Single Image
      displayOrder: 3,
      featured: true,
      icon: HeartPulse
    },
    {
      id: 'hospitality',
      name: 'Hospitality',
      description: 'Hotels, resorts, restaurants, and hospitality developments combining premium finishes with reliable engineering solutions.',
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80'
      ], // Scenario 3: Multiple Images
      displayOrder: 4,
      featured: false,
      icon: Hotel
    },
    {
      id: 'industrial',
      name: 'Industrial Facilities',
      description: 'Factories, warehouses, logistics centers, and manufacturing facilities engineered for efficiency, durability, and operational excellence.',
      images: [
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
      ], // Scenario 2: Single Image
      displayOrder: 5,
      featured: true,
      icon: Factory
    },
    {
      id: 'government',
      name: 'Government & Public Sector',
      description: 'Government buildings, municipal facilities, and public infrastructure projects delivered according to strict engineering and quality standards.',
      images: [
        'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=800&q=80'
      ], // Scenario 2: Single Image
      displayOrder: 6,
      featured: false,
      icon: Compass
    },
    {
      id: 'education',
      name: 'Education',
      description: 'Schools, universities, educational campuses, and research facilities that support modern learning environments.',
      images: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80'
      ], // Scenario 3: Multiple Images
      displayOrder: 7,
      featured: false,
      icon: GraduationCap
    },
    {
      id: 'infrastructure',
      name: 'Infrastructure',
      description: 'Infrastructure projects including roads, utility networks, public services, and large-scale civil engineering developments.',
      images: [
        'https://images.unsplash.com/photo-1473876988266-ca0860a443b8?auto=format&fit=crop&w=800&q=80'
      ], // Scenario 2: Single Image
      displayOrder: 8,
      featured: true,
      icon: Milestone
    }
  ]);

  // Collapsible CMS visual configuration panel
  const [cmsPanelOpen, setCmsPanelOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // States for adding a new industry via CMS Panel
  const [newIndName, setNewIndName] = useState('');
  const [newIndDesc, setNewIndDesc] = useState('');
  const [newIndScenario, setNewIndScenario] = useState<'1' | '2' | '3'>('2');
  const [newIndFeatured, setNewIndFeatured] = useState(false);

  // Interactive Carousel Auto-play Indexes
  const [carouselIndices, setCarouselIndices] = useState<Record<string, number>>({});

  // Auto-play interval for carousels
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndices(prev => {
        const next = { ...prev };
        industries.forEach(ind => {
          if (ind.images.length > 1) {
            const currentIdx = prev[ind.id] || 0;
            next[ind.id] = (currentIdx + 1) % ind.images.length;
          }
        });
        return next;
      });
    }, 4500);
    return () => clearInterval(timer);
  }, [industries]);

  // Next and Prev handlers for manual slide control
  const handleNextSlide = (e: React.MouseEvent, id: string, max: number) => {
    e.stopPropagation();
    e.preventDefault();
    setCarouselIndices(prev => ({
      ...prev,
      [id]: ((prev[id] || 0) + 1) % max
    }));
  };

  const handlePrevSlide = (e: React.MouseEvent, id: string, max: number) => {
    e.stopPropagation();
    e.preventDefault();
    setCarouselIndices(prev => ({
      ...prev,
      [id]: ((prev[id] || 0) - 1 + max) % max
    }));
  };



  // CMS functions
  const handleAddIndustry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIndName.trim() || !newIndDesc.trim()) return;

    let images: string[] = [];
    const baseFallback = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';
    if (newIndScenario === '2') {
      images = [baseFallback];
    } else if (newIndScenario === '3') {
      images = [
        baseFallback,
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80'
      ];
    }

    const newId = 'custom-' + Date.now();
    const newInd: IndustryItem = {
      id: newId,
      name: newIndName,
      description: newIndDesc,
      images,
      displayOrder: industries.length + 1,
      featured: newIndFeatured,
      icon: Building2
    };

    setIndustries(prev => [...prev, newInd]);
    setNewIndName('');
    setNewIndDesc('');
    setNewIndScenario('2');
    setNewIndFeatured(false);
  };

  const handleDeleteIndustry = (id: string) => {
    setIndustries(prev => prev.filter(ind => ind.id !== id));
  };

  const handleToggleFeatured = (id: string) => {
    setIndustries(prev => prev.map(ind => ind.id === id ? { ...ind, featured: !ind.featured } : ind));
  };

  const handleOrderChange = (id: string, dir: 'up' | 'down') => {
    const idx = industries.findIndex(ind => ind.id === id);
    if (idx === -1) return;
    const newOrder = [...industries];
    if (dir === 'up' && idx > 0) {
      const temp = newOrder[idx];
      newOrder[idx] = newOrder[idx - 1];
      newOrder[idx - 1] = temp;
    } else if (dir === 'down' && idx < industries.length - 1) {
      const temp = newOrder[idx];
      newOrder[idx] = newOrder[idx + 1];
      newOrder[idx + 1] = temp;
    }
    setIndustries(newOrder);
  };

  // Inline Quote Form State
  const [phoneCountryCode, setPhoneCountryCode] = useState('+966');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: 'Commercial Buildings',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleFormValidation = () => {
    const tempErrors: Record<string, string> = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = 'Full Name is required';
      isValid = false;
    }
    if (!formData.email.trim()) {
      tempErrors.email = 'Email Address is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone Number is required';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (handleFormValidation()) {
      navigate('/thank-you');
    }
  };

  return (
    <div className="bg-white min-h-screen pb-12 selection:bg-[#EA8A22] selection:text-white">
      
      {/* 1. HERO HEADER */}
      <InternalPageHero
        title={<>Solutions Across <br /> <span className="text-[#EA8A22]">Industries</span></>}
        categoryBadge="Industries We Serve"
        categoryIcon={Building2}
        description=""
        heroImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80"
        cards={industriesCards}
      />



      {/* 3. INDUSTRIES GRID */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8 py-12 md:py-20 lg:py-24 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <h2 className="text-3xl md:text-4.5xl font-black text-neutral-900 uppercase tracking-tight">
            Industries We Proudly Serve
          </h2>
        </div>

        {/* Dynamic Editorial Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind, index) => {
            const fallbackImage = defaultImages[ind.id as keyof typeof defaultImages] || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';
            const displayImages = ind.images && ind.images.length > 0 ? ind.images : [fallbackImage];
            const isSingle = displayImages.length === 1;
            const isCarousel = displayImages.length > 1;
            const currentIdx = carouselIndices[ind.id] || 0;

            // Simple index offsets to produce subtle editorial height variations
            const dynamicHeightClass = index % 3 === 0 
              ? 'lg:pt-0' 
              : index % 3 === 1 
              ? 'lg:pt-6' 
              : 'lg:pt-12';

            return (
              <motion.div
                key={ind.id}
                className={`flex flex-col ${dynamicHeightClass}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white border border-neutral-200 rounded-[28px] overflow-hidden shadow-xl shadow-neutral-100 hover:shadow-2xl hover:border-[#EA8A22] transition-all duration-300 flex flex-col justify-between h-full group relative">
                  
                  {/* Absolute Link Overlay covering the whole card */}
                  <Link to={`/industries/${ind.id}`} className="absolute inset-0 z-20" />
                  
                  {/* Card Media Top Portion */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden shrink-0 bg-neutral-100">
                    
                    {/* Single Image */}
                    {isSingle && (
                      <div className="w-full h-full relative">
                        <img 
                          src={displayImages[0]} 
                          alt={ind.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/20 to-transparent" />
                      </div>
                    )}

                    {/* Multiple Custom Images (Carousel mode) */}
                    {isCarousel && (
                      <div className="w-full h-full relative">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={currentIdx}
                            src={displayImages[currentIdx]}
                            alt={`${ind.name} Slide ${currentIdx}`}
                            initial={{ opacity: 0.8 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0.8 }}
                            transition={{ duration: 0.4 }}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </AnimatePresence>

                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent" />

                        {/* Carousel Navigation buttons - z-30 to remain clickable above the link overlay */}
                        <button
                          onClick={(e) => handlePrevSlide(e, ind.id, displayImages.length)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-neutral-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md border border-neutral-100 cursor-pointer z-30"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>

                        <button
                          onClick={(e) => handleNextSlide(e, ind.id, displayImages.length)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-neutral-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md border border-neutral-100 cursor-pointer z-30"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>

                        {/* Carousel Pagination Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                          {displayImages.map((_, sIdx) => (
                            <span 
                              key={sIdx}
                              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${sIdx === currentIdx ? 'bg-[#EA8A22] w-3' : 'bg-white/60'}`}
                            />
                          ))}
                        </div>

                      </div>
                    )}

                  </div>

                  {/* Card Content Portion */}
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <h3 className="text-lg md:text-xl font-black text-neutral-950 uppercase tracking-tight transition-colors">
                        {ind.name}
                      </h3>

                      <p className="text-xs text-neutral-500 font-light leading-relaxed line-clamp-3">
                        {ind.description}
                      </p>
                    </div>

                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </section>

      {/* 4. INDUSTRY DETAILS SECTION */}
      <section className="bg-neutral-50/50 border-t border-b border-neutral-200/60 py-12 md:py-20 lg:py-24 relative overflow-hidden">
        {/* Floating 3D Hyperboloid Tower */}
        <div className="absolute -right-16 bottom-16 w-80 h-80 opacity-15 pointer-events-none hidden xl:block">
          <FloatingWireframe shape="tower" className="w-full h-full" color="#264A8A" />
        </div>

        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Why Maabany and Feature Cards */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <span className="text-[#264A8A] font-mono text-[10px] uppercase font-black tracking-widest block">
                  WHY MAABANY
                </span>
                <h2 className="text-3xl md:text-4.5xl font-black text-neutral-900 uppercase tracking-tight">
                  Tailored Engineering for Every Sector
                </h2>
              </div>

              {/* 4 Feature Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="p-5 bg-white border border-neutral-200 rounded-2xl shadow-sm hover:border-[#EA8A22] transition-colors group flex flex-col justify-between">
                  <div>
                    <div className="relative h-36 w-full overflow-hidden rounded-xl mb-4 bg-neutral-100">
                      <img 
                        src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80" 
                        alt="Industry-Specific Expertise" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm text-[#EA8A22] flex items-center justify-center shadow-sm">
                        <Cpu className="w-4 h-4" />
                      </div>
                    </div>
                    <h4 className="text-xs font-bold uppercase tracking-tight text-neutral-950">
                      Industry-Specific Expertise
                    </h4>
                    <p className="text-[11px] text-neutral-500 font-light mt-1.5 leading-relaxed">
                      Custom built architectural, structural, and MEP setups matching strict regulatory guidelines.
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-white border border-neutral-200 rounded-2xl shadow-sm hover:border-[#EA8A22] transition-colors group flex flex-col justify-between">
                  <div>
                    <div className="relative h-36 w-full overflow-hidden rounded-xl mb-4 bg-neutral-100">
                      <img 
                        src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80" 
                        alt="Certified Engineering Teams" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm text-[#EA8A22] flex items-center justify-center shadow-sm">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                    </div>
                    <h4 className="text-xs font-bold uppercase tracking-tight text-neutral-950">
                      Certified Engineering Teams
                    </h4>
                    <p className="text-[11px] text-neutral-500 font-light mt-1.5 leading-relaxed">
                      ISO certified designers, LEED AP consultants, and regional civil project managers.
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-white border border-neutral-200 rounded-2xl shadow-sm hover:border-[#EA8A22] transition-colors group flex flex-col justify-between">
                  <div>
                    <div className="relative h-36 w-full overflow-hidden rounded-xl mb-4 bg-neutral-100">
                      <img 
                        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80" 
                        alt="International Standards" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm text-[#EA8A22] flex items-center justify-center shadow-sm">
                        <Award className="w-4 h-4" />
                      </div>
                    </div>
                    <h4 className="text-xs font-bold uppercase tracking-tight text-neutral-950">
                      International Standards
                    </h4>
                    <p className="text-[11px] text-neutral-500 font-light mt-1.5 leading-relaxed">
                      Rigorous structural security tests, carbon-negative materials, and 100% compliant security safety.
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-white border border-neutral-200 rounded-2xl shadow-sm hover:border-[#EA8A22] transition-colors group flex flex-col justify-between">
                  <div>
                    <div className="relative h-36 w-full overflow-hidden rounded-xl mb-4 bg-neutral-100">
                      <img 
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" 
                        alt="End-to-End Delivery" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm text-[#EA8A22] flex items-center justify-center shadow-sm">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    </div>
                    <h4 className="text-xs font-bold uppercase tracking-tight text-neutral-950">
                      End-to-End Delivery
                    </h4>
                    <p className="text-[11px] text-neutral-500 font-light mt-1.5 leading-relaxed">
                      From pre-construction site feasibility to interior finishes and full-cycle facility management.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Premium Collage / Floating Graphic */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/60 bg-neutral-150 aspect-[4/5] max-w-sm mx-auto group">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" 
                  alt="Industrial municipal construction planning"
                  className="w-full h-full object-cover grayscale brightness-95 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />

                {/* Overlaid stats card with elegant micro-shadows */}
                <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
                  <span className="text-[10px] font-mono font-bold text-[#EA8A22] tracking-wider uppercase block">
                    SAUDI VISION 2030 PARTNER
                  </span>
                  <p className="text-xs font-black text-neutral-900 uppercase tracking-tight mt-1">
                    Certified Tier-1 Infrastructure Contractor
                  </p>
                  <p className="text-[10px] text-neutral-500 font-light mt-1 leading-relaxed">
                    Connecting Egypt, Saudi Arabia, and Libya with premium sustainable engineering networks.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. CTA BANNER WITH INTEGRATED QUOTE FORM */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8 py-12 md:py-20 lg:py-24">
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

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Information */}
            <div className="lg:col-span-6 space-y-5">
              <span className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#EA8A22] uppercase font-black">
                <Sparkles className="w-4 h-4 text-[#EA8A22]" />
                <span>READY TO START?</span>
              </span>
              <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-[1.1] max-w-xl">
                Let's Build Your <br />Next Project Together
              </h3>
            </div>

            {/* Right Column Glassmorphic Request a Quote Form */}
            <div className="lg:col-span-6 w-full max-w-lg mx-auto">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-6 md:p-8 rounded-[24px] shadow-2xl relative overflow-hidden text-neutral-900">
                
                <AnimatePresence mode="wait">
                    <motion.form
                      key="quote-form"
                      onSubmit={handleQuoteSubmit}
                      className="space-y-4 relative z-10"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h4 className="text-xs font-mono font-bold text-[#EA8A22] tracking-wider uppercase mb-2">
                        Get a Free Quote
                      </h4>

                      {/* Name */}
                      <div>
                        <label htmlFor="quote-name" className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">Full Name *</label>
                        <input
                          id="quote-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`w-full bg-neutral-50 border p-3.5 rounded-xl text-sm focus:outline-none focus:bg-white text-neutral-800 placeholder-neutral-400 focus:ring-0 transition-all ${
                            errors.name ? 'border-red-400 focus:ring-red-400' : 'border-neutral-200 focus:border-neutral-400 focus:ring-0'
                          }`}
                          placeholder="Your full name"
                        />
                        {errors.name && <p className="text-[9px] text-red-400 font-mono pl-1 mt-0.5">{errors.name}</p>}
                      </div>

                      {/* Company Name (Optional) */}
                      <div>
                        <label htmlFor="quote-company" className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">Company Name (Optional)</label>
                        <input
                          id="quote-company"
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full bg-neutral-50 border border-neutral-200 p-3.5 rounded-xl text-sm focus:outline-none focus:bg-white text-neutral-800 placeholder-neutral-400 focus:border-neutral-400 focus:ring-0 transition-all"
                          placeholder="Your company name"
                        />
                      </div>

                      {/* Email & Phone Twin Column Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        <div>
                          <label htmlFor="quote-email" className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">Email Address *</label>
                          <input
                            id="quote-email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`w-full bg-neutral-50 border p-3.5 rounded-xl text-sm focus:outline-none focus:bg-white text-neutral-800 placeholder-neutral-400 focus:ring-0 transition-all ${
                              errors.email ? 'border-red-400 focus:ring-red-400' : 'border-neutral-200 focus:border-neutral-400 focus:ring-0'
                            }`}
                            placeholder="your.email@example.com"
                          />
                          {errors.email && <p className="text-[9px] text-red-400 font-mono pl-1 mt-0.5">{errors.email}</p>}
                        </div>

                        <div>
                          <label htmlFor="quote-phone" className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">Phone Number *</label>
                          <div className={`relative flex items-center bg-neutral-50 border rounded-xl transition-all duration-200 w-full ${
                            errors.phone 
                              ? 'border-red-400 bg-white focus-within:border-red-400' 
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
                              id="quote-phone"
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="flex-1 bg-transparent p-3.5 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none"
                              placeholder="50 123 4567"
                            />
                          </div>
                          {errors.phone && <p className="text-[9px] text-red-400 font-mono pl-1 mt-0.5">{errors.phone}</p>}
                        </div>

                      </div>

                      {/* Project Type Dropdown */}
                      <div>
                        <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">Project Type *</label>
                        <div className="relative">
                          <select
                            value={formData.projectType}
                            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                            className="w-full bg-neutral-50 border border-neutral-200 pl-3.5 pr-10 py-3.5 rounded-xl text-sm focus:outline-none focus:bg-white text-neutral-800 placeholder-neutral-400 focus:border-neutral-400 focus:ring-0 appearance-none"
                          >
                            {industries.map(ind => (
                              <option key={ind.id} value={ind.name}>{ind.name}</option>
                            ))}
                          </select>
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {/* Message (Optional) */}
                      <div>
                        <label htmlFor="quote-msg" className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">How can we help? (Optional)</label>
                        <textarea
                          id="quote-msg"
                          rows={2}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-neutral-50 border border-neutral-200 p-3.5 rounded-xl text-sm focus:outline-none focus:bg-white text-neutral-800 placeholder-neutral-400 focus:border-neutral-400 focus:ring-0 resize-none"
                          placeholder="Tell us a bit about your project..."
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        className="w-full py-3.5 bg-[#EA8A22] hover:bg-[#EA8A22] text-white font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#EA8A22]/15 cursor-pointer text-center"
                      >
                        Send My Request
                      </button>

                    </motion.form>
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
