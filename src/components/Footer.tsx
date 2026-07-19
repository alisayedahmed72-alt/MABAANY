import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const whiteMabLogo = new URL('../assets/images/white mab logo PM.png', import.meta.url).href;
const techHouseLogo = new URL('../assets/images/tech-house-logo.png', import.meta.url).href;

import {
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  X,
  MapPin,
  Mail
} from 'lucide-react';

interface FooterProps {
  setQuoteModalOpen: (open: boolean) => void;
}

export function Footer({ setQuoteModalOpen }: FooterProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com/company/digitalbond', name: 'LinkedIn' },
    { icon: Facebook, href: 'https://facebook.com/digitalbond', name: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/digitalbond', name: 'Instagram' },
    { icon: X, href: 'https://x.com/digitalbond', name: 'X' },
    { icon: Youtube, href: 'https://youtube.com/digitalbond', name: 'YouTube' },
  ];

  const quickLinks = [
    { label: 'Home', path: '/#home' },
    { label: 'About', path: '/about' },
    { label: 'Solutions', path: '/#solutions' },
    { label: 'Projects', path: '/#projects' },
    { label: 'Industries', path: '/industries' },
    { label: 'Clients & Partners', path: '/clients-partners' },
    { label: 'Blogs', path: '/#blogs' },
  ];

  const resourceLinks = [
    { label: 'Company Profile', path: '/about#profile' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <footer id="global-footer" className="w-full min-w-full max-w-none bg-[#264A8A] text-white relative overflow-hidden pt-20 pb-10 border-t-[3px] border-[#EA8A22]">
      {/* Subtle radial overlay for visual depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#325A9E] via-transparent to-transparent pointer-events-none" />
      
      {/* Authentic Engineering Blueprint Pattern Background */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Subtle engineering grid pattern */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-blueprint-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="1" opacity="0.08" />
              <path d="M 40 0 L 40 80 M 0 40 L 80 40" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2,4" opacity="0.04" />
            </pattern>
            <pattern id="footer-blueprint-dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#EA8A22" opacity="0.08" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-blueprint-grid)" />
          <rect width="100%" height="100%" fill="url(#footer-blueprint-dots)" />
        </svg>

        {/* Blueprint technical vector graphics positioned on the edges */}
        <svg className="absolute right-0 bottom-0 w-[600px] h-[400px] text-white opacity-[0.06] translate-x-20 translate-y-20" viewBox="0 0 600 400" fill="none" stroke="currentColor" strokeWidth="0.75">
          <circle cx="300" cy="200" r="180" strokeDasharray="4,8" />
          <circle cx="300" cy="200" r="120" stroke="#EA8A22" opacity="0.8" strokeWidth="1.5" />
          <circle cx="300" cy="200" r="60" strokeDasharray="1,4" />
          
          <line x1="100" y1="200" x2="500" y2="200" strokeDasharray="8,4" />
          <line x1="300" y1="0" x2="300" y2="400" strokeDasharray="8,4" />
          <line x1="150" y1="50" x2="450" y2="350" />
          <line x1="150" y1="350" x2="450" y2="50" />
          
          <path d="M 120,180 L 120,220 M 480,180 L 480,220" stroke="#EA8A22" strokeWidth="1.5" />
          <path d="M 120,200 L 480,200" />
          
          <path d="M 350,200 A 50,50 0 0,0 335,165" strokeWidth="1.5" stroke="#EA8A22" />
          <text x="360" y="180" fill="#EA8A22" fontSize="12" fontFamily="monospace" fontWeight="bold">45.0°</text>
        </svg>

        <svg className="absolute left-0 top-0 w-[400px] h-[300px] text-white opacity-[0.05] -translate-x-12 -translate-y-12" viewBox="0 0 400 300" fill="none" stroke="currentColor" strokeWidth="0.75">
          <path d="M 50,250 L 150,150 L 350,250 Z" strokeWidth="1" />
          <line x1="150" y1="150" x2="150" y2="250" strokeDasharray="4,4" stroke="#EA8A22" strokeWidth="1.5" />
          <line x1="100" y1="200" x2="150" y2="250" />
          <line x1="250" y1="200" x2="150" y2="250" />
          <line x1="250" y1="200" x2="250" y2="250" stroke="#EA8A22" strokeWidth="1.5" />
          <line x1="100" y1="200" x2="100" y2="250" stroke="#EA8A22" strokeWidth="1.5" />
          
          <text x="15" y="255" fill="currentColor" fontSize="10" fontFamily="monospace">A-1</text>
          <text x="145" y="265" fill="#EA8A22" fontSize="10" fontFamily="monospace" fontWeight="bold">A-2</text>
          <text x="355" y="255" fill="currentColor" fontSize="10" fontFamily="monospace">A-3</text>
        </svg>

        {/* Crane Outline in Bottom Left Corner */}
        <svg 
          className="absolute left-10 bottom-10 w-[240px] h-[320px] text-white opacity-[0.06] pointer-events-none hidden md:block" 
          viewBox="0 0 240 320" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="0.8"
        >
          {/* Crane tower */}
          <line x1="80" y1="320" x2="80" y2="100" />
          <line x1="90" y1="320" x2="90" y2="100" />
          {/* Crane bracing */}
          <line x1="80" y1="320" x2="90" y2="300" />
          <line x1="90" y1="300" x2="80" y2="280" />
          <line x1="80" y1="280" x2="90" y2="260" />
          <line x1="90" y1="260" x2="80" y2="240" />
          <line x1="80" y1="240" x2="90" y2="220" />
          <line x1="90" y1="220" x2="80" y2="200" />
          <line x1="80" y1="200" x2="90" y2="180" />
          <line x1="90" y1="180" x2="80" y2="160" />
          <line x1="80" y1="160" x2="90" y2="140" />
          <line x1="90" y1="140" x2="80" y2="120" />
          <line x1="80" y1="120" x2="90" y2="100" />
          {/* Jib */}
          <line x1="10" y1="100" x2="230" y2="100" strokeWidth="1.2" />
          {/* Counter Jib */}
          <line x1="10" y1="105" x2="80" y2="105" />
          <line x1="10" y1="100" x2="10" y2="105" />
          {/* Cab */}
          <rect x="75" y="85" width="15" height="15" fill="none" />
          {/* A-Frame */}
          <line x1="80" y1="85" x2="95" y2="60" />
          <line x1="95" y1="60" x2="110" y2="100" />
          {/* Cables */}
          <line x1="10" y1="100" x2="95" y2="60" strokeDasharray="2,2" />
          <line x1="180" y1="100" x2="95" y2="60" strokeDasharray="2,2" />
          {/* Trolley and Hook */}
          <rect x="150" y="100" width="8" height="5" fill="none" />
          <line x1="154" y1="105" x2="154" y2="140" />
          <path d="M 152,140 Q 154,144 156,140" />
        </svg>

        {/* Building Wireframe in Top Right Corner */}
        <svg 
          className="absolute right-12 top-12 w-[200px] h-[300px] text-white opacity-[0.06] pointer-events-none hidden lg:block" 
          viewBox="0 0 200 300" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="0.8"
        >
          {/* Floors */}
          <line x1="20" y1="280" x2="180" y2="280" />
          <line x1="20" y1="240" x2="180" y2="240" />
          <line x1="20" y1="200" x2="180" y2="200" />
          <line x1="20" y1="160" x2="180" y2="160" />
          <line x1="20" y1="120" x2="180" y2="120" />
          <line x1="20" y1="80" x2="180" y2="80" />
          <line x1="20" y1="40" x2="180" y2="40" />

          {/* Columns */}
          <line x1="20" y1="40" x2="20" y2="280" />
          <line x1="60" y1="40" x2="60" y2="280" />
          <line x1="100" y1="40" x2="100" y2="280" />
          <line x1="140" y1="40" x2="140" y2="280" />
          <line x1="180" y1="40" x2="180" y2="280" />

          {/* Cross braces */}
          <line x1="20" y1="40" x2="60" y2="80" strokeDasharray="2,2" />
          <line x1="60" y1="40" x2="20" y2="80" strokeDasharray="2,2" />
          <line x1="100" y1="80" x2="140" y2="120" strokeDasharray="2,2" />
          <line x1="140" y1="80" x2="100" y2="120" strokeDasharray="2,2" />
          <line x1="140" y1="160" x2="180" y2="200" strokeDasharray="2,2" />
          <line x1="180" y1="160" x2="140" y2="200" strokeDasharray="2,2" />
        </svg>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16 relative z-10"
      >
        {/* Column 1: Brand */}
        <motion.div variants={columnVariants} className="lg:col-span-4 flex flex-col items-start relative">
          {/* Logo Brand Group */}
          <div className="-mt-7 -ml-6 -mb-2 text-white w-full max-w-[200px] relative z-20">
            <img src={whiteMabLogo} alt="Maabany Logo" className="w-full h-auto object-contain" />
          </div>

          <p className="text-[14px] text-white/80 leading-[1.8] font-light pr-4">
            Maabany Integrated Building Solutions delivers innovative engineering, construction, and facility management services across the Kingdom of Saudi Arabia (KSA) with a commitment to quality, precision, and long-term value.
          </p>

          {/* Social media icons */}
          <div className="flex items-center gap-3 pt-4">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.name}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-[#EA8A22] hover:bg-[#EA8A22] transition-all duration-250 transform hover:scale-110"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Column 2: Navigation */}
        <motion.div variants={columnVariants} className="lg:col-span-3 space-y-6">
          <h4 className="text-[18px] font-semibold text-white tracking-wide relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[2px] after:bg-[#EA8A22]">
            Quick Links
          </h4>
          <ul className="grid grid-cols-1 gap-3.5">
            {quickLinks.map((link, i) => (
              <li key={i}>
                <Link
                  to={link.path}
                  className="text-[15px] text-white/80 hover:text-[#EA8A22] transition-all duration-300 inline-flex items-center gap-2 group relative py-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#EA8A22] group-hover:shadow-[0_0_8px_rgba(234,138,34,0.6)] transition-all" />
                  <span className="relative">
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#EA8A22] transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Column 3: Resources */}
        <motion.div variants={columnVariants} className="lg:col-span-2 space-y-6">
          <h4 className="text-[18px] font-semibold text-white tracking-wide relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[2px] after:bg-[#EA8A22]">
            Resources
          </h4>
          <ul className="grid grid-cols-1 gap-3.5 mb-6">
            {resourceLinks.map((link, i) => (
              <li key={i}>
                <Link
                  to={link.path}
                  className="text-[15px] text-white/80 hover:text-[#EA8A22] transition-all duration-300 inline-flex items-center gap-2 group relative py-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#EA8A22] group-hover:shadow-[0_0_8px_rgba(234,138,34,0.6)] transition-all" />
                  <span className="relative">
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#EA8A22] transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="text-[15px] text-white/80 hover:text-[#EA8A22] text-left transition-all duration-300 inline-flex items-center gap-2 group cursor-pointer focus:outline-none relative py-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#EA8A22] group-hover:shadow-[0_0_8px_rgba(234,138,34,0.6)] transition-all" />
                <span className="relative">
                  Request a Quote
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#EA8A22] transition-all duration-300 group-hover:w-full" />
                </span>
              </button>
            </li>
          </ul>
        </motion.div>

        {/* Column 4: Contact Us */}
        <motion.div variants={columnVariants} className="lg:col-span-3 space-y-6">
          <h4 className="text-[18px] font-semibold text-white tracking-wide relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[2px] after:bg-[#EA8A22]">
            Contact Us
          </h4>
          <div className="space-y-4 text-[14px] text-white/75 font-light">
            <div className="flex gap-3 items-start group">
              <div className="p-2.5 rounded-[12px] border border-white/15 text-[#EA8A22] shrink-0 group-hover:bg-[#EA8A22] group-hover:text-white transition-all duration-300">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="space-y-1 mt-0.5">
                <p className="font-medium text-white text-[14px]">Jeddah Office (SA)</p>
                <a
                  href="https://maps.google.com/?q=2923+Al-Sharif+Ahmed+bin+Abdul+Muttalib,+Al-Salhiya+District,+Jeddah,+Saudi+Arabia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 text-[12px] leading-relaxed hover:text-[#EA8A22] transition-colors block"
                >
                  2923 Al-Sharif Ahmed bin Abdul Muttalib, Al-Salhiya District, Jeddah, Saudi Arabia
                </a>
              </div>
            </div>

            <div className="flex gap-3 items-start group">
              <div className="p-2.5 rounded-[12px] border border-white/15 text-[#EA8A22] shrink-0 group-hover:bg-[#EA8A22] group-hover:text-white transition-all duration-300">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="space-y-1 mt-0.5">
                <p className="font-medium text-white text-[14px]">Cairo Office (Egy)</p>
                <a
                  href="https://maps.google.com/?q=53+Hassan+El+Sherif+Street,+Nasr+City,+Cairo,+Egypt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 text-[12px] leading-relaxed hover:text-[#EA8A22] transition-colors block"
                >
                  53 Hassan El Sherif Street, Nasr City, Cairo, Egypt
                </a>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="p-2.5 rounded-[12px] border border-white/15 text-[#EA8A22] shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="space-y-1 mt-0.5">
                <p className="font-medium text-white text-[14px]">Email</p>
                <a
                  href="mailto:sales@maabany.com"
                  className="text-white/60 text-[12px] hover:text-[#EA8A22] transition-colors focus:outline-none focus:underline block"
                >
                  sales@maabany.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-center gap-y-2 gap-x-4 sm:gap-x-6 text-[14px] text-white/60 relative z-10 text-center">
        <p>All Rights Reserved © 2026</p>
        <div className="hidden sm:block w-[1px] h-3.5 bg-white/15" />
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-white/60">Powered by</span>
          <a
            href="#"
            className="inline-flex items-center"
          >
            <img 
              src={techHouseLogo} 
              alt="Technology House" 
              className="h-7 md:h-8 w-auto opacity-95 hover:opacity-100 transition-opacity cursor-pointer" 
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
