import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Eye, 
  Lock, 
  FileText, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp,
  Server, 
  Globe, 
  Database, 
  UserCheck, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle, 
  Sparkles,
  Info,
  ArrowRight
} from 'lucide-react';
import { useQuoteModal } from '../contexts/QuoteContext';
import { InternalPageHero } from '../components/InternalPageHero';

interface PolicySection {
  id: string;
  title: string;
  shortTitle: string;
  icon: React.ComponentType<any>;
}

export function Privacy() {
  const openGlobalQuoteModal = useQuoteModal();
  const [activeSection, setActiveSection] = useState<string>('introduction');
  const [tocExpanded, setTocExpanded] = useState<boolean>(false);

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

  // Scroll to top of app-scroller on page load
  useEffect(() => {
    const scroller = document.getElementById('app-scroller');
    if (scroller) {
      scroller.scrollTo({ top: 0, behavior: 'instant' as any });
    }
  }, []);

  // Section configs for Table of Contents
  const sections: PolicySection[] = [
    { id: 'introduction', title: '1. Introduction', shortTitle: 'Introduction', icon: FileText },
    { id: 'info-collect', title: '2. Information We Collect', shortTitle: 'Information We Collect', icon: Database },
    { id: 'how-use', title: '3. How We Use Your Information', shortTitle: 'How We Use Information', icon: Eye },
    { id: 'cookies', title: '4. Cookies & Analytics', shortTitle: 'Cookies & Analytics', icon: Globe },
    { id: 'protection', title: '5. Data Protection', shortTitle: 'Data Protection', icon: Lock },
    { id: 'third-party', title: '6. Third-Party Services', shortTitle: 'Third-Party Services', icon: Server },
    { id: 'rights', title: '7. Your Rights', shortTitle: 'Your Rights', icon: UserCheck },
    { id: 'contact', title: '8. Contact Information', shortTitle: 'Contact Us', icon: Mail }
  ];

  // Track scrolling inside `#app-scroller` to highlight active TOC section
  useEffect(() => {
    const scroller = document.getElementById('app-scroller');
    if (!scroller) return;

    const handleScroll = () => {
      const scrollerRect = scroller.getBoundingClientRect();
      let currentActiveId = 'introduction';

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Buffer for navigation/header offsets
          if (rect.top - scrollerRect.top <= 150) {
            currentActiveId = section.id;
          } else {
            break;
          }
        }
      }
      setActiveSection(currentActiveId);
    };

    scroller.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial run
    return () => scroller.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom smooth scroll handler for the custom scroll container
  const scrollToSection = (id: string) => {
    const scroller = document.getElementById('app-scroller');
    const target = document.getElementById(id);
    if (scroller && target) {
      const scrollerRect = scroller.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const targetTop = targetRect.top - scrollerRect.top + scroller.scrollTop - 110;
      scroller.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
      setActiveSection(id);
      setTocExpanded(false); // Close mobile accordion after scroll selection
    }
  };

  return (
    <div className="bg-white min-h-screen pb-12 selection:bg-[#EA8A22] selection:text-white">
      
      {/* 1. HERO HEADER */}
      <InternalPageHero
        title={<>Privacy & <br /> <span className="text-[#EA8A22]">Terms</span></>}
        categoryBadge="Privacy Policy"
        heroImage="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=80"
      />

      {/* 2. MAIN LAYOUT AND TABLE OF CONTENTS */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8 py-8 md:py-12">
        
        {/* COLLAPSIBLE ACCORDION FOR MOBILE & TABLET DEVICE SIZES */}
        <div className="block lg:hidden mb-10 border border-neutral-200 bg-neutral-50/50 rounded-2xl overflow-hidden shadow-sm">
          <button
            onClick={() => setTocExpanded(!tocExpanded)}
            className="w-full px-6 py-4 flex items-center justify-between text-left text-neutral-900 bg-neutral-50 font-mono text-xs font-bold uppercase tracking-wider"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#EA8A22]" />
              <span>Document Chapters ({sections.length} Parts)</span>
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
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className={`text-left text-xs font-medium py-1 transition-all flex items-center gap-2 ${
                          activeSection === section.id 
                            ? 'text-[#EA8A22] font-bold' 
                            : 'text-neutral-500 hover:text-neutral-900'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${activeSection === section.id ? 'bg-[#EA8A22]' : 'bg-neutral-300'}`} />
                        <span>{section.shortTitle}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* DESKTOP STICKY LEFT COLUMN TABLE OF CONTENTS */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 self-start space-y-6">
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-2 pb-4 mb-4 border-b border-neutral-100">
                <Shield className="w-4 h-4 text-[#EA8A22]" />
                <h4 className="text-xs font-mono font-bold uppercase text-neutral-400 tracking-wider">
                  Chapters
                </h4>
              </div>

              <div className="relative">
                {/* Visual side timeline bar */}
                <div className="absolute left-[3px] top-1.5 bottom-1.5 w-[2px] bg-neutral-100" />

                <ul className="space-y-3.5 relative z-10">
                  {sections.map((sec) => {
                    const isActive = activeSection === sec.id;
                    const IconComp = sec.icon;
                    return (
                      <li key={sec.id} className="pl-6 relative">
                        {/* Slide animation background indicator */}
                        {isActive && (
                          <motion.div 
                            layoutId="active-privacy-rail"
                            className="absolute left-[2px] top-1 bottom-1 w-[4px] bg-[#EA8A22] rounded-full"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}

                        <button
                          onClick={() => scrollToSection(sec.id)}
                          className={`text-left text-xs font-medium tracking-tight transition-all flex items-center gap-2.5 py-0.5 ${
                            isActive 
                              ? 'text-[#EA8A22] font-bold translate-x-1' 
                              : 'text-neutral-500 hover:text-neutral-800 font-normal'
                          }`}
                        >
                          <IconComp className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#EA8A22]' : 'text-neutral-400'}`} />
                          <span>{sec.shortTitle}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </aside>

          {/* EDITORIAL CONTENT AREA - Centered Layout (760-900px Equivalent width / col-span-9) */}
          <main className="col-span-1 lg:col-span-9 max-w-4xl bg-white border border-neutral-200 rounded-[28px] p-6 md:p-8 lg:p-10 shadow-xl shadow-neutral-100">
            
            <div className="space-y-12">
              
              {/* Section 1: Introduction */}
              <section id="introduction" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2 text-[#EA8A22]">
                  <div className="w-8 h-1.5 bg-[#EA8A22] rounded-full" />
                  <h2 className="text-xl md:text-2xl font-black text-neutral-900 uppercase tracking-tight">
                    1. Introduction
                  </h2>
                </div>
                <p className="text-sm md:text-base text-neutral-600 leading-relaxed font-light max-w-none">
                  Welcome to Maabany. We are committed to safeguarding your privacy and protecting the integrity of any information you transmit or share with us. This Privacy Policy details how we collect, store, safeguard, and utilize your personal, corporate, or project details across our international locations (Egypt, Saudi Arabia, and Libya) and through our online digital platform.
                </p>
                <p className="text-sm md:text-base text-neutral-600 leading-relaxed font-light">
                  By accessing our website, engaging our services, or submitting project specification request queries, you acknowledge and agree to the procedures outlined in this documentation.
                </p>
              </section>

              {/* Section 2: Information We Collect */}
              <section id="info-collect" className="scroll-mt-28 space-y-6">
                <div className="flex items-center gap-2 text-[#EA8A22]">
                  <div className="w-8 h-1.5 bg-[#EA8A22] rounded-full" />
                  <h2 className="text-xl md:text-2xl font-black text-neutral-900 uppercase tracking-tight">
                    2. Information We Collect
                  </h2>
                </div>
                
                <p className="text-sm md:text-base text-neutral-600 leading-relaxed font-light">
                  We collect information necessary to deliver premier engineering consulting services, issue accurate construction bids, and manage client relations. This includes:
                </p>

                {/* Clean nested list of collected items */}
                <div className="space-y-4 pt-2">
                  <div className="border-l-2 border-[#EA8A22] pl-4 py-1">
                    <h4 className="text-sm font-bold uppercase tracking-tight text-neutral-900">Personal & Identity Data</h4>
                    <p className="text-sm text-neutral-600 font-light mt-0.5">Full Name, designation, company name, and language preferences.</p>
                  </div>
                  <div className="border-l-2 border-[#EA8A22] pl-4 py-1">
                    <h4 className="text-sm font-bold uppercase tracking-tight text-neutral-900">Contact Details</h4>
                    <p className="text-sm text-neutral-600 font-light mt-0.5">Corporate Email Address, direct phone lines, and regional branch office contacts.</p>
                  </div>
                  <div className="border-l-2 border-[#EA8A22] pl-4 py-1">
                    <h4 className="text-sm font-bold uppercase tracking-tight text-neutral-900">Project & Tender Files</h4>
                    <p className="text-sm text-neutral-600 font-light mt-0.5">Blueprints, construction site coordinates, MEP requirements, and tender specifications.</p>
                  </div>
                  <div className="border-l-2 border-[#EA8A22] pl-4 py-1">
                    <h4 className="text-sm font-bold uppercase tracking-tight text-neutral-900">Digital Metadata</h4>
                    <p className="text-sm text-neutral-600 font-light mt-0.5">IP addresses, browser type, referral logs, and interaction records on this portal.</p>
                  </div>
                </div>
              </section>

              {/* Section 3: How We Use Your Information */}
              <section id="how-use" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2 text-[#EA8A22]">
                  <div className="w-8 h-1.5 bg-[#EA8A22] rounded-full" />
                  <h2 className="text-xl md:text-2xl font-black text-neutral-900 uppercase tracking-tight">
                    3. How We Use Your Information
                  </h2>
                </div>
                <p className="text-sm md:text-base text-neutral-600 leading-relaxed font-light">
                  The gathered data is strictly analyzed and deployed under the highest corporate responsibility. We use your details to:
                </p>
                
                <ul className="space-y-2.5 pl-6 list-disc text-sm text-neutral-600 font-light">
                  <li><strong>Respond to Inquiries:</strong> Providing technical responses to contact form requests and engineering questions.</li>
                  <li><strong>Prepare Quotations:</strong> Drafting structural specs, cost estimations, and custom project scopes for our Egypt, KSA, or Libya branches.</li>
                  <li><strong>Improve Website Performance:</strong> Enhancing the reading flow, responsive elements, and dynamic loading times.</li>
                  <li><strong>Communicate Project Updates:</strong> Relaying building status milestones and tender announcements directly to stakeholders.</li>
                  <li><strong>Enhance Customer Experience:</strong> Upgrading navigation routes, support channels, and regional branch assistance.</li>
                </ul>
              </section>

              {/* Section 4: Cookies & Analytics */}
              <section id="cookies" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2 text-[#EA8A22]">
                  <div className="w-8 h-1.5 bg-[#EA8A22] rounded-full" />
                  <h2 className="text-xl md:text-2xl font-black text-neutral-900 uppercase tracking-tight">
                    4. Cookies & Analytics
                  </h2>
                </div>
                <p className="text-sm md:text-base text-neutral-600 leading-relaxed font-light">
                  This website utilizes standard browser cookies to personalize layout experiences and measure web visitor interactions.
                </p>

                <p className="text-sm md:text-base text-neutral-600 leading-relaxed font-light">
                  We utilize <strong>Essential Cookies</strong> for basic visual controls, and <strong>Analytics Cookies</strong> (e.g. Google Analytics) to monitor page views and optimize our engineering blog details structure. You can configure your browser preferences to disable cookies at any time, though some interactive elements like responsive maps may change behaviors.
                </p>
              </section>

              {/* Section 5: Data Protection */}
              <section id="protection" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2 text-[#EA8A22]">
                  <div className="w-8 h-1.5 bg-[#EA8A22] rounded-full" />
                  <h2 className="text-xl md:text-2xl font-black text-neutral-900 uppercase tracking-tight">
                    5. Data Protection
                  </h2>
                </div>
                <p className="text-sm md:text-base text-neutral-600 leading-relaxed font-light">
                  We deploy rigorous multi-tier security technologies to safeguard your personal details and blueprints. This includes:
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#EA8A22]/10 text-[#EA8A22] flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-[#EA8A22]" />
                    </div>
                    <p className="text-xs md:text-sm text-neutral-600 font-light leading-relaxed">
                      <strong>Secure Cloud Servers:</strong> Data is hosted on encrypted cloud systems under strict firewalls.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#EA8A22]/10 text-[#EA8A22] flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-[#EA8A22]" />
                    </div>
                    <p className="text-xs md:text-sm text-neutral-600 font-light leading-relaxed">
                      <strong>SSL Data Encryption:</strong> All requests, messages, and tender specifications are securely transmitted via HTTPS frameworks.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#EA8A22]/10 text-[#EA8A22] flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-[#EA8A22]" />
                    </div>
                    <p className="text-xs md:text-sm text-neutral-600 font-light leading-relaxed">
                      <strong>Restricted Staff Access:</strong> Only certified project managers and bid engineers have clearances to view submitted files.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 6: Third-Party Services */}
              <section id="third-party" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2 text-[#EA8A22]">
                  <div className="w-8 h-1.5 bg-[#EA8A22] rounded-full" />
                  <h2 className="text-xl md:text-2xl font-black text-neutral-900 uppercase tracking-tight">
                    6. Third-Party Services
                  </h2>
                </div>
                <p className="text-sm md:text-base text-neutral-600 leading-relaxed font-light">
                  To provide highly customized interactive maps (Google Maps) and capture analytics, we utilize certified and trusted global third-party providers. These external agents only process minimal details necessary to render their designated scripts and operate in strict compliance with safety guidelines.
                </p>
              </section>

              {/* Section 7: Your Rights */}
              <section id="rights" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2 text-[#EA8A22]">
                  <div className="w-8 h-1.5 bg-[#EA8A22] rounded-full" />
                  <h2 className="text-xl md:text-2xl font-black text-neutral-900 uppercase tracking-tight">
                    7. Your Rights
                  </h2>
                </div>
                <p className="text-sm md:text-base text-neutral-600 leading-relaxed font-light">
                  As an esteemed visitor and potential client of Maabany, you hold standard legal privileges regarding your personal records. You may request to:
                </p>
                <ul className="space-y-2.5 pl-6 list-disc text-sm text-neutral-600 font-light">
                  <li><strong>Access:</strong> Obtain a copy of all data and past quotes you have requested.</li>
                  <li><strong>Rectify:</strong> Modify outdated or incorrect phone lines or emails.</li>
                  <li><strong>Delete:</strong> Purge your inquiry logs completely from our communication archives.</li>
                  <li><strong>Inquire:</strong> Pose any data privacy or regulatory compliance questions directly to our legal department.</li>
                </ul>
              </section>

              {/* Section 8: Contact Information */}
              <section id="contact" className="scroll-mt-28 space-y-6">
                <div className="flex items-center gap-2 text-[#EA8A22]">
                  <div className="w-8 h-1.5 bg-[#EA8A22] rounded-full" />
                  <h2 className="text-xl md:text-2xl font-black text-neutral-900 uppercase tracking-tight">
                    8. Contact Information
                  </h2>
                </div>
                <p className="text-sm md:text-base text-neutral-600 leading-relaxed font-light">
                  If you have privacy inquiries, or would like to request file purging, please contact our administrative legal team:
                </p>

                {/* Direct contact info for Legal */}
                <div className="space-y-3 pt-2 font-light">
                  <p className="text-sm text-neutral-600">
                    <strong className="text-neutral-900 font-bold">Email Address:</strong> <a href="mailto:privacy@maabany.com" className="text-[#EA8A22] hover:underline">privacy@maabany.com</a>
                  </p>
                  <p className="text-sm text-neutral-600">
                    <strong className="text-neutral-900 font-bold">Phone Support:</strong> +966 11 456 7890
                  </p>
                  <p className="text-sm text-neutral-600">
                    <strong className="text-neutral-900 font-bold">HQ Location:</strong> Riyadh Office, KSA
                  </p>
                </div>
              </section>

            </div>

          </main>

        </div>
      </div>

    </div>
  );
}
