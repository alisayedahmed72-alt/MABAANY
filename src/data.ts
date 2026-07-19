import { Building2, Shield, Globe, HardHat, Award, Briefcase } from 'lucide-react';

export const solutions = [
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

export interface Project {
  slug: string;
  name: string;
  location: string;
  category: string;
  year: string;
  image: string;
  desc: string;
  isFeatured?: boolean;
}

export const projects: Project[] = [
  {
    slug: 'commercial-tower-development',
    name: 'Commercial Tower Development',
    location: 'Riyadh, KSA',
    category: 'Commercial',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    desc: 'Construction of a modern commercial office tower designed to meet international quality and sustainability standards.',
    isFeatured: true
  },
  {
    slug: 'luxury-residential-compound',
    name: 'Luxury Residential Compound',
    location: 'Dubai, UAE',
    category: 'Residential',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    desc: 'Complete construction of premium residential buildings featuring modern architecture and high-end finishing.',
    isFeatured: true
  },
  {
    slug: 'industrial-warehouse-complex',
    name: 'Industrial Warehouse Complex',
    location: 'Dammam, KSA',
    category: 'Industrial',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    desc: 'Design and construction of large-scale industrial warehouses with advanced structural engineering solutions.',
    isFeatured: true
  },
  {
    slug: 'government-facility',
    name: 'Government Facility',
    location: 'Riyadh, KSA',
    category: 'Government',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1200&q=80',
    desc: 'Construction of a government administration facility delivered according to strict engineering and security standards.',
    isFeatured: true
  },
  {
    slug: 'healthcare-facility',
    name: 'Healthcare Facility',
    location: 'Jeddah, KSA',
    category: 'Healthcare',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
    desc: 'Construction and engineering works for a modern healthcare facility equipped with advanced infrastructure systems.',
    isFeatured: true
  },
  {
    slug: 'educational-campus',
    name: 'Educational Campus',
    location: 'Manama, Bahrain',
    category: 'Educational',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1562774053-f5a02f689958?auto=format&fit=crop&w=1200&q=80',
    desc: 'Development of educational buildings providing modern learning environments and sustainable infrastructure.',
    isFeatured: true
  },
  {
    slug: 'the-oryx-tower',
    name: 'The Oryx Tower',
    location: 'Riyadh, KSA',
    category: 'Commercial',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    desc: 'A 78-story landmark featuring a kinetic wind-harvesting exterior design.',
    isFeatured: false
  },
  {
    slug: 'skyline-viaduct-expansion',
    name: 'Skyline Viaduct Expansion',
    location: 'Dubai, UAE',
    category: 'Infrastructure',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    desc: 'Seamless structural extension of high-speed transit networks over busy corridors.',
    isFeatured: false
  }
];

export const clientLogos = [
  { name: 'Apex Developments', icon: Building2, text: 'APEX' },
  { name: 'Nexa Holdings', icon: Shield, text: 'NEXA' },
  { name: 'Vanguard Cities', icon: Globe, text: 'VANGUARD' },
  { name: 'Titan Infra', icon: HardHat, text: 'TITAN' },
  { name: 'Elysium Living', icon: Award, text: 'ELYSIUM' },
  { name: 'Vertex Eng', icon: Briefcase, text: 'VERTEX' },
];

export interface DetailSolution {
  slug: string;
  title: string;
  desc: string;
  aboutTitle: string;
  aboutDesc: string;
  image: string;
  images: string[];
}

export const detailSolutions: DetailSolution[] = [
  {
    slug: 'civil-solutions',
    title: 'Civil Solutions',
    desc: 'Building strong foundations through comprehensive civil construction services for residential, commercial, and industrial developments.',
    aboutTitle: 'About Civil Solutions',
    aboutDesc: 'Maabany delivers comprehensive civil engineering and construction services tailored to residential, commercial, and industrial developments. From structural works and site preparation to reinforced concrete and infrastructure projects, our experienced team ensures every project is executed with precision, quality, and the highest safety standards. We combine engineering expertise with modern construction practices to deliver durable, efficient, and sustainable solutions.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'commercial-buildings',
    title: 'Commercial Buildings',
    desc: 'Designing and constructing state-of-the-art office towers, retail complexes, and commercial facilities.',
    aboutTitle: 'About Commercial Buildings',
    aboutDesc: 'Our Commercial Buildings division focuses on creating modern, highly functional, and architecturally striking commercial spaces. We utilize advanced materials, high-performance structural systems, and sustainable construction practices to deliver commercial real estate that drives productivity and enhances urban landscapes.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'residential-buildings',
    title: 'Residential Buildings',
    desc: 'Crafting luxury residential estates, modern multi-family complexes, and sustainable communities.',
    aboutTitle: 'About Residential Buildings',
    aboutDesc: 'We construct premium residential environments that prioritize comfort, aesthetic brilliance, and long-term durability. From high-end private villas to multi-story luxury apartments, our work integrates smart technologies and eco-efficient architectural elements designed for exceptional contemporary living.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'industrial-buildings-warehouses',
    title: 'Industrial Buildings & Warehouses',
    desc: 'Constructing robotic gigafactories, logistics centers, and heavy-duty industrial warehouses.',
    aboutTitle: 'About Industrial Buildings & Warehouses',
    aboutDesc: 'Industrial projects require a deep understanding of technical parameters, structural loads, and precise climate constraints. We design and construct industrial spaces featuring large spans, high-load concrete floor plates, vibration-isolated foundation beds, and advanced facility ventilation.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'prefabricated-steel-structures',
    title: 'Prefabricated Steel Structures',
    desc: 'Engineering high-precision pre-engineered and prefabricated steel frame systems for rapid deployment.',
    aboutTitle: 'About Prefabricated Steel Structures',
    aboutDesc: 'Maabany engineered prefabricated steel systems enable fast-track project schedules without sacrificing load capacities or architectural expression. We manage the entire lifecycle from detailed structural engineering and precision shop detailing to on-site robotic lifting and bolting.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'fit-out-solutions',
    title: 'Fit-Out Solutions',
    desc: 'We transform interior environments into modern, functional, and visually refined spaces through complete fit-out solutions.',
    aboutTitle: 'About Fit-Out Solutions',
    aboutDesc: 'We transform interior environments into modern, functional, and visually refined spaces through complete fit-out solutions. Our expertise includes architectural finishes, ceilings, flooring, partitions, lighting, and custom interior detailing for commercial, hospitality, healthcare, and office projects.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'electromechanical-solutions',
    title: 'Electromechanical Solutions',
    desc: 'Providing integrated Mechanical, Electrical, and Plumbing systems that ensure efficient, reliable, and sustainable building performance.',
    aboutTitle: 'About Electromechanical Solutions',
    aboutDesc: 'Our Mechanical, Electrical, and Plumbing services integrate advanced building systems that maximize efficiency, sustainability, and long-term operational performance. We deliver complete electromechanical solutions designed to support modern infrastructure and smart buildings.',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'mep-solutions',
    title: 'MEP Solutions',
    desc: 'Our Mechanical, Electrical, and Plumbing services integrate advanced building systems that maximize efficiency, sustainability, and long-term operational performance.',
    aboutTitle: 'About MEP Solutions',
    aboutDesc: 'Our Mechanical, Electrical, and Plumbing services integrate advanced building systems that maximize efficiency, sustainability, and long-term operational performance. We deliver complete MEP solutions designed to support modern infrastructure and smart buildings.',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'fire-fighting-systems',
    title: 'Fire Fighting Systems',
    desc: 'Installing world-class active fire suppression, smart sprinklers, and early warning alarm networks.',
    aboutTitle: 'About Fire Fighting Systems',
    aboutDesc: 'Maabany designs and installs premium life safety and active fire fighting configurations. Our services span wet/dry pipe sprinkler systems, clean agent gas suppressants for server rooms, smart smoke control, and highly intelligent, addressable fire alarm panel integrations.',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'hvac-systems',
    title: 'HVAC Systems',
    desc: 'Deploying high-performance heating, ventilation, and premium air conditioning systems.',
    aboutTitle: 'About HVAC Systems',
    aboutDesc: 'We design and construct high-performance, energy-efficient HVAC networks. Our specialists build custom chilled water loops, VRF (Variable Refrigerant Flow) systems, air handling layouts, and computerized ventilation controls customized for healthcare and industrial facilities.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'plumbing',
    title: 'Plumbing Solutions',
    desc: 'Delivering comprehensive plumbing engineering, high-efficiency water loops, and smart drainage.',
    aboutTitle: 'About Plumbing Solutions',
    aboutDesc: 'Our plumbing division manages design, load calculation, and structural installation of high-efficiency water supply networks, sanitary drainage circuits, and graywater treatment units for enterprise and residential megaprojects.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'low-current-solutions',
    title: 'Low Current Solutions',
    desc: 'Delivering intelligent low-current systems including security, surveillance, networking, access control, parking management, and smart automation to create safer, smarter, and more connected buildings.',
    aboutTitle: 'About Low Current Solutions',
    aboutDesc: 'Maabany provides intelligent low-current systems that enhance security, connectivity, and automation. Our integrated solutions include surveillance systems, structured cabling, access control, parking management, and smart building technologies designed for today\'s connected environments.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'light-current-solutions',
    title: 'Light Current Solutions',
    desc: 'Maabany provides intelligent low-current systems that enhance security, connectivity, and automation.',
    aboutTitle: 'About Light Current Solutions',
    aboutDesc: 'Maabany provides intelligent low-current systems that enhance security, connectivity, and automation. Our integrated solutions include surveillance systems, structured cabling, access control, parking management, and smart building technologies designed for today\'s connected environments.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'cctv-systems',
    title: 'CCTV Systems',
    desc: 'High-definition video surveillance and intelligent analytics to monitor and secure physical spaces.',
    aboutTitle: 'About CCTV Systems',
    aboutDesc: 'Our CCTV Systems integrate advanced hardware and software to deliver round-the-clock visual security. With high-definition IP cameras, thermal imaging, automated object tracking, and smart behavior analysis, we ensure comprehensive spatial oversight.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'data-network-solutions',
    title: 'Data Network Solutions',
    desc: 'Fast, secure, and robust networking backbones designed for high-capacity corporate communication.',
    aboutTitle: 'About Data Network Solutions',
    aboutDesc: 'We engineer state-of-the-art corporate IT networks. Our structured cabling layouts, high-bandwidth optical backbones, enterprise routers, and secure campus switching layers establish the flawless data infrastructure modern businesses depend on.',
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'access-control-systems',
    title: 'Access Control Systems',
    desc: 'Comprehensive entry management featuring biometrics, RFID tracking, and digital access logs.',
    aboutTitle: 'About Access Control Systems',
    aboutDesc: 'Maabany biometric and card access controls offer multi-tier security mapping. We deploy facial detection, advanced fingerprint terminals, rapid smart turnstiles, and automated doors integrated with local fire alarms for ultimate emergency egress safety.',
    image: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'parking-management-systems',
    title: 'Parking Management Systems',
    desc: 'Automated entry, smart payment structures, and dynamic car guidance networks.',
    aboutTitle: 'About Parking Management Systems',
    aboutDesc: 'We transform vehicle access into an ultra-convenient process. Our solutions feature dynamic ANPR (Automatic Number Plate Recognition) cameras, fast automatic rising barriers, ticket-issuing kiosks, and real-time guidance displays mapping open bays.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'smart-home-solutions',
    title: 'Smart Home Solutions',
    desc: 'Seamless smart home systems unifying climate control, lighting, and audio networks.',
    aboutTitle: 'About Smart Home Solutions',
    aboutDesc: 'Create a fully responsive smart home. We integrate voice interfaces, automated light dimming arrays, occupancy-based climate profiles, motorized curtain tracking, and remote security views, easily managed on a unified screen.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'facility-management',
    title: 'Facility Management',
    desc: 'Our facility management services ensure buildings continue operating at peak performance through preventive maintenance, technical support, and asset optimization.',
    aboutTitle: 'About Facility Management',
    aboutDesc: 'Our facility management services ensure buildings continue operating at peak performance through preventive maintenance, technical support, asset management, and operational optimization. We help clients extend asset life while maintaining safe and efficient environments.',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'
    ]
  }
];

export interface BlogPost {
  slug: string;
  title: string;
  desc: string;
  content: string;
  date: string;
  lastUpdated?: string;
  readTime: string;
  image: string;
  category: string;
  author: string;
  isFeatured?: boolean;
}

export const blogs: BlogPost[] = [
  {
    slug: 'decarbonizing-massive-structural-frameworks',
    title: 'Decarbonizing Massive Structural Frameworks',
    desc: 'How Maabany is pioneering the use of eco-efficient materials to cut construction carbon loads by 42%.',
    content: `
      <p className="lead">The global construction industry is responsible for nearly 40% of energy-related carbon emissions. At Maabany, we believe that sustainable engineering is no longer an optional luxury—it is an absolute technical imperative.</p>
      
      <h3>Pioneering Carbon-Negative Formulations</h3>
      <p>Historically, reinforced concrete has been the primary contributor to a building's embodied carbon footprint. To tackle this challenge directly, Maabany’s materials science team has partnered with leading research institutes to deploy low-carbon and carbon-negative concrete formulations. By substituting traditional Portland cement with industrial byproducts like fly ash, slag, and silica fume, we have successfully reduced concrete-associated emissions by up to 45% without sacrificing tensile strength or curing times.</p>
      
      <blockquote>
        "Our mission is to achieve structural permanence while leaving the absolute minimum carbon footprint on our planet."
        <span className="author">— Eng. Khalid Al-Faisal, Chief Materials Engineer</span>
      </blockquote>

      <h3>Advanced Structural Optimization</h3>
      <p>Beyond material composition, structural optimization plays a critical role in decarbonization. Utilizing generative design algorithms, our civil engineers can analyze millions of structural configurations to identify the most material-efficient pathways. This approach allows us to reduce the volume of steel and concrete required for large columns, beams, and slabs by up to 15%, lowering both material costs and transport emissions.</p>
      
      <h3>Lifetime Operational Efficiency</h3>
      <p>Embodied carbon is only half the equation. Our decarbonization strategy also targets the operational lifespan of the structure. By integrating high-performance thermal breaks, smart double-skin facades, and automated climate control systems, we ensure that Maabany-engineered developments operate with net-zero ready efficiency from day one.</p>
    `,
    date: '12 July 2026',
    lastUpdated: '14 July 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    category: 'Sustainability',
    author: 'Eng. Khalid Al-Faisal',
    isFeatured: true
  },
  {
    slug: 'integrating-real-time-ai-in-heavy-metrology',
    title: 'Integrating Real-time AI in Heavy Metrology',
    desc: 'Using laser-guided sensory arrays during foundation pours to detect microscopic alignment variations.',
    content: `
      <p className="lead">When constructing skyscrapers exceeding 50 stories, there is absolutely zero margin for error. A variance of even a few millimeters at the foundation level can escalate into significant structural deviations at the crown.</p>
      
      <h3>The Advent of AI-Powered Metrology</h3>
      <p>Traditional survey methods rely on periodic manual checks that occur after significant concrete pours are completed. While highly precise, these audits are retrospective and can lead to costly remediation if variations are discovered. To address this, Maabany has deployed a live, AI-guided metrology framework across our high-rise construction portfolio.</p>
      
      <p>Our system utilizes a network of continuous laser-scanner units and digital inclinometers mounted to active formworks. These sensors stream high-frequency spatial coordinate data back to an on-site computer vision model, which continuously compares the physical build against the structural BIM (Building Information Model) digital twin.</p>
      
      <blockquote>
        "By analyzing concrete flow and curing expansion in real-time, our AI systems identify microscopic alignment variations before the concrete even sets."
        <span className="author">— Sarah Lindqvist, Operations Lead</span>
      </blockquote>

      <h3>Corrective Automation and Precision Pours</h3>
      <p>When the system detects a micro-deviation due to wind loads, temperature changes, or concrete curing shrinkage, it alerts the pouring crew and offers immediate structural adjustments. This real-time feedback loop ensures that heavy columns are aligned with sub-millimeter precision, maximizing structural safety and speeding up the overall erection timeline by 18%.</p>
      
      <h3>Future Applications</h3>
      <p>Maabany is currently expanding this metrology framework to incorporate aerial drone mapping. These autonomous drones will perform daily high-resolution photogrammetric sweeps of the project site, feeding visual progress directly into our neural networks to automatically verify build quality and flag potential discrepancies.</p>
    `,
    date: '10 July 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80',
    category: 'Technology',
    author: 'Sarah Lindqvist'
  },
  {
    slug: 'the-future-of-hybrid-wood-steel-skyscraper-design',
    title: 'The Future of Hybrid Wood-Steel Skyscraper design',
    desc: 'Reviewing recent safety and structural stress evaluations of our Riyadh structural towers.',
    content: `
      <p className="lead">Skyscrapers have long been defined by steel and concrete. However, a new architectural revolution is underway: mass timber hybrid structures that combine the organic beauty of wood with the rigid stability of structural steel.</p>
      
      <h3>Why Hybrid Mass Timber?</h3>
      <p>Mass timber products, such as Cross-Laminated Timber (CLT) and Glued Laminated Timber (Glulam), are engineered wood panels that offer exceptional strength-to-weight ratios. When paired strategically with a structural steel skeleton, mass timber can support high-load high-rises while sequestering carbon inside the very fabric of the building.</p>
      
      <p>At Maabany, we have conducted rigorous stress and thermal simulations for our upcoming hybrid towers. The results are remarkable: hybrid wood-steel buildings can weigh up to 30% less than their traditional concrete counterparts, significantly reducing foundation load and excavation costs.</p>

      <h3>Rigorous Safety and Fire Testing</h3>
      <p>One of the most frequent questions regarding wood skyscrapers is fire safety. Contrary to popular belief, mass timber behaves highly predictably in fire conditions. When exposed to extreme temperatures, the outer layer of engineered wood chars, forming a natural protective barrier that insulates the inner structural core. Our dynamic laboratory tests have shown that these panels maintain their structural integrity for over 120 minutes under intense heat, comfortably exceeding standard municipal safety requirements.</p>

      <blockquote>
        "The steel core provides core lateral and seismic resistance, while the timber floorplates offer exceptional acoustic damping and natural thermal insulation."
        <span className="author">— Dr. Ameena Al-Jamil, Principal Structural Estimator</span>
      </blockquote>

      <h3>Creating Healthier Internal Spaces</h3>
      <p>Beyond structural and environmental benefits, wood skyscrapers also enhance human well-being. Exposed timber ceilings and columns introduce a warm, biophilic aesthetic that has been scientifically proven to reduce occupant stress, lower heart rates, and boost productivity in commercial office environments.</p>
    `,
    date: '08 July 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    category: 'Architecture',
    author: 'Dr. Ameena Al-Jamil'
  },
  {
    slug: 'innovative-mep-practices-for-hospital-ventilation',
    title: 'Innovative MEP Practices for Hospital Ventilation',
    desc: 'How advanced HVAC design controls air contaminants and prevents cross-infection in medical projects.',
    content: `
      <p className="lead">Modern hospital infrastructure demands a level of mechanical, electrical, and plumbing precision that far exceeds standard commercial developments. Chief among these is the ventilation system, which acts as a primary defense against airborne pathogens.</p>
      
      <h3>The Challenge of Air Contaminant Isolation</h3>
      <p>Inside a major healthcare facility, multiple unique micro-climates must coexist. Emergency wards, isolation units, operating theaters, and administrative offices each require specific pressure gradients, air changes, and filtration parameters. Managing these requirements requires a highly intelligent, dynamic HVAC network.</p>
      
      <p>Maabany's MEP team utilizes advanced Computational Fluid Dynamics (CFD) modeling to simulate air currents, heat transfer, and particulate dispersion before a single duct is installed. By configuring laminar flow ceilings in operating suites, we ensure that clean, filtered air descends smoothly over the surgical site, sweeping potential contaminants away from the patient.</p>

      <blockquote>
        "In healthcare MEP, air pressure is a physical barrier. By maintaining precise negative and positive pressure zones, we contain infectious particles."
        <span className="author">— Eng. Hisham Al-Kadi, Lead HVAC Designer</span>
      </blockquote>

      <h3>Energy Recovery and Smart Automation</h3>
      <p>Hospitals run 24/7/365, consuming substantial operational energy. To optimize performance, we integrate energy recovery ventilators (ERVs) that pre-condition incoming fresh air using heat and humidity from exhausted air, lowering energy expenditure by up to 28%. Combined with smart VAV (Variable Air Volume) boxes monitored by smart building management systems, the HVAC network dynamically scales based on real-time room occupancy and ambient outdoor conditions.</p>
    `,
    date: '30 June 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80',
    category: 'MEP Engineering',
    author: 'Eng. Hisham Al-Kadi'
  },
  {
    slug: 'sustainable-concrete-formulas-in-gulf-megaprojects',
    title: 'Sustainable Concrete Formulas in Gulf Megaprojects',
    desc: 'Adapting eco-concrete properties for extreme desert heat and highly saline soil conditions.',
    content: `
      <p className="lead">The Arabian Gulf presents one of the most hostile environments in the world for concrete structures. Extreme summer temperatures, high humidity, and highly saline soils can severely accelerate reinforcement corrosion and structural degradation.</p>
      
      <h3>Solving the Durability Equation in Desert Soil</h3>
      <p>At Maabany, our civil engineers have formulated custom sustainable concrete recipes designed specifically to withstand these challenges. By incorporating silica fume and Ground Granulated Blast-furnace Slag (GGBS), we create highly dense concrete structures with exceptionally low permeability, blocking the ingress of aggressive chloride and sulfate ions found in coastal desert soils.</p>
      
      <p>To cope with high ambient temperatures during summer pours, we integrate liquid nitrogen cooling systems directly into the concrete batching plants. This maintains the temperature of the wet concrete below 25°C during transit and placement, preventing thermal cracking and securing structural integrity over centuries.</p>
      
      <h3>A Double Win: Sustainability and Longevity</h3>
      <p>By replacing traditional cement binders with industrial recycled byproducts, these advanced formulas not only increase structural life by up to 120 years but also reduce the carbon footprint of our concrete works by 40%. It is a testament to how modern materials science can harmonize structural performance with environmental stewardship.</p>
    `,
    date: '24 June 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    category: 'Sustainability',
    author: 'Eng. Khalid Al-Faisal'
  },
  {
    slug: 'bim-3d-modeling-maximizing-pre-construction-efficiency',
    title: 'BIM 3D Modeling: Maximizing Pre-Construction Efficiency',
    desc: 'Detecting physical system clashes digitally before construction crews step foot on site.',
    content: `
      <p className="lead">In high-scale construction, resolving clashes in the field is incredibly expensive. Building Information Modeling (BIM) allows us to build the entire project virtually first, ensuring a seamless translation from blueprint to physical reality.</p>
      
      <h3>Eliminating Spatial Interference</h3>
      <p>Imagine a massive HVAC duct running directly through a structural steel beam. In the past, such interferences were often discovered only during active installations, forcing emergency re-routing, costly material waste, and weeks of project delays.</p>
      
      <p>Maabany's unified BIM 3D modeling platform coordinates architectural, structural, and MEP designs in a single, high-fidelity spatial model. Our automated clash detection software scans the entire model, identifying and flagging any spatial conflicts within centimeters. By resolving these issues virtually during the design phase, we prevent field re-work and save our clients millions in unexpected contingencies.</p>
      
      <blockquote>
        "A hour of digital coordination during pre-construction saves fifty hours of heavy structural re-work on the construction site."
        <span className="author">— Marcus Thorne, Principal Director</span>
      </blockquote>

      <h3>Facilitating Prefabrication and Assembly</h3>
      <p>Because our BIM models represent a hyper-accurate, fully coordinated digital replica of the building, we can confidently prefabricate complex MEP assemblies and structural modules off-site. These pre-assembled components are delivered directly to the project site just-in-time, allowing our construction crews to install them with Lego-like efficiency, decreasing on-site waste by 35% and accelerating project delivery.</p>
    `,
    date: '15 June 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    category: 'Technology',
    author: 'Marcus Thorne'
  },
  {
    slug: 'kinetic-wind-harvesting-facades-a-new-era-of-architecture',
    title: 'Kinetic Wind-Harvesting Facades: A New Era',
    desc: 'Reviewing recent safety and structural stress evaluations of our Riyadh structural towers.',
    content: `
      <p className="lead">Modern buildings should do more than just consume energy—they should actively produce it. Maabany’s structural design team is pioneering the integration of kinetic facades that harvest ambient wind energy.</p>
      
      <h3>Unleashing the Kinetic Facade</h3>
      <p>Standard architectural cladding acts as a passive shield against the elements. Kinetic facades, however, feature moving elements that respond dynamically to wind, sunlight, or thermal cycles. For our Riyadh landmarks, we have designed a facade comprised of lightweight, aerodynamic aluminum sails integrated with mini wind-harvesting micro-turbines.</p>
      
      <p>As the desert wind sweeps past the building, the kinetic sails pivot gracefully to channel wind directly into the micro-turbines, generating clean supplementary power while simultaneously dispersing heavy wind forces that would otherwise strain the building's structural core.</p>

      <h3>Mitigating Seismic and Aerodynamic Loads</h3>
      <p>High-rises must withstand enormous lateral forces from high-altitude winds. By integrating kinetic energy-dissipating sails, we decrease the building's overall drag coefficient by 22%, significantly reducing core lateral swaying. This innovative design allows us to reduce structural steel reinforcement in the building’s core, lowering structural costs without compromising safety.</p>
    `,
    date: '08 June 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=800&q=80',
    category: 'Architecture',
    author: 'Dr. Ameena Al-Jamil'
  },
  {
    slug: 'seismic-resilience-in-high-rise-foundations',
    title: 'Seismic Resilience in High-Rise Foundations',
    desc: 'How soil-structure interaction analysis keeps structures secure during seismic activity.',
    content: `
      <p className="lead">Seismic safety starts below ground. At Maabany, we design foundation systems that decouple buildings from seismic ground motion, guaranteeing life-safety compliance under severe earthquake scenarios.</p>
      
      <h3>The Science of Soil-Structure Interaction (SSI)</h3>
      <p>An earthquake does not simply shake a static object; it triggers a complex physical dialogue between the shifting soil and the massive concrete foundation. Our geotechnical and structural teams perform rigorous three-dimensional Soil-Structure Interaction (SSI) analysis to model how seismic waves propagate through unique local soil profiles and influence high-rise basements.</p>
      
      <p>To mitigate these forces, Maabany incorporates advanced base isolation systems. Large elastomeric bearings—composed of alternating layers of rubber and high-strength steel plates—are installed between the building's substructure and superstructure. During an earthquake, these bearings deform laterally, absorbing the ground's kinetic energy and preventing up to 85% of lateral forces from entering the active occupable spaces.</p>
      
      <h3>Continuous Seismic Monitoring</h3>
      <p>Every base-isolated foundation is fitted with a permanent network of high-sensitivity accelerometers. These sensors continuously stream vibrational data to our digital operations dashboard, allowing our facility management team to instantly assess structural health and structural displacements during any seismic event, securing absolute peace of mind for building occupants.</p>
    `,
    date: '01 June 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    category: 'Civil Engineering',
    author: 'Eng. Khalid Al-Faisal'
  },
  {
    slug: 'smart-building-connectivity-next-gen-light-current',
    title: 'Smart Building Connectivity: Next-Gen Light Current Systems',
    desc: 'How fiber-optic backbones and IoT sensors create intelligent, responsive interior workspaces.',
    content: `
      <p className="lead">A modern commercial building is more than just columns, glass, and ducts. It possesses a digital nervous system: low-current systems that control everything from biometric security to energy conservation.</p>
      
      <h3>The Fiber-Optic Backbone of the Future</h3>
      <p>Standard commercial layouts utilize fragmented cabling networks for telecommunications, access control, and CCTV. This division creates information silos and complicates building upgrades. Maabany’s low-current solutions introduce a single, high-capacity, GPON (Gigabit Passive Optical Network) fiber-optic backbone.</p>
      
      <p>This optical network supports high-definition IP cameras, smart door access controllers, Wi-Fi 7 access points, and thousands of ambient environmental sensors in a single, high-speed, secure system. This integrated approach reduces cable volumes by 40% and lowers building energy consumption.</p>

      <h3>Empowering Biometric Security and Automation</h3>
      <p>By connecting low-current building systems with machine learning algorithms, we create spaces that anticipate occupant needs. Facial-recognition security allows seamless, touchless entry from the parking structure directly to office floors. Meanwhile, smart desk occupancy sensors dynamically coordinate lighting and temperature zones based on local density, reducing building utility expenditures by up to 30%.</p>
    `,
    date: '24 May 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    category: 'Light Current',
    author: 'Eng. Hisham Al-Kadi'
  },
  {
    slug: 'effective-preventative-facility-maintenance-strategies',
    title: 'Effective Preventative Facility Maintenance',
    desc: 'Transitioning from reactive building repairs to proactive, data-driven system management.',
    content: `
      <p className="lead">The true cost of a building is not its construction budget; it is its decades-long operational life. Transitioning from reactive fixes to proactive maintenance is key to protecting your capital investment.</p>
      
      <h3>The High Cost of Reactive Repairs</h3>
      <p>Waiting for a major chiller plant to fail in the middle of summer before calling a technician is incredibly disruptive and expensive. Emergency repairs, tenant compensation, and accelerated component degradation can cost up to four times more than standard planned maintenance.</p>
      
      <p>Maabany’s Facility Management division establishes a rigorous preventative schedule from day one. Utilizing predictive sensor diagnostics integrated with our building management systems, we monitor pump vibration levels, fan bearing temperatures, and hydraulic pressures in real-time. By applying machine learning models to this telemetry, we can predict mechanical failures weeks before they occur, allowing our engineering crews to perform maintenance during off-peak hours with zero tenant disruption.</p>
      
      <h3>Maximizing Capital Efficiency</h3>
      <p>This data-driven preventative approach extends the useful lifespan of heavy building machinery by up to 45%, deferring expensive capital replacements and securing maximum operational efficiency. At Maabany, we ensure your building remains a high-performance asset over its entire lifecycle.</p>
    `,
    date: '15 May 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
    category: 'Facility Management',
    author: 'Sarah Lindqvist'
  },
  {
    slug: 'navigating-coastal-high-highway-geotechnical-challenges',
    title: 'Navigating Coastal Highway Geotechnical Challenges',
    desc: 'Deploying high-resilience marine piles and geo-synthetics in high-saline coastal zones.',
    content: `
      <p className="lead">Constructing high-speed highway arteries along coastal zones requires mastering extreme geotechnical challenges. Saturated sandy soils, high water tables, and high salt concentrations demand innovative piling engineering.</p>
      
      <h3>Securing Structural Stability on Marine Soil</h3>
      <p>To support high-load bridge viaducts and heavy asphalt pavements on marine sands, traditional foundations are insufficient. Our geotechnical team designs highly specialized foundation pile designs that penetrate deep into stable bedrock beneath the ocean floor.</p>
      
      <p>These marine piles are cast on-site using sulfate-resistant concrete recipes and polymer-coated steel reinforcement, forming an impervious barrier against saltwater corrosion. To prevent coastal soil erosion and subsidence beneath the main highway pavement, we deploy multiple layers of high-strength geotextile sheets, creating a stable, reinforced soil matrix that secures high-speed transit for generations.</p>
    `,
    date: '08 May 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=800&q=80',
    category: 'Civil Engineering',
    author: 'Eng. Khalid Al-Faisal'
  },
  {
    slug: 'robotic-giga-plants-industrial-construction-reinvented',
    title: 'Robotic Giga-Plants: Industrial Construction',
    desc: 'Constructing specialized manufacturing centers featuring deep vibration-isolated foundations.',
    content: `
      <p className="lead">Modern gigafactories operate at a level of spatial precision that seems straight out of science fiction. Constructing these advanced industrial facilities demands an entirely new standard of structural engineering.</p>
      
      <h3>The Challenge of Micro-Vibration Isolation</h3>
      <p>Inside an advanced robotic manufacturing or semiconductor facility, massive robotic arms and high-speed CNC machinery operate alongside nanometer-scale inspection lasers. Even a microscopic tremor from an adjacent ventilation fan or nearby highway traffic can disrupt this precision machinery, resulting in costly production defects.</p>
      
      <p>Maabany's industrial design team solves this by engineering massive, decoupled, vibration-isolated concrete foundations. These foundation slabs sit upon layers of high-density damping elastomers and concrete pile arrays, shielding the sensitive manufacturing zones from any surrounding vibrations.</p>
      
      <h3>Integrating Heavy Electrical and Process Utilities</h3>
      <p>Industrial gigafactories consume enormous amounts of power, water, and specialized gases. Our unified MEP design integrates deep utility subterranean tunnels directly into the structural layout, ensuring safe, redundant distribution of high-voltage cabling, compressed air, and water lines with easy maintenance access, maximizing production uptime for our enterprise partners.</p>
    `,
    date: '01 May 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    category: 'Industrial',
    author: 'Sarah Lindqvist'
  }
];

