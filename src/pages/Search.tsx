import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  SlidersHorizontal, 
  ChevronDown, 
  HelpCircle,
  FileText,
  Briefcase,
  Layers,
  MapPin,
  BookOpen,
  X,
  FileQuestion,
  RefreshCw,
  Building,
  HardHat,
  Eye,
  Settings,
  ArrowUpRight,
  CheckCircle
} from 'lucide-react';
import { projects, blogs, detailSolutions } from '../data';
import { InternalPageHero } from '../components/InternalPageHero';

// Definition of a searchable index item
interface SearchItem {
  id: string;
  type: 'Solutions' | 'Projects' | 'Blog Articles' | 'Industries' | 'Pages';
  title: string;
  desc: string;
  image: string;
  path: string;
  breadcrumbs: string[];
  date?: string; // for sorting
  tags?: string[];
}

export function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();

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

  // Reset scroller to top on route change or search mount
  useEffect(() => {
    const scroller = document.getElementById('app-scroller');
    if (scroller) {
      scroller.scrollTo({ top: 0, behavior: 'instant' as any });
    }
  }, [location.search]);

  // Query state extracted from "?q="
  const getQueryParam = () => {
    const params = new URLSearchParams(location.search);
    return params.get('q') || '';
  };

  const [searchVal, setSearchVal] = useState(getQueryParam());
  const [activeQuery, setActiveQuery] = useState(getQueryParam());

  // If query in URL changes, sync our search input
  useEffect(() => {
    const urlQ = getQueryParam();
    setSearchVal(urlQ);
    setActiveQuery(urlQ);
  }, [location.search]);

  // Filters State
  const [activeFilter, setActiveFilter] = useState<'All' | 'Solutions' | 'Projects' | 'Blogs' | 'Industries' | 'Pages'>('All');
  
  // Sorting State
  const [sortBy, setSortBy] = useState<'Relevance' | 'Newest' | 'A-Z'>('Relevance');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  // Suggestions panel focus state
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setSuggestionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Comprehensive static and dynamic content indexing
  const searchableDatabase: SearchItem[] = [
    // Pages
    {
      id: 'p-home',
      type: 'Pages',
      title: 'Home / Maabany Main Portal',
      desc: 'Saudi Arabia\'s premier tier-1 modern engineering and high-scale construction enterprise. Turnkey Civil, MEP, Fit-Out and Light Current structures.',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80',
      path: '/',
      breadcrumbs: ['Home']
    },
    {
      id: 'p-about',
      type: 'Pages',
      title: 'About Us / Engineering Heritage',
      desc: 'Pioneering infrastructure standards since decades. Learn about our multidisciplinary executive leadership, regional offices, and sustainable building visions.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
      path: '/about',
      breadcrumbs: ['Home', 'About']
    },
    {
      id: 'p-contact',
      type: 'Pages',
      title: 'Contact Us / Head Offices & Inquiries',
      desc: 'Submit tenders, explore open career openings, or locate regional Maabany offices in Cairo, Egypt; Riyadh, Saudi Arabia; and Tripoli, Libya.',
      image: 'https://images.unsplash.com/photo-1423662055902-3e6e7e6426a4?auto=format&fit=crop&w=600&q=80',
      path: '/contact',
      breadcrumbs: ['Home', 'Contact Us']
    },
    {
      id: 'p-privacy',
      type: 'Pages',
      title: 'Privacy Policy & Licensing Terms',
      desc: 'Explore Maabany\'s global regulatory adherence, data encryption protocols, structural building codes licensing, and stakeholder disclosures.',
      image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
      path: '/privacy',
      breadcrumbs: ['Home', 'Privacy Policy']
    },
    {
      id: 'p-industries',
      type: 'Pages',
      title: 'Industries We Serve / Sector Matrix',
      desc: 'High-scale industrial logistics, commercial office developments, luxury residential micro-townships, civil public parks, and metropolitan transport systems.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
      path: '/industries',
      breadcrumbs: ['Home', 'Industries We Serve']
    },
    {
      id: 'p-clients',
      type: 'Pages',
      title: 'Clients & Strategic Partners roster',
      desc: 'Our active portfolio of public ministries, tier-1 private developers (ROSHN, APEX), and material suppliers supporting sustainable heavy engineering.',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=600&q=80',
      path: '/clients-partners',
      breadcrumbs: ['Home', 'Clients & Partners']
    },
    {
      id: 'p-quote',
      type: 'Pages',
      title: 'Request a Quote / Project Estimations',
      desc: 'Submit requirements online to receive custom engineering assessments and commercial proposals in 2-3 business days. Active across Egypt, KSA, and Libya.',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
      path: '/request-quote',
      breadcrumbs: ['Home', 'Request a Quote']
    },

    // 6 Core Solutions (incorporating customized requirements from user request)
    {
      id: 's-civil',
      type: 'Solutions',
      title: 'Civil Solutions',
      desc: 'Construction and civil engineering services for commercial, residential, industrial, and infrastructure projects. Site preparation, foundation pours, and reinforced skeletons.',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80',
      path: '/solutions/civil-solutions',
      breadcrumbs: ['Home', 'Solutions', 'Civil Solutions']
    },
    {
      id: 's-fitout',
      type: 'Solutions',
      title: 'Fit-Out Solutions',
      desc: 'Interior fit-out and finishing solutions that combine functionality with premium craftsmanship. High-end wood paneling, ceilings, lighting, and workspace layout optimizations.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
      path: '/solutions/fit-out-solutions',
      breadcrumbs: ['Home', 'Solutions', 'Fit-Out Solutions']
    },
    {
      id: 's-mep',
      type: 'Solutions',
      title: 'MEP Solutions',
      desc: 'Mechanical, electrical, and plumbing systems designed for efficiency, safety, and long-term performance. Advanced HVAC, carbon footprint minimizations, and hydraulic networks.',
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=600&q=80',
      path: '/solutions/mep-solutions',
      breadcrumbs: ['Home', 'Solutions', 'MEP Solutions']
    },
    {
      id: 's-light',
      type: 'Solutions',
      title: 'Light Current Solutions',
      desc: 'Integrated smart building systems including CCTV, access control, structured cabling, parking systems, and smart home technologies.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
      path: '/solutions/light-current-solutions',
      breadcrumbs: ['Home', 'Solutions', 'Light Current Solutions']
    },
    {
      id: 's-facility',
      type: 'Solutions',
      title: 'Facility Management',
      desc: 'Comprehensive maintenance and operational support to ensure long-term building performance. HVAC lifespans, preventative mechanical scheduling, and energy optimization audits.',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80',
      path: '/solutions/facility-management',
      breadcrumbs: ['Home', 'Solutions', 'Facility Management']
    },
    {
      id: 's-project-delivery',
      type: 'Solutions',
      title: 'Integrated Project Delivery',
      desc: 'End-to-end project coordination from engineering design through construction, heavy metrology verification, materials procurement, and handover.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
      path: '/solutions/integrated-project-delivery',
      breadcrumbs: ['Home', 'Solutions', 'Integrated Project Delivery']
    },

    // Dynamic Projects from src/data.ts
    ...projects.map(p => ({
      id: `proj-${p.slug}`,
      type: 'Projects' as const,
      title: p.name,
      desc: `${p.desc} Located in ${p.location}. Delivered in ${p.year} under category ${p.category}. Crafted with precision and sustainable building models.`,
      image: p.image,
      path: `/projects/${p.slug}`,
      breadcrumbs: ['Home', 'Projects', p.name],
      date: p.year // mock year for sorting
    })),

    // Dynamic Blogs from src/data.ts
    ...blogs.map(b => ({
      id: `blog-${b.slug}`,
      type: 'Blog Articles' as const,
      title: b.title,
      desc: b.desc,
      image: b.image,
      path: `/blogs/${b.slug}`,
      breadcrumbs: ['Home', 'Blogs', b.title],
      date: b.date // date string for sorting
    })),

    // Industries
    {
      id: 'ind-realestate',
      type: 'Industries',
      title: 'Real Estate Development & Residential Sectors',
      desc: 'Engineering net-zero multi-family complexes, modern luxurious brutalist estates, and smart micro-townships.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      path: '/industries',
      breadcrumbs: ['Home', 'Industries', 'Real Estate']
    },
    {
      id: 'ind-heavy',
      type: 'Industries',
      title: 'Heavy Industrial Manufacturing & gigafactories',
      desc: 'Constructing robotic gigafactories, chemical synthesis centers, cleanrooms, and high-voltage electricity supply structures with vibration-isolated foundations.',
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=600&q=80',
      path: '/industries',
      breadcrumbs: ['Home', 'Industries', 'Industrial']
    },
    {
      id: 'ind-public',
      type: 'Industries',
      title: 'Public Infrastructure & Transport Networks',
      desc: 'State highway networks, rapid light rail terminals, structural bridges, and public metropolitan viaducts designed for long lifetimes.',
      image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=600&q=80',
      path: '/industries',
      breadcrumbs: ['Home', 'Industries', 'Infrastructure']
    }
  ];

  // Live Suggestions list (8 max)
  const popularTerms = [
    'Civil Solutions',
    'Riyadh',
    'Facility Management',
    'MEP Systems',
    'Decarbonizing',
    'Commercial Tower',
    'Smart CCTV',
    'KSA projects'
  ];

  const suggestedPages = [
    { name: 'Solutions & Engineering', path: '/solutions' },
    { name: 'Active Engineering Portfolio', path: '/projects' },
    { name: 'Contact Corporate Desk', path: '/contact' },
    { name: 'Request an Itemized Quote', path: '/request-quote' }
  ];

  // Filter suggestions based on what user is typing
  const getSuggestions = () => {
    if (!searchVal.trim()) {
      return { terms: popularTerms, pages: suggestedPages };
    }
    const term = searchVal.toLowerCase();
    
    // Filter matching titles or terms
    const filteredTerms = searchableDatabase
      .filter(item => item.title.toLowerCase().includes(term) || item.desc.toLowerCase().includes(term))
      .slice(0, 5)
      .map(item => item.title);

    const filteredPages = suggestedPages.filter(p => p.name.toLowerCase().includes(term));

    return {
      terms: filteredTerms.length > 0 ? filteredTerms : popularTerms.slice(0, 4),
      pages: filteredPages.length > 0 ? filteredPages : suggestedPages
    };
  };

  const currentSuggestions = getSuggestions();

  // Search logic
  const performSearch = (val: string) => {
    navigate(`/search?q=${encodeURIComponent(val.trim())}`);
    setActiveQuery(val.trim());
    setSuggestionsOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      performSearch(searchVal);
    }
  };

  // Filter matching items
  const getFilteredResults = () => {
    const q = activeQuery.toLowerCase().trim();
    
    // 1. Initial base filter matching query
    let items = searchableDatabase;
    if (q) {
      items = searchableDatabase.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(q);
        const descMatch = item.desc.toLowerCase().includes(q);
        const tagMatch = item.tags?.some(t => t.toLowerCase().includes(q)) || false;
        const typeMatch = item.type.toLowerCase().includes(q);
        return titleMatch || descMatch || tagMatch || typeMatch;
      });
    }

    // 2. Chip filter type
    if (activeFilter !== 'All') {
      const typeMap: { [key: string]: string } = {
        'Solutions': 'Solutions',
        'Projects': 'Projects',
        'Blogs': 'Blog Articles',
        'Industries': 'Industries',
        'Pages': 'Pages'
      };
      items = items.filter(item => item.type === typeMap[activeFilter]);
    }

    // 3. Sorting logic
    const sortedItems = [...items];
    if (sortBy === 'A-Z') {
      sortedItems.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'Newest') {
      // Prioritize projects/blogs with dates, push empty ones to back
      sortedItems.sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return b.date.localeCompare(a.date);
      });
    } else {
      // Relevance: exact title match first, then description matches
      sortedItems.sort((a, b) => {
        const aTitleMatch = a.title.toLowerCase().includes(q) ? 2 : 0;
        const bTitleMatch = b.title.toLowerCase().includes(q) ? 2 : 0;
        return bTitleMatch - aTitleMatch;
      });
    }

    return sortedItems;
  };

  const filteredResults = getFilteredResults();

  // Helper component to highlight active search query keyword safely
  const HighlightText = ({ text, query }: { text: string; query: string }) => {
    if (!query.trim()) return <span>{text}</span>;
    
    // Clean and escape search term for regex
    const escapedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, i) => 
          regex.test(part) 
            ? <mark key={i} className="bg-[#EA8A22]/15 text-[#EA8A22] px-1 rounded font-semibold">{part}</mark>
            : <span key={i}>{part}</span>
        )}
      </>
    );
  };

  return (
    <div className="bg-white min-h-screen selection:bg-[#EA8A22] selection:text-white">
      
      {/* 1. UNIFIED PREMIUM HERO (50–58vh) */}
      <InternalPageHero
        title={<>Search <br /> <span className="text-[#EA8A22]">Results</span></>}
        categoryBadge="Search Results"
        categoryIcon={Search}
        description={activeQuery ? (
          <>
            Found <span className="font-bold text-[#EA8A22]">{filteredResults.length}</span> results matching{' '}
            <span className="font-bold text-neutral-800 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200/60 lowercase">
              "{activeQuery}"
            </span>
          </>
        ) : (
          'Enter a query below to explore Maabany systems and project catalogues.'
        )}
        heroImage="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=80"
      />

      {/* 2. DYNAMIC CENTERED SEARCH BAR INPUT (700-900px wide) */}
      <section className="relative z-40 max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8 -mt-7">
        <div className="max-w-3xl mx-auto relative">
          
          {/* High-fidelity Input container */}
          <div className="flex items-center bg-white border border-neutral-200/80 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.06)] p-1.5 focus-within:ring-0 focus-within:border-neutral-400 transition-all duration-300">
            <div className="pl-4 pr-2 text-neutral-400 shrink-0">
              <Search className="w-5 h-5" />
            </div>
            
            <input
              type="text"
              value={searchVal}
              onChange={(e) => {
                setSearchVal(e.target.value);
              }}
              onKeyDown={handleKeyPress}
              placeholder="Search projects, services, blogs, locations..."
              className="w-full bg-transparent border-none text-neutral-800 focus:outline-none text-sm py-3.5 placeholder-neutral-400 font-medium"
            />

            {searchVal && (
              <button
                onClick={() => {
                  setSearchVal('');
                }}
                className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-neutral-700 transition-colors mr-1"
                title="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => performSearch(searchVal)}
              className="bg-[#EA8A22] hover:bg-[#EA8A22] text-white font-mono text-[10px] font-black uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all duration-200 cursor-pointer shrink-0"
            >
              Search
            </button>
          </div>

        </div>
      </section>

      {/* 4. SEARCH RESULTS FEED - PREMIUM GRID */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8 pt-12 pb-24">
        <div className="space-y-12">
          
          <AnimatePresence mode="wait">
            {filteredResults.length > 0 ? (
              <motion.div 
                key="results-grid"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredResults.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className="block group h-full focus:outline-none focus:ring-2 focus:ring-[#EA8A22] rounded-[24px]"
                  >
                    <div className="flex flex-col h-full bg-white border border-neutral-200/80 rounded-[24px] overflow-hidden hover:border-[#EA8A22] hover:shadow-[0_20px_40px_rgba(234,138,34,0.06)] hover:-translate-y-1.5 transition-all duration-300">
                      
                      {/* Top Image (Larger project image, consistent height) */}
                      <div className="h-60 sm:h-64 w-full overflow-hidden relative bg-neutral-100 border-b border-neutral-200/80 shrink-0">
                        <img 
                          src={item.image} 
                          alt="" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        {/* Subtle orange accent overlay on hover */}
                        <div className="absolute inset-0 bg-neutral-900/5 group-hover:bg-[#EA8A22]/5 transition-colors duration-500" />
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          


                          {/* Title */}
                          <h3 className="text-base sm:text-lg font-bold text-neutral-900 group-hover:text-[#EA8A22] transition-colors leading-snug line-clamp-2">
                            <HighlightText text={item.title} query={activeQuery} />
                          </h3>

                          {/* Description */}
                          <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed line-clamp-3">
                            <HighlightText text={item.desc} query={activeQuery} />
                          </p>

                        </div>

                        {/* Bottom Date label if present */}
                        {item.date && (
                          <div className="pt-3 border-t border-neutral-100 text-[10px] font-mono text-neutral-400">
                            Published / Completed: {item.date}
                          </div>
                        )}

                      </div>

                    </div>
                  </Link>
                ))}
              </motion.div>
            ) : (
              
              /* 5. ELEGANTE EMPTY STATE GRAPHICS */
              <motion.div 
                key="empty-state"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="text-center py-20 px-6 border border-dashed border-neutral-200 rounded-[32px] bg-neutral-50/50 max-w-2xl mx-auto space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-[#EA8A22]/10 text-[#EA8A22] flex items-center justify-center mx-auto shadow-inner">
                  <FileQuestion className="w-7 h-7" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-black text-neutral-900 uppercase tracking-tight">
                    No Results Found
                  </h3>
                  <p className="text-xs text-neutral-500 font-light max-w-sm mx-auto leading-relaxed">
                    We couldn't find anything matching your search query. Try different keywords or browse our core Solution and Project matrices directly.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <Link
                    to="/solutions"
                    className="px-6 py-3 bg-[#EA8A22] hover:bg-[#EA8A22] text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded-xl shadow-md transition-colors"
                  >
                    Browse Solutions
                  </Link>
                  <Link
                    to="/projects"
                    className="px-6 py-3 border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 font-mono text-[10px] font-bold uppercase tracking-wider rounded-xl transition-colors"
                  >
                    View Projects
                  </Link>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

    </div>
  );
}
