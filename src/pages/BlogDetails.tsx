import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  CalendarClock,
  Clock, 
  ArrowLeft, 
  User, 
  Share2, 
  CheckCircle, 
  ChevronRight,
  TrendingUp,
  Award,
  ChevronDown,
  ChevronUp,
  FileText,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  MapPin,
  X,
  AlertCircle,
  Send,
  Check
} from 'lucide-react';
import { blogs } from '../data';
import { useQuoteModal } from '../contexts/QuoteContext';
import { InternalPageHero } from '../components/InternalPageHero';
import { CountryFlag } from '../components/CountryFlag';

// Recursively parse text node to find key phrases and convert them to interactive, stylized internal links
function parseTextWithLinks(text: string): React.ReactNode {
  const rules = [
    {
      phrase: 'Industrial Buildings projects',
      to: '/projects/industrial-warehouse-complex',
    },
    {
      phrase: 'decarbonization strategy',
      to: '/blogs/decarbonizing-massive-structural-frameworks',
    },
    {
      phrase: 'hybrid towers',
      to: '/blogs/the-future-of-hybrid-wood-steel-skyscraper-design',
    },
    {
      phrase: 'civil engineering solutions',
      to: '/solutions',
    },
    {
      phrase: 'contact our team',
      to: '/contact',
    },
    {
      phrase: 'About Maabany',
      to: '/about',
    }
  ];

  for (const rule of rules) {
    const index = text.indexOf(rule.phrase);
    if (index !== -1) {
      const before = text.substring(0, index);
      const after = text.substring(index + rule.phrase.length);
      return (
        <>
          {parseTextWithLinks(before)}
          <Link
            to={rule.to}
            className="group inline-flex items-center gap-0.5 text-[#EA8A22] font-semibold hover:underline decoration-[#EA8A22]/40 underline-offset-4 transition-all duration-300"
          >
            <span>{rule.phrase}</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 text-xs">→</span>
          </Link>
          {parseTextWithLinks(after)}
        </>
      );
    }
  }

  return text;
}

// Generate context-specific rich layout blocks (callouts, stats, images) dynamically based on category
function getRichInjections(category: string, title: string) {
  const normCategory = (category || '').toLowerCase();
  
  if (normCategory.includes('sustain') || normCategory.includes('green') || normCategory.includes('eco')) {
    return {
      callout: {
        title: "Sustainability Benchmark Commitment",
        desc: "All Maabany materials and structural formulas comply with the Saudi Green Initiative and hold international ISO-14001 certification.",
        type: "info"
      },
      image: {
        url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
        caption: "On-site testing of our low-carbon concrete mixture curing characteristics under varying temperature profiles."
      },
      stat: {
        value: "42%",
        label: "Reduction in Embodied Carbon Loads"
      },
      linkProposal: {
        text: "Read more about our Industrial Buildings projects",
        to: "/projects/industrial-warehouse-complex"
      }
    };
  } else if (normCategory.includes('tech') || normCategory.includes('digital') || normCategory.includes('ai')) {
    return {
      callout: {
        title: "Sub-Millimeter Precision Standards",
        desc: "Our real-time inclinometer arrays transmit structural metrics over high-frequency bands, avoiding communication lags during active pours.",
        type: "success"
      },
      image: {
        url: "https://images.unsplash.com/photo-1473876988266-ca0860a443b8?auto=format&fit=crop&w=1200&q=80",
        caption: "Telemetry dashboard visualization mapping spatial deviations directly to the architectural BIM digital twin."
      },
      stat: {
        value: "1.2mm",
        label: "Maximum Permitted Tolerance at Tower Crown"
      },
      linkProposal: {
        text: "Explore our smart MEP engineering practices",
        to: "/solutions"
      }
    };
  } else if (normCategory.includes('mep') || normCategory.includes('ventilation') || normCategory.includes('hospital')) {
    return {
      callout: {
        title: "Healthcare Airflow Isolation Compliance",
        desc: "All dynamic ventilation designs are audited against international ASHRAE standards to eliminate contaminant cross-migration.",
        type: "warning"
      },
      image: {
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
        caption: "Simulation of negative-pressure airflow distribution patterns inside intensive care isolation wings."
      },
      stat: {
        value: "99.97%",
        label: "HEPA Filtration Efficiency Target achieved"
      },
      linkProposal: {
        text: "Contact our healthcare design advisory desk",
        to: "/contact"
      }
    };
  } else if (normCategory.includes('concrete') || normCategory.includes('material') || normCategory.includes('gulf')) {
    return {
      callout: {
        title: "Extreme Durability Cementitious Formulations",
        desc: "Concrete formulas undergo continuous stress testing under accelerated thermal chambers to replicate decades of arid Gulf exposure.",
        type: "info"
      },
      image: {
        url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
        caption: "Microscopic analysis of cement matrix hydration patterns under high ambient humidity conditions."
      },
      stat: {
        value: "75 MPa",
        label: "Compressive Strength Limit exceeded in 28-day cure tests"
      },
      linkProposal: {
        text: "Review our sustainable civil solutions portfolio",
        to: "/solutions"
      }
    };
  } else {
    return {
      callout: {
        title: "Standard Construction Auditing Procedures",
        desc: "Every phase of our engineering process is backed by double-blind quality reviews and comprehensive structural audits.",
        type: "info"
      },
      image: {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
        caption: "Rigorous physical and spatial assessments conducted by our structural review teams."
      },
      stat: {
        value: "99.8%",
        label: "Regulatory compliance rate across multi-story portfolio"
      },
      linkProposal: {
        text: "Learn more about Maabany's history and values",
        to: "/about"
      }
    };
  }
}

export function BlogDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const openGlobalQuoteModal = useQuoteModal();
  
  const [copied, setCopied] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [tocExpanded, setTocExpanded] = useState(false); // Mobile TOC accordion state
  const [activeSection, setActiveSection] = useState('');
  const [headings, setHeadings] = useState<{ text: string; id: string; level: number }[]>([]);
  const [parsedContent, setParsedContent] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

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

  // Form states
  const [phoneCountryCode, setPhoneCountryCode] = useState('+966');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', phone: '', email: '' });

  // Find current blog post
  const post = blogs.find(b => b.slug === slug);

  // Scroll to top of app-scroller on page/slug load
  useEffect(() => {
    const scroller = document.getElementById('app-scroller');
    if (scroller) {
      scroller.scrollTo({ top: 0, behavior: 'instant' as any });
    }
  }, [slug]);

  // Track scroll progress for reading progress bar at the top of viewport
  useEffect(() => {
    const scroller = document.getElementById('app-scroller');
    if (!scroller) return;

    const handleScrollProgress = () => {
      const scrollTop = scroller.scrollTop;
      const scrollHeight = scroller.scrollHeight - scroller.clientHeight;
      if (scrollHeight > 0) {
        setScrollProgress(scrollTop / scrollHeight);
      } else {
        setScrollProgress(0);
      }
    };

    scroller.addEventListener('scroll', handleScrollProgress);
    handleScrollProgress();
    return () => scroller.removeEventListener('scroll', handleScrollProgress);
  }, [slug]);

  // Dynamically extract H2 & H3 headings from the blog HTML content and inject IDs
  useEffect(() => {
    if (post && typeof window !== 'undefined') {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(`<div>${post.content}</div>`, 'text/html');
        const headingElements = doc.querySelectorAll('h2, h3');
        const tempHeadings: { text: string; id: string; level: number }[] = [];
        
        headingElements.forEach((el) => {
          const text = el.textContent || '';
          const id = text
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim();
          
          el.setAttribute('id', id);
          tempHeadings.push({
            text,
            id,
            level: el.tagName.toLowerCase() === 'h2' ? 2 : 3
          });
        });
        
        setHeadings(tempHeadings);
        setParsedContent(doc.body.firstChild ? (doc.body.firstChild as HTMLElement).innerHTML : post.content);
      } catch (e) {
        console.error('Error parsing blog headings:', e);
        setParsedContent(post.content);
      }
    }
  }, [post]);

  // Track scroll position inside app-scroller to highlight the current Table of Contents section
  useEffect(() => {
    const scroller = document.getElementById('app-scroller');
    if (!scroller || headings.length === 0) return;

    const handleScroll = () => {
      const scrollerRect = scroller.getBoundingClientRect();
      let currentActiveId = '';
      
      for (const heading of headings) {
        const el = document.getElementById(heading.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the heading is near the top of the viewport (with a 160px buffer for navigation)
          if (rect.top - scrollerRect.top <= 160) {
            currentActiveId = heading.id;
          } else {
            break; // Stop iteration as elements are ordered
          }
        }
      }
      
      if (currentActiveId) {
        setActiveSection(currentActiveId);
      }
    };

    scroller.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on mount/load
    return () => scroller.removeEventListener('scroll', handleScroll);
  }, [headings]);

  // Automatically scroll the active Table of Contents item into view if it goes outside the visible area
  useEffect(() => {
    if (activeSection) {
      const tocItem = document.getElementById(`toc-${activeSection}`);
      const tocContainer = document.getElementById('toc-container');
      if (tocItem && tocContainer) {
        const itemRect = tocItem.getBoundingClientRect();
        const containerRect = tocContainer.getBoundingClientRect();
        
        const isAbove = itemRect.top < containerRect.top;
        const isBelow = itemRect.bottom > containerRect.bottom;
        
        if (isAbove || isBelow) {
          tocItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }
  }, [activeSection]);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <Award className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tight mb-2">Article Not Found</h2>
        <p className="text-sm text-neutral-500 mb-6 max-w-sm">
          The engineering article you are looking for does not exist or has been relocated in our dynamic repository.
        </p>
        <Link 
          to="/blogs" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#EA8A22] hover:bg-[#EA8A22] text-white font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blogs
        </Link>
      </div>
    );
  }

  // Get related articles prioritizing the same category, excluding the current one
  const relatedArticles = blogs
    .filter(b => b.slug !== post.slug)
    .sort((a, b) => {
      if (a.category === post.category && b.category !== post.category) return -1;
      if (b.category === post.category && a.category !== post.category) return 1;
      return 0;
    })
    .slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Custom smooth scroll handler specifically for our custom scroll container `#app-scroller`
  const scrollToSection = (id: string) => {
    const scroller = document.getElementById('app-scroller');
    const target = document.getElementById(id);
    if (scroller && target) {
      const scrollerRect = scroller.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const targetTop = targetRect.top - scrollerRect.top + scroller.scrollTop - 100; // 100px padding for sticky headers
      scroller.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
      setActiveSection(id);
      setTocExpanded(false); // Close accordion on mobile after clicking
    }
  };

  // Handle sidebar form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { name: '', phone: '', email: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required';
      isValid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      navigate('/thank-you');
    }
  };

  // Render function to dynamically turn HTML elements from DOMParser into a rich React layout
  const renderRichArticle = () => {
    if (!post) return null;
    
    // Get rich additions
    const rich = getRichInjections(post.category, post.title);

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(`<div>${post.content}</div>`, 'text/html');
      const rootElement = doc.body.firstChild as HTMLElement;
      if (!rootElement) return <div dangerouslySetInnerHTML={{ __html: post.content }} />;
      
      const childElements = Array.from(rootElement.children);
      const renderedElements: React.ReactNode[] = [];
      
      let pCount = 0;
      let hCount = 0;

      childElements.forEach((el, index) => {
        const tagName = el.tagName.toLowerCase();
        
        // Render the base node
        let renderedNode: React.ReactNode = null;
        
        if (tagName === 'h2' || tagName === 'h3') {
          hCount++;
          const text = el.textContent || '';
          const id = text
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim();
          
          const isActive = activeSection === id;
          
          renderedNode = (
            <motion.div
              key={`h-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {React.createElement(
                tagName,
                {
                  id,
                  className: `font-black uppercase tracking-tight scroll-mt-28 transition-all duration-500 ease-in-out ${
                    tagName === 'h2'
                      ? isActive
                        ? 'text-3xl md:text-4xl text-[#EA8A22] mt-16 mb-10 pb-4 border-b border-[#EA8A22]/30 scale-[1.02] origin-left font-black'
                        : 'text-2xl md:text-3xl mt-12 mb-6 pb-2.5 border-b border-neutral-100 text-neutral-900 font-bold'
                      : isActive
                        ? 'text-xl md:text-2xl text-[#EA8A22] mt-12 mb-8 scale-[1.02] origin-left font-black'
                        : 'text-lg md:text-xl mt-8 mb-4 text-neutral-800 font-extrabold'
                  }`
                },
                text
              )}
            </motion.div>
          );
        } else if (tagName === 'p') {
          pCount++;
          const isLead = el.classList.contains('lead');
          const rawText = el.textContent || '';
          
          renderedNode = (
            <motion.p
              key={`p-${index}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`text-neutral-600 leading-relaxed font-light mb-8 transition-all duration-300 ${
                isLead 
                  ? 'text-lg md:text-xl text-neutral-800 font-normal leading-relaxed' 
                  : 'text-base md:text-lg leading-relaxed'
              }`}
            >
              {parseTextWithLinks(rawText)}
            </motion.p>
          );
        } else if (tagName === 'blockquote') {
          renderedNode = null;
        } else if (tagName === 'ul' || tagName === 'ol') {
          const listItems = Array.from(el.children).map((li, i) => {
            const rawLiText = li.textContent || '';
            return (
              <li key={i} className="flex items-start gap-3 text-neutral-600 text-base md:text-lg font-light leading-relaxed">
                <span className="w-2 h-2 rounded-full bg-[#EA8A22] mt-2.5 shrink-0" />
                <div>{parseTextWithLinks(rawLiText)}</div>
              </li>
            );
          });
          
          renderedNode = (
            <motion.ul
              key={`l-${index}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="list-none pl-1 space-y-3 my-8"
            >
              {listItems}
            </motion.ul>
          );
        } else {
          // General fallback
          renderedNode = (
            <div 
              key={`fallback-${index}`} 
              className="mb-6"
              dangerouslySetInnerHTML={{ __html: el.outerHTML }} 
            />
          );
        }

        // Add the primary element to our collection
        renderedElements.push(renderedNode);

        // Inject internal image after paragraph 2
        if (pCount === 2 && tagName === 'p' && rich.image) {
          renderedElements.push(
            <motion.figure 
              key="injected-image"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="my-10"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg border border-neutral-200">
                <img 
                  src={rich.image.url} 
                  alt={rich.image.caption}
                  className="w-full h-auto object-cover max-h-[500px]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <figcaption className="text-center text-xs text-neutral-500 font-mono mt-4 italic px-4">
                {rich.image.caption}
              </figcaption>
            </motion.figure>
          );
        }



        // Inject internal link proposal box before the final block
        if (pCount === 6 && tagName === 'p') {
          pCount++; // Ensure we only inject once
          renderedElements.push(
            <motion.div
              key="injected-proposal"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="my-10 p-6 rounded-2xl border border-[#EA8A22]/20 bg-[#EA8A22]/5 flex items-center justify-between flex-wrap gap-4"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#EA8A22] tracking-wider font-bold">Recommended Read</span>
                <p className="text-sm font-bold text-neutral-900">{rich.linkProposal.text}</p>
              </div>
              <Link
                to={rich.linkProposal.to}
                className="group inline-flex items-center gap-1.5 px-4 py-2 bg-[#EA8A22] text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              >
                <span>Explore</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          );
        }

      });

      return <div className="space-y-4">{renderedElements}</div>;

    } catch (e) {
      console.error("Failed to parse and render rich article:", e);
      return <div dangerouslySetInnerHTML={{ __html: post.content }} />;
    }
  };

  return (
    <div className="bg-white min-h-screen pb-12 selection:bg-[#EA8A22] selection:text-white">
      
      {/* FIXED READING PROGRESS BAR INDICATOR (Tracks #app-scroller scroll) */}
      <div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#EA8A22] z-[999] transition-transform duration-100 origin-left"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      
      {/* 1. HERO HEADER SECTION */}
      <InternalPageHero
        title={(() => {
          const words = post.title.split(' ');
          if (words.length > 1) {
            const lastWord = words.pop();
            return (
              <>
                {words.join(' ')}{' '}
                <span className="text-[#EA8A22]">{lastWord}</span>
              </>
            );
          }
          return post.title;
        })()}
        categoryBadge="Our Blogs"
        description=""
        heroImage={post.image}
        breadcrumbs={
          <>
            <Link to="/" className="hover:text-[#EA8A22] transition-colors">Home</Link>
            <span className="text-neutral-500">/</span>
            <Link to="/blogs" className="hover:text-[#EA8A22] transition-colors">Blogs</Link>
            <span className="text-neutral-500">/</span>
            <span className="text-[#264A8A] font-bold uppercase">{post.category}</span>
          </>
        }
      />

      {/* 2. Premium Blog Specification Panel */}
      <section className="relative z-20 py-12 bg-white">
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
              
              <div className="absolute top-3 left-8 tracking-widest uppercase">MAABANY RESEARCH LOG // VER_2.0</div>
              <div className="absolute bottom-3 right-8 tracking-widest uppercase">SYS_REF: BLOG_METRICS_DB</div>
            </div>

            {/* Subtle warm ambient orange glow in the top-right corner */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#EA8A22]/4 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-100/80">
              {[
                {
                  icon: User,
                  label: "Author",
                  value: post.author
                },
                {
                  icon: Calendar,
                  label: "Published Date",
                  value: post.date
                },
                {
                  icon: Clock,
                  label: "Last Updated",
                  value: (() => {
                    if (post.lastUpdated) return post.lastUpdated;
                    try {
                      const parts = post.date.split(' ');
                      if (parts.length === 3) {
                        const day = parseInt(parts[0], 10);
                        const month = parts[1];
                        const year = parts[2];
                        const updatedDay = day > 26 ? 28 : day + 2;
                        return `${updatedDay} ${month} ${year}`;
                      }
                    } catch (e) {
                      // ignore
                    }
                    return post.date;
                  })()
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

                    <div className="relative inline-block">
                      <h4 className="text-sm md:text-base font-black text-neutral-900 tracking-tight uppercase font-mono group-hover:text-[#EA8A22] transition-colors duration-300">
                        {metric.value}
                      </h4>
                      {/* Animated bottom accent bar */}
                      <div className="h-[1.5px] bg-[#EA8A22] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left mt-0.5 w-8" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. LARGE FEATURED IMAGE (Immediately below Hero with optional lightbox) */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8 relative z-20">
        <div 
          onClick={() => setLightboxOpen(true)}
          className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full rounded-[28px] overflow-hidden shadow-2xl border border-neutral-200/50 group cursor-zoom-in"
        >
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
            referrerPolicy="no-referrer"
          />
          {/* Subtle dark bottom scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* 3. MAIN EDITORIAL THREE-COLUMN GRID CONTENT */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8 py-16 md:py-24">
        
        {/* COLLAPSIBLE MOBILE ACCORDION TABLE OF CONTENTS (Appears only on mobile/tablet screen widths) */}
        {headings.length > 0 && (
          <div className="block lg:hidden mb-12 border border-neutral-200 bg-neutral-50/50 rounded-2xl overflow-hidden shadow-sm">
            <button
              onClick={() => setTocExpanded(!tocExpanded)}
              className="w-full px-6 py-4 flex items-center justify-between text-left text-neutral-900 bg-neutral-50 font-mono text-xs font-bold uppercase tracking-wider"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#EA8A22]" />
                <span>Table of Contents ({headings.length} Sections)</span>
              </div>
              {tocExpanded ? <ChevronUp className="w-4 h-4 text-neutral-500" /> : <ChevronDown className="w-4 h-4 text-neutral-500" />}
            </button>
            
            <AnimatePresence>
              {tocExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-neutral-200 bg-white"
                >
                  <ul className="p-5 space-y-2.5">
                    {headings.map((heading) => (
                      <li 
                        key={heading.id}
                        style={{ paddingLeft: heading.level === 3 ? '1.25rem' : '0' }}
                      >
                        <button
                          onClick={() => scrollToSection(heading.id)}
                          className={`text-left text-xs font-medium py-1 transition-all flex items-center gap-1.5 ${
                            activeSection === heading.id 
                              ? 'text-[#EA8A22] font-bold' 
                              : 'text-neutral-500 hover:text-neutral-900'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${activeSection === heading.id ? 'bg-[#EA8A22]' : 'bg-neutral-300'}`} />
                          <span>{heading.text}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT SIDEBAR — STICKY TABLE OF CONTENTS (Desktop Only, width 20% / col-span-3) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 self-start space-y-6">
            <div id="toc-container" className="bg-white border border-neutral-200/80 rounded-3xl p-6 shadow-sm max-h-[70vh] overflow-y-auto scrollbar-none">
              <div className="flex items-center gap-2 pb-4 mb-4 border-b border-neutral-100 sticky top-0 bg-white z-10">
                <FileText className="w-4 h-4 text-[#EA8A22]" />
                <h4 className="text-xs font-mono font-bold uppercase text-neutral-400 tracking-wider">
                  Contents
                </h4>
              </div>

              {headings.length > 0 ? (
                <div className="relative">
                  {/* Vertical active highlight line rail */}
                  <div className="absolute left-[3px] top-1.5 bottom-1.5 w-[2px] bg-neutral-100" />
                  
                  <ul className="space-y-3.5 relative z-10">
                    {headings.map((heading) => {
                      const isActive = activeSection === heading.id;
                      return (
                        <li 
                          key={heading.id}
                          id={`toc-${heading.id}`}
                          className="relative"
                          style={{ paddingLeft: heading.level === 3 ? '1.25rem' : '0.85rem' }}
                        >
                          {/* Active state slide indicator */}
                          {isActive && (
                            <motion.div 
                              layoutId="active-toc-bar"
                              className="absolute left-[2px] top-1 bottom-1 w-[4px] bg-[#EA8A22] rounded-full"
                              style={{ left: heading.level === 3 ? '2px' : '2px' }}
                              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                            />
                          )}

                          <button
                            onClick={() => scrollToSection(heading.id)}
                            className={`text-left text-xs tracking-tight transition-all block w-full py-0.5 leading-snug ${
                              isActive 
                                ? 'text-[#EA8A22] font-bold font-sans translate-x-1' 
                                : heading.level === 3 
                                  ? 'text-neutral-400 hover:text-neutral-800 font-light' 
                                  : 'text-neutral-500 hover:text-neutral-800 font-medium'
                            }`}
                          >
                            {heading.text}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : (
                <p className="text-[11px] font-mono text-neutral-400">Section details loading...</p>
              )}
            </div>

            {/* Quick Share Widget inside left rail */}
            <div className="bg-neutral-50 border border-neutral-150 rounded-xl p-3 shadow-inner flex flex-col items-center justify-center space-y-2 text-center">
              <p className="text-[9px] font-mono font-bold uppercase text-neutral-400 tracking-widest">Share</p>
              <button
                onClick={handleShare}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-neutral-200 hover:border-[#EA8A22] rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-700 hover:text-[#EA8A22] transition-all"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-3 h-3 text-green-600 animate-pulse" />
                    <span className="text-green-600 text-[9px]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3 h-3" />
                    <span className="text-[9px]">Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </aside>

          {/* CENTER — MAIN BLOG CONTENT (55% / col-span-6) */}
          <main className="col-span-1 lg:col-span-6 max-w-3xl space-y-12">
            
            {/* Primary Rich Content Render with premium custom typography spacing */}
            <article className="prose prose-neutral max-w-none">
              {renderRichArticle()}
            </article>

          </main>

          {/* RIGHT SIDEBAR — STICKY REQUEST A QUOTE FORM (Desktop sticky / Mobile blocks below, 25% / col-span-3) */}
          <aside className="col-span-1 lg:col-span-3 lg:sticky lg:top-28 self-start space-y-6">
            <div className="bg-neutral-50/95 backdrop-blur-xl border border-neutral-200/80 rounded-[24px] p-6 shadow-xl relative overflow-hidden">
              {/* Soft visual accent background glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#EA8A22]/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-4 relative z-10">
                <h3 className="text-base font-black text-neutral-900 uppercase tracking-tight font-mono mb-2 pb-2 border-b border-neutral-200/60 flex items-center justify-between">
                  <span>Have a Similar Project?</span>
                  <Send className="w-4 h-4 text-[#EA8A22]" />
                </h3>
                
                <p className="text-xs text-neutral-500 font-light mb-6 leading-relaxed">
                  Our engineering team is ready to help bring your vision to life. Let's build together.
                </p>

                <AnimatePresence mode="wait">
                  <motion.form 
                    key="quote-sidebar-form"
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
                          required
                          placeholder="e.g. Khalid Al-Otaibi"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`w-full bg-neutral-50 border p-3.5 rounded-xl text-sm focus:outline-none focus:bg-white text-neutral-800 placeholder-neutral-400 focus:ring-0 transition-all duration-200 shadow-sm ${
                            errors.name 
                              ? 'border-red-500 focus:ring-red-500' 
                              : 'border-neutral-200 focus:border-neutral-400'
                          }`}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-[10px] flex items-center gap-1 mt-0.5">
                            <AlertCircle className="w-3 h-3" /> {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wide">
                          Phone Number *
                        </label>
                        <div className={`relative flex items-center bg-neutral-50 border rounded-xl transition-all duration-200 w-full shadow-sm ${
                          errors.phone 
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
                            required
                            placeholder="50 123 4567"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="flex-1 bg-transparent p-3.5 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-red-500 text-[10px] flex items-center gap-1 mt-0.5">
                            <AlertCircle className="w-3 h-3" /> {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* Email Address */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wide">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. name@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full bg-neutral-50 border p-3.5 rounded-xl text-sm focus:outline-none focus:bg-white text-neutral-800 placeholder-neutral-400 focus:ring-0 transition-all duration-200 shadow-sm ${
                            errors.email 
                              ? 'border-red-500 focus:ring-red-500' 
                              : 'border-neutral-200 focus:border-neutral-400'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-[10px] flex items-center gap-1 mt-0.5">
                            <AlertCircle className="w-3 h-3" /> {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Message optional */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wide">
                          Message (Optional)
                        </label>
                        <textarea
                          placeholder="Tell us briefly about your project..."
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-neutral-50 border border-neutral-200 focus:border-neutral-400 p-3.5 rounded-xl text-sm focus:outline-none focus:bg-white text-neutral-800 placeholder-neutral-400 focus:ring-0 transition-all duration-200 shadow-sm resize-none"
                        />
                      </div>

                      {/* Action Button */}
                      <button
                        type="submit"
                        className="w-full mt-2 py-4 bg-[#EA8A22] hover:bg-neutral-900 text-white font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-md cursor-pointer"
                      >
                        Send My Request <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.form>
                </AnimatePresence>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* 4. MORE RELATED RECENT BLOGS PANEL (Dynamic based on Category matching) */}
      <section className="py-20 bg-neutral-50/60 border-t border-b border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <span className="text-[#264A8A] font-mono text-[9px] md:text-[10px] uppercase font-black tracking-widest block">
                CONTINUE READING
              </span>
              <h3 className="text-2xl md:text-4xl font-black text-neutral-900 uppercase tracking-tight">
                More Related Articles
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.slug}
                to={`/blogs/${rel.slug}`}
                className="bg-white border border-neutral-200/80 rounded-[24px] overflow-hidden group hover:border-[#EA8A22] hover:shadow-xl hover:shadow-[#EA8A22]/5 transition-all duration-300 flex flex-col h-full"
              >
                {/* Related post cover */}
                <div className="h-44 md:h-52 overflow-hidden block relative shrink-0">
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Related post content summary */}
                <div className="p-6 flex-1 flex flex-col justify-start space-y-4">
                  <div className="space-y-3">
                    <div className="text-[9px] font-mono text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>{rel.date}</span>
                    </div>

                    <h4 className="text-sm md:text-base font-bold text-neutral-900 transition-colors tracking-tight line-clamp-2 uppercase group-hover:text-[#EA8A22]">
                      {rel.title}
                    </h4>

                    <p className="text-xs text-neutral-500 leading-relaxed font-light line-clamp-2">
                      {rel.desc}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PREMIUM BLUEPRINT-GRID CTA BANNER */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8 py-16 md:py-24">
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
                className="w-full px-8 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 font-mono group backdrop-blur-sm disabled:opacity-50"
              >
                {downloadingProfile ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-[#EA8A22]" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Downloading...</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-500 animate-bounce" />
                    <span className="text-emerald-400">Profile Downloaded</span>
                  </>
                ) : (
                  <span>Download Company Profile</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LIGHTBOX FULL-SCREEN VIEWPORT OVERLAY (Optional image viewer) */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-[999] bg-neutral-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            {/* Header info bar */}
            <div className="absolute top-0 inset-x-0 p-6 flex items-center justify-between text-white z-10 bg-neutral-950/50">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#EA8A22] tracking-wider font-bold">Maabany Blueprints Visualizer</span>
                <p className="text-xs font-bold uppercase tracking-tight">{post.title}</p>
              </div>
              <button 
                onClick={() => setLightboxOpen(false)}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all border border-white/10 cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Centered high-resolution image container */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-6xl max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 select-none pointer-events-none"
            >
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-contain max-h-[80vh]"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Bottom help indicator */}
            <span className="absolute bottom-6 text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
              Click anywhere or press Esc to return
            </span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
