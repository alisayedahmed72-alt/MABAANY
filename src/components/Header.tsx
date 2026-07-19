import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Globe, Menu, X, ChevronRight } from 'lucide-react';
import { useQuoteModal } from '../contexts/QuoteContext';

const maabanyLogoOriginal = new URL('../assets/images/maabany_logo_transparent.png', import.meta.url).href;

interface HeaderProps {
  isHeroVariant?: boolean;
  activeSection?: string;
}

export function Header({ isHeroVariant = true, activeSection = 'home' }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const setQuoteModalOpen = useQuoteModal();
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [transparentLogoUrl, setTransparentLogoUrl] = useState<string>('');

  // Use the pre-transparent logo directly as requested by the user
  useEffect(() => {
    setTransparentLogoUrl(maabanyLogoOriginal);
  }, []);

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

  // Monitor the scroll position of our custom app scroller viewport
  useEffect(() => {
    const scroller = document.getElementById('app-scroller');
    if (!scroller) return;

    const handleScroll = () => {
      setScrolled(scroller.scrollTop > 15);
    };

    scroller.addEventListener('scroll', handleScroll);
    handleScroll(); // execute once on mount

    return () => {
      scroller.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  // Reusable keyboard focus classes for WCAG AA compliance
  const focusRingClass = `focus-visible:ring-2 focus-visible:ring-[#EA8A22] focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-white`;

  return (
    <header
      id={isHeroVariant ? "hero-header" : "global-header"}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none w-full"
    >
      <div 
        className="w-full max-w-[1400px] mx-auto transition-all duration-300"
        style={{
          paddingLeft: 'var(--outer-padding-x, 24px)',
          paddingRight: 'var(--outer-padding-x, 24px)',
          paddingTop: scrolled 
            ? '12px' 
            : isHeroVariant 
              ? 'calc(var(--hero-nav-top-spacing, 16px) + var(--outer-padding-top, 16px))' 
              : 'calc(var(--outer-padding-top, 16px) + 12px)'
        }}
      >
        <div
          id="nav-pill"
          className={`pointer-events-auto w-full rounded-full transition-all duration-300 flex items-center justify-between ${
            scrolled
              ? 'bg-white/95 backdrop-blur-md border border-neutral-200 shadow-[0_12px_40px_rgba(0,0,0,0.08)] py-2.5 px-5 md:px-7'
              : 'bg-white border border-neutral-100 shadow-md py-3.5 px-6 md:px-8'
          }`}
          style={{
            marginLeft: '12px',
            marginRight: '12px',
            width: 'calc(100% - 24px)'
          }}
        >
          <Link
            to="/"
            className={`relative flex items-center w-40 h-10 md:w-56 md:h-12 group transition-all duration-300 transform hover:scale-[1.02] active:scale-95 ${focusRingClass}`}
          >
            {!transparentLogoUrl ? (
              <div className="flex flex-col text-left">
                <span className="text-[16px] font-black tracking-tight leading-none font-sans text-[#112E51]">
                  MAABANY
                </span>
                <span className="text-[6.5px] tracking-[0.16em] mt-1 font-sans uppercase font-bold whitespace-nowrap text-[#EA8A22]">
                  INTEGRATED BUILDING SOLUTIONS
                </span>
              </div>
            ) : (
              <img 
                src={transparentLogoUrl} 
                alt="Maabany Integrated Building Solutions" 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-[45px] md:h-[55px] w-auto max-w-none object-contain transition-all duration-300 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
            )}
          </Link>

          <nav className="hidden xl:flex items-center gap-2 xl:gap-3">
            {navLinks.map((link) => {
              const isActive = 
                location.pathname === link.path || 
                (link.id === 'solutions' && location.pathname.startsWith('/solutions')) ||
                (link.id === 'projects' && location.pathname.startsWith('/projects')) ||
                (location.pathname === '/' && activeSection === link.id && link.path.startsWith('/#'));
              
              const linkColor = isActive
                ? 'text-[#EA8A22] font-semibold'
                : 'text-[#264A8A] hover:text-[#EA8A22] font-semibold';

              return link.path.startsWith('/#') && location.pathname === '/' ? (
                <a
                  key={link.id}
                  href={link.path.replace('/', '')}
                  className={`flex items-center py-1.5 px-2 2xl:px-2.5 rounded-full text-[12.5px] whitespace-nowrap tracking-wide transition-colors relative duration-300 ${linkColor} ${focusRingClass}`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-2 right-2 h-[2px] bg-[#EA8A22] transition-all duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0 hover:opacity-100'
                    }`}
                  />
                </a>
              ) : (
                <Link
                  key={link.id}
                  to={link.path}
                  className={`flex items-center py-1.5 px-2 2xl:px-2.5 rounded-full text-[12.5px] whitespace-nowrap tracking-wide transition-colors relative duration-300 ${linkColor} ${focusRingClass}`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-2 right-2 h-[2px] bg-[#EA8A22] transition-all duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0 hover:opacity-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5 xl:gap-3">
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2.5 rounded-full transition-all duration-200 ${focusRingClass} hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800`}
                title="Search structural projects"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            <button
              className={`hidden md:flex items-center gap-1.5 p-2 rounded-full transition-colors duration-200 font-mono text-xs font-bold ${focusRingClass} text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100`}
              title="Change Language"
            >
              <Globe className="w-4 h-4" />
              <span>EN</span>
            </button>
            
            <Link
              to="/request-quote"
              className={`hidden sm:inline-flex items-center justify-center whitespace-nowrap shrink-0 px-5 py-2.5 font-semibold text-xs tracking-wider uppercase rounded-full shadow-lg transition-all duration-300 transform active:scale-95 cursor-pointer font-mono ${focusRingClass} ${
                location.pathname === '/request-quote'
                  ? 'bg-[#EA8A22] text-white shadow-[#EA8A22]/25 ring-2 ring-[#EA8A22]'
                  : 'bg-[#EA8A22] hover:bg-[#EA8A22]/90 text-white shadow-[#EA8A22]/10 hover:shadow-[#EA8A22]/25'
              }`}
            >
              Request a Quote
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`xl:hidden relative flex items-center justify-center w-10 h-10 rounded-full transition-colors ${focusRingClass} text-[#264A8A] bg-neutral-100 hover:bg-neutral-200`}
            >
              <Menu className={`w-5 h-5 absolute transition-all duration-300 ${menuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
              <X className={`w-5 h-5 absolute transition-all duration-300 ${menuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="px-3 w-full">
            <div 
              className="pointer-events-auto mt-3 rounded-2xl border border-neutral-200 bg-white/95 backdrop-blur-xl text-neutral-900 p-4 shadow-xl shadow-neutral-200/50 animate-fade-in"
              style={{
                marginLeft: '12px',
                marginRight: '12px',
                width: 'calc(100% - 24px)'
              }}
            >
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                    setSearchOpen(false);
                  }
                }}
                className="max-w-4xl mx-auto flex items-center gap-3"
              >
                <Search className="w-5 h-5 text-neutral-600" />
                <input
                  type="text"
                  placeholder="Search solutions, projects, cities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none focus:outline-none text-sm py-1 text-neutral-900 placeholder-neutral-400"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                  className={`text-xs font-mono px-3 py-1.5 rounded-lg transition-colors ${focusRingClass} text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200`}
                >
                  Close ESC
                </button>
              </form>
            </div>
          </div>
        )}

        <div className={`xl:hidden absolute left-0 right-0 z-50 origin-top transition-all duration-300 ${
          menuOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
        }`}
          style={{
            top: '100%',
            paddingLeft: 'var(--outer-padding-x, 24px)',
            paddingRight: 'var(--outer-padding-x, 24px)',
            marginTop: '12px'
          }}
        >
          <div 
            className="pointer-events-auto rounded-2xl border border-neutral-200 bg-white/98 backdrop-blur-xl text-neutral-900 p-3 shadow-2xl shadow-neutral-200/60"
            style={{
              marginLeft: '12px',
              marginRight: '12px',
              width: 'calc(100% - 24px)'
            }}
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 border-b last:border-none flex items-center justify-between ${focusRingClass} border-neutral-100 text-neutral-700 hover:text-[#EA8A22] hover:bg-neutral-50`}
                >
                  {link.label}
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
