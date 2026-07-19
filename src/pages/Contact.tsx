import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Check, 
  CheckCircle, 
  ArrowRight, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Navigation,
  Globe,
  Building2,
  Users,
  Shield,
  Sparkles,
  ArrowUpRight,
  Award
} from 'lucide-react';
import { useQuoteModal } from '../contexts/QuoteContext';
import { InternalPageHero } from '../components/InternalPageHero';
import { FloatingWireframe } from '../components/FloatingWireframe';
import { CountryFlag } from '../components/CountryFlag';

interface OfficeBranch {
  id: string;
  country: string;
  flag: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  embedQuery: string;
}

export function Contact() {
  const navigate = useNavigate();
  const openGlobalQuoteModal = useQuoteModal();

  const contactCards = [
    { icon: Clock, value: '12h Response', label: 'Maximum Reply Time' },
    { icon: MapPin, value: '3 Branches', label: 'Egypt, KSA & Libya' },
    { icon: Shield, value: 'ISO Certified', label: 'Design & Engineering' }
  ];

  // Scroll to top on load
  useEffect(() => {
    const scroller = document.getElementById('app-scroller');
    if (scroller) {
      scroller.scrollTo({ top: 0, behavior: 'instant' as any });
    }
  }, []);

  // Office branches CMS configuration
  const offices: OfficeBranch[] = [
    {
      id: 'egypt',
      country: 'Egypt',
      flag: '🇪🇬',
      city: 'New Cairo',
      address: 'Plot 12, Sector 1, Fifth Settlement, New Cairo, Egypt',
      phone: '+20 2 2345 6789',
      email: 'info@maabany.com',
      hours: 'Sunday – Thursday\n9:00 AM – 5:00 PM',
      embedQuery: 'Fifth Settlement, New Cairo, Egypt'
    },
    {
      id: 'ksa',
      country: 'Kingdom of Saudi Arabia',
      flag: '🇸🇦',
      city: 'Riyadh',
      address: 'Tower B, 18th Floor, King Fahd Road, Al Olaya, Riyadh, KSA',
      phone: '+966 11 456 7890',
      email: 'ksa@maabany.com',
      hours: 'Sunday – Thursday\n8:00 AM – 5:00 PM',
      embedQuery: 'King Fahd Road, Al Olaya, Riyadh, Saudi Arabia'
    },
    {
      id: 'libya',
      country: 'Libya',
      flag: '🇱🇾',
      city: 'Tripoli',
      address: 'Al Andalus District, Gargarish Road, Tripoli, Libya',
      phone: '+218 21 360 1234',
      email: 'libya@maabany.com',
      hours: 'Sunday – Thursday\n8:00 AM – 4:00 PM',
      embedQuery: 'Al Andalus District, Tripoli, Libya'
    }
  ];

  // Dynamic zoom levels for each of the three maps (stored independently in React state)
  const [zoomEgypt, setZoomEgypt] = useState<number>(14);
  const [zoomKSA, setZoomKSA] = useState<number>(14);
  const [zoomLibya, setZoomLibya] = useState<number>(14);

  const getZoomValue = (id: string) => {
    if (id === 'egypt') return zoomEgypt;
    if (id === 'ksa') return zoomKSA;
    return zoomLibya;
  };

  const handleZoomIn = (id: string) => {
    if (id === 'egypt') setZoomEgypt(prev => Math.min(prev + 1, 19));
    else if (id === 'ksa') setZoomKSA(prev => Math.min(prev + 1, 19));
    else setZoomLibya(prev => Math.min(prev + 1, 19));
  };

  const handleZoomOut = (id: string) => {
    if (id === 'egypt') setZoomEgypt(prev => Math.max(prev - 1, 10));
    else if (id === 'ksa') setZoomKSA(prev => Math.max(prev - 1, 10));
    else setZoomLibya(prev => Math.max(prev - 1, 10));
  };

  // Contact Form State
  const [phoneCountryCode, setPhoneCountryCode] = useState('+966');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: ''
  });

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

  // Focused state for floating labels
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleValidation = () => {
    const tempErrors = { name: '', email: '', phone: '' };
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (handleValidation()) {
      navigate('/thank-you');
    }
  };

  const trustIndicators = [
    { icon: Clock, title: 'Fast Response', desc: 'Consultants respond within 12 business hours' },
    { icon: Users, title: 'Professional Engineering Team', desc: 'ISO certified design & structural planning' },
    { icon: Award, title: 'Customized Solutions', desc: 'Tailored construction and MEP specifications' },
    { icon: Globe, title: 'Multi-country Support', desc: 'Operating seamlessly in Egypt, Saudi Arabia, & Libya' }
  ];

  return (
    <div className="bg-white min-h-screen pb-12 selection:bg-[#EA8A22] selection:text-white">
      
      {/* 1. HERO HEADER */}
      <InternalPageHero
        title={<>Let's <span className="text-[#EA8A22]">Connect</span></>}
        categoryBadge="Contact Us"
        categoryIcon={Mail}
        description=""
        heroImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
        cards={contactCards}
      />

      {/* 2. GLOBAL OFFICES SECTION */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8 py-12 md:py-20 lg:py-24 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[#264A8A] font-mono text-[10px] uppercase font-black tracking-widest block">
            OUR LOCATIONS
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-neutral-900 uppercase tracking-tight">
            Visit or Contact Our Offices
          </h2>
        </div>

        {/* Office Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offices.map((office) => {
            const currentZoom = getZoomValue(office.id);
            const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(office.embedQuery)}&t=&z=${currentZoom}&ie=UTF8&iwloc=&output=embed`;
            
            return (
              <motion.div
                key={office.id}
                className="bg-white border border-neutral-200/90 rounded-[28px] overflow-hidden shadow-xl shadow-neutral-100 flex flex-col justify-between group hover:border-[#EA8A22] transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                {/* Office Details Portion */}
                <div className="p-8 space-y-6">
                  {/* Flag & Country Header */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" role="img" aria-label={office.country}>{office.flag}</span>
                    <div>
                      <h3 className="font-mono text-[10px] tracking-widest text-[#EA8A22] uppercase font-black">BRANCH</h3>
                      <h4 className="text-lg font-black text-neutral-900 uppercase tracking-tight">{office.country}</h4>
                    </div>
                  </div>

                  {/* Info lines with Premium Icons */}
                  <div className="space-y-4 pt-2">
                    {/* Address */}
                    <div className="flex items-start gap-3.5 text-xs">
                      <div className="p-1.5 bg-neutral-50 rounded-lg text-neutral-500 mt-0.5 group-hover:bg-[#EA8A22]/10 group-hover:text-[#EA8A22] transition-colors shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-mono text-[9px] uppercase font-bold text-neutral-400 tracking-wider">Office Address</p>
                        <p className="text-neutral-700 font-light leading-relaxed">{office.address}</p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-3.5 text-xs">
                      <div className="p-1.5 bg-neutral-50 rounded-lg text-neutral-500 mt-0.5 group-hover:bg-[#EA8A22]/10 group-hover:text-[#EA8A22] transition-colors shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-mono text-[9px] uppercase font-bold text-neutral-400 tracking-wider">Phone Line</p>
                        <p className="text-neutral-900 font-semibold">{office.phone}</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-3.5 text-xs">
                      <div className="p-1.5 bg-neutral-50 rounded-lg text-neutral-500 mt-0.5 group-hover:bg-[#EA8A22]/10 group-hover:text-[#EA8A22] transition-colors shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-mono text-[9px] uppercase font-bold text-neutral-400 tracking-wider">Inquiries Email</p>
                        <a href={`mailto:${office.email}`} className="text-[#EA8A22] hover:underline font-medium">{office.email}</a>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start gap-3.5 text-xs">
                      <div className="p-1.5 bg-neutral-50 rounded-lg text-neutral-500 mt-0.5 group-hover:bg-[#EA8A22]/10 group-hover:text-[#EA8A22] transition-colors shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-mono text-[9px] uppercase font-bold text-neutral-400 tracking-wider">Working Hours</p>
                        <p className="text-neutral-600 font-light whitespace-pre-line">{office.hours}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Map Component Container */}
                <div className="px-6 pb-6 relative shrink-0">
                  <div className="relative h-60 rounded-2xl overflow-hidden border border-neutral-200/60 bg-neutral-100 shadow-inner group-hover:shadow-md transition-all duration-300">
                    
                    {/* The Iframe Embed */}
                    <iframe
                      src={mapUrl}
                      className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      title={`${office.country} Map View`}
                    />

                    {/* Custom Float Pin Overlay inside map (mock visuals) */}
                    <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded text-[9px] font-mono text-neutral-500 border border-neutral-200/60 shadow-sm flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#EA8A22] animate-ping" />
                      <span>GPS Active ({currentZoom}x)</span>
                    </div>

                    {/* Interactive Zoom Overlay Controls */}
                    <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-1.5">
                      <button
                        onClick={() => handleZoomIn(office.id)}
                        className="w-8 h-8 rounded-lg bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200 shadow-md flex items-center justify-center cursor-pointer active:scale-95 transition-all"
                        title="Zoom In"
                      >
                        <ZoomIn className="w-4 h-4 text-neutral-700" />
                      </button>
                      <button
                        onClick={() => handleZoomOut(office.id)}
                        className="w-8 h-8 rounded-lg bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200 shadow-md flex items-center justify-center cursor-pointer active:scale-95 transition-all"
                        title="Zoom Out"
                      >
                        <ZoomOut className="w-4 h-4 text-neutral-700" />
                      </button>
                    </div>
                  </div>

                  {/* Get Directions External Button link */}
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(office.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="w-full mt-4 py-3 bg-neutral-50 hover:bg-[#EA8A22]/10 border border-neutral-200 hover:border-[#EA8A22]/30 rounded-xl text-neutral-800 hover:text-[#EA8A22] text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer select-none"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. CONTACT FORM SECTION WITH SPLIT LAYOUT */}
      <section className="bg-neutral-50/50 border-t border-b border-neutral-200/60 py-12 md:py-20 lg:py-24 relative overflow-hidden">
        {/* Floating 3D Geodesic Sphere */}
        <div className="absolute -left-16 bottom-16 w-80 h-80 opacity-15 pointer-events-none hidden xl:block">
          <FloatingWireframe shape="icosahedron" className="w-full h-full" color="#264A8A" />
        </div>

        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Title & Trust Indicators */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-[#264A8A] font-mono text-[10px] uppercase font-black tracking-widest block">
                  SEND A MESSAGE
                </span>
                <h2 className="text-2xl md:text-4xl font-black text-neutral-900 uppercase tracking-tight">
                  We're Ready to Help
                </h2>
                <p className="text-sm text-neutral-500 font-light mt-2 max-w-sm">
                  We're here to help. Complete the form and our experts will contact you soon.
                </p>
              </div>

              {/* Trust Indicators Cards Grid */}
              <div className="space-y-4 max-w-md">
                {trustIndicators.map((indicator, idx) => (
                  <motion.div 
                    key={idx} 
                    whileHover={{ 
                      x: 6, 
                      scale: 1.02, 
                      boxShadow: "0 20px 40px -15px rgba(234, 138, 34, 0.15)" 
                    }}
                    className="flex items-start gap-4 p-5 bg-white border border-neutral-200 rounded-2xl transition-all duration-300 relative group overflow-hidden cursor-default"
                  >
                    {/* Left subtle vertical accent line */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#EA8A22] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                    
                    <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-150 text-[#EA8A22] flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 group-hover:bg-[#EA8A22] group-hover:text-white group-hover:border-[#EA8A22] group-hover:rotate-3 group-hover:scale-105 shadow-sm group-hover:shadow-[#EA8A22]/20">
                      {React.createElement(indicator.icon, { className: 'w-5 h-5' })}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-950 uppercase tracking-tight group-hover:text-[#EA8A22] transition-colors duration-200">
                        {indicator.title}
                      </h4>
                      <p className="text-[11px] text-neutral-500 font-light mt-0.5 leading-relaxed">
                        {indicator.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column: Dynamic Form Block */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-neutral-200 rounded-[32px] p-8 md:p-12 shadow-2xl shadow-neutral-100 relative overflow-hidden">
                {/* Accent visual background grid */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-[#EA8A22]/5 rounded-bl-[120px] pointer-events-none" />
                <div className="absolute inset-0 bg-grid-light opacity-5 pointer-events-none" />

                <AnimatePresence mode="wait">
                    <motion.form
                      key="contact-view-form"
                      onSubmit={handleFormSubmit}
                      className="space-y-6 relative z-10"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Name input with dynamic premium label animation */}
                      <div className="relative space-y-1">
                        <label 
                          htmlFor="name" 
                          className={`absolute left-4 top-3 px-1 transition-all duration-200 pointer-events-none text-xs ${
                            focusedField === 'name' || formData.name
                              ? '-translate-y-6 scale-90 text-[#EA8A22] bg-white font-mono font-bold'
                              : 'text-neutral-400'
                          }`}
                        >
                          Full Name *
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`w-full bg-neutral-50 border p-3.5 rounded-xl text-sm focus:outline-none focus:bg-white text-neutral-800 placeholder-neutral-400 focus:ring-0 transition-all shadow-sm ${
                            errors.name ? 'border-red-400 focus:ring-red-400' : 'border-neutral-200 focus:border-neutral-400 focus:ring-0'
                          }`}
                        />
                        {errors.name && <p className="text-[10px] text-red-500 font-mono pl-1">{errors.name}</p>}
                      </div>

                      {/* Email Address */}
                      <div className="relative space-y-1">
                        <label 
                          htmlFor="email" 
                          className={`absolute left-4 top-3 px-1 transition-all duration-200 pointer-events-none text-xs ${
                            focusedField === 'email' || formData.email
                              ? '-translate-y-6 scale-90 text-[#EA8A22] bg-white font-mono font-bold'
                              : 'text-neutral-400'
                          }`}
                        >
                          Email Address *
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full bg-neutral-50 border p-3.5 rounded-xl text-sm focus:outline-none focus:bg-white text-neutral-800 placeholder-neutral-400 focus:ring-0 transition-all shadow-sm ${
                            errors.email ? 'border-red-400 focus:ring-red-400' : 'border-neutral-200 focus:border-neutral-400 focus:ring-0'
                          }`}
                        />
                        {errors.email && <p className="text-[10px] text-red-500 font-mono pl-1">{errors.email}</p>}
                      </div>

                      {/* Phone Number */}
                      <div className="relative space-y-1">
                        <label 
                          htmlFor="phone" 
                          className={`absolute top-3 px-1 transition-all duration-200 pointer-events-none text-xs z-10 ${
                            focusedField === 'phone' || formData.phone
                              ? '-translate-y-6 scale-90 text-[#EA8A22] bg-white font-mono font-bold'
                              : 'text-neutral-400'
                          }`}
                          style={{ left: focusedField === 'phone' || formData.phone ? '16px' : '108px' }}
                        >
                          Phone Number *
                        </label>
                        <div className="relative flex items-center bg-neutral-50 border border-neutral-200 focus-within:border-neutral-400 focus-within:bg-white rounded-xl transition-all w-full shadow-sm">
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
                            id="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onFocus={() => setFocusedField('phone')}
                            onBlur={() => setFocusedField(null)}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="flex-1 bg-transparent p-3.5 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none"
                          />
                        </div>
                        {errors.phone && <p className="text-[10px] text-red-500 font-mono pl-1">{errors.phone}</p>}
                      </div>

                      {/* Message optional */}
                      <div className="relative space-y-1">
                        <label 
                          htmlFor="message" 
                          className={`absolute left-4 top-3 px-1 transition-all duration-200 pointer-events-none text-xs ${
                            focusedField === 'message' || formData.message
                              ? '-translate-y-6 scale-90 text-[#EA8A22] bg-white font-mono font-bold'
                              : 'text-neutral-400'
                          }`}
                        >
                          Message (Optional)
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          value={formData.message}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-neutral-50 border border-neutral-200 p-3.5 rounded-xl text-sm focus:outline-none focus:bg-white text-neutral-800 placeholder-neutral-400 focus:border-neutral-400 focus:ring-0 transition-all resize-none shadow-sm"
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center py-4 bg-[#EA8A22] hover:bg-[#EA8A22] text-white font-mono text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-[#EA8A22]/15 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer select-none"
                      >
                        <span>Send Message</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </motion.form>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PREMIUM BLUEPRINT-GRID CTA BANNER */}
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
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              {/* Left text column */}
              <div className="lg:col-span-7">
                <span className="text-[#EA8A22] font-mono text-xs tracking-[0.25em] font-bold uppercase block mb-3">READY TO START?</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-[1.1]">
                  Let's Build Your <br />Next Project Together
                </h2>
              </div>
            
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4">
              <button
                onClick={() => openGlobalQuoteModal(true)}
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
                  <span>Download Company Profile</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
