import { createContext, useContext } from 'react';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Globe, Menu, X, ChevronDown, Check, ChevronRight, CheckCircle, ArrowRight, SlidersHorizontal, Eye } from 'lucide-react';
import { Footer } from './Footer';
import { Header } from './Header';
import { AnimatedBackground } from './AnimatedBackground';
import { solutions, projects, detailSolutions } from '../data';
import { safeGetItem } from '../utils/storage';


import { QuoteModalContext } from '../contexts/QuoteContext';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const isHomePage = location.pathname === '/';

  // Function to navigate to the quote page instead of opening a modal
  const handleOpenQuote = (open: boolean) => {
    if (open) {
      navigate('/request-quote');
    }
  };

  // Load spacing settings from localStorage on mount and route changes, applying globally
  useEffect(() => {
    const updateStyles = () => {
      const sectionPaddingY = safeGetItem('db_sectionPaddingY') ?? '96';
      const outerPaddingX = safeGetItem('db_outerPaddingX') ?? '24';
      const outerPaddingTop = safeGetItem('db_outerPaddingTop') ?? '16';
      const outerPaddingBottom = safeGetItem('db_outerPaddingBottom') ?? '4';
      const heroBorderRadius = safeGetItem('db_heroBorderRadius') ?? '40';
      const videoScale = safeGetItem('db_videoScale') ?? '1.35';
      const heroNavSpacing = safeGetItem('db_heroNavSpacing') ?? '120';
      const heroNavTopSpacing = safeGetItem('db_heroNavTopSpacing') ?? '16';

      document.documentElement.style.setProperty('--section-padding-y', `${sectionPaddingY}px`);
      document.documentElement.style.setProperty('--outer-padding-x', `${outerPaddingX}px`);
      document.documentElement.style.setProperty('--outer-padding-top', `${outerPaddingTop}px`);
      document.documentElement.style.setProperty('--outer-padding-bottom', `${outerPaddingBottom}px`);
      document.documentElement.style.setProperty('--hero-border-radius', `${heroBorderRadius}px`);
      document.documentElement.style.setProperty('--video-scale', `${videoScale}`);
      document.documentElement.style.setProperty('--hero-nav-spacing', `${heroNavSpacing}px`);
      document.documentElement.style.setProperty('--hero-nav-top-spacing', `${heroNavTopSpacing}px`);
    };

    updateStyles();

    // Listen for storage changes in other tabs/windows
    window.addEventListener('storage', updateStyles);

    // Set up a lightweight interval to instantly capture updates made in the current window
    const interval = setInterval(updateStyles, 200);

    return () => {
      window.removeEventListener('storage', updateStyles);
      clearInterval(interval);
    };
  }, [location.pathname]);

  // Sync searchQuery with "?q=" URL query param when on /search page
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    if (location.pathname === '/search') {
      setSearchQuery(q);
    } else {
      setSearchQuery('');
    }
  }, [location]);

  useEffect(() => {
    const scroller = document.getElementById('app-scroller');
    if (!scroller) return;

    const handleScroll = () => {
      setIsScrolled(scroller.scrollTop > 50);
      
      // Calculate scroll progress percentage
      const scrollTop = scroller.scrollTop;
      const scrollHeight = scroller.scrollHeight;
      const clientHeight = scroller.clientHeight;
      const maxScroll = scrollHeight - clientHeight;
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      setScrollProgress(progress);
      
      const sections = ['home', 'about', 'solutions', 'projects', 'testimonials', 'blogs', 'contact'];
      let currentSection = 'home';
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    scroller.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => scroller.removeEventListener('scroll', handleScroll);
  }, [location.pathname]); // re-bind on route change if needed

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (searchOpen) {
          setSearchOpen(false);
          setSearchQuery('');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  const navLinks = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'solutions', label: 'Solutions', path: '/solutions' },
    { id: 'projects', label: 'Projects', path: '/projects' },
    { id: 'industries', label: 'Industries We Serve', path: '/industries' },
    { id: 'clients', label: 'Clients & Partners', path: '/clients-partners' },
    { id: 'blogs', label: 'Blogs', path: '/blogs' },
    { id: 'contact', label: 'Contact Us', path: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-transparent text-neutral-900 font-sans selection:bg-[#EA8A22] selection:text-white overflow-hidden">
      
      {/* Premium Global Animated Background visuals & patterns */}
      <AnimatedBackground />

      {/* Premium Global Scroll Progress Bar */}
      <div 
        id="global-scroll-progress"
        className="fixed top-0 left-0 right-0 h-[3px] bg-neutral-200/10 z-[60] pointer-events-none"
      >
        <div 
          className="h-full bg-gradient-to-r from-[#EA8A22] via-[#EA8A22] to-amber-500 shadow-[0_1px_12px_rgba(234,138,34,0.6)] transition-all duration-75 ease-out rounded-r-full"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {!isHomePage && (
        <Header isHeroVariant={true} activeSection={activeSection} />
      )}

      <div 
        id="app-scroller"
        className="fixed inset-0 w-full min-w-full left-0 right-0 max-w-none pt-0 overflow-y-auto overflow-x-hidden transition-all duration-500"
      >
        <QuoteModalContext.Provider value={handleOpenQuote}>
          {children}
        </QuoteModalContext.Provider>

        <Footer setQuoteModalOpen={handleOpenQuote} />
      </div>
    </div>
  );
}
