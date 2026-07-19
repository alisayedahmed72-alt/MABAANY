import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollVideoPlayer } from '../components/ScrollVideoPlayer';
import { Header } from '../components/Header';
import { useQuoteModal } from '../contexts/QuoteContext';
import { safeGetItem, safeSetItem } from '../utils/storage';
import { Link, useNavigate } from 'react-router-dom';
import { blogs as dataBlogs } from '../data';
import { FloatingWireframe } from '../components/FloatingWireframe';
import { CountryFlag } from '../components/CountryFlag';





import {
  Menu,
  BadgeCheck,
  ChevronLeft,
  
  Quote,
  X,
  Search,
  ArrowRight,
  ArrowUpRight,
  Download,
  FileDown,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Building2,
  Users,
  Globe,
  Award,
  HardHat,
  ChevronRight,
  Shield,
  Clock,
  Briefcase,
  ChevronDown,
  Check,
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Loader2,
  Flame,
  Wind,
  Droplet,
  Camera,
  Network,
  Lock,
  Car,
  Smartphone,
  Wrench,
  Paintbrush,
  Factory,
  Layers,
  Settings,
  Sliders,
  RotateCcw,
  Zap,
  Hammer,
  Cpu,
  Eye,
  Sparkles,
  Home as HomeIcon
} from 'lucide-react';

// Normalization helper for Google Drive sharing & direct mp4 links
const getPlayableVideoUrl = (url: string): { isDrive: boolean; streamUrl: string; fileId?: string } => {
  if (!url) return { isDrive: false, streamUrl: '' };

  const isDrive = url.includes('drive.google.com') || url.includes('docs.google.com');
  if (!isDrive) {
    return { isDrive: false, streamUrl: url };
  }

  // Extract file ID using regex patterns
  const fileIdRegex = /\/file\/d\/([a-zA-Z0-9_-]+)/;
  const idParamRegex = /[?&]id=([a-zA-Z0-9_-]+)/;

  let fileId = '';
  const matchFile = url.match(fileIdRegex);
  const matchId = url.match(idParamRegex);

  if (matchFile && matchFile[1]) {
    fileId = matchFile[1];
  } else if (matchId && matchId[1]) {
    fileId = matchId[1];
  }

  if (fileId) {
    // Return Google Drive's server-side stream/download proxy URL
    return {
      isDrive: true,
      fileId,
      streamUrl: `/api/video-stream?id=${fileId}`
    };
  }

  return { isDrive: true, streamUrl: url };
};

// EASILY CHANGE THE BG_VIDEO URL HERE!
// Simply swap this link with your own MP4, e.g., a tower crane, skyline, or modern project site video.
const BG_VIDEO = 'https://drive.google.com/file/d/1gTopMtUIrLE3FYeDITfUTwrnSeRQEojz/view?usp=sharing';

// Backup high-quality construction image if the video is swapped or fails
const FALLBACK_HERO_IMG = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=80';






export function Home() {
  const navigate = useNavigate();
  // Mobile navigation toggle
  
  // Solutions Dropdown visibility in header
  
  // Active nav section tracker (for high-contrast active indicator)
  
  // Header stickiness & search overlay
  
  // Quote Modal Toggle
  const setQuoteModalOpen = useQuoteModal();
  
  // Form submission simulated state
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhoneCountry, setContactPhoneCountry] = useState('+966');
  const [contactPhone, setContactPhone] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<'EG' | 'SA' | 'LY'>('SA');
  const [hoveredBranch, setHoveredBranch] = useState<'EG' | 'SA' | 'LY' | null>(null);

  const handleSelectBranch = (branchCode: 'EG' | 'SA' | 'LY') => {
    setSelectedBranch(branchCode);
    if (branchCode === 'SA') setContactPhoneCountry('+966');
    else if (branchCode === 'EG') setContactPhoneCountry('+20');
    else if (branchCode === 'LY') setContactPhoneCountry('+218');
  };

  const handlePhoneCountryChange = (country: string) => {
    setContactPhoneCountry(country);
    if (country === '+966') setSelectedBranch('SA');
    else if (country === '+20') setSelectedBranch('EG');
    else if (country === '+218') setSelectedBranch('LY');
  };
  
  // Quote form inputs
  
  // Project filter
  const [projectFilter, setProjectFilter] = useState('All');

  // Profile Download status
  const [profileDownloaded, setProfileDownloaded] = useState(false);
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

  // Interactive Stat counters
  const [yearsCounter, setYearsCounter] = useState(0);
  const [projectsCounter, setProjectsCounter] = useState(0);
  const [countriesCounter, setCountriesCounter] = useState(0);
  const [satisfactionCounter, setSatisfactionCounter] = useState(0);

  // Solutions interactive detail panel state
  const [activeSolutionIndex, setActiveSolutionIndex] = useState(0);
  const [isCivilExpanded, setIsCivilExpanded] = useState(false);

  // Testimonials Carousel Current Index
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // MEP Solutions card image slider
  const [mepSlideIdx, setMepSlideIdx] = useState(0);
  const mepImages = [
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80'
  ];

  // Mouse move follow coordinates for Hero Section glow effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Live Layout Spacing Customization parameters
  const [outerPaddingX, setOuterPaddingX] = useState<number>(() => {
    return Number(safeGetItem('db_outerPaddingX') ?? '24');
  });
  const [outerPaddingTop, setOuterPaddingTop] = useState<number>(() => {
    return Number(safeGetItem('db_outerPaddingTop') ?? '16');
  });
  const [outerPaddingBottom, setOuterPaddingBottom] = useState<number>(() => {
    return Number(safeGetItem('db_outerPaddingBottom') ?? '4');
  });
  const [heroBorderRadius, setHeroBorderRadius] = useState<number>(() => {
    return Number(safeGetItem('db_heroBorderRadius') ?? '40');
  });
  const [videoScale, setVideoScale] = useState<number>(() => {
    return Number(safeGetItem('db_videoScale') ?? '1.35');
  });
  const [heroVideoBlur, setHeroVideoBlur] = useState<number>(() => {
    return Number(safeGetItem('db_heroVideoBlur') ?? '12');
  });
  const [heroOverlayOpacity, setHeroOverlayOpacity] = useState<number>(() => {
    return Number(safeGetItem('db_heroOverlayOpacity') ?? '0.15');
  });
  const [sectionPaddingY, setSectionPaddingY] = useState<number>(() => {
    return Number(safeGetItem('db_sectionPaddingY') ?? '96');
  });
  const [heroNavSpacing, setHeroNavSpacing] = useState<number>(() => {
    return Number(safeGetItem('db_heroNavSpacing') ?? '112');
  });
  const [heroNavTopSpacing, setHeroNavTopSpacing] = useState<number>(() => {
    return Number(safeGetItem('db_heroNavTopSpacing') ?? '16');
  });

  useEffect(() => {
    // Keep visual space below nav equal to the visual space above nav:
    // Top Gap (above nav pill): G_above = heroNavTopSpacing
    // Nav Height: H_nav = 80px (including borders and paddings)
    // To maintain equal bottom gap (G_below = G_above):
    // Total padding-top of hero content = G_above + H_nav + G_below
    // = heroNavTopSpacing + 80 + heroNavTopSpacing = 2 * heroNavTopSpacing + 80
    setHeroNavSpacing(2 * heroNavTopSpacing + 80);
  }, [heroNavTopSpacing]);

  useEffect(() => {
    safeSetItem('db_outerPaddingX', String(outerPaddingX));
    safeSetItem('db_outerPaddingTop', String(outerPaddingTop));
    safeSetItem('db_outerPaddingBottom', String(outerPaddingBottom));
    safeSetItem('db_heroBorderRadius', String(heroBorderRadius));
    safeSetItem('db_videoScale', String(videoScale));
    safeSetItem('db_heroVideoBlur', String(heroVideoBlur));
    safeSetItem('db_heroOverlayOpacity', String(heroOverlayOpacity));
    safeSetItem('db_sectionPaddingY', String(sectionPaddingY));
    safeSetItem('db_heroNavSpacing', String(heroNavSpacing));
    safeSetItem('db_heroNavTopSpacing', String(heroNavTopSpacing));

    document.documentElement.style.setProperty('--outer-padding-x', `${outerPaddingX}px`);
    document.documentElement.style.setProperty('--outer-padding-top', `${outerPaddingTop}px`);
    document.documentElement.style.setProperty('--outer-padding-bottom', `${outerPaddingBottom}px`);
    document.documentElement.style.setProperty('--hero-border-radius', `${heroBorderRadius}px`);
    document.documentElement.style.setProperty('--video-scale', `${videoScale}`);
    document.documentElement.style.setProperty('--hero-video-blur', `${heroVideoBlur}px`);
    document.documentElement.style.setProperty('--hero-overlay-opacity', `${heroOverlayOpacity}`);
    document.documentElement.style.setProperty('--section-padding-y', `${sectionPaddingY}px`);
    document.documentElement.style.setProperty('--hero-nav-spacing', `${heroNavSpacing}px`);
    document.documentElement.style.setProperty('--hero-nav-top-spacing', `${heroNavTopSpacing}px`);
  }, [outerPaddingX, outerPaddingTop, outerPaddingBottom, heroBorderRadius, videoScale, heroVideoBlur, heroOverlayOpacity, sectionPaddingY, heroNavSpacing, heroNavTopSpacing]);

  // Infinite Clients Marquee logos (gray to orange colored)
  const clientLogos = [
    { name: 'Apex Developments', icon: Building2, text: 'APEX' },
    { name: 'Nexa Holdings', icon: Shield, text: 'NEXA' },
    { name: 'Vanguard Cities', icon: Globe, text: 'VANGUARD' },
    { name: 'Titan Infra', icon: HardHat, text: 'TITAN' },
    { name: 'Elysium Living', icon: Award, text: 'ELYSIUM' },
    { name: 'Vertex Eng', icon: Briefcase, text: 'VERTEX' },
  ];

  // Infinite Clients Marquee logos (government and real estate giants)
  const homeClients = [
    { name: 'ROSHN Development', icon: HomeIcon, text: 'ROSHN' },
    { name: 'Red Sea Global', icon: Shield, text: 'RED SEA GLOBAL' },
    { name: 'NEOM Smart Cities', icon: Globe, text: 'NEOM' },
    { name: 'Saudi Aramco', icon: Factory, text: 'ARAMCO' },
    { name: 'Emaar Properties', icon: Building2, text: 'EMAAR' },
    { name: 'Ministry of Housing', icon: Building2, text: 'MUNICIPALITIES' },
  ];

  // Solutions data
  const solutions = [
    {
      title: 'Infrastructure Engineering',
      desc: 'Building modern highways, complex bridges, and smart transport hubs configured for sustainable metropolitan expansion.',
      details: 'Our infrastructure projects utilize carbon-negative concrete formulations, real-time sensory health arrays, and modern load analysis modeling to guarantee 100+ year lifespans.',
      stats: '45+ Public Projects Completed',
      image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80',
      tag: 'Public Sector'
    },
    {
      title: 'Commercial Metropolises',
      desc: 'Formulating smart commercial complexes, high-rise luxury headquarters, and responsive retail sectors with LEED platinum profiles.',
      details: 'We specialize in steel-timber hybrid skyscrapers, automated HVAC integration, and double-facade acoustic isolation that delivers unparalleled interior productivity.',
      stats: '1.2M+ Sq. Ft. Constructed',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      tag: 'Enterprise'
    },
    {
      title: 'Heavy Industrial Facilities',
      desc: 'Constructing robotic gigafactories, chemical synthesis centers, and advanced cleanrooms engineered for extreme precision.',
      details: 'Industrial environments require rigid climate constraints, high-voltage redundancy planning, and vibration-isolated foundations custom built for automated robotic assembly lines.',
      stats: '12 Megafactories Active',
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80',
      tag: 'Automation'
    },
    {
      title: 'Sustainable Residential Hubs',
      desc: 'Crafting net-zero private estates, modern multi-family complexes, and smart micro-townships featuring grid-independence.',
      details: 'Maabany residential units merge high-end modern brutalist architecture with solar roof integration, graywater filtration circuits, and dynamic thermal mass insulation.',
      stats: '800+ Smart Homes Delivered',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      tag: 'Residential'
    }
  ];

  // Project data
  const projects = [
    {
      name: 'The Oryx Tower',
      location: 'Riyadh, KSA',
      category: 'Commercial',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
      desc: 'A 78-story landmark featuring a kinetic wind-harvesting exterior design.'
    },
    {
      name: 'Skyline Viaduct Expansion',
      location: 'Dubai, UAE',
      category: 'Infrastructure',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      desc: 'Seamless structural extension of high-speed transit networks over busy corridors.'
    },
    {
      name: 'Nexa Robotic Giga-Plant',
      location: 'Manama, Bahrain',
      category: 'Industrial',
      year: '2026',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      desc: 'State of the art automated manufacturing hub using clean hydrogen power supply.'
    },
    {
      name: 'Zaman Eco-District',
      location: 'Doha, Qatar',
      category: 'Residential',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      desc: 'Net-zero integrated smart neighborhood with circular water management.'
    },
    {
      name: 'Aura Premium Offices',
      location: 'Riyadh, KSA',
      category: 'Commercial',
      year: '2026',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      desc: 'Innovative office layouts prioritizing biomimicry and natural air cycles.'
    },
    {
      name: 'Coastal Hyper-Highway',
      location: 'Jeddah, KSA',
      category: 'Infrastructure',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1473876988266-ca0860a443b8?auto=format&fit=crop&w=800&q=80',
      desc: 'Highly resilient concrete maritime arterial connecting twin industrial ports.'
    }
  ];

  // Testimonial data
  const testimonials = [
    {
      quote: "Maabany delivered our premium enterprise headquarters 3 months ahead of schedule without sacrificing a single layer of architectural complexity. Their standard of execution is truly unprecedented.",
      name: "Eng. Abdulrahman Al-Saud",
      role: "VP of Urban Development",
      company: "Riyadh Vision Group",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      quote: "The engineering team at Maabany tackled our complex robotic facility constraints with outstanding ingenuity. Their digital twin models kept us informed of every load test.",
      name: "Sarah Lindqvist",
      role: "Operations Lead",
      company: "Nexa Industrial Labs",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      quote: "For high-scale public infrastructure, trust is non-negotiable. Maabany demonstrated unparalleled structural discipline and clean green-concrete compliance.",
      name: "Marcus Thorne",
      role: "Principal Director",
      company: "Global Cities Consortium",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80"
    }
  ];

  // Blog posts from central data repository
  const homeBlogs = dataBlogs.slice(0, 3);



  // Upward stat counter trigger
  useEffect(() => {
    const yearsTarget = 13;
    const projectsTarget = 250;
    const countriesTarget = 3;
    const satisfactionTarget = 95;

    // Fast counters with simple interval loops
    const duration = 1500; // 1.5 seconds animation
    const steps = 50;
    const stepTime = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setYearsCounter(Math.min(Math.round((yearsTarget / steps) * step), yearsTarget));
      setProjectsCounter(Math.min(Math.round((projectsTarget / steps) * step), projectsTarget));
      setCountriesCounter(Math.min(Math.round((countriesTarget / steps) * step), countriesTarget));
      setSatisfactionCounter(Math.min(Math.round((satisfactionTarget / steps) * step), satisfactionTarget));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  // Auto-slide Testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Track mouse position over Hero to enable stunning premium light overlay effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Filter projects helper
  const filteredProjects = projectFilter === 'All'
    ? projects
    : projects.filter(p => p.category === projectFilter);

  // Submit Contact Form
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitting(true);
    
    // Simulate premium server-side action
    setTimeout(() => {
      setContactSubmitting(false);
      navigate('/thank-you');
    }, 1500);
  };


  return (
    <>
      {/* 2. Hero Section */}
      <div 
        className="w-full max-w-[1400px] mx-auto transition-all duration-200"
        style={{
          paddingLeft: `${outerPaddingX}px`,
          paddingRight: `${outerPaddingX}px`,
          paddingTop: `${outerPaddingTop}px`,
          paddingBottom: `${outerPaddingBottom}px`,
        }}
      >
        <section
          id="home"
          ref={heroRef}
          onMouseMove={handleMouseMove}
          className="relative w-full min-h-[calc(100vh-48px)] flex flex-col overflow-hidden py-2 bg-neutral-950 transition-all duration-200"
          style={{
            borderRadius: `${heroBorderRadius}px`
          }}
        >
          {/* Navigation embedded inside the Hero container */}
          <Header isHeroVariant={true} activeSection="home" />

          {/* Cinematic Background Video - contained purely inside the hero section */}
          <ScrollVideoPlayer 
            src={getPlayableVideoUrl(BG_VIDEO).streamUrl} 
            fallbackImage={FALLBACK_HERO_IMG} 
            videoScale={videoScale}
            videoBlur={heroVideoBlur}
            overlayOpacity={heroOverlayOpacity}
          />

          {/* Hero content - Centered over video */}
          <div 
            className="relative max-w-[1400px] w-full mx-auto px-5 md:px-6 lg:px-7 xl:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 my-auto py-6 transition-all duration-200"
            style={{
              paddingTop: 'var(--hero-nav-spacing, 120px)'
            }}
          >
          
          {/* Left: Editorial Headline with localized subtle backdrop blur */}
          <div className="lg:col-span-7 text-left relative py-4">
            {/* Extremely subtle localized backdrop */}
            <div 
              className="absolute -inset-10 md:-inset-16 pointer-events-none z-0 rounded-[60px]"
              style={{
                background: 'radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0) 100%)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                maskImage: 'radial-gradient(circle at center, black 30%, transparent 85%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 85%)'
              }}
            />

            <div className="relative z-10 space-y-6">
              {/* Overlapping, majestic headline */}
              <div className="space-y-1">
                <h1 
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-none"
                  style={{ textShadow: '0 2px 12px rgba(0,0,0,0.18)' }}
                >
                  BUILDING
                </h1>
                <h1 
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-none -mt-1"
                  style={{ textShadow: '0 2px 12px rgba(0,0,0,0.18)' }}
                >
                  THE FUTURE OF
                </h1>
                <h1 
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#EA8A22] tracking-tighter uppercase leading-none -mt-1"
                  style={{ textShadow: '0 2px 12px rgba(0,0,0,0.18)' }}
                >
                  TOMORROW<span className="text-white"></span>
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setQuoteModalOpen(true)}
                  className="px-7 py-4 bg-[#EA8A22] hover:bg-[#EA8A22]/90 text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 shadow-xl shadow-[#EA8A22]/30 cursor-pointer flex items-center gap-2 font-mono whitespace-nowrap shrink-0"
                >
                  Request a Quote <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Floating Stats Cards */}
          <div className="lg:col-span-5 relative flex flex-col gap-4 py-8">
            
            {/* Experience Card */}
            <div className="bg-white/95 backdrop-blur-md border border-neutral-200 p-5 rounded-2xl shadow-xl self-start w-64 animate-float-slow relative overflow-hidden group hover:border-[#EA8A22]/50 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#EA8A22]/5 rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#EA8A22]/10 text-[#EA8A22]">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-neutral-900 font-mono">{yearsCounter}+</h3>
                  <p className="text-[11px] text-neutral-500 font-semibold uppercase tracking-wider">Years of Excellence</p>
                </div>
              </div>
            </div>

            {/* Completed Projects Card */}
            <div className="bg-white/95 backdrop-blur-md border border-neutral-200 p-5 rounded-2xl shadow-xl self-end w-64 animate-float-medium relative overflow-hidden group hover:border-[#EA8A22]/50 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#EA8A22]/5 rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#EA8A22]/10 text-[#EA8A22]">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-neutral-900 font-mono">{projectsCounter}+</h3>
                  <p className="text-[11px] text-neutral-500 font-semibold uppercase tracking-wider">Megaprojects Completed</p>
                </div>
              </div>
            </div>

            {/* Countries & Global presence */}
            <div className="bg-white/95 backdrop-blur-md border border-neutral-200 p-5 rounded-2xl shadow-xl self-start w-64 animate-float-slow relative overflow-hidden group hover:border-[#EA8A22]/50 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#EA8A22]/5 rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#EA8A22]/10 text-[#EA8A22]">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-neutral-900 font-mono">{countriesCounter}</h3>
                  <p className="text-[11px] text-neutral-500 font-semibold uppercase tracking-wider">Sovereign Countries</p>
                </div>
              </div>
            </div>

            {/* Satisfaction percentage */}
            <div className="bg-white/95 backdrop-blur-md border border-neutral-200 p-5 rounded-2xl shadow-xl self-end w-64 animate-float-medium relative overflow-hidden group hover:border-[#EA8A22]/50 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#EA8A22]/5 rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#EA8A22]/10 text-[#EA8A22]">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-neutral-900 font-mono">{satisfactionCounter}%</h3>
                  <p className="text-[11px] text-neutral-500 font-semibold uppercase tracking-wider">Satisfaction Index</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Breathtaking continuous scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-10 select-none">
          <div className="w-5 h-8 border border-neutral-700 rounded-full flex justify-center p-1 bg-neutral-950/40">
            <div className="w-1.5 h-1.5 bg-[#EA8A22] rounded-full animate-bounce" />
          </div>
        </div>
      </section>
    </div>

      {/* 3. About Section */}
      <section 
        id="about" 
        className="bg-white relative overflow-hidden z-10 transition-all duration-200 py-12 md:py-20 lg:py-24"
      >
        {/* Floating 3D Geodesic Sphere */}
        <div className="absolute -left-12 top-24 w-80 h-80 opacity-15 pointer-events-none hidden xl:block">
          <FloatingWireframe shape="icosahedron" className="w-full h-full" color="#264A8A" />
        </div>

        {/* Architectural subtle background grid */}
        <div className="absolute inset-0 bg-grid-light opacity-10 pointer-events-none" />
        
        <div 
          className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center transition-all duration-200"
          style={{
            paddingLeft: `${outerPaddingX}px`,
            paddingRight: `${outerPaddingX}px`
          }}
        >
          
          {/* Left Side: Images with Mask Reveal Style */}
          <div className="lg:col-span-6 relative">
            <div className="relative group overflow-hidden rounded-3xl border border-neutral-200 shadow-xl">
              <div className="absolute inset-0 bg-neutral-950/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"
                alt="Maabany Construction Site Tower Cranes"
                className="w-full h-[500px] object-cover transition-transform duration-[8s] group-hover:scale-105"
              />
              
              {/* Dynamic floating badge inside image */}
              <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-neutral-200/60 shadow-lg">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#EA8A22] block mb-1">CURRENTLY UNDERWAY</span>
                <span className="text-xs font-semibold text-neutral-900">Riyadh Financial Plaza II • 92% Complete</span>
              </div>
            </div>

            {/* Secondary stacked accent image */}
            <div className="absolute -bottom-8 -right-8 w-60 h-44 hidden md:block rounded-2xl overflow-hidden border-4 border-white shadow-2xl group/sub">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80"
                alt="Engineers planning on construction site"
                className="w-full h-full object-cover group-hover/sub:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Side: Editorial Text Content */}
          <div className="lg:col-span-6 space-y-6 text-neutral-900">
            <div className="space-y-2">
              <span className="text-[#264A8A] font-mono text-xs uppercase font-bold tracking-widest block">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-neutral-900 uppercase tracking-tight">
                Engineering with Precision
              </h2>
            </div>

            <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
              Maabany is a tier-one construction and engineering partner delivering iconic structures and high-performance infrastructure across sectors. We combine industry-leading engineering, state-of-the-art sustainability practices, and rigorous compliance to turn ambitious blueprints into enduring physical realities.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-xl bg-neutral-50/50 border border-neutral-200/80 shadow-sm">
                <div className="p-2 rounded bg-[#EA8A22]/10 text-[#EA8A22] h-fit">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 uppercase">Rigorous Security & Compliance</h4>
                  <p className="text-xs text-[#4b4b4b] mt-1">ISO 9001, 14001, and 45001 certified. We practice deep-risk containment on every development level.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-neutral-50/50 border border-neutral-200/80 shadow-sm">
                <div className="p-2 rounded bg-[#EA8A22]/10 text-[#EA8A22] h-fit">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 uppercase">Sustainability Certifications</h4>
                  <p className="text-xs text-[#4b4b4b] mt-1">Specializing in LEED Platinum layouts. Integrating self-contained power and graywater infrastructure by default.</p>
                </div>
              </div>
            </div>

            {/* Read More About Us CTA */}
            <div className="pt-2">
              <Link 
                to="/about"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#EA8A22] text-[#EA8A22] font-mono text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#EA8A22] hover:text-white hover:shadow-lg hover:shadow-[#EA8A22]/10 transition-all duration-300"
              >
                <span>Read More About Us</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>


          </div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section 
        id="why-us" 
        className="bg-white border-y border-neutral-200/60 relative z-10 transition-all duration-200 py-12 md:py-20 lg:py-24 overflow-hidden"
      >
        {/* Floating 3D Hyperboloid Tower */}
        <div className="absolute -right-8 top-8 w-64 h-64 opacity-25 pointer-events-none hidden lg:block">
          <FloatingWireframe shape="tower" className="w-full h-full" color="#EA8A22" />
        </div>

        <div className="absolute inset-0 bg-blueprint opacity-[0.06] pointer-events-none" />
        
        <div 
          className="max-w-[1400px] mx-auto transition-all duration-200"
          style={{
            paddingLeft: `${outerPaddingX}px`,
            paddingRight: `${outerPaddingX}px`
          }}
        >
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-[#264A8A] font-mono text-xs uppercase font-bold tracking-widest block">
              THE MAABANY STANDARD
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-neutral-900 uppercase tracking-tight">
              ENGINEERED FOR SUPREMACY
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: '01',
                title: '3D Laser Metrology',
                desc: 'Using advanced millimetric scanners during foundation phases to avoid structural shifting or tilt propagation.',
                icon: HardHat
              },
              {
                num: '02',
                title: 'LEED Certified Builds',
                desc: 'Specializing in carbon-capture concrete formulations, thermal insulation shells, and active solar arrays.',
                icon: Award
              },
              {
                num: '03',
                title: 'Total Risk Containment',
                desc: 'Unmatched site safety algorithms with zero fatal records over millions of consecutive structural hours.',
                icon: Shield
              },
              {
                num: '04',
                title: 'Saudi Tier-1 Delivery',
                desc: 'Accredited for heavy state industrial tenders, smart smart-city horizons, and national defense hubs.',
                icon: Globe
              },
            ].map((reason, index) => {
              const IconComponent = reason.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.02, 
                    boxShadow: "0 30px 60px -15px rgba(234, 138, 34, 0.15)" 
                  }}
                  className="bg-white border border-neutral-200/80 p-8 rounded-3xl relative overflow-hidden transition-all duration-300 group hover:border-[#EA8A22] cursor-pointer"
                >
                  {/* Diagonal premium sweep reflection on hover */}
                  <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-25 -translate-x-[150%] group-hover-sweep pointer-events-none z-20" />

                  {/* Dynamic background glow on hover */}
                  <div className="absolute -top-12 -right-12 w-36 h-36 bg-gradient-to-br from-[#EA8A22]/8 to-transparent rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
                  
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    {/* Icon container */}
                    <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60 text-neutral-800 transition-all duration-300 shadow-xs group-hover:bg-[#EA8A22] group-hover:text-white group-hover:border-[#EA8A22] group-hover:rotate-3 group-hover:scale-105 group-hover:shadow-[#EA8A22]/20">
                      <IconComponent className="w-6 h-6 transition-transform duration-300" />
                    </div>
                    
                    {/* Index number with stylish outline font effect */}
                    <span className="text-4xl font-extrabold text-neutral-200/80 font-mono transition-all duration-500 group-hover:text-[#EA8A22]/30 group-hover:-translate-y-1 group-hover:translate-x-1 block">
                      {reason.num}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-neutral-900 mb-3 tracking-tight uppercase group-hover:text-[#EA8A22] transition-colors duration-300 relative z-10">
                    {reason.title}
                  </h3>
                  
                  <p className="text-xs text-neutral-500 leading-relaxed group-hover:text-neutral-700 transition-colors duration-300 relative z-10">
                    {reason.desc}
                  </p>

                  {/* Aesthetic Accent Bottom Line */}
                  <div className="absolute bottom-0 left-0 w-0 h-[4px] bg-gradient-to-r from-[#EA8A22] to-[#ffaa44] transition-all duration-500 group-hover:w-full" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Our Solutions (Services) */}
      <section 
        id="solutions" 
        className="bg-[#FAFAFA] relative overflow-hidden z-10 transition-all duration-200 py-12 md:py-20 lg:py-24"
      >
        {/* Floating 3D Geodesic Dome */}
        <div className="absolute -left-12 top-16 w-82 h-82 opacity-15 pointer-events-none hidden xl:block">
          <FloatingWireframe shape="dome" className="w-full h-full" color="#264A8A" />
        </div>

        {/* Floating 3D Cube */}
        <div className="absolute -right-12 bottom-12 w-82 h-82 opacity-15 pointer-events-none hidden xl:block">
          <FloatingWireframe shape="cube" className="w-full h-full" color="#EA8A22" />
        </div>

        {/* Subtle decorative architectural CAD line arts positioned only in left/right margins */}
        <div className="absolute left-6 top-24 w-36 h-36 opacity-[0.04] pointer-events-none hidden xl:block select-none text-[#264A8A]">
          <svg viewBox="0 0 80 80" className="w-full h-full">
            <rect x="5" y="5" width="70" height="70" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <line x1="5" y1="28" x2="75" y2="28" stroke="currentColor" strokeWidth="0.25" />
            <line x1="5" y1="52" x2="75" y2="52" stroke="currentColor" strokeWidth="0.25" />
            <line x1="28" y1="5" x2="28" y2="75" stroke="currentColor" strokeWidth="0.25" />
            <line x1="52" y1="5" x2="52" y2="75" stroke="currentColor" strokeWidth="0.25" />
            <circle cx="28" cy="28" r="1.5" className="fill-current" />
            <circle cx="52" cy="52" r="1.5" className="fill-current" />
            <text x="32" y="25" className="text-[4px] font-mono fill-current">NODE_A1</text>
            <text x="56" y="49" className="text-[4px] font-mono fill-current">NODE_B2</text>
          </svg>
        </div>

        <div className="absolute right-6 bottom-24 w-40 h-40 opacity-[0.04] pointer-events-none hidden xl:block select-none text-[#EA8A22]">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M 10 50 A 40 40 0 0 1 50 10" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" />
            <line x1="10" y1="50" x2="50" y2="10" stroke="currentColor" strokeWidth="0.5" />
            <text x="15" y="45" className="text-[5px] font-mono fill-current">90°_ARC</text>
          </svg>
        </div>
        
        <div 
          className="max-w-[1400px] mx-auto relative z-10 transition-all duration-200"
          style={{
            paddingLeft: `${outerPaddingX}px`,
            paddingRight: `${outerPaddingX}px`
          }}
        >
          
          <div className="mb-16 text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[#264A8A] font-mono text-xs uppercase font-black tracking-widest block">
              Engineering Competencies & Focus
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-neutral-900 uppercase tracking-tight">
              Our Core Solutions
            </h2>
            <p className="text-neutral-500 text-sm md:text-base leading-relaxed">
              From monumental structural concrete to state-of-the-art building intelligence, we deliver premium engineering scale with absolute precision.
            </p>
          </div>          {/* Premium Magazine-style layout */}
          <div className="space-y-8">
            
            {/* MEP SOLUTIONS - PRIMARY FEATURED HERO CARD (Spans full width) */}
            <motion.div
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, scale: 1.005 }}
              onClick={() => navigate('/solutions/mep-solutions')}
              className="w-full bg-gradient-to-br from-white via-white to-orange-50/15 border-2 border-[#EA8A22]/25 p-6 lg:p-8 rounded-2xl relative overflow-hidden transition-all duration-500 hover:border-[#EA8A22]/50 hover:shadow-[0_20px_40px_rgba(234,138,34,0.04)] cursor-pointer group animate-fade-in"
            >
              {/* Engineering Blueprint Grid overlay inside Hero card */}
              <div className="absolute inset-0 opacity-8 group-hover:opacity-12 pointer-events-none transition-opacity duration-500 overflow-hidden">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="mep-hero-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[#EA8A22]" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#mep-hero-grid)" />
                </svg>
              </div>

              {/* Dynamic warm glow behind card */}
              <div className="absolute -top-16 -right-16 w-52 h-52 bg-gradient-to-br from-[#EA8A22]/10 to-transparent rounded-full blur-3xl group-hover:scale-125 transition-transform duration-750" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
                
                {/* Left Text and Icons Block */}
                <div className="lg:col-span-6 space-y-4 flex flex-col justify-center">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-extrabold text-neutral-200/80 font-mono group-hover:text-[#EA8A22]/25 transition-colors duration-300">
                      01
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl lg:text-2xl font-black text-neutral-900 group-hover:text-[#EA8A22] transition-colors duration-300 uppercase tracking-tight">
                      MEP Solutions
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                      Smart mechanical, HVAC, electrical, fire fighting, plumbing, and low-current security systems engineered for architectural resilience, peak climate comfort, and digital building intelligence.
                    </p>
                  </div>
                </div>

                {/* Right Featured Image for MEP Solutions */}
                <div className="lg:col-span-6 h-[240px] lg:h-[280px] rounded-xl overflow-hidden border border-neutral-200/50 relative shadow-xs group-hover:border-[#EA8A22]/30 transition-all duration-500">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={mepSlideIdx}
                      src={mepImages[mepSlideIdx]} 
                      alt={`MEP Engineering Systems ${mepSlideIdx + 1}`} 
                      referrerPolicy="no-referrer"
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0.8 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" 
                    />
                  </AnimatePresence>
                  
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/65 pointer-events-none" />

                  {/* Carousel Navigation buttons */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMepSlideIdx((prev) => (prev - 1 + mepImages.length) % mepImages.length);
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-neutral-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md border border-neutral-100 cursor-pointer z-20 hover:scale-105 active:scale-95"
                    title="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMepSlideIdx((prev) => (prev + 1) % mepImages.length);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-neutral-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md border border-neutral-100 cursor-pointer z-20 hover:scale-105 active:scale-95"
                    title="Next image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  {/* Carousel Pagination Dots - now at the bottom */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-neutral-950/40 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10">
                    {mepImages.map((_, sIdx) => (
                      <button 
                        key={sIdx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setMepSlideIdx(sIdx);
                        }}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${sIdx === mepSlideIdx ? 'bg-[#EA8A22] w-3.5' : 'bg-white/40 hover:bg-white/80'}`}
                        title={`Image ${sIdx + 1} of ${mepImages.length}`}
                      />
                    ))}
                  </div>
                </div>

              </div>


            </motion.div>

            {/* THE OTHER THREE CARDS - BEHIND/BELOW THE CIVIL SOLUTIONS CARD (Arranged horizontally) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* FACILITY MANAGEMENT CARD */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02, 
                  boxShadow: "0 30px 60px -15px rgba(234, 138, 34, 0.15)" 
                }}
                onClick={() => navigate('/solutions/facility-management')}
                className="bg-white border border-neutral-200/80 rounded-3xl p-8 relative overflow-hidden transition-all duration-300 hover:border-[#EA8A22] flex flex-col justify-between group h-full min-h-[440px] cursor-pointer"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60 text-neutral-800 transition-all duration-300 group-hover:bg-[#EA8A22] group-hover:text-white group-hover:border-[#EA8A22] group-hover:rotate-3 group-hover:scale-105 group-hover:shadow-[#EA8A22]/20">
                      <Wrench className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-extrabold text-neutral-200/80 font-mono group-hover:text-[#EA8A22]/20 transition-colors duration-300">
                      02
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-black text-neutral-900 group-hover:text-[#EA8A22] transition-colors uppercase tracking-tight">
                      Facility Management
                    </h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Preventive electromechanical maintenance, 24/7 technical emergency response, comprehensive energy audits, and structural lifecycle management to protect and maintain premium spaces.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-100 space-y-2.5">
                  {[
                    "Preventive & Corrective MEP Maintenance",
                    "24/7 Technical Response Desk",
                    "Intelligent Building Energy Audits"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#EA8A22]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CIVIL SOLUTIONS CARD */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02, 
                  boxShadow: "0 30px 60px -15px rgba(234, 138, 34, 0.15)" 
                }}
                onClick={() => navigate('/solutions/civil-solutions')}
                className="bg-white border border-neutral-200/80 rounded-3xl p-8 relative overflow-hidden transition-all duration-300 hover:border-[#EA8A22] flex flex-col justify-between group h-full min-h-[440px] cursor-pointer"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60 text-neutral-800 transition-all duration-300 group-hover:bg-[#EA8A22] group-hover:text-white group-hover:border-[#EA8A22] group-hover:rotate-3 group-hover:scale-105 group-hover:shadow-[#EA8A22]/20">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-extrabold text-neutral-200/80 font-mono group-hover:text-[#EA8A22]/20 transition-colors duration-300">
                      03
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-black text-neutral-900 group-hover:text-[#EA8A22] transition-colors uppercase tracking-tight">
                      Civil Solutions
                    </h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Delivering turnkey structural concrete, heavy industrial foundations, and high-tensile prefabricated steel frameworks. We construct the robust, resilient physical structures that form the bedrock of national expansion.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-100 space-y-2.5">
                  {[
                    "Commercial & Residential Towers",
                    "Heavy Industrial & Foundation Works",
                    "Prefabricated Steel Trusses & Cladding"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#EA8A22]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* FIT-OUT SOLUTIONS CARD */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02, 
                  boxShadow: "0 30px 60px -15px rgba(234, 138, 34, 0.15)" 
                }}
                onClick={() => navigate('/solutions/fit-out-solutions')}
                className="bg-white border border-neutral-200/80 rounded-3xl p-8 relative overflow-hidden transition-all duration-300 hover:border-[#EA8A22] flex flex-col justify-between group h-full min-h-[440px] cursor-pointer"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60 text-neutral-800 transition-all duration-300 group-hover:bg-[#EA8A22] group-hover:text-white group-hover:border-[#EA8A22] group-hover:rotate-3 group-hover:scale-105 group-hover:shadow-[#EA8A22]/20">
                      <Paintbrush className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-extrabold text-neutral-200/80 font-mono group-hover:text-[#EA8A22]/20 transition-colors duration-300">
                      04
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-black text-neutral-900 group-hover:text-[#EA8A22] transition-colors uppercase tracking-tight">
                      Fit-Out Solutions
                    </h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      High-end commercial interior design, acoustic system integration, and bespoke architectural joinery engineered to elevate spatial luxury and human performance.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-100 space-y-2.5">
                  {[
                    "Workplace Turnkey Designs",
                    "Premium Acoustics & Partitioning",
                    "Custom Joinery & Modern Finishes"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#EA8A22]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>

            {/* Explore All Solutions CTA */}
            <div className="mt-16 flex justify-center">
              <Link 
                to="/solutions"
                className="group flex items-center justify-center gap-2 px-8 py-4 border border-[#EA8A22] text-[#EA8A22] font-mono text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#EA8A22] hover:text-white hover:shadow-lg hover:shadow-[#EA8A22]/10 transition-all duration-300"
              >
                <span>Explore All Solutions</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Partners & Clients Section */}
      <section 
        id="partners-and-clients" 
        className="bg-white relative z-10 transition-all duration-200 py-12 md:py-20 lg:py-24"
      >
        <div 
          className="max-w-[1400px] mx-auto transition-all duration-200"
          style={{
            paddingLeft: `${outerPaddingX}px`,
            paddingRight: `${outerPaddingX}px`
          }}
        >
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <span className="text-[#264A8A] font-mono text-xs uppercase font-bold tracking-widest block">
              AUTHORIZED ALLIANCES & TRUSTED RELATIONSHIPS
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-neutral-900 uppercase tracking-tight">
              Our Partners & Clients
            </h2>
          </div>
            
          <div className="flex flex-col gap-[72px]">
            {/* Partners Infinite Marquee Strip */}
            <div className="relative w-full overflow-hidden py-4 border-y border-neutral-200 bg-neutral-50/30">
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              
              {/* Infinite Marquee Strip */}
              <div className="animate-marquee-left flex gap-12 items-center">
                {/* Render duplicated set of logos to allow perfect loop without gaps */}
                {Array(48).fill(null).map((_, idx) => (
                  <div
                    key={`partner-logo-${idx}`}
                    className="flex items-center gap-2.5 text-neutral-500 hover:text-[#EA8A22] transition-colors duration-300 cursor-pointer group shrink-0"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 text-neutral-400 group-hover:text-[#EA8A22] transition-colors">
                      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
                    </svg>
                    <span className="font-mono text-xs font-bold tracking-widest uppercase">Logo</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clients Infinite Marquee Strip */}
            <div className="relative w-full overflow-hidden py-4 border-y border-neutral-200 bg-neutral-50/30">
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              
              {/* Infinite Marquee Strip */}
              <div className="animate-marquee-right flex gap-12 items-center">
                {/* Render duplicated set of logos to allow perfect loop without gaps */}
                {Array(48).fill(null).map((_, idx) => (
                  <div
                    key={`client-logo-${idx}`}
                    className="flex items-center gap-2.5 text-neutral-500 hover:text-[#EA8A22] transition-colors duration-300 cursor-pointer group shrink-0"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 text-neutral-400 group-hover:text-[#EA8A22] transition-colors">
                      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
                    </svg>
                    <span className="font-mono text-xs font-bold tracking-widest uppercase">Logo</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Featured Projects (Portfolio Section) */}
      <section 
        id="projects" 
        className="bg-white relative z-10 transition-all duration-200 py-12 md:py-20 lg:py-24"
      >
        {/* Floating 3D Octahedron */}
        <div className="absolute -right-12 top-12 w-80 h-80 opacity-15 pointer-events-none hidden xl:block">
          <FloatingWireframe shape="octahedron" className="w-full h-full" color="#264A8A" />
        </div>

        {/* Floating 3D Pyramid */}
        <div className="absolute -right-12 bottom-24 w-80 h-80 opacity-15 pointer-events-none hidden xl:block">
          <FloatingWireframe shape="pyramid" className="w-full h-full" color="#EA8A22" />
        </div>

        {/* Subtle decorative architectural CAD line arts positioned only in left/right margins */}
        <div className="absolute right-0 top-16 w-64 h-64 opacity-[0.04] pointer-events-none hidden xl:block select-none text-[#264A8A]">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.25" />
            <circle cx="50" cy="50" r="5" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <line x1="50" y1="2" x2="50" y2="98" stroke="currentColor" strokeWidth="0.25" strokeDasharray="1 2" />
            <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="0.25" strokeDasharray="1 2" />
            <path d="M 50 50 L 78 22" stroke="currentColor" strokeWidth="0.5" />
            <text x="80" y="22" className="text-[4px] font-mono fill-current">CAD_ANG_45°</text>
          </svg>
        </div>

        <div className="absolute right-6 -bottom-32 w-96 h-96 opacity-[0.06] pointer-events-none hidden xl:block select-none text-[#EA8A22] z-0">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.25" />
            <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.25" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <text x="15" y="22" className="text-[4px] font-mono fill-current">GRID_REF: C-6</text>
          </svg>
        </div>
        
        <div 
          className="max-w-[1400px] mx-auto transition-all duration-200 relative z-10"
          style={{
            paddingLeft: `${outerPaddingX}px`,
            paddingRight: `${outerPaddingX}px`
          }}
        >
          
          <div className="flex flex-col items-start justify-start mb-16 gap-6">
            <div className="space-y-2">
              <span className="text-[#264A8A] font-mono text-xs uppercase font-bold tracking-widest block">
                STRUCTURAL FOOTPRINT
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-neutral-900 uppercase tracking-tight">
                FEATURED PROJECTS
              </h2>
            </div>

            {/* Category Filter Buttons */}
            <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-none py-1">
              <div className="flex items-center gap-2 bg-white p-1.5 rounded-full border border-neutral-200 shadow-sm w-fit min-w-max">
                {['All', 'Commercial', 'Infrastructure', 'Industrial', 'Residential'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setProjectFilter(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-mono uppercase font-bold tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                      projectFilter === cat
                        ? 'bg-[#EA8A22] text-white'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Staggered Portfolio Grid with Alternating Visual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj, idx) => (
              <div
                key={idx}
                onClick={() => {
                  const slug = proj.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  navigate(`/projects/${slug}`);
                }}
                className="bg-white border border-neutral-200 rounded-3xl overflow-hidden group hover:border-[#EA8A22]/40 hover:shadow-2xl hover:shadow-[#EA8A22]/5 transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Project Image Panel with Zoom */}
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-neutral-950/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
                  
                  {/* Category Badge overlay */}
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-200/80 shadow-sm">
                    <span className="text-[10px] font-mono text-[#264A8A] font-bold uppercase">
                      {proj.category}
                    </span>
                  </div>

                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-105"
                  />
                </div>

                {/* Project details area */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-neutral-900 transition-colors uppercase tracking-tight group-hover:text-[#EA8A22]">
                      {proj.name}
                    </h3>

                    <p className="text-xs text-neutral-600 line-clamp-2">
                      {proj.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Explore All Projects CTA */}
          <div className="mt-16 flex justify-center">
            <Link 
              to="/projects"
              className="group flex items-center justify-center gap-2 px-8 py-4 border border-[#EA8A22] text-[#EA8A22] font-mono text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#EA8A22] hover:text-white hover:shadow-lg hover:shadow-[#EA8A22]/10 transition-all duration-300"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </section>

      {/* 7. Client Success Stories Section (Premium light redesign) */}
      <section 
        id="testimonials" 
        className="relative bg-[#fdfdfd] overflow-hidden z-10 transition-all duration-200 py-6 md:py-10 lg:py-12"
      >
        {/* Premium Background Elements */}
        <div className="absolute inset-0 bg-blueprint opacity-[0.03] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-[#264A8A] rounded-full opacity-[0.04] blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#EA8A22] rounded-full opacity-[0.03] blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff] via-transparent to-[#fdfdfd] pointer-events-none" />
        
        {/* Floating geometric shapes (3D animated) */}
        <div className="absolute top-[10%] left-[5%] w-64 h-64 opacity-[0.15] pointer-events-none hidden xl:block z-0">
          <FloatingWireframe shape="octahedron" className="w-full h-full" color="#264A8A" />
        </div>
        <div className="absolute bottom-[10%] right-[5%] w-72 h-72 opacity-[0.15] pointer-events-none hidden xl:block z-0">
          <FloatingWireframe shape="icosahedron" className="w-full h-full" color="#EA8A22" />
        </div>
        
        {/* Floating geometric shapes (subtle) */}
        <motion.div 
          className="absolute top-[20%] left-[10%] w-32 h-32 border border-[#264A8A]/10 rounded-full pointer-events-none"
          animate={{ y: [0, 20, 0], rotate: [0, 45, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[20%] right-[10%] w-48 h-48 border border-[#EA8A22]/10 rounded-full pointer-events-none"
          animate={{ y: [0, -30, 0], rotate: [0, -45, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        <div 
          className="max-w-[1400px] mx-auto relative z-10 transition-all duration-200"
          style={{
            paddingLeft: `${outerPaddingX}px`,
            paddingRight: `${outerPaddingX}px`
          }}
        >
          {/* Header */}
          <div className="text-center space-y-2 mb-8 md:mb-12">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#264A8A] font-mono text-xs uppercase font-bold tracking-[0.3em] block"
            >
              Client Success Stories
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-3xl lg:text-4xl font-black text-neutral-900 uppercase tracking-tighter"
            >
              Trusted by Global Leaders
            </motion.h2>
          </div>

          {/* Premium Testimonial Card */}
          <div className="max-w-[800px] mx-auto relative">
            
            {/* Navigation Buttons (Floating outside) */}
            <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-20 hidden md:block">
              <button 
                onClick={() => setTestimonialIndex(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
                className="w-14 h-14 rounded-full bg-white backdrop-blur-md border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#264A8A] hover:border-[#264A8A] transition-all duration-300 shadow-[0_10px_20px_rgba(38,74,138,0.05)] hover:shadow-[0_10px_20px_rgba(38,74,138,0.2)] group"
              >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-20 hidden md:block">
              <button 
                onClick={() => setTestimonialIndex(prev => prev === testimonials.length - 1 ? 0 : prev + 1)}
                className="w-14 h-14 rounded-full bg-white backdrop-blur-md border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#264A8A] hover:border-[#264A8A] transition-all duration-300 shadow-[0_10px_20px_rgba(38,74,138,0.05)] hover:shadow-[0_10px_20px_rgba(38,74,138,0.2)] group"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Glassmorphism Panel */}
            <div className="bg-white/80 backdrop-blur-2xl border border-neutral-200/60 p-5 md:p-8 lg:p-10 rounded-3xl relative shadow-[0_20px_40px_-15px_rgba(38,74,138,0.08)] hover:shadow-[0_30px_60px_-15px_rgba(38,74,138,0.15)] hover:border-[#264A8A]/20 transition-all duration-500 group overflow-hidden">
              
              {/* Glass reflection gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Large quote mark */}
              <Quote className="absolute top-4 md:top-6 left-4 md:left-6 w-14 h-14 text-[#264A8A]/2 group-hover:text-[#264A8A]/4 transition-colors duration-500 pointer-events-none rotate-180" />

              <div className="relative z-10 flex flex-col items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={testimonialIndex}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                    className="space-y-8 w-full max-w-[620px]"
                  >
                    {/* Quote text */}
                    <div className="text-center">
                      <p className="text-[15px] md:text-[17px] lg:text-[19px] text-neutral-800 font-normal leading-[1.65] tracking-tight">
                        {testimonials[testimonialIndex].quote.split(' ').map((word, i) => (
                          <motion.span 
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: i * 0.03 }}
                            className={['unprecedented', 'ingenuity', 'unparalleled'].some(k => word.toLowerCase().includes(k)) ? "text-[#EA8A22] font-medium" : ""}
                          >
                            {word}{' '}
                          </motion.span>
                        ))}
                      </p>
                    </div>

                    {/* Profile Block (No Image) */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-3 pt-5 border-t border-neutral-200/60">
                      <div className="relative">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-[#f8f9fa] border border-[#264A8A]/20 group-hover:border-[#264A8A]/50 transition-colors duration-500">
                          <span className="text-sm md:text-base font-bold text-[#264A8A]">
                            {testimonials[testimonialIndex].name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                          <h4 className="text-sm md:text-base font-semibold text-neutral-900 tracking-tight font-display">
                            {testimonials[testimonialIndex].name}
                          </h4>
                        </div>
                        <p className="text-xs md:text-sm text-neutral-500/80 font-normal">
                          {testimonials[testimonialIndex].role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Progress Bar Navigation */}
                <div className="w-full max-w-[120px] mt-8 flex gap-2 relative z-10">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setTestimonialIndex(idx)}
                      className="flex-1 h-1.5 rounded-full relative overflow-hidden bg-neutral-200 hover:bg-neutral-300 transition-colors focus:outline-none focus:ring-2 focus:ring-[#264A8A]"
                      aria-label={`Go to slide ${idx + 1}`}
                    >
                      {testimonialIndex === idx && (
                        <motion.div 
                          layoutId="activeIndicator"
                          className="absolute inset-0 bg-[#264A8A]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Mobile Navigation Arrows */}
                <div className="flex justify-center gap-4 mt-8 md:hidden relative z-10">
                  <button 
                    onClick={() => setTestimonialIndex(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
                    className="w-12 h-12 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-[#264A8A] hover:border-[#264A8A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#264A8A]"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setTestimonialIndex(prev => prev === testimonials.length - 1 ? 0 : prev + 1)}
                    className="w-12 h-12 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-[#264A8A] hover:border-[#264A8A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#264A8A]"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

{/* 9. Latest Blogs */}
      <section 
        id="blogs" 
        className="bg-white relative overflow-hidden z-10 transition-all duration-200 py-12 md:py-20 lg:py-24"
      >
        {/* Decorative structural dimension bar and annotations in margin/whitespace */}
        <div className="absolute right-8 top-12 w-40 h-16 opacity-[0.04] pointer-events-none hidden lg:block select-none text-[#EA8A22]">
          <svg viewBox="0 0 100 40" className="w-full h-full">
            <line x1="10" y1="20" x2="90" y2="20" stroke="currentColor" strokeWidth="0.5" />
            <line x1="10" y1="12" x2="10" y2="28" stroke="currentColor" strokeWidth="0.5" />
            <line x1="90" y1="12" x2="90" y2="28" stroke="currentColor" strokeWidth="0.5" />
            <line x1="6" y1="24" x2="14" y2="16" stroke="currentColor" strokeWidth="0.5" />
            <line x1="86" y1="24" x2="94" y2="16" stroke="currentColor" strokeWidth="0.5" />
            <text x="50" y="15" className="text-[5px] font-mono fill-current text-center" textAnchor="middle">12,400 mm [TYP]</text>
          </svg>
        </div>

        <div className="absolute left-6 bottom-12 w-48 h-48 opacity-[0.04] pointer-events-none hidden xl:block select-none text-[#264A8A]">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.25" strokeDasharray="4 4" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.25" />
            <text x="15" y="15" className="text-[4px] font-mono fill-current">STRUCT_C-1</text>
          </svg>
        </div>
        
        <div 
          className="max-w-[1400px] mx-auto transition-all duration-200"
          style={{
            paddingLeft: `${outerPaddingX}px`,
            paddingRight: `${outerPaddingX}px`
          }}
        >
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-[#264A8A] font-mono text-xs uppercase font-bold tracking-widest block">
              INDUSTRY INTEL
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-neutral-900 uppercase tracking-tight">
              INSIGHTS & INNOVATIONS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeBlogs.map((post, index) => (
              <Link
                key={index}
                to={`/blogs/${post.slug}`}
                className="bg-white border border-neutral-200 rounded-3xl overflow-hidden group hover:border-[#EA8A22]/40 hover:shadow-2xl hover:shadow-[#EA8A22]/5 transition-all duration-300 flex flex-col h-full block"
              >
                {/* Image zoom on hover */}
                <div className="h-48 overflow-hidden relative block shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded text-[9px] font-mono text-neutral-500 border border-neutral-200/60 shadow-sm">
                    {post.date}
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-start">
                  <h3 className="text-lg font-bold text-neutral-900 line-clamp-2 leading-snug group-hover:text-[#EA8A22] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-1 leading-relaxed font-light">
                    {post.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Explore All Insights CTA */}
          <div className="mt-16 flex justify-center">
            <Link 
              to="/blogs"
              className="group flex items-center justify-center gap-2 px-8 py-4 border border-[#EA8A22] text-[#EA8A22] font-mono text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#EA8A22] hover:text-white hover:shadow-lg hover:shadow-[#EA8A22]/10 transition-all duration-300"
            >
              <span>Explore All Insights</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </section>

      {/* 10. Company Profile Download Banner */}
      <section 
        className="relative bg-neutral-50 overflow-hidden z-10 transition-all duration-200 py-12 md:py-20 lg:py-24"
      >
        <div 
          className="max-w-[1400px] mx-auto relative z-10 transition-all duration-200"
          style={{
            paddingLeft: `${outerPaddingX}px`,
            paddingRight: `${outerPaddingX}px`
          }}
        >
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
                      <FileDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Contact Us Section */}
      <section 
        id="contact" 
        className="bg-white relative overflow-hidden z-10 transition-all duration-200 py-16 md:py-24"
      >
        {/* Subtle engineering line designs in background */}
        <div className="absolute inset-0 opacity-[0.012] pointer-events-none select-none bg-[radial-gradient(#264a8a_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          
          {/* Main Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[#264A8A] font-mono text-xs uppercase font-extrabold tracking-[0.2em] block">
              Global Headquarters & Branches
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tight uppercase">
              LET'S BUILD TOGETHER
            </h2>
          </div>

          {/* Dual-Column Section Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            
            {/* Left Column: Contact Form (55% visual equivalent width) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-10 border border-neutral-200/80 shadow-md relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#EA8A22]/5 rounded-bl-[100px] pointer-events-none" />
              
              <form onSubmit={handleContactSubmit} className="space-y-7 relative z-10">
                <div className="space-y-1.5">
                  <span className="text-[#EA8A22] font-mono text-xs uppercase font-extrabold tracking-widest block">
                    {selectedBranch === 'SA' && 'RIYADH OFFICE ROUTING'}
                    {selectedBranch === 'EG' && 'CAIRO OFFICE ROUTING'}
                    {selectedBranch === 'LY' && 'TRIPOLI OFFICE ROUTING'}
                  </span>
                  <h3 className="text-xl font-bold text-neutral-950 uppercase tracking-tight">
                    Inquire About Your Project
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Your Name */}
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-[10px] font-mono uppercase tracking-widest text-neutral-600 font-bold block">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Khalid Al-Faisal"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-neutral-50/50 border border-neutral-200/80 focus:border-[#EA8A22] focus:bg-white text-neutral-800 placeholder-neutral-400 p-3.5 rounded-xl text-sm focus:outline-none transition-all focus:ring-2 focus:ring-[#EA8A22]/15"
                    />
                  </div>

                  {/* Email address */}
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-[10px] font-mono uppercase tracking-widest text-neutral-600 font-bold block">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="e.g. khalid@example.com"
                      className="w-full bg-neutral-50/50 border border-neutral-200/80 focus:border-[#EA8A22] focus:bg-white text-neutral-800 placeholder-neutral-400 p-3.5 rounded-xl text-sm focus:outline-none transition-all focus:ring-2 focus:ring-[#EA8A22]/15"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone number & Country sync */}
                  <div className="space-y-2">
                    <label htmlFor="contact-phone" className="text-[10px] font-mono uppercase tracking-widest text-neutral-600 font-bold block">
                      Phone Number
                    </label>
                    <div className="relative flex items-center bg-neutral-50/50 border border-neutral-200/80 focus-within:border-[#EA8A22] focus-within:bg-white rounded-xl transition-all w-full focus-within:ring-2 focus-within:ring-[#EA8A22]/15">
                      <div className="flex items-center gap-1 pl-3.5 pr-2.5 border-r border-neutral-200 select-none shrink-0">
                        <CountryFlag countryCode={contactPhoneCountry} />
                        <select
                          value={contactPhoneCountry}
                          onChange={(e) => handlePhoneCountryChange(e.target.value)}
                          className="bg-transparent border-none text-xs font-mono text-neutral-700 focus:ring-0 focus:outline-none cursor-pointer p-0 pr-4 appearance-none font-bold"
                          style={{ backgroundImage: 'none' }}
                          aria-label="Country phone code"
                        >
                          <option value="+966">KSA (+966)</option>
                          <option value="+20">EG (+20)</option>
                          <option value="+218">LY (+218)</option>
                        </select>
                      </div>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="50 123 4567"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="flex-1 bg-transparent p-3.5 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Solutions/Project Type list */}
                  <div className="space-y-2">
                    <label htmlFor="contact-segment" className="text-[10px] font-mono uppercase tracking-widest text-neutral-600 font-bold block">
                      Project Type
                    </label>
                    <div className="relative">
                      <select
                        id="contact-segment"
                        className="w-full bg-neutral-50/50 border border-neutral-200/80 focus:border-[#EA8A22] focus:bg-white text-neutral-700 pl-3.5 pr-10 py-3.5 rounded-xl text-sm focus:outline-none transition-all focus:ring-2 focus:ring-[#EA8A22]/15 appearance-none"
                      >
                        <option>Commercial Buildings & Offices</option>
                        <option>Infrastructure & Roads</option>
                        <option>Industrial & Warehouses</option>
                        <option>Residential & Housing</option>
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project details area */}
                <div className="space-y-2">
                  <label htmlFor="contact-brief" className="text-[10px] font-mono uppercase tracking-widest text-neutral-600 font-bold block">
                    How can we help you? *
                  </label>
                  <textarea
                    id="contact-brief"
                    rows={4}
                    required
                    placeholder="Tell us a bit about your project or what you need..."
                    className="w-full bg-neutral-50/50 border border-neutral-200/80 focus:border-[#EA8A22] focus:bg-white text-neutral-800 placeholder-neutral-400 p-3.5 rounded-xl text-sm focus:outline-none transition-all focus:ring-2 focus:ring-[#EA8A22]/15 resize-none"
                  />
                </div>

                {/* Submit button with loader */}
                <button
                  type="submit"
                  disabled={contactSubmitting}
                  className="w-full py-4 bg-[#EA8A22] hover:bg-[#EA8A22]/90 disabled:bg-neutral-200 text-white font-mono font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg shadow-[#EA8A22]/10 hover:shadow-[#EA8A22]/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  {contactSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      SENDING INQUIRY...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      SEND MESSAGE <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </button>
              </form>
            </div>

            {/* Right Column: Unified Regional Office Hub (45% visual equivalent width) */}
            <div className="lg:col-span-5 bg-neutral-50/40 rounded-3xl p-8 md:p-10 border border-neutral-200/80 shadow-sm flex flex-col justify-between h-full">
              <div className="space-y-6">
                
                {/* Discoverability Helper Text */}
                <div className="flex items-center gap-2 text-xs font-mono font-medium text-neutral-500 tracking-wide select-none">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#EA8A22]/80 animate-pulse" />
                  <span>Select a regional office to view its contact details.</span>
                </div>

                {/* Modern, compact interactive strip showing regional nodes */}
                <div className="relative bg-[#0d121f] border border-neutral-800 rounded-2xl h-[100px] overflow-hidden select-none">
                  {/* Grid overlay */}
                  <div className="absolute inset-0 opacity-[0.12] pointer-events-none bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] [background-size:12px_12px]" />
                  
                  {/* Map labels */}
                  <div className="absolute top-2.5 left-3.5 font-mono text-[8px] text-neutral-500 tracking-wider">
                    REGIONAL CONNECTIONS // MAABANY_NET
                  </div>
                  
                  <div className="absolute bottom-2.5 right-3.5 font-mono text-[8px] text-[#EA8A22]/80 tracking-widest animate-pulse font-bold">
                    • {selectedBranch} ACTIVE_NODE
                  </div>

                  {/* Tooltip */}
                  <AnimatePresence>
                    {hoveredBranch && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 4 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute bg-neutral-900/95 backdrop-blur-sm text-[10px] text-white font-mono font-bold px-2.5 py-1.5 rounded-lg border border-neutral-700/80 pointer-events-none z-30 shadow-lg"
                        style={{
                          left: hoveredBranch === 'SA' ? '260px' : hoveredBranch === 'EG' ? '160px' : '60px',
                          top: hoveredBranch === 'SA' ? '15px' : hoveredBranch === 'EG' ? '18px' : '25px',
                          transform: 'translateX(-50%)'
                        }}
                      >
                        {hoveredBranch === 'SA' && '🇸🇦 KSA (Riyadh Headquarters)'}
                        {hoveredBranch === 'EG' && '🇪🇬 Egypt (Cairo Branch)'}
                        {hoveredBranch === 'LY' && '🇱🇾 Libya (Tripoli Branch)'}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Map SVG */}
                  <svg className="w-full h-full" viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient id="orangeGlowGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#EA8A22" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#EA8A22" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* Animated connecting lines representing data flow */}
                    {/* LY -> EG connection */}
                    <motion.path 
                      d="M 60 65 Q 110 50 160 58" 
                      stroke="#EA8A22" 
                      strokeWidth={selectedBranch === 'EG' || selectedBranch === 'LY' ? "2" : "1.2"} 
                      strokeDasharray="4 4"
                      animate={selectedBranch === 'EG' || selectedBranch === 'LY' ? { strokeDashoffset: [0, -20] } : {}}
                      transition={{ repeat: Infinity, ease: "linear", duration: 1.5 }}
                      className="transition-all duration-300"
                      style={{ opacity: selectedBranch === 'EG' || selectedBranch === 'LY' ? 0.85 : 0.25 }}
                    />

                    {/* EG -> SA connection */}
                    <motion.path 
                      d="M 160 58 Q 210 45 260 55" 
                      stroke="#EA8A22" 
                      strokeWidth={selectedBranch === 'SA' || selectedBranch === 'EG' ? "2" : "1.2"} 
                      strokeDasharray="4 4"
                      animate={selectedBranch === 'SA' || selectedBranch === 'EG' ? { strokeDashoffset: [0, -20] } : {}}
                      transition={{ repeat: Infinity, ease: "linear", duration: 1.5 }}
                      className="transition-all duration-300"
                      style={{ opacity: selectedBranch === 'SA' || selectedBranch === 'EG' ? 0.85 : 0.25 }}
                    />

                    {/* Interactive pins */}
                    {[
                      { code: 'SA' as const, coordinates: { x: 260, y: 55 }, label: 'KSA' },
                      { code: 'EG' as const, coordinates: { x: 160, y: 58 }, label: 'EG' },
                      { code: 'LY' as const, coordinates: { x: 60, y: 65 }, label: 'LY' }
                    ].map((node) => {
                      const isActive = selectedBranch === node.code;
                      const isHovered = hoveredBranch === node.code;
                      return (
                        <motion.g 
                          key={`map-strip-node-${node.code}`} 
                          className="cursor-pointer group" 
                          onClick={() => handleSelectBranch(node.code)}
                          onMouseEnter={() => setHoveredBranch(node.code)}
                          onMouseLeave={() => setHoveredBranch(null)}
                          whileHover={{ scale: 1.15 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        >
                          {/* Active Glowing Rings & Moving Active Indicator */}
                          {isActive && (
                            <motion.g layoutId="activeMapIndicator" transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
                              {/* Glowing radial gradient circle */}
                              <circle cx={node.coordinates.x} cy={node.coordinates.y} r="15" fill="url(#orangeGlowGradient)" />
                              {/* Pulse ring */}
                              <motion.circle 
                                cx={node.coordinates.x} 
                                cy={node.coordinates.y} 
                                r="12" 
                                stroke="#EA8A22" 
                                strokeWidth="1" 
                                fill="none"
                                initial={{ scale: 0.8, opacity: 0.9 }}
                                animate={{ scale: 1.4, opacity: 0 }}
                                transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
                                style={{ transformOrigin: `${node.coordinates.x}px ${node.coordinates.y}px` }}
                              />
                            </motion.g>
                          )}

                          {/* Hover Glow Underlay for inactive pins */}
                          {!isActive && isHovered && (
                            <circle cx={node.coordinates.x} cy={node.coordinates.y} r="10" className="fill-[#EA8A22]/10 stroke-[#EA8A22]/30 stroke-[1] transition-all duration-200" />
                          )}

                          {/* Pin base circle */}
                          <circle 
                            cx={node.coordinates.x} 
                            cy={node.coordinates.y} 
                            r={isActive ? "4.5" : "3"} 
                            className={`transition-all duration-300 ${
                              isActive 
                                ? 'fill-[#EA8A22]' 
                                : isHovered ? 'fill-[#EA8A22]/90' : 'fill-neutral-500 opacity-60'
                            }`} 
                          />
                          <circle cx={node.coordinates.x} cy={node.coordinates.y} r="1.5" fill="white" />
                          
                          {/* Label Text */}
                          <text 
                            x={node.coordinates.x} 
                            y={node.coordinates.y - 12} 
                            className={`font-mono text-[8.5px] font-bold transition-all duration-300 select-none ${
                              isActive 
                                ? 'fill-[#EA8A22] font-black' 
                                : isHovered ? 'fill-neutral-200' : 'fill-neutral-500 opacity-60'
                            }`}
                            textAnchor="middle"
                          >
                            {node.code}
                          </text>
                        </motion.g>
                      );
                    })}
                  </svg>
                </div>

                {/* Unified Regional Office Info Block */}
                <div className="relative">
                  <AnimatePresence mode="wait">
                    {[
                      {
                        code: 'SA' as const,
                        officeName: 'Riyadh Headquarters',
                        address: 'Tower B, 18th Floor, King Fahd Road, Al Olaya, Riyadh, KSA',
                        phone: '+966 11 456 7890',
                        phoneRaw: 'tel:+966114567890',
                        hours: 'Sunday – Thursday: 08:00 AM – 05:00 PM (GMT +3)',
                        directionsUrl: 'https://maps.google.com/?q=Tower+B,+18th+Floor,+King+Fahd+Road,+Al+Olaya,+Riyadh,+KSA',
                        flag: '🇸🇦'
                      },
                      {
                        code: 'EG' as const,
                        officeName: 'Cairo Regional Branch',
                        address: 'Plot 12, Sector 1, Fifth Settlement, New Cairo, Egypt',
                        phone: '+20 2 2345 6789',
                        phoneRaw: 'tel:+20223456789',
                        hours: 'Sunday – Thursday: 08:30 AM – 05:30 PM (GMT +2)',
                        directionsUrl: 'https://maps.google.com/?q=Plot+12,+Sector+1,+Fifth+Settlement,+New+Cairo,+Egypt',
                        flag: '🇪🇬'
                      },
                      {
                        code: 'LY' as const,
                        officeName: 'Tripoli Regional Branch',
                        address: 'Al Andalus District, Gargarish Road, Tripoli, Libya',
                        phone: '+218 21 360 1234',
                        phoneRaw: 'tel:+218213601234',
                        hours: 'Sunday – Thursday: 08:00 AM – 04:30 PM (GMT +2)',
                        directionsUrl: 'https://maps.google.com/?q=Al+Andalus+District,+Gargarish+Road,+Tripoli,+Libya',
                        flag: '🇱🇾'
                      }
                    ].map((branch) => {
                      if (branch.code !== selectedBranch) return null;
                      return (
                        <motion.div
                          key={branch.code}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.18 }}
                          className="space-y-6"
                        >
                          {/* Office Name Title */}
                          <div className="space-y-1">
                            <span className="font-mono text-[10px] uppercase font-extrabold tracking-widest text-[#264A8A]">
                              OFFICE PROFILE
                            </span>
                            <h4 className="text-xl font-black text-neutral-900 tracking-tight flex items-center gap-2">
                              <span>{branch.flag}</span>
                              <span>{branch.officeName}</span>
                            </h4>
                          </div>

                          {/* Details list mapped with matching minimal icons */}
                          <div className="space-y-5">
                            {/* Address */}
                            <div className="flex gap-3.5 items-start">
                              <div className="p-1.5 text-[#EA8A22] shrink-0 mt-0.5">
                                <MapPin className="w-4 h-4 stroke-[2.5]" />
                              </div>
                              <div className="space-y-0.5">
                                <p className="font-mono text-[9px] font-extrabold tracking-widest text-neutral-400 uppercase">OFFICE ADDRESS</p>
                                <p className="text-neutral-700 text-sm leading-relaxed">{branch.address}</p>
                              </div>
                            </div>

                            {/* Direct Line */}
                            <div className="flex gap-3.5 items-start">
                              <div className="p-1.5 text-[#EA8A22] shrink-0 mt-0.5">
                                <Phone className="w-4 h-4 stroke-[2.5]" />
                              </div>
                              <div className="space-y-0.5">
                                <p className="font-mono text-[9px] font-extrabold tracking-widest text-neutral-400 uppercase">TELEPHONE</p>
                                <a 
                                  href={branch.phoneRaw} 
                                  className="text-neutral-800 text-sm font-mono font-bold block hover:text-[#EA8A22] transition-colors focus:outline-none focus:underline"
                                >
                                  {branch.phone}
                                </a>
                              </div>
                            </div>

                            {/* Email Support (Centralized channel highlighted clearly inside the container) */}
                            <div className="flex gap-3.5 items-start">
                              <div className="p-1.5 text-[#EA8A22] shrink-0 mt-0.5">
                                <Mail className="w-4 h-4 stroke-[2.5]" />
                              </div>
                              <div className="space-y-0.5">
                                <p className="font-mono text-[9px] font-extrabold tracking-widest text-neutral-400 uppercase">GENERAL INQUIRIES</p>
                                <a 
                                  href="mailto:info@maabany.com" 
                                  className="text-neutral-800 text-sm font-bold block hover:text-[#EA8A22] transition-colors focus:outline-none focus:underline"
                                >
                                  info@maabany.com
                                </a>
                              </div>
                            </div>

                            {/* Working Hours */}
                            <div className="flex gap-3.5 items-start">
                              <div className="p-1.5 text-[#EA8A22] shrink-0 mt-0.5">
                                <Clock className="w-4 h-4 stroke-[2.5]" />
                              </div>
                              <div className="space-y-0.5">
                                <p className="font-mono text-[9px] font-extrabold tracking-widest text-neutral-400 uppercase">WORKING HOURS</p>
                                <p className="text-neutral-600 text-xs leading-relaxed font-mono">{branch.hours}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>


            </div>

          </div>
        </div>
      </section>



    </>
  );
}

