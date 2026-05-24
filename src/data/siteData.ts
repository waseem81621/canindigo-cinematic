// ============================================================
// CANINDIGO OMAN — CENTRAL CONTENT FILE
// Edit this file to change ANY content on the website.
// All components import from here.
// ============================================================

// ─── NAVIGATION ───
export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

// ─── HERO ───
export const heroContent = {
  eyebrow: "Enterprise Technology Partner",
  headline: ["Infrastructure.", "Intelligence.", "Indigo."],
  subheadline:
    "Managed IT & cybersecurity for Oman's most demanding enterprises. Canadian precision, Omani partnership.",
  ctaPrimary: "Request Consultation",
  ctaSecondary: "Explore Services",
};

// ─── BRAND ASSETS ───
export const brand = {
  logo: "/images/CI_AAMT_New_logo-removebg-preview.png",
  name: "CanIndigo",
};

// ─── PARTNERS ───
export const partners = [
  { name: "Omantel", logo: "/images/Omantel_Logo.png" },
  { name: "Shell", logo: "/images/Shell-Logo.png" },
  { name: "Artelia", logo: "/images/logo_ARTELIA_Couleur.png" },
];

// ─── SERVICES (MAIN PILLARS) ───
export const mainServices = [
  {
    icon: "Server",
    title: "Managed Infrastructure",
    description:
      "End-to-end infrastructure management — from server provisioning to 24/7 monitoring and proactive maintenance across your entire technology stack.",
    features: [
      "Server & network monitoring",
      "Cloud migration & hybrid setups",
      "Disaster recovery planning",
    ],
    image: "/images/service-infra.jpg",
    accent: "var(--color-indigo-mid)",
    stat: "99.99%",
    statLabel: "Average uptime",
  },
  {
    icon: "Shield",
    title: "Cybersecurity",
    description:
      "Enterprise-grade security frameworks protecting your critical assets with threat detection, compliance management, and incident response.",
    features: [
      "Threat detection & response",
      "Compliance & risk assessment",
      "Security awareness training",
    ],
    image: "/images/service-security.jpg",
    accent: "var(--color-indigo-mid)",
    stat: "Zero",
    statLabel: "Breaches in 3 years",
  },
  {
    icon: "Cpu",
    title: "Digital Transformation",
    description:
      "Strategic technology roadmaps that modernize operations, automate workflows, and position your organization for sustained competitive advantage.",
    features: [
      "Process automation",
      "Data analytics & BI",
      "Legacy system modernization",
    ],
    image: "/images/service-transform.jpg",
    accent: "var(--color-indigo-mid)",
    stat: "40%",
    statLabel: "Average efficiency gain",
  },
];

// ─── SERVICES (DETAILED) ───
export const detailedServices = [
  {
    icon: "Wifi",
    title: "Managed Wi-Fi",
    tagline: "Seamless connectivity for stadiums, palaces, and oil fields.",
    clients: "Oman Botanical Gardens, Salalah Royal Flight",
  },
  {
    icon: "Lock",
    title: "Security Operations Center",
    tagline: "24/7 eyes on your perimeter. Real-time threat neutralization.",
    clients: "Bank Dhofar, Ministry of Energy",
  },
  {
    icon: "Cloud",
    title: "Cloud Architecture",
    tagline: "Scalable, secure cloud environments built for Omani compliance.",
    clients: "Shell Oman, Omantel",
  },
  {
    icon: "BarChart3",
    title: "IT Strategy Consulting",
    tagline: "Technology roadmaps aligned with your five-year business goals.",
    clients: "Riyada SME portfolio companies",
  },
  {
    icon: "Globe",
    title: "Offshore Resources",
    tagline: "Extended engineering capacity from Canada and beyond. Certified talent on-demand.",
    clients: "Available across all enterprise tiers",
  },
  {
    icon: "Database",
    title: "ERP Development",
    tagline: "Custom ERP builds for finance, inventory, procurement, and operations — from scoping to go-live.",
    clients: "See CI AAMT ERP under Boutique Apps",
  },
  {
    icon: "HardDrive",
    title: "In-house Data Centre",
    tagline: "Sovereign-data hosting in our Muscat facility. Built for Omani compliance and uptime.",
    clients: "Tier-grade enterprise hosting",
  },
  {
    icon: "Package",
    title: "Asset Management",
    tagline: "Track and govern every device, license, and contract across your estate.",
    clients: "Available across all enterprise tiers",
  },
  {
    icon: "LifeBuoy",
    title: "Ticketing System",
    tagline: "Service-desk platform deployment and managed support operations.",
    clients: "Available across all enterprise tiers",
  },
];

// ─── BOUTIQUE APPS ───
export const boutiqueApps = [
  {
    id: "hr",
    name: "Asha HR",
    subtitle: "Human Resources",
    description:
      "End-to-end employee lifecycle management — recruitment, onboarding, payroll, and performance tracking for enterprise teams.",
    icon: "Users",
    href: "https://web-production-4310c.up.railway.app/",
    accent: "var(--color-indigo-mid)",
    span: "large" as const,
    comingSoon: false as const,
  },
  {
    id: "erp",
    name: "CI AAMT ERP",
    subtitle: "Enterprise Resource Planning",
    description:
      "Unified finance, inventory, procurement, and operations in one intelligent platform.",
    icon: "Building2",
    href: "https://ci-aamt-erp-production.up.railway.app/dashboard",
    accent: "var(--color-indigo-mid)",
    span: "normal" as const,
    comingSoon: false as const,
  },
  {
    id: "pms",
    name: "Kahraman PMS",
    subtitle: "Project Management",
    description:
      "Agile project tracking, resource allocation, and milestone dashboards for complex deliveries.",
    icon: "ClipboardList",
    href: "https://claude-pms-kahraman.vercel.app/properties",
    accent: "var(--color-indigo-mid)",
    span: "normal" as const,
    comingSoon: false as const,
  },
  {
    id: "zamtech",
    name: "ZAM-TECH Business Suite",
    subtitle: "Field Operations",
    description:
      "Real-time field service management with IoT integration and predictive maintenance.",
    icon: "Zap",
    href: "https://gen-lang-client-0657594718.web.app/",
    accent: "var(--color-indigo-mid)",
    span: "normal" as const,
    comingSoon: false as const,
  },
  {
    id: "fleet",
    name: "CanIndigo Fleet App",
    subtitle: "Fleet Management",
    description:
      "GPS tracking, route optimization, and vehicle health monitoring across your entire fleet.",
    icon: "Truck",
    href: "https://ci-aamt-staff-apk.vercel.app/",
    accent: "var(--color-indigo-mid)",
    span: "normal" as const,
    comingSoon: false as const,
  },
  {
    id: "vatwps",
    name: "VAT + WPS",
    subtitle: "Compliance Suite",
    description:
      "Automated VAT filing, WPS salary processing, and regulatory reporting aligned with Omani CBO requirements.",
    icon: "Receipt",
    href: "#",
    accent: "var(--color-indigo-mid)",
    span: "wide" as const,
    comingSoon: true as const,
  },
];

// ─── CASE STUDIES ───
export const caseStudies = [
  {
    client: "Shell Oman",
    category: "Managed Wi-Fi",
    title: "Connecting 47 sites with zero downtime.",
    description:
      "Enterprise-grade wireless infrastructure across Shell Oman's retail network, operational facilities, and corporate offices.",
    challenge:
      "Shell Oman required a unified wireless network across 47 geographically dispersed sites with varying terrain and infrastructure conditions.",
    solution:
      "Designed and deployed a centrally managed Wi-Fi architecture with redundant backhaul, automated failover, and 24/7 NOC monitoring.",
    result:
      "Achieved 99.99% uptime across all locations with seamless roaming and centralized policy management.",
    metric: "99.99%",
    metricLabel: "Uptime across 47 sites",
    image: "/images/case-shell.jpg",
    accentColor: "var(--color-indigo-mid)",
  },
  {
    client: "Bank Dhofar",
    category: "Cybersecurity",
    title: "Bank-grade security without the friction.",
    description:
      "Comprehensive security operations center implementation protecting critical financial infrastructure.",
    challenge:
      "Bank Dhofar needed to strengthen its cybersecurity posture while maintaining seamless customer experience across digital banking channels.",
    solution:
      "Implemented a 24/7 SOC with AI-driven threat detection, automated incident response, and compliance-aligned security frameworks.",
    result:
      "Reduced mean time to detect threats by 87% and achieved full CBO compliance certification.",
    metric: "87%",
    metricLabel: "Faster threat detection",
    image: "/images/case-bank.jpg",
    accentColor: "var(--color-indigo-mid)",
  },
  {
    client: "Ministry of Energy",
    category: "Digital Transformation",
    title: "Modernizing government infrastructure at scale.",
    description:
      "End-to-end digital transformation of legacy systems for improved operational efficiency and data governance.",
    challenge:
      "The Ministry operated on fragmented legacy systems that hindered data-driven decision making and inter-departmental collaboration.",
    solution:
      "Architected a unified digital platform with modern APIs, cloud-native services, and a centralized data lake.",
    result:
      "Reduced report generation time from weeks to hours and enabled real-time dashboard visibility for leadership.",
    metric: "Weeks → Hours",
    metricLabel: "Report generation time",
    image: "/images/case-ministry.jpg",
    accentColor: "var(--color-indigo-mid)",
  },
  {
    client: "Omantel",
    category: "Managed Infrastructure",
    title: "Supporting the backbone of national connectivity.",
    description:
      "Critical infrastructure support for Oman's leading telecommunications provider.",
    challenge:
      "Omantel needed a reliable partner to manage and maintain complex network infrastructure across the Sultanate.",
    solution:
      "Provided dedicated on-site engineering teams, proactive maintenance schedules, and real-time infrastructure health monitoring.",
    result:
      "Maintained 99.95% infrastructure availability with zero unplanned outages over 18 months.",
    metric: "Zero",
    metricLabel: "Unplanned outages in 18mo",
    image: "/images/case-omantel.jpg",
    accentColor: "var(--color-indigo-mid)",
  },
];

// ─── ABOUT ───
export const aboutContent = {
  headline: "Canadian precision. Omani partnership.",
  paragraphs: [
    "CanIndigo Oman is the local arm of CanIndigo Canada, bringing North American technical standards to the Sultanate's most demanding enterprises. Locally registered as Abu Ayat Modern Trading, we operate as a Riyada SME with full Omani ownership compliance.",
    "Our team combines Canadian engineering discipline with deep understanding of Omani business culture — delivering solutions that work technically and fit institutionally.",
    "From Shell's retail network to the Ministry of Energy's digital backbone, we build infrastructure that organizations trust with their most critical operations.",
  ],
  stats: [
    { value: "8+", label: "Years in Oman" },
    { value: "47", label: "Enterprise Clients" },
    { value: "25+", label: "Certified Engineers" },
    { value: "99.9%", label: "Client Retention" },
  ],
  locations: [
    {
      city: "Muscat, Oman",
      detail: "Headquarters & Network Operations Center",
    },
    {
      city: "Toronto, Canada",
      detail: "Parent company & technical R&D",
    },
  ],
  certifications: [
    "ISO 27001 Certified",
    "Cisco Gold Partner",
    "Microsoft Gold Partner",
    "AWS Advanced Consulting",
    "Fortinet Partner",
    "Riyada SME Registered",
  ],
  team: [
    {
      name: "Leadership Team",
      role: "Combined 40+ years in enterprise IT",
      detail: "Canadian technical depth with deep Omani market expertise",
    },
    {
      name: "Engineering Team",
      role: "25+ certified engineers",
      detail: "CCIE, CISSP, AWS Solutions Architect, Azure certified",
    },
    {
      name: "Operations Team",
      role: "24/7 Network Operations Center",
      detail: "Based in Muscat with Canadian escalation protocols",
    },
  ],
};

// ─── SHUAA PROGRAM ───
export const shuaaContent = {
  badge: "CAN.INDIGO Initiative",
  headline: "Shuaa Program",
  subheadline:
    "The Digital Pedestal — empowering Omani Gen Z with technology skills for the future.",
  description:
    "The Shuaa Program is a CAN.INDIGO initiative under the Riyada SME program, designed to bridge the gap between academic learning and industry-ready technology skills. We provide hands-on training in cloud infrastructure, cybersecurity, and software development — entirely free for Omani youth.",
  stats: [
    { value: "200+", label: "Youth Trained" },
    { value: "12", label: "Partner Organizations" },
    { value: "94%", label: "Placement Rate" },
  ],
  screenImage: "/images/shuaa-screen.jpg",
  ambientImage: "/images/shuaa-ambient.jpg",
  videoUrl: "/videos/ci-shuaa-program.mp4",
  badgeBottom: "Registered under Riyada SME — Muscat, Oman",
};

// ─── CONTACT ───
export const contactContent = {
  headline: "Request a confidential consultation.",
  description:
    "Every engagement begins with understanding. Share your context, and we'll respond within two hours with next steps.",
  info: [
    { icon: "Mail", label: "Email", value: "info@canindigo.om" },
    { icon: "Phone", label: "Phone", value: "+968 24XX XXXX" },
    {
      icon: "Clock",
      label: "Response Time",
      value: "Under 2 hours during business hours",
    },
    { icon: "MapPin", label: "Office", value: "Muscat, Sultanate of Oman" },
  ],
  form: {
    fields: [
      { name: "name", label: "Name", placeholder: "Your full name", type: "text" },
      {
        name: "company",
        label: "Company",
        placeholder: "Organization name",
        type: "text",
      },
    ],
    interests: [
      "Managed Infrastructure",
      "Cybersecurity",
      "Digital Transformation",
      "Managed Wi-Fi",
      "IT Strategy Consulting",
      "General Inquiry",
    ],
    submitLabel: "Submit Request",
    privacyNote: "Your information is kept strictly confidential.",
    successTitle: "Message received.",
    successMessage: "We'll be in touch within two hours.",
  },
};

// ─── FOOTER ───
export const footerContent = {
  companies: ["Abu Ayat Modern Trad (A Riyada SME)", "Amber Radiance"],
  links: [
    {
      title: "Services",
      links: [
        { label: "Managed Infrastructure", href: "#services" },
        { label: "Cybersecurity", href: "#services" },
        { label: "Digital Transformation", href: "#services" },
        { label: "Managed Wi-Fi", href: "#services" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#about" },
        { label: "Case Studies", href: "#case-studies" },
        { label: "Careers", href: "#contact" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Client Portal", href: "#" },
        { label: "SLA Status", href: "#" },
        { label: "Documentation", href: "#" },
        { label: "Privacy Policy", href: "#" },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} CanIndigo Oman. All rights reserved.`,
  registration: "Bait Al Falaj St, PC 112, Muscat, Sultanate of Oman",
};

// ─── NETWORK HEALTH RING ───
export const networkRing = {
  uptime: "99.9",
  label: "Network Uptime",
};

// ─── PRELOADER ───
export const preloaderContent = {
  logoText: "CanIndigo",
  tagline: "Loading experience",
};
