import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Handshake, 
  Users, 
  Award, 
  Settings, 
  Plus, 
  Trash2, 
  Check, 
  ArrowRight, 
  ChevronRight, 
  ChevronDown, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  Cpu, 
  Briefcase, 
  FileDown, 
  Layers, 
  FileText,
  Eye,
  EyeOff,
  Sliders,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useQuoteModal } from '../contexts/QuoteContext';
import { InternalPageHero } from '../components/InternalPageHero';

// Interfaces for our dynamic items
interface ClientItem {
  id: string;
  name: string;
  logoUrl: string;
  displayOrder: number;
  active: boolean;
  industry: string;
}

interface PartnerItem {
  id: string;
  name: string;
  logoUrl: string;
  displayOrder: number;
  active: boolean;
  type: string;
}

interface FeatureCardItem {
  id: string;
  title: string;
  description: string;
  iconName: 'excellence' | 'partnerships' | 'solutions' | 'track';
}

export function ClientsPartners() {
  const openGlobalQuoteModal = useQuoteModal();

  const clientsPartnersCards = [
    { icon: Users, value: '50+ Clients', label: 'Leading Developers' },
    { icon: Handshake, value: '15+ Partners', label: 'Strategic Alliances' },
    { icon: ShieldCheck, value: '100% Trust', label: 'Engineering Integrity' }
  ];

  // Profile download simulation states
  const [downloadingProfile, setDownloadingProfile] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadProfile = () => {
    setDownloadingProfile(true);
    setTimeout(() => {
      setDownloadingProfile(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1500);
  };

  // Scroll to top of scroller container on mount
  useEffect(() => {
    const scroller = document.getElementById('app-scroller');
    if (scroller) {
      scroller.scrollTo({ top: 0, behavior: 'instant' as any });
    }
  }, []);

  // Pre-seeded high-end Saudi and Middle-Eastern Developer & Municipal Clients
  const [clients, setClients] = useState<ClientItem[]>([
    {
      id: 'client-1',
      name: 'ROSHN (PIF Company)',
      logoUrl: 'https://images.unsplash.com/photo-1516880711640-ef7db81be3e1?auto=format&fit=crop&w=300&q=80',
      displayOrder: 1,
      active: true,
      industry: 'Residential Developments'
    },
    {
      id: 'client-2',
      name: 'Red Sea Global',
      logoUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=300&q=80',
      displayOrder: 2,
      active: true,
      industry: 'Hospitality & Tourism'
    },
    {
      id: 'client-3',
      name: 'NEOM',
      logoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80',
      displayOrder: 3,
      active: true,
      industry: 'Infrastructure & Smart Cities'
    },
    {
      id: 'client-4',
      name: 'Saudi Aramco',
      logoUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80',
      displayOrder: 4,
      active: true,
      industry: 'Industrial Facilities'
    },
    {
      id: 'client-5',
      name: 'Emaar Properties',
      logoUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=300&q=80',
      displayOrder: 5,
      active: true,
      industry: 'Commercial & Mixed Use'
    },
    {
      id: 'client-6',
      name: 'Ministry of Housing',
      logoUrl: 'https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?auto=format&fit=crop&w=300&q=80',
      displayOrder: 6,
      active: true,
      industry: 'Government & Public Sector'
    },
    {
      id: 'client-7',
      name: 'Al Akaria Holding',
      logoUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=300&q=80',
      displayOrder: 7,
      active: true,
      industry: 'Urban Communities'
    }
  ]);

  // Pre-seeded World-Class Consultant & Technology Strategic Partners
  const [partners, setPartners] = useState<PartnerItem[]>([
    {
      id: 'partner-1',
      name: 'Dar Al-Handasah',
      logoUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=300&q=80',
      displayOrder: 1,
      active: true,
      type: 'Engineering Consultant'
    },
    {
      id: 'partner-2',
      name: 'Khatib & Alami',
      logoUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=300&q=80',
      displayOrder: 2,
      active: true,
      type: 'Technical Planner'
    },
    {
      id: 'partner-3',
      name: 'Schneider Electric',
      logoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80',
      displayOrder: 3,
      active: true,
      type: 'Smart Grid & MEP'
    },
    {
      id: 'partner-4',
      name: 'Siemens AG',
      logoUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&q=80',
      displayOrder: 4,
      active: true,
      type: 'Power Infrastructure'
    },
    {
      id: 'partner-5',
      name: 'Egis Group',
      logoUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=300&q=80',
      displayOrder: 5,
      active: true,
      type: 'Civil Consultancy'
    },
    {
      id: 'partner-6',
      name: 'Ramboll Group',
      logoUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&q=80',
      displayOrder: 6,
      active: true,
      type: 'Sustainability Partner'
    }
  ]);

  // Dynamic state for "Why Leading Organizations Choose Maabany" cards
  const [featureCards, setFeatureCards] = useState<FeatureCardItem[]>([
    {
      id: 'f-1',
      title: 'Engineering Excellence',
      description: 'Delivering mega scale works that meet rigorous international ISO, ANSI, and regional construction standards with peerless finishing.',
      iconName: 'excellence'
    },
    {
      id: 'f-2',
      title: 'Trusted Partnerships',
      description: 'Building transparent, multi-decade collaboration networks across Saudi Arabia, Egypt, and Libya through clear financial parameters.',
      iconName: 'partnerships'
    },
    {
      id: 'f-3',
      title: 'Integrated Solutions',
      description: 'Unified operational blueprints providing architectural planning, structural MEP layouts, fit-outs, and long-term facility management.',
      iconName: 'solutions'
    },
    {
      id: 'f-4',
      title: 'Proven Track Record',
      description: 'Successfully delivering tight deadlines under complex, dense metropolitan layouts and remote, hyper-sensitive ecological regions.',
      iconName: 'track'
    }
  ]);

  // Interactive CMS states
  const [cmsPanelOpen, setCmsPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'clients' | 'partners' | 'features'>('clients');

  // Addition states
  const [newClientName, setNewClientName] = useState('');
  const [newClientIndustry, setNewClientIndustry] = useState('Commercial Buildings');
  const [newPartnerName, setNewPartnerName] = useState('');
  const [newPartnerType, setNewPartnerType] = useState('Technology Provider');

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;

    // Use beautiful preset imagery to keep styling premium
    const randomImgPool = [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1516880711640-ef7db81be3e1?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=300&q=80'
    ];
    const randomImg = randomImgPool[clients.length % randomImgPool.length];

    const newItem: ClientItem = {
      id: 'custom-client-' + Date.now(),
      name: newClientName,
      logoUrl: randomImg,
      displayOrder: clients.length + 1,
      active: true,
      industry: newClientIndustry
    };

    setClients(prev => [...prev, newItem]);
    setNewClientName('');
  };

  const handleAddPartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartnerName.trim()) return;

    const randomImgPool = [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&q=80'
    ];
    const randomImg = randomImgPool[partners.length % randomImgPool.length];

    const newItem: PartnerItem = {
      id: 'custom-partner-' + Date.now(),
      name: newPartnerName,
      logoUrl: randomImg,
      displayOrder: partners.length + 1,
      active: true,
      type: newPartnerType
    };

    setPartners(prev => [...prev, newItem]);
    setNewPartnerName('');
  };

  // State manipulation triggers
  const toggleClientActive = (id: string) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  const togglePartnerActive = (id: string) => {
    setPartners(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const deleteClient = (id: string) => {
    setClients(prev => prev.filter(c => c.id !== id));
  };

  const deletePartner = (id: string) => {
    setPartners(prev => prev.filter(p => p.id !== id));
  };

  const changeClientOrder = (id: string, dir: 'up' | 'down') => {
    const idx = clients.findIndex(c => c.id === id);
    if (idx === -1) return;
    const newList = [...clients];
    if (dir === 'up' && idx > 0) {
      const temp = newList[idx];
      newList[idx] = newList[idx - 1];
      newList[idx - 1] = temp;
    } else if (dir === 'down' && idx < clients.length - 1) {
      const temp = newList[idx];
      newList[idx] = newList[idx + 1];
      newList[idx + 1] = temp;
    }
    setClients(newList);
  };

  const changePartnerOrder = (id: string, dir: 'up' | 'down') => {
    const idx = partners.findIndex(p => p.id === id);
    if (idx === -1) return;
    const newList = [...partners];
    if (dir === 'up' && idx > 0) {
      const temp = newList[idx];
      newList[idx] = newList[idx - 1];
      newList[idx - 1] = temp;
    } else if (dir === 'down' && idx < partners.length - 1) {
      const temp = newList[idx];
      newList[idx] = newList[idx + 1];
      newList[idx + 1] = temp;
    }
    setPartners(newList);
  };

  // Helper function to render feature card icons
  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'excellence':
        return <Award className="w-5 h-5 transition-colors duration-300" />;
      case 'partnerships':
        return <Handshake className="w-5 h-5 transition-colors duration-300" />;
      case 'solutions':
        return <Cpu className="w-5 h-5 transition-colors duration-300" />;
      case 'track':
        return <ShieldCheck className="w-5 h-5 transition-colors duration-300" />;
      default:
        return <Briefcase className="w-5 h-5 transition-colors duration-300" />;
    }
  };

  // Filter lists for active states to render in sliders
  const activeClients = clients.filter(c => c.active);
  const activePartners = partners.filter(p => p.active);

  // Duplicate arrays seamless marquee representation
  const duplicatedClients = [...activeClients, ...activeClients, ...activeClients, ...activeClients];
  const duplicatedPartners = [...activePartners, ...activePartners, ...activePartners, ...activePartners];

  return (
    <div className="bg-white min-h-screen pb-12 selection:bg-[#EA8A22] selection:text-white">
      
      {/* 1. HERO HEADER */}
      <InternalPageHero
        title={<>Trusted <span className="text-[#EA8A22]">Partnerships</span></>}
        categoryBadge="Clients &amp; Partners"
        categoryIcon={Handshake}
        description=""
        heroImage="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=80"
        cards={clientsPartnersCards}
      />




      {/* 4. OUR CLIENTS MARQUEE (SCROLLS LEFT) */}
      <section className="bg-white py-12 md:py-20 lg:py-24 overflow-hidden border-b border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8 mb-8 space-y-2">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#EA8A22] font-black uppercase">
            OUR CLIENTS
          </span>
          <h3 className="text-xl md:text-3.5xl font-black text-neutral-900 uppercase tracking-tight">
            Organizations That Trust Maabany
          </h3>
        </div>

        {/* Endless Marquee Loop - Left scrolling (cut from edges by page padding container) */}
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8">
          <div className="relative w-full overflow-hidden py-4 select-none rounded-2xl">
            
            {/* Outer shade gradients for infinite depth look */}
            <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Scrolling track */}
            <div className="animate-marquee-left flex gap-6">
              {duplicatedClients.map((client, idx) => (
                <div 
                  key={`${client.id}-marquee-${idx}`}
                  className="w-56 h-28 shrink-0 bg-white border border-neutral-200/80 rounded-2xl flex items-center justify-center p-4 shadow-sm hover:shadow-md hover:border-[#EA8A22] hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-400 flex items-center justify-center transition-all duration-300 group-hover:bg-[#EA8A22] group-hover:text-white group-hover:border-[#EA8A22] shadow-sm">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
                      </svg>
                    </div>
                    <span className="text-sm md:text-base font-mono font-black tracking-[0.15em] text-neutral-400 group-hover:text-neutral-900 transition-colors uppercase">
                      Logo
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 5. OUR PARTNERS MARQUEE (SCROLLS RIGHT - OPPOSITE DIRECTION & TIMING) */}
      <section className="bg-neutral-50/30 py-12 md:py-20 lg:py-24 overflow-hidden border-b border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8 mb-8 space-y-2">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#EA8A22] font-black uppercase">
            OUR PARTNERS
          </span>
          <h3 className="text-xl md:text-3.5xl font-black text-neutral-900 uppercase tracking-tight">
            Strategic Partnerships That Drive Success
          </h3>
        </div>

        {/* Endless Marquee Loop - Right scrolling (cut from edges by page padding container) */}
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8">
          <div className="relative w-full overflow-hidden py-4 select-none rounded-2xl">
            
            {/* Outer shade gradients for infinite depth look */}
            <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-neutral-50/30 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-neutral-50/30 to-transparent z-10 pointer-events-none" />

            {/* Scrolling track */}
            <div className="animate-marquee-right flex gap-6">
              {duplicatedPartners.map((partner, idx) => (
                <div 
                  key={`${partner.id}-marquee-${idx}`}
                  className="w-56 h-28 shrink-0 bg-white border border-neutral-200/80 rounded-2xl flex items-center justify-center p-4 shadow-sm hover:shadow-md hover:border-[#EA8A22] hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-400 flex items-center justify-center transition-all duration-300 group-hover:bg-[#EA8A22] group-hover:text-white group-hover:border-[#EA8A22] shadow-sm">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
                      </svg>
                    </div>
                    <span className="text-sm md:text-base font-mono font-black tracking-[0.15em] text-neutral-400 group-hover:text-neutral-900 transition-colors uppercase">
                      Logo
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 6. WHY LEADING ORGANIZATIONS CHOOSE US */}
      <section className="py-12 md:py-20 lg:py-24 relative bg-white overflow-hidden border-t border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: 4 Premium Feature Cards */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <span className="text-[#264A8A] font-mono text-[10px] uppercase font-black tracking-widest block">
                  WHY MAABANY
                </span>
                <h2 className="text-3xl md:text-4.5xl font-black text-neutral-900 uppercase tracking-tight">
                  Why Clients Continue to Choose Us
                </h2>
                <p className="text-neutral-500 text-xs md:text-sm font-light leading-relaxed max-w-2xl">
                  Our clients and partners choose Maabany because we consistently deliver engineering excellence, transparent collaboration, and long-term value on every project.
                </p>
              </div>

              {/* Feature list dynamically styled */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featureCards.map((feat) => (
                  <motion.div 
                    key={feat.id}
                    whileHover={{ 
                      y: -6, 
                      scale: 1.02, 
                      boxShadow: "0 20px 40px -15px rgba(234, 138, 34, 0.15)" 
                    }}
                    className="p-5 bg-white border border-neutral-200 rounded-2xl transition-all duration-300 group cursor-default"
                  >
                    <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-150 text-[#EA8A22] flex items-center justify-center mb-3 transition-all duration-300 group-hover:bg-[#EA8A22] group-hover:text-white group-hover:border-[#EA8A22] group-hover:rotate-3 group-hover:scale-105 shadow-sm group-hover:shadow-[#EA8A22]/20">
                      {getFeatureIcon(feat.iconName)}
                    </div>
                    <h4 className="text-xs font-bold uppercase tracking-tight text-neutral-950 transition-colors">
                      {feat.title}
                    </h4>
                    <p className="text-[11px] text-neutral-500 font-light mt-1.5 leading-relaxed">
                      {feat.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column: Floating Collage of Engineering Team Meetings */}
            <div className="lg:col-span-5 relative w-full flex lg:justify-end">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/60 bg-neutral-100 aspect-[4/5] w-full max-w-md lg:ml-auto mx-auto group">
                <img 
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" 
                  alt="Maabany engineering team on-site collaboration"
                  className="w-full h-full object-cover grayscale brightness-95 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />

                {/* Overlaid stats badge */}
                <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
                  <span className="text-[10px] font-mono font-bold text-[#EA8A22] tracking-wider uppercase block">
                    CULTURE OF TRUST
                  </span>
                  <p className="text-xs font-black text-neutral-900 uppercase tracking-tight mt-1">
                    100% Client Retention Rate
                  </p>
                  <p className="text-[10px] text-neutral-500 font-light mt-1 leading-relaxed">
                    Every master planning developer that started with Maabany continues to utilize our general contracting or MEP divisions for expanding phases.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. CTA BANNER WITH SPLIT BUTTONS */}
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

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            
            {/* Left side info */}
            <div className="space-y-5 max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-[#EA8A22] uppercase font-black">
                <Sparkles className="w-4 h-4 text-[#EA8A22]" />
                <span>READY TO START?</span>
              </span>
              <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-[1.1]">
                Let's Build Your <br />Next Project Together
              </h3>
            </div>

            {/* Right side buttons */}
            <div className="flex flex-col items-stretch w-full lg:w-auto lg:min-w-[400px] gap-4 shrink-0">
              <button
                onClick={() => openGlobalQuoteModal(true)}
                className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-[#EA8A22] hover:bg-[#d67b1e] text-white font-mono font-bold text-xs uppercase tracking-widest rounded-[20px] transition-all duration-300 shadow-xl shadow-[#EA8A22]/20 hover:shadow-[#EA8A22]/40 cursor-pointer whitespace-nowrap"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleDownloadProfile}
                disabled={downloadingProfile}
                className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-[#312E2E] hover:bg-[#3D3A3A] text-white border border-white/5 font-mono font-bold text-xs uppercase tracking-widest rounded-[20px] transition-all duration-300 shadow-lg cursor-pointer disabled:opacity-50"
              >
                {downloadingProfile ? (
                  <>
                    <svg className="animate-spin -ml-1 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Downloading...</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-500 animate-bounce" />
                    <span className="text-emerald-400">Downloaded</span>
                  </>
                ) : (
                  <>
                    <span>Download Company Profile</span>
                    <FileDown className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
