import { safeGetItem, safeSetItem } from '../utils/storage';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuoteModal } from '../contexts/QuoteContext';
import { motion, AnimatePresence } from 'motion/react';
import { InternalPageHero } from '../components/InternalPageHero';
import { CountryFlag } from '../components/CountryFlag';
import { 
  FileText, 
  Users, 
  Settings, 
  ChevronRight, 
  ChevronDown, 
  Sparkles, 
  Check, 
  Plus, 
  Trash2, 
  Award, 
  Cpu, 
  ShieldCheck, 
  Briefcase, 
  ChevronUp, 
  Rocket, 
  Clock, 
  Search, 
  ArrowRight,
  ClipboardCheck,
  CheckCircle2,
  AlertCircle,
  FileDown,
  CheckCircle
} from 'lucide-react';

// Interfaces for our stateful elements
interface TrustIndicator {
  id: string;
  text: string;
}

interface WhyFeature {
  id: string;
  title: string;
  description: string;
  iconType: 'expertise' | 'customized' | 'proven' | 'support';
}

interface SolutionItem {
  id: string;
  title: string;
  desc: string;
  image: string;
}

interface ProcessStep {
  id: string;
  stepNumber: number;
  title: string;
  desc: string;
  iconType: 'form' | 'engineer' | 'meeting' | 'document' | 'kickoff';
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface SubmittedQuote {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  message: string;
  submittedAt: string;
}

export function RequestQuote() {
  const navigate = useNavigate();
  const setQuoteModalOpen = useQuoteModal();
  // Reset scroller to top on mount
  useEffect(() => {
    const scroller = document.getElementById('app-scroller');
    if (scroller) {
      scroller.scrollTo({ top: 0, behavior: 'instant' as any });
    }
  }, []);

  // Form State
  const [fullName, setFullName] = useState('');
  const [phoneCountryCode, setPhoneCountryCode] = useState('+966');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Submitted quotes logger (simulated DB)
  const [submittedQuotes, setSubmittedQuotes] = useState<SubmittedQuote[]>(() => {
    const saved = safeGetItem('maabany_quote_submissions');
    return saved ? JSON.parse(saved) : [
      {
        id: 'q-demo-1',
        fullName: 'Ahmed Al-Mansoor',
        phone: '+966 50 123 4567',
        email: 'ahmed@mansoor-group.com',
        message: 'Looking for integrated Civil & MEP contractor for a new 15-story residential tower project in Riyadh (ROSHN zone).',
        submittedAt: '12 Jul 2026, 11:32 AM'
      },
      {
        id: 'q-demo-2',
        fullName: 'Youssef El-Masry',
        phone: '+20 100 987 6543',
        email: 'youssef@masr-developments.eg',
        message: 'Need high-end fit-out solutions and light current CCTV integration for a commercial administrative building layout in New Cairo.',
        submittedAt: '12 Jul 2026, 09:15 AM'
      }
    ];
  });

  // Save submissions
  useEffect(() => {
    safeSetItem('maabany_quote_submissions', JSON.stringify(submittedQuotes));
  }, [submittedQuotes]);

  // CMS Panel state
  const [cmsPanelOpen, setCmsPanelOpen] = useState(false);
  const [cmsActiveTab, setCmsActiveTab] = useState<'why' | 'solutions' | 'steps' | 'faqs' | 'submissions'>('submissions');

  // Page Content state (fully editable!)
  // 1. Why Features
  const [whyFeatures, setWhyFeatures] = useState<WhyFeature[]>([
    {
      id: 'why-1',
      title: 'Engineering Expertise',
      description: 'Certified multidisciplinary engineering teams with world-class standard certifications.',
      iconType: 'expertise'
    },
    {
      id: 'why-2',
      title: 'Customized Solutions',
      description: 'Every single quotation is structurally optimized and tailored to your project parameters.',
      iconType: 'customized'
    },
    {
      id: 'why-3',
      title: 'Proven Experience',
      description: 'Successful delivery of massive structural projects across commercial, residential, and industrial sectors.',
      iconType: 'proven'
    },
    {
      id: 'why-4',
      title: 'End-to-End Support',
      description: 'From pre-planning, detailed engineering schematics, execution, to long-term facility management.',
      iconType: 'support'
    }
  ]);

  // 2. Solutions
  const [solutions, setSolutions] = useState<SolutionItem[]>([
    {
      id: 'sol-1',
      title: 'Civil Solutions',
      desc: 'Construction and civil engineering services for commercial, residential, industrial, and infrastructure projects.',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'sol-2',
      title: 'Fit-Out Solutions',
      desc: 'Interior fit-out and finishing solutions that combine functionality with premium craftsmanship.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'sol-3',
      title: 'MEP Solutions',
      desc: 'Mechanical, electrical, and plumbing systems designed for efficiency, safety, and long-term performance.',
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'sol-4',
      title: 'Light Current Solutions',
      desc: 'Integrated smart building systems including CCTV, access control, structured cabling, parking systems, and smart home technologies.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'sol-5',
      title: 'Facility Management',
      desc: 'Comprehensive maintenance and operational support to ensure long-term building performance.',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'sol-6',
      title: 'Integrated Project Delivery',
      desc: 'End-to-end project coordination from engineering design through construction and handover.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
    }
  ]);

  // 3. Process Steps
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([
    {
      id: 'step-1',
      stepNumber: 1,
      title: 'Submit Your Request',
      desc: 'Fill out the digital details form on this page with your basic project scope.',
      iconType: 'form'
    },
    {
      id: 'step-2',
      stepNumber: 2,
      title: 'Project Review',
      desc: 'Our senior estimating division assesses requirements and structural constraints.',
      iconType: 'engineer'
    },
    {
      id: 'step-3',
      stepNumber: 3,
      title: 'Consultation',
      desc: 'We host a technical session to detail specifications, timelines, and material types.',
      iconType: 'meeting'
    },
    {
      id: 'step-4',
      stepNumber: 4,
      title: 'Receive Your Quote',
      desc: 'Get an itemized commercial proposal with clear, fully optimized financial milestones.',
      iconType: 'document'
    },
    {
      id: 'step-5',
      stepNumber: 5,
      title: 'Project Kickoff',
      desc: 'Mobilization of technical staff, heavy equipment, and procurement pipeline.',
      iconType: 'kickoff'
    }
  ]);

  // 4. FAQs
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      id: 'faq-1',
      question: 'How long does it take to receive a quotation?',
      answer: 'Typically, our estimating division reviews requirements and contacts you with an initial draft or schedule assessment in 2-3 business days. Massive, complex industrial tenders may take up to 7-10 business days.'
    },
    {
      id: 'faq-2',
      question: 'Can I request multiple services?',
      answer: 'Yes! Maabany specializes in turnkey, integrated building solutions. You can request Civil construction, MEP installation, interior Fit-out, and Smart Building light-current systems under a single unified proposal.'
    },
    {
      id: 'faq-3',
      question: 'Do you work outside Egypt?',
      answer: 'We operate registered regional offices and have active major projects across Egypt, the Kingdom of Saudi Arabia (including Riyadh developments), and Libya.'
    },
    {
      id: 'faq-4',
      question: 'Can I attach project drawings or bill of quantities (BOQ) later?',
      answer: 'Absolutely. Upon submitting this form, a dedicated engineering consultant will contact you via phone or email, where you can easily share CAD blueprints, structural designs, or detailed BOQ documents.'
    }
  ]);

  // FAQ Expanded index state
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!phone.trim()) newErrors.phone = 'Phone Number is required';
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please provide a valid email';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    
    // Create new submission item
    const dateStr = new Date().toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const newSub: SubmittedQuote = {
      id: 'q-' + Date.now(),
      fullName,
      phone,
      email,
      message: message || 'None provided.',
      submittedAt: dateStr
    };

    setSubmittedQuotes(prev => [newSub, ...prev]);
    navigate('/thank-you');
  };

  // Reset Form
  const handleResetForm = () => {
    setFullName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setIsSubmitted(false);
  };

  // CMS Add / Edit Actions
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');

  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) return;

    const newItem: FAQItem = {
      id: 'faq-' + Date.now(),
      question: newFaqQuestion,
      answer: newFaqAnswer
    };

    setFaqs(prev => [...prev, newItem]);
    setNewFaqQuestion('');
    setNewFaqAnswer('');
  };

  const handleDeleteFaq = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
    if (expandedFaqId === id) setExpandedFaqId(null);
  };

  // Download Profile state
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

  // Edit Why feature cards inside state
  const handleWhyFeatureChange = (id: string, field: 'title' | 'description', val: string) => {
    setWhyFeatures(prev => prev.map(f => f.id === id ? { ...f, [field]: val } : f));
  };

  // Edit Solutions inside state
  const handleSolutionChange = (id: string, field: 'title' | 'desc' | 'image', val: string) => {
    setSolutions(prev => prev.map(s => s.id === id ? { ...s, [field]: val } : s));
  };

  // Edit Process Steps
  const handleStepChange = (id: string, field: 'title' | 'desc', val: string) => {
    setProcessSteps(prev => prev.map(p => p.id === id ? { ...p, [field]: val } : p));
  };

  // Clear Submissions Log
  const handleClearSubmissions = () => {
    setSubmittedQuotes([]);
  };

  // Helper icons for why-choose cards
  const renderWhyIcon = (type: string) => {
    switch (type) {
      case 'expertise':
        return <Award className="w-5 h-5" />;
      case 'customized':
        return <Cpu className="w-5 h-5" />;
      case 'proven':
        return <ShieldCheck className="w-5 h-5" />;
      case 'support':
        return <Briefcase className="w-5 h-5" />;
      default:
        return <Check className="w-5 h-5" />;
    }
  };

  // Helper icons for process steps
  const renderStepIcon = (type: string) => {
    switch (type) {
      case 'form':
        return <FileText className="w-5 h-5 text-[#EA8A22]" />;
      case 'engineer':
        return <ClipboardCheck className="w-5 h-5 text-[#EA8A22]" />;
      case 'meeting':
        return <Users className="w-5 h-5 text-[#EA8A22]" />;
      case 'document':
        return <Award className="w-5 h-5 text-[#EA8A22]" />;
      case 'kickoff':
        return <Rocket className="w-5 h-5 text-[#EA8A22]" />;
      default:
        return <Check className="w-5 h-5 text-[#EA8A22]" />;
    }
  };

  return (
    <div className="bg-white min-h-screen pb-10 selection:bg-[#EA8A22] selection:text-white">
      
      {/* 1. EDITORIAL HERO HEADER */}
      <InternalPageHero
        title={<>Start Your <br /> <span className="text-[#EA8A22]">Project</span></>}
        categoryBadge="Request a Quote"
        heroImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80"
      />



      {/* 3. REQUEST A QUOTE FORM SECTION (TWO COLUMN LAYOUT) */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-stretch items-start">
          
          {/* Left Column: Information, trust signals and blueprints drawing */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            
            <div className="space-y-8 mb-8 lg:mb-0">
              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#EA8A22] font-black uppercase block">
                  START YOUR PROJECT
                </span>
                <h2 className="text-2xl md:text-4.5xl font-black text-neutral-900 uppercase tracking-tight leading-tight">
                  Tell Us About Your Project
                </h2>
              </div>

              {/* Trust Indicators block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EA8A22]/10 text-[#EA8A22] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-xs font-bold text-neutral-800">Fast Response</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EA8A22]/10 text-[#EA8A22] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-xs font-bold text-neutral-800">Experienced Engineers</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EA8A22]/10 text-[#EA8A22] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-xs font-bold text-neutral-800">Tailored Solutions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EA8A22]/10 text-[#EA8A22] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-xs font-bold text-neutral-800">Regional Presence</span>
                </div>
              </div>
            </div>

            <div className="p-1 bg-neutral-100/70 border border-neutral-200 rounded-2xl overflow-hidden aspect-[16/10] lg:aspect-auto lg:flex-1 lg:mt-8 relative shadow-inner group">
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80" 
                alt="Technical blueprints and structural planning drawings"
                className="w-full h-full object-cover rounded-xl filter contrast-110 saturate-90 brightness-95 group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-neutral-950/0 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 p-3 bg-white/95 backdrop-blur-md border border-white/20 rounded-xl max-w-xs shadow-lg">
                <p className="text-[10px] font-mono text-[#EA8A22] font-black uppercase">Regional Scope</p>
                <p className="text-xs font-bold text-neutral-900 mt-0.5">Active offices across Egypt, Saudi Arabia & Libya</p>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Quotation Form Card with validation and success states */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-neutral-200 rounded-[28px] shadow-[0_15px_40px_rgba(0,0,0,0.04)] p-8 md:p-12 relative overflow-hidden lg:h-full">
              
              {/* Subtle top decoration */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#EA8A22]" />

              <AnimatePresence mode="wait">
                  <motion.form 
                    key="quote-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg md:text-xl font-black text-neutral-950 uppercase tracking-tight">
                        Request a Quote
                      </h3>
                      <p className="text-[11px] text-neutral-500 font-light mt-1">
                        We're here to help. Complete the form and our experts will contact you soon.
                      </p>
                    </div>

                    {/* Full Name input */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-neutral-600 font-bold uppercase tracking-widest">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Khalid Al-Otaibi"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className={`w-full bg-neutral-50/50 border p-3.5 rounded-xl text-sm focus:outline-none focus:bg-white text-neutral-800 placeholder-neutral-400 transition-all duration-200 ${
                          errors.fullName 
                            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/15 focus:bg-white' 
                            : 'border-neutral-200/80 focus:border-[#EA8A22] focus:ring-2 focus:ring-[#EA8A22]/15 focus:bg-white'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-[10px] flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Phone Number input */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono text-neutral-600 font-bold uppercase tracking-widest">
                          Phone Number *
                        </label>
                        <div className={`relative flex items-center bg-neutral-50/50 border rounded-xl transition-all duration-200 w-full ${
                          errors.phone 
                            ? 'border-red-500 bg-white focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/15' 
                            : 'border-neutral-200/80 focus-within:border-[#EA8A22] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#EA8A22]/15'
                        }`}>
                          <div className="flex items-center gap-1.5 pl-3.5 pr-2 border-r border-neutral-200 select-none shrink-0">
                            <CountryFlag countryCode={phoneCountryCode} />
                            <select
                              value={phoneCountryCode}
                              onChange={(e) => setPhoneCountryCode(e.target.value)}
                              className="bg-transparent border-none text-xs font-mono text-neutral-700 focus:ring-0 focus:outline-none cursor-pointer p-0 pr-4 appearance-none font-bold"
                              style={{ backgroundImage: 'none' }}
                              aria-label="Country phone code"
                            >
                              <option value="+966">KSA (+966)</option>
                              <option value="+20">EG (+20)</option>
                              <option value="+218">LY (+218)</option>
                              <option value="+971">UAE (+971)</option>
                            </select>
                          </div>
                          <input
                            type="tel"
                            placeholder="50 123 4567"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="flex-1 bg-transparent p-3.5 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-red-500 text-[10px] flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* Email Address input */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono text-neutral-600 font-bold uppercase tracking-widest">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full bg-neutral-50/50 border p-3.5 rounded-xl text-sm focus:outline-none focus:bg-white text-neutral-800 placeholder-neutral-400 transition-all duration-200 ${
                            errors.email 
                              ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/15 focus:bg-white' 
                              : 'border-neutral-200/80 focus:border-[#EA8A22] focus:ring-2 focus:ring-[#EA8A22]/15 focus:bg-white'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-[10px] flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message input */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-neutral-600 font-bold uppercase tracking-widest">
                        How can we help? (Optional)
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us a bit about your project or what you need..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-neutral-50/50 border border-neutral-200/80 p-3.5 rounded-xl text-sm focus:outline-none focus:bg-white text-neutral-800 placeholder-neutral-400 focus:border-[#EA8A22] focus:ring-2 focus:ring-[#EA8A22]/15 transition-all duration-200 resize-none"
                      />
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#EA8A22] hover:bg-[#EA8A22] text-white font-mono text-[11px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-[#EA8A22]/10 hover:shadow-[#EA8A22]/25 transition-all duration-300 transform active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Send My Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.form>
              </AnimatePresence>

            </div>
          </div>

        </div>
      </section>

      {/* 4. OUR SERVICES SECTION */}
      <section className="bg-neutral-50 py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#EA8A22] font-black uppercase block mb-4">
              CAPABILITIES
            </span>
            <h2 className="text-display-h2 text-[#264A8A] mb-6">
              Our Core Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.slice(0, 3).map((solution) => (
              <Link
                to={`/solutions/${solution.id}`}
                key={solution.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 group hover:shadow-md transition-all duration-300 block cursor-pointer"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={solution.image} 
                    alt={solution.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-[#EA8A22] transition-colors">{solution.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-0">
                    {solution.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
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
                onClick={() => setQuoteModalOpen(true)}
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
