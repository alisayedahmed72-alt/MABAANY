import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Home, 
  HeartPulse, 
  Hotel, 
  Factory, 
  Compass, 
  GraduationCap, 
  Milestone,
  ArrowRight, 
  Check, 
  FileDown, 
  Layers, 
  ShieldCheck, 
  Activity, 
  Award, 
  HardHat,
  Sparkles,
  ArrowUpRight,
  HelpCircle,
  ChevronDown,
  Briefcase,
  Zap,
  Server,
  Lock,
  Flame,
  ThermometerSnowflake,
  Cpu,
  UserCheck,
  Scale,
  Shield,
  Workflow,
  CheckCircle2,
  Construction,
  Cable,
  Globe
} from 'lucide-react';
import { detailSolutions, projects } from '../data';
import { useQuoteModal } from '../contexts/QuoteContext';
import { InternalPageHero } from '../components/InternalPageHero';

// Define Interface for Industry Detail CMS
interface IndustryDetailData {
  id: string;
  name: string;
  heroImage: string;
  heroDesc: string;
  aboutHeading: string;
  aboutDesc: string;
  aboutImage: string;
  challenges: {
    icon: React.ComponentType<any>;
    title: string;
    desc: string;
  }[];
  relatedSolutionSlugs: string[];
  featuredProjectSlugs: string[];
  whyChoose: {
    icon: React.ComponentType<any>;
    title: string;
    desc: string;
  }[];
  stats: {
    value: string;
    label: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  ctaDesc: string;
}

// Master CMS Data for the 8 Industries
const industryDetailsPool: Record<string, IndustryDetailData> = {
  commercial: {
    id: 'commercial',
    name: 'Commercial Buildings',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    heroDesc: 'Maabany engineers premier high-rise office towers, mixed-use corporate headquarters, and retail developments engineered for optimal workflow and LEED Platinum standards.',
    aboutHeading: 'Erecting Corporate Landmarks of the Future',
    aboutDesc: 'The modern commercial building is more than physical space—it is an engine of economic productivity, collaboration, and resource efficiency. Maabany partners with leading real estate funds, corporations, and developers to construct state-of-the-art office towers. We merge advanced structural engineering, custom curtain walls, and efficient mechanical grids to deliver premium properties that maximize net rentable space, lower operational expenditures, and secure long-term valuations.',
    aboutImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    challenges: [
      {
        icon: Building2,
        title: 'High-Rise Structural Stability',
        desc: 'Addressing lateral wind loads, seismic shears, and deep foundation pressures in dense urban clusters using high-density concrete shear cores.'
      },
      {
        icon: ThermometerSnowflake,
        title: 'Zoned Indoor Comfort',
        desc: 'Installing highly zoned VRF air-conditioning networks paired with intelligent acoustic insulation to foster focus-driven office suites.'
      },
      {
        icon: Workflow,
        title: 'Clash Resolution via 3D BIM',
        desc: 'Solving complex spatial conflicts between structural framing, HVAC ducts, and plumbing runs digitally during the design phase, avoiding field rework.'
      },
      {
        icon: Server,
        title: 'High-Density Smart Backbones',
        desc: 'Constructing optical fibers, security monitoring, and localized environmental sensors under a unified smart building management system.'
      }
    ],
    relatedSolutionSlugs: ['civil-solutions', 'fit-out-solutions', 'mep-solutions', 'light-current-solutions'],
    featuredProjectSlugs: ['commercial-tower-development', 'the-oryx-tower'],
    whyChoose: [
      {
        icon: Award,
        title: 'LEED Certification Delivery',
        desc: 'Expert deployment of carbon-negative compounds, rainwater treatment loops, and solar-shading facades.'
      },
      {
        icon: HardHat,
        title: 'Fast-Track Pre-Assembly',
        desc: 'utilizing prefabricated steel-concrete modules to accelerate construction while minimizing inner-city road closures.'
      },
      {
        icon: ShieldCheck,
        title: 'Sub-Millimeter Erection Audits',
        desc: 'Continuous spatial scanning and laser metrology during frame assembly to ensure perfect column verticals.'
      },
      {
        icon: UserCheck,
        title: 'Dedicated Client Portals',
        desc: 'Live tracking of material delivery, procurement logs, and physical progress metrics directly from your phone.'
      }
    ],
    stats: [
      { value: '1.8M+', label: 'Sq. Ft. Built' },
      { value: '100%', label: 'Safety Compliance' },
      { value: 'LEED', label: 'Gold/Platinum Ready' },
      { value: '100+', label: 'Year Structural Lifespan' }
    ],
    faqs: [
      {
        question: 'What materials does Maabany prioritize for commercial skyscraper construction?',
        answer: 'We utilize high-strength self-compacting concrete, low-carbon structural steel, and are exploring structural mass-timber floor slabs to limit the embodied carbon while matching structural strength requirements.'
      },
      {
        question: 'How does Maabany handle complex plumbing and electrical installations in commercial towers?',
        answer: 'All MEP systems are designed in a shared 3D BIM environment to locate exact path routes. We fabricate complete utility risers off-site, raising them as a single assembly to guarantee strict quality and speedy delivery.'
      },
      {
        question: 'Does your team handle the premium interior fit-out along with core shell structures?',
        answer: 'Yes, we provide comprehensive design-build services, seamlessly carrying the project from deep foundations and structural columns to customized drywall, premium flooring, glass partitions, and artistic wood joinery.'
      }
    ],
    ctaDesc: 'Ready to build an iconic corporate headquarters or mixed-use development? Connect with our commercial engineering directors for an in-depth cost estimation.'
  },
  residential: {
    id: 'residential',
    name: 'Residential Developments',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    heroDesc: 'Maabany crafts high-end residential compounds, multi-family apartment towers, and bespoke luxury private villas that fuse clean architectural forms with permanent structural integrity.',
    aboutHeading: 'Crafting Exquisite Havens of Modern Living',
    aboutDesc: 'A home is a highly personal space demanding a flawless synthesis of family privacy, acoustic isolation, thermal comfort, and premium craftsmanship. Maabany works with premier developers and individuals to construct residential estates that serve as permanent investments. By utilizing continuous insulation wraps, solar roofing configurations, and high-quality European stone finishes, we deliver spaces that are beautiful to experience and highly cost-effective to operate.',
    aboutImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    challenges: [
      {
        icon: Home,
        title: 'Flawless Architectural Finishes',
        desc: 'Ensuring seamless drywall joints, perfectly flush floor transitions, and high-precision wood paneling using hand-finished techniques.'
      },
      {
        icon: ThermometerSnowflake,
        title: 'Thermal Mass Optimization',
        desc: 'Deploying insulated concrete forms (ICF) and triple-glazed window blocks to keep desert heat outside, reducing air conditioning load by 40%.'
      },
      {
        icon: Cable,
        title: 'Intelligent Home Networks',
        desc: 'Integrating surround sound, biometric smart locks, automated window shades, and landscape irrigation systems under unified tablet controls.'
      },
      {
        icon: Lock,
        title: 'Acoustic Soundproofing Isolation',
        desc: 'Installing floating floor membranes and specialized multi-layer acoustic drywalls to block sound transfer between adjacent living rooms.'
      }
    ],
    relatedSolutionSlugs: ['civil-solutions', 'fit-out-solutions', 'mep-solutions', 'facility-management'],
    featuredProjectSlugs: ['luxury-residential-compound'],
    whyChoose: [
      {
        icon: Sparkles,
        title: 'Bespoke Sourcing Capability',
        desc: 'Direct procurement channels with premium quarries in Spain and Italy, obtaining the finest marble and granite slabs at optimal prices.'
      },
      {
        icon: ShieldCheck,
        title: 'Rigid Waterproofing Membranes',
        desc: 'Deploying multi-layer elastomeric waterproofing sheets and flood testing all bathrooms and roofs for 72 hours prior to tiling.'
      },
      {
        icon: Briefcase,
        title: 'Turnkey Utility Integration',
        desc: 'We handle the complete permitting process, structural approvals, electrical grid sync, and civil defense licensing.'
      },
      {
        icon: Award,
        title: 'Comprehensive Written Warranties',
        desc: 'We back our structures, electrical wiring, sanitary plumbing, and waterproofing layers with multi-year warranties.'
      }
    ],
    stats: [
      { value: '550+', label: 'Units Delivered' },
      { value: '98%', label: 'Client Satisfaction' },
      { value: 'Solar', label: 'Roof Integration' },
      { value: 'Zero', label: 'Water Leak History' }
    ],
    faqs: [
      {
        question: 'Does Maabany construct smart houses with off-grid renewable options?',
        answer: 'Yes, we design and install rooftop solar panel arrays, home battery backup spaces, graywater recycling filters, and low-energy HVAC assemblies to create highly autonomous residences.'
      },
      {
        question: 'Can I customize the interior layout and material selections during construction?',
        answer: 'Our interior architects collaborate with clients during pre-construction to finalize 3D visual renders. We then coordinate precise material selections, allowing custom modifications before structural framing begins.'
      },
      {
        question: 'How do you ensure structural durability against highly humid or saline soil?',
        answer: 'We utilize sulfate-resistant cement mixtures and heavy polyurethane chemical barriers underneath our foundation slabs to prevent dampness and saline concrete corrosion.'
      }
    ],
    ctaDesc: 'Dreaming of a bespoke private villa or planning a premium residential compound? Contact our residential estimators today to review your layout files.'
  },
  healthcare: {
    id: 'healthcare',
    name: 'Healthcare',
    heroImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1600&q=80',
    heroDesc: 'Maabany engineers state-of-the-art hospitals, diagnostic laboratories, and emergency clinics that meet the highest international medical certifications and clinical standards.',
    aboutHeading: 'Integrating Engineering Integrity with Lifesaving Care',
    aboutDesc: 'Healthcare environments require the most complex engineering coordination of any building type. Medical infrastructure requires constant operational uptime, surgical-grade sterile conditions, specialized air containment, and heavy electrical redundancies. Maabany works in sync with hospital operators and medical machinery vendors to install vibration-free scanner platforms, high-performance HEPA ventilation, and backup energy grids.',
    aboutImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    challenges: [
      {
        icon: HeartPulse,
        title: 'Clinical Infection Control',
        desc: 'Installing laminar airflow ceilings in operating suites, negative-pressure wards, and zero-gap anti-microbial wall paneling.'
      },
      {
        icon: ThermometerSnowflake,
        title: 'Ultra-Pure Air Filtration',
        desc: 'Constructing multi-stage HEPA filtration units that cycle clean air 25+ times per hour, trapping 99.97% of airborne pathogens.'
      },
      {
        icon: Zap,
        title: 'Uninterruptible Utility Redundancy',
        desc: 'Designing dual electrical feeds, automated diesel generators, and surgical-theater UPS systems to secure continuous utility loads.'
      },
      {
        icon: Activity,
        title: 'Specialized Gas Piping',
        desc: 'Installing degreased copper pipes for oxygen, medical vacuum, and nitrous oxide distribution, fully verified with pressure sensor logs.'
      }
    ],
    relatedSolutionSlugs: ['civil-solutions', 'mep-solutions', 'light-current-solutions', 'facility-management'],
    featuredProjectSlugs: ['healthcare-facility'],
    whyChoose: [
      {
        icon: Award,
        title: 'JCI Standards Compliance',
        desc: 'All engineering, gas piping, and mechanical duct layouts comply fully with HTM 03-01 and JCI standards.'
      },
      {
        icon: Cpu,
        title: 'MRI & Scanner Shielding',
        desc: 'Constructing specialized RF copper shielding panels and vibration-isolated slab structures for diagnostic imaging.'
      },
      {
        icon: ShieldCheck,
        title: 'Live Hospital Renovation',
        desc: 'Rigid dust-containment barriers and noise-insulated off-peak scheduling to prevent clinical disruption.'
      },
      {
        icon: HardHat,
        title: 'Certified Healthcare MEPs',
        desc: 'In-house certified biomedical engineers oversee all clinical HVAC and backup terminal installations.'
      }
    ],
    stats: [
      { value: '18+', label: 'Clinical Facilities' },
      { value: '950+', label: 'Hospital Beds Active' },
      { value: 'ISO 5', label: 'Cleanroom Standard' },
      { value: '100%', label: 'Piping Pressure Pass' }
    ],
    faqs: [
      {
        question: 'Can Maabany renovate or expand an active hospital without interrupting patient care?',
        answer: 'Yes. We utilize strict containment barriers, negative air pressure units, and off-peak scheduling to prevent dust or noise from reaching patient areas, keeping the hospital operational.'
      },
      {
        question: 'Do you design and install specialized medical cleanrooms?',
        answer: 'Yes, we build, seal, and certify medical cleanrooms up to ISO Class 5, managing the custom ductwork, integrated pressure valves, and specialized clinical finishes.'
      },
      {
        question: 'What licensing and safety standards do your healthcare projects meet?',
        answer: 'Our healthcare projects are designed and constructed in full compliance with AIA Academy of Architecture for Health guidelines, HTM specifications, and local Ministry of Health standards.'
      }
    ],
    ctaDesc: 'Designing a modern diagnostic lab or planning a major hospital wing expansion? Partner with our clinical engineering division to ensure total medical compliance.'
  },
  hospitality: {
    id: 'hospitality',
    name: 'Hospitality',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80',
    heroDesc: 'Maabany builds luxury hotels, boutique resorts, and premium entertainment complexes that combine striking architectural design with robust operational infrastructure.',
    aboutHeading: 'Engineering Immersive Experiences of Luxury',
    aboutDesc: 'In the hospitality industry, every detail shapes the guest experience. From the acoustic tranquility of a suite to the climate efficiency of a dining hall, comfort is paramount. Maabany collaborates with global hotel brands and leisure developers to build striking resorts and hotels. We balance artistic architectural finishes with reliable commercial MEP grids, intelligent fire safety, and integrated access systems, ensuring an unforgettable guest journey and efficient hotel operations.',
    aboutImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    challenges: [
      {
        icon: Hotel,
        title: 'Premium Structural Finishes',
        desc: 'Achieving pristine alignments on custom wood, imported marble facades, and artistic lighting layouts across open-air lobbies.'
      },
      {
        icon: Lock,
        title: 'Guest Acoustic Isolation',
        desc: 'Implementing multi-layered sound walls and double-glazed doors to prevent kitchen or corridor sound from entering bedrooms.'
      },
      {
        icon: ThermometerSnowflake,
        title: 'High-Capacity Thermal Control',
        desc: 'Designing central cooling towers with rapid heat recovery to maintain fresh ventilation across public halls, spas, and kitchens.'
      },
      {
        icon: Server,
        title: 'Unified Hotel Automation',
        desc: 'Integrating digital door keys, interactive TV networks, smart lighting profiles, and security surveillance in a single network.'
      }
    ],
    relatedSolutionSlugs: ['civil-solutions', 'fit-out-solutions', 'mep-solutions', 'light-current-solutions'],
    featuredProjectSlugs: ['luxury-residential-compound'],
    whyChoose: [
      {
        icon: Sparkles,
        title: 'Artisanal Joinery & Fitting',
        desc: 'Dedicated finish crews trained in premium woodwork, geometric tile lay, and hand-rubbed decorative plaster.'
      },
      {
        icon: Award,
        title: '5-Star Hospitality Experience',
        desc: 'Extensive track record working with major luxury brands, satisfying rigorous brand standards and structural audits.'
      },
      {
        icon: ShieldCheck,
        title: 'Extensive Pool & Spa Waterproofing',
        desc: 'Double-membrane structural epoxy seals with multi-day dynamic pressure tests to guarantee leak-free water structures.'
      },
      {
        icon: HardHat,
        title: 'Planned Facility Maintenance',
        desc: 'Proactive equipment upkeep schedules to prevent any utility or HVAC issues, keeping guest satisfaction high.'
      }
    ],
    stats: [
      { value: '12+', label: 'Luxury Resorts & Hotels' },
      { value: '2,200+', label: 'Guest Rooms Built' },
      { value: '< 30dB', label: 'Room Ambient Noise' },
      { value: '100%', label: 'Water Leak Test Pass' }
    ],
    faqs: [
      {
        question: 'Does Maabany work directly with global hospitality design consultants?',
        answer: 'Yes. We frequently collaborate with international architects, interior designers, and MEP consultants, translating complex concepts into precise build realities.'
      },
      {
        question: 'How do you handle acoustic insulation in hotel guest rooms?',
        answer: 'We deploy decoupled concrete floor plates, acoustic ceiling grids, and mineral fiber wall cores to keep guest room noise levels below 30dB, ensuring deep guest sleep.'
      },
      {
        question: 'Do you construct and engineer commercial hotel kitchens and wellness spas?',
        answer: 'Absolutely. We design and build professional commercial kitchens complying with HACCP standards, alongside custom heated pools, steam saunas, and hydrotherapy spas.'
      }
    ],
    ctaDesc: 'Ready to build a luxury beach resort or a high-rise city hotel? Reach out to our hospitality development engineers to coordinate a design-to-build consultation.'
  },
  industrial: {
    id: 'industrial',
    name: 'Industrial Facilities',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80',
    heroDesc: 'Maabany constructs heavy industrial factories, smart logistics warehouses, and advanced manufacturing cleanrooms engineered for extreme load capacity and raw efficiency.',
    aboutHeading: 'Structuring High-Output Industrial Hubs',
    aboutDesc: 'Industrial developments require rigid structural stability, high power capacity, and efficient space planning. From robotic gigafactories requiring decoupled foundations to cold-storage hubs demanding permanent temperature seals, Maabany delivers structures built for heavy operations. We construct reinforced, high-tolerance flat floors, heavy steel portals, and complex electrical sub-stations, securing your supply chain and maximizing your production uptime.',
    aboutImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    challenges: [
      {
        icon: Factory,
        title: 'Vibration-Isolated Slabs',
        desc: 'Engineering massive decoupled foundation slabs resting on elastic dampeners to shield nanometer-scale precision robotics from outside tremors.'
      },
      {
        icon: Zap,
        title: 'Heavy High-Voltage Distribution',
        desc: 'Installing dedicated industrial busducts, step-down transformers, and high-amp distribution panels supporting multi-megawatt machineries.'
      },
      {
        icon: Milestone,
        title: 'Laser-Flat Concrete Floors',
        desc: 'Pouring high-tolerance flat floors (FF/FL standards) to allow high-reach forklift trucks to operate at speed with zero tilt risk.'
      },
      {
        icon: Flame,
        title: 'Specialized Hazard Suppression',
        desc: 'Installing high-speed foam sprayers, gas-based clean agent suppressors, and robust smoke barriers to protect valuable assets.'
      }
    ],
    relatedSolutionSlugs: ['civil-solutions', 'mep-solutions', 'facility-management'],
    featuredProjectSlugs: ['industrial-warehouse-complex'],
    whyChoose: [
      {
        icon: Cpu,
        title: 'Automated System Integration',
        desc: 'Coordinating physical conduits and server arrays in sync with conveyor line blueprints.'
      },
      {
        icon: Award,
        title: 'Rigid Civil Engineering',
        desc: 'Large span steel portal frames allowing maximum columns-free warehouse space for flexible logistics layouts.'
      },
      {
        icon: ShieldCheck,
        title: 'Corrosion-Resistant Casts',
        desc: 'Using specialized chemical concrete additive compounds to block warehouse oil, acid, or water stains.'
      },
      {
        icon: HardHat,
        title: 'Rigid Site Safety Culture',
        desc: 'Achieving millions of safe work hours without incidents during heavy structural steel lifting.'
      }
    ],
    stats: [
      { value: '35+', label: 'Factories Completed' },
      { value: '4.2M+', label: 'Sq. Ft. Logistical Space' },
      { value: 'FF 50+', label: 'Laser-Flat Slab Certified' },
      { value: '3.5M', label: 'Safe Work Hours without Incident' }
    ],
    faqs: [
      {
        question: 'What flooring standards does Maabany use for automated logistics centers?',
        answer: 'We utilize advanced laser-guided concrete screed assemblies to pour and finish super-flat floors matching FF 50 and FL 40 standards, allowing high-speed automated reach trucks to operate without vibration.'
      },
      {
        question: 'How do you isolate sensitive production machinery from structural vibrations?',
        answer: 'We design separate foundation blocks sitting on neoprene dampening layers, completely decoupled from the main warehouse floor, absorbing up to 95% of machine tremors.'
      },
      {
        question: 'Does your team design and install industrial electrical substations?',
        answer: 'Yes, we handle the complete design, installation, civil containment, and municipal grid integration for substations up to 33kV, securing constant heavy power supplies.'
      }
    ],
    ctaDesc: 'Planning a high-yield manufacturing factory or smart logistics distribution hub? Consult our heavy industrial engineers to review structural load profiles.'
  },
  government: {
    id: 'government',
    name: 'Government & Public Sector',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    heroDesc: 'Maabany delivers secure civic administration complexes, municipal centers, and public infrastructure built with absolute structural protection, on-time delivery, and strict regulatory compliance.',
    aboutHeading: 'Strengthening Civic Foundations through Resilient Design',
    aboutDesc: 'Civic developments must stand as symbols of community pride while delivering absolute structural defense, high accessibility, and complete operational security. Maabany partners with ministries, municipal authorities, and government agencies to build durable administrative centers, civil defense facilities, and civic complexes. We adhere strictly to public budget guidelines, municipal security protocols, and green building targets, delivering durable community spaces.',
    aboutImage: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=800&q=80',
    challenges: [
      {
        icon: Compass,
        title: 'Enhanced Blast & Impact Defense',
        desc: 'Engineering structural steel matrices, reinforced columns, and shatter-resistant window structures to meet strict civil defense safety specs.'
      },
      {
        icon: Lock,
        title: 'Highly Classified Security Zones',
        desc: 'Constructing physically isolated network hubs, biometric access locks, and custom secure storage rooms with separate air and power loops.'
      },
      {
        icon: Scale,
        title: 'Strict Quality Documentation',
        desc: 'Maintaining meticulous material test certificates, concrete pour logs, and inspection sheets for transparent auditing.'
      },
      {
        icon: Zap,
        title: 'Multi-Level Emergency Backup',
        desc: 'Installing dedicated backup generator hubs, fuel storage tanks, and communications lines to ensure operational continuity.'
      }
    ],
    relatedSolutionSlugs: ['civil-solutions', 'mep-solutions', 'light-current-solutions'],
    featuredProjectSlugs: ['government-facility'],
    whyChoose: [
      {
        icon: ShieldCheck,
        title: 'Tier-1 Security Cleared Teams',
        desc: 'Our construction crews and project managers possess high-level security clearance for restricted defense areas.'
      },
      {
        icon: Award,
        title: 'Strict Civil Codes Alignment',
        desc: 'Absolute adherence to national building regulations, structural standards, and fire protection codes.'
      },
      {
        icon: Briefcase,
        title: 'On-Time, In-Budget Delivery',
        desc: 'Rigid timeline milestone checks and transparent commercial schedules, ensuring public funds are used efficiently.'
      },
      {
        icon: HardHat,
        title: 'Generational Longevity',
        desc: 'Engineering structures utilizing specialized, weather-resistant materials to secure low maintenance for decades.'
      }
    ],
    stats: [
      { value: '22+', label: 'Civic Complexes' },
      { value: '100%', label: 'Security Clearance Pass' },
      { value: 'Class A', label: 'Blast Protection Rating' },
      { value: '0', label: 'Audit Deviations Reported' }
    ],
    faqs: [
      {
        question: 'Does Maabany coordinate directly with national security and civil defense departments?',
        answer: 'Yes, our project directors maintain active credentials and security clearances. We handle the strict coordination required to achieve Civil Defense and security standards.'
      },
      {
        question: 'How do you guarantee material source transparency for government tenders?',
        answer: 'We provide full material trace tracking, from structural steel mill test certificates to chemical laboratory concrete reports, facilitating seamless public auditing.'
      },
      {
        question: 'Can you implement extreme structural impact protections in public complexes?',
        answer: 'Yes. We engineer high-strength reinforced columns, continuous concrete facades, blast-resistant glass frames, and physical vehicle-barrier fences.'
      }
    ],
    ctaDesc: 'Partnering on a public sector development or civic administration complex? Connect with our public tenders engineering office to coordinate official project proposals.'
  },
  education: {
    id: 'education',
    name: 'Education',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    heroDesc: 'Maabany constructs modern university campuses, high-tech research labs, and primary schools engineered for creative learning, acoustic balance, and student safety.',
    aboutHeading: 'Erecting Hubs of Knowledge and Innovation',
    aboutDesc: 'Educational buildings should inspire curiosity while offering safe, sustainable, and highly flexible learning spaces. Maabany partners with private school networks and public universities to construct complete academic campuses. We integrate state-of-the-art acoustics in auditoriums, positive air filtration in science labs, smart AV networks in classrooms, and spacious, daylit central spaces, creating environments where future generations can thrive.',
    aboutImage: 'https://images.unsplash.com/photo-1562774053-f5a02f689958?auto=format&fit=crop&w=800&q=80',
    challenges: [
      {
        icon: GraduationCap,
        title: 'Creative Acoustic Insulation',
        desc: 'Utilizing specialized wood-perforated ceiling panels and double-drywall setups to isolate noisy gymnasiums from quiet lecture halls.'
      },
      {
        icon: Sparkles,
        title: 'Abundant Natural Daylight',
        desc: 'Positioning continuous glass skylights and smart light shelves to channel natural glare-free light, boosting student focus and health.'
      },
      {
        icon: Activity,
        title: 'High-Tech Research MEPs',
        desc: 'Installing dedicated chemical exhaust hoods, acid-resistant drainage lines, and high-precision laboratory gas supply panels.'
      },
      {
        icon: Shield,
        title: 'Complete Child Safety Design',
        desc: 'Ensuring rounded drywall corners, safe banisters, anti-slip floor surfaces, and automated entry control locks.'
      }
    ],
    relatedSolutionSlugs: ['civil-solutions', 'fit-out-solutions', 'mep-solutions', 'light-current-solutions'],
    featuredProjectSlugs: ['educational-campus'],
    whyChoose: [
      {
        icon: Award,
        title: 'Flexible Spatial Layouts',
        desc: 'Deploying heavy long-span structural beams that allow large, column-free lecture theaters and multi-purpose spaces.'
      },
      {
        icon: ShieldCheck,
        title: 'Non-Toxic Green Materials',
        desc: 'Strict procurement of low-VOC paints, formaldehyde-free wood composites, and organic acoustic insulation.'
      },
      {
        icon: HardHat,
        title: 'On-Schedule Summer Deliveries',
        desc: 'Accelerating project schedules during holiday breaks to ensure schools open on-time for the academic semester.'
      },
      {
        icon: ProximityWarning,
        title: 'Intelligent Campus Security',
        desc: 'Installing high-capacity perimeter CCTV, integrated fire warnings, and zoned emergency broadcast systems.'
      }
    ],
    stats: [
      { value: '15+', label: 'Campuses Erected' },
      { value: '18,500+', label: 'Students Housed' },
      { value: '0 VOC', label: 'Interior Air Certified' },
      { value: '100%', label: 'School Term On-Time Open' }
    ],
    faqs: [
      {
        question: 'Does Maabany design and build specialized STEM and chemistry labs?',
        answer: 'Yes, we construct high-tech research labs complete with chemically inert piping, air extract fans, acid waste tanks, and gas monitors complying with laboratory standards.'
      },
      {
        question: 'How do you coordinate heavy construction on an active campus?',
        answer: 'We divide the site with solid security fences, establish dedicated truck routes away from students, and schedule loud excavations during evening hours or holiday breaks.'
      },
      {
        question: 'What sustainable building features can you integrate into school projects?',
        answer: 'We offer solar roof configurations, natural daylight channeling mirrors, rainwater collection tanks for landscape irrigation, and energy-efficient heat pumps.'
      }
    ],
    ctaDesc: 'Planning a high-tech university campus or a modern primary school? Collaborate with our institutional engineering estimators to review your campus blueprints.'
  },
  infrastructure: {
    id: 'infrastructure',
    name: 'Infrastructure',
    heroImage: 'https://images.unsplash.com/photo-1473876988266-ca0860a443b8?auto=format&fit=crop&w=1600&q=80',
    heroDesc: 'Maabany delivers heavy civil infrastructure, high-speed road bridges, utility networks, and multi-modal transit corridors engineered to connect cities with resilient networks.',
    aboutHeading: 'Bridging Communities with Generational Civil Networks',
    aboutDesc: 'Civil infrastructure is the backbone of metropolitan progress. It requires massive material resilience, advanced structural analysis, and the ability to master challenging soils. Maabany designs and builds heavy civil networks, highway arteries, and complex transport terminals. By utilizing carbon-negative concrete formulations, anti-corrosive reinforcement bars, and real-time structural health sensors, we deliver public networks built to withstand extreme loads and climates for a century.',
    aboutImage: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=800&q=80',
    challenges: [
      {
        icon: Construction,
        title: 'Challenging Marine Soils',
        desc: 'Deploying high-resilience structural piles deep into stable bedrock underneath highly saline, coastal saturated sandy soils.'
      },
      {
        icon: Milestone,
        title: 'Extreme Thermal Concrete',
        desc: 'Casting massive bridge piers in desert heat using liquid nitrogen cooled cement mixtures to prevent core cracking.'
      },
      {
        icon: Workflow,
        title: 'Traffic Stream Protection',
        desc: 'Using advanced pre-cast launching gantry systems to erect bridge decks over busy expressways with zero traffic stops.'
      },
      {
        icon: Activity,
        title: 'Continuous Structural Sensors',
        desc: 'Installing optical fiber load sensors inside concrete bridge decks, sending real-time strain telemetry back to road authorities.'
      }
    ],
    relatedSolutionSlugs: ['civil-solutions', 'mep-solutions'],
    featuredProjectSlugs: ['skyline-viaduct-expansion'],
    whyChoose: [
      {
        icon: Award,
        title: 'Tier-1 Heavy Civil License',
        desc: 'Fully certified and licensed to tender and execute large-scale highway, transit, and national utility network bids.'
      },
      {
        icon: ShieldCheck,
        title: 'Anti-Corrosive Foundations',
        desc: 'Procuring sulfate-resistant concrete and epoxy-coated steel to resist high chloride soil wear, ensuring a 100+ year life.'
      },
      {
        icon: HardHat,
        title: 'High-Capacity Precast Yard',
        desc: 'Our own industrial precasting yards cast massive bridge segments under perfect quality control prior to on-site assembly.'
      },
      {
        icon: Cpu,
        title: 'Unparalleled Technical Fleet',
        desc: 'Owning a modern fleet of piling rigs, heavy crane systems, and earthmovers to secure prompt material execution.'
      }
    ],
    stats: [
      { value: '45+', label: 'Public Transit Projects' },
      { value: '160km+', label: 'Expressways Paved' },
      { value: '100+', label: 'Year Design Lifespan' },
      { value: '0', label: 'Structural Failures reported' }
    ],
    faqs: [
      {
        question: 'What concrete technology does Maabany use to extend infrastructure lifespans?',
        answer: 'We utilize Ground Granulated Blast-furnace Slag (GGBS) and silica fume concrete formulations, which create a highly dense structure blocking water and salt ingress, avoiding reinforcement rust.'
      },
      {
        question: 'How do you execute major bridge installations over active city expressways?',
        answer: 'We precast bridge segments in our factory and lift them into place overnight using specialized gantries, keeping lanes below safe and active during daily peak hours.'
      },
      {
        question: 'Does Maabany build underground municipal drainage and utility networks?',
        answer: 'Yes, we design, excavate, and lay deep storm water drainage pipes, high-capacity utility channels, and electrical backbones to coordinate city expansion.'
      }
    ],
    ctaDesc: 'Coordinating a public transport expansion or planning a heavy civil highway viaduct? Connect with our infrastructure bidding division to coordinate tender specifications.'
  }
};

// Simple Fallback ProximityWarning component since we need it in education
function ProximityWarning(props: any) {
  return <ShieldCheck {...props} />;
}

export function IndustryDetails() {
  const { id } = useParams<{ id: string }>();
  const setQuoteModalOpen = useQuoteModal();
  
  // Find current industry
  const currentIndustry = industryDetailsPool[id || ''] || industryDetailsPool.commercial;

  // Gallery simulation states
  
  
  // Slider states
  
  
  
  
  // Parallax / mouse states
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringHero, setIsHoveringHero] = useState(false);

  // Active FAQs
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  // Profile download status
  const [downloadingProfile, setDownloadingProfile] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Auto-play timer ref
  

  // Scroll to top on page or ID change
  

  // Mouse Parallax Coordinate Generator
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  const handleDownloadProfile = () => {
    setDownloadingProfile(true);
    setTimeout(() => {
      setDownloadingProfile(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1500);
  };

  // Get matching solutions and featured projects
  const relatedSolutionsData = detailSolutions.filter(sol => 
    currentIndustry.relatedSolutionSlugs.includes(sol.slug)
  );

  const relatedProjectsData = projects.filter(proj => 
    currentIndustry.featuredProjectSlugs.includes(proj.slug)
  );

  // Swipe gesture tracking variables
  let touchStartX = 0;
  let touchEndX = 0;



  const handleSwipe = () => {
    const threshold = 50;
    if (touchStartX - touchEndX > threshold) {
    } else if (touchEndX - touchStartX > threshold) {
    }
  };

  return (
    <div className="relative bg-white text-neutral-900 min-h-screen">
      
      {/* 1. Hero Header Section */}
      <InternalPageHero
        title={currentIndustry.name}
        categoryBadge={currentIndustry.name}
        heroImage={currentIndustry.heroImage}
        breadcrumbs={
          <>
            <Link to="/" className="hover:text-[#EA8A22] transition-colors">Home</Link>
            <span className="text-neutral-500">/</span>
            <Link to="/industries" className="hover:text-[#EA8A22] transition-colors">Industries We Serve</Link>
            <span className="text-neutral-500">/</span>
            <span className="text-[#264A8A] font-bold">{currentIndustry.name}</span>
          </>
        }
      />

      {/* 3. Image Slider Component (REMOVED AS PER USER REQUEST) */}

      {/* 4. Industry Overview */}
      <section className="py-20 md:py-28 bg-neutral-50 relative overflow-hidden border-t border-b border-neutral-200/80">
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-[#264A8A] font-mono text-xs tracking-[0.2em] font-bold uppercase block mb-3">OVERVIEW</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight uppercase font-mono mb-6">
                {currentIndustry.aboutHeading}
              </h2>
              <p className="text-neutral-600 text-sm md:text-base leading-relaxed font-light mb-8">
                {currentIndustry.aboutDesc}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img src={currentIndustry.aboutImage} alt={currentIndustry.aboutHeading} className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Industry Challenges */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-[#264A8A] font-mono text-xs tracking-[0.2em] font-bold uppercase block mb-3">KEY CHALLENGES</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight uppercase font-mono">
              Solving Industry Complexities
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentIndustry.challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 hover:shadow-xl hover:border-[#EA8A22]/30 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-neutral-100">
                  <challenge.icon className="w-6 h-6 text-[#EA8A22]" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-neutral-900 uppercase font-mono text-base transition-colors">
                    {challenge.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed font-light">
                    {challenge.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Solutions for This Industry */}
      {relatedSolutionsData.length > 0 && (
        <section className="py-20 md:py-28 bg-white relative">
          <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8">
            <div className="mb-16">
              <span className="text-[#264A8A] font-mono text-xs tracking-[0.2em] font-bold uppercase block mb-3">RELATED SOLUTIONS</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight uppercase font-mono">
                Services Tailored to This Industry
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedSolutionsData.map((sol, index) => (
                <motion.div
                  key={sol.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white rounded-[24px] overflow-hidden border border-neutral-200 hover:border-[#EA8A22] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col relative"
                >
                  <Link to={`/solutions/${sol.slug}`} className="absolute inset-0 z-20" />
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={sol.image} 
                      alt={sol.title} 
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-neutral-900 uppercase font-mono transition-colors group-hover:text-[#EA8A22]">
                        {sol.title}
                      </h3>
                      <p className="text-xs text-neutral-600 font-light leading-relaxed line-clamp-4">
                        {sol.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Featured Projects */}
      {relatedProjectsData.length > 0 && (
        <section className="py-20 md:py-28 bg-neutral-50 border-t border-b border-neutral-200/80">
          <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8">
            <div className="mb-16">
              <span className="text-[#264A8A] font-mono text-xs tracking-[0.2em] font-bold uppercase block mb-3">SECTOR PROJECTS</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight uppercase font-mono">
                Our Highlighted Projects
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjectsData.map((proj, idx) => (
                <motion.div
                  key={proj.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="group bg-white rounded-3xl overflow-hidden border border-neutral-200 hover:border-[#EA8A22] shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col relative"
                >
                  <Link to={`/projects/${proj.slug}`} className="absolute inset-0 z-20" />
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img 
                      src={proj.image} 
                      alt={proj.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[10px] font-mono uppercase text-white font-bold tracking-widest z-10">
                      {proj.year}
                    </div>
                  </div>
                  <div className="p-8 space-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono tracking-widest text-[#EA8A22] uppercase font-bold">
                        {proj.location}
                      </p>
                      <h3 className="text-xl md:text-2xl font-black text-neutral-950 uppercase tracking-tight font-mono transition-colors">
                        {proj.name}
                      </h3>
                    </div>
                    <p className="text-xs text-neutral-500 font-light leading-relaxed line-clamp-2">
                      {proj.desc}
                    </p>
                    <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-widest group-hover:text-[#EA8A22] transition-colors">
                        View Project case study
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 11. CTA Banner */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8">
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

      

      <style>{`
        @keyframes sweep {
          0% { transform: translateX(-150%) skewX(-25deg); }
          100% { transform: translateX(300%) skewX(-25deg); }
        }
      `}</style>
    </div>
  );
}
