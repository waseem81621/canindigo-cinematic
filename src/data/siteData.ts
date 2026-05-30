// ============================================================
// CANINDIGO OMAN — CENTRAL CONTENT FILE
// Edit this file to change ANY content on the website.
// All components import from here.
// ============================================================

// ─── CONTACT LINKS (centralized) ───
// wa.me format fails to resolve on some Oman mobile carriers
// (DNS_PROBE_FINISHED_NXDOMAIN), so we use the api.whatsapp.com
// /send/?phone= format which works reliably across carriers.
export const whatsappHref = "https://api.whatsapp.com/send/?phone=96898540055";

// ─── NAVIGATION ───
export const navLinks = [
  { label: "ICT", href: "/#ict" },
  { label: "Interiors", href: "/interiors" },
  { label: "Automotive", href: "/automotive" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

// ─── HERO ───
// 2026-05-26 (Phase 2.1): Demoted alliteration to eyebrow, replaced headline
// with outcome-led copy that puts the value prop in the first 2 seconds.
// Dropped secondary CTA to focus the conversion path.
export const heroContent = {
  eyebrow: "Infrastructure. Intelligence. Indigo.",
  headline: ["Enterprise IT trusted by", "Oman's most critical", "operations."],
  subheadline:
    "Managed infrastructure, cybersecurity, and digital transformation — delivered with Canadian discipline and on-the-ground Omani partnership.",
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

// ─── HERO TRUST BAR ───
// Named enterprise clients shown under the hero CTA. Trimmed to Shell +
// Omantel only — Bank Dhofar, Royal Flight, and Oman Broadband are
// delivered under the Omantel contract, so listing them separately would
// double-count. They still appear as their own case studies further down.
export const heroClients = [
  { name: "Shell", logo: "/images/Shell-Logo.png" },
  { name: "Omantel", logo: "/images/Omantel_Logo.png" },
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
      "Oracle Cloud Infrastructure (OCI) deployment",
      "Disaster recovery planning",
    ],
    image: "/images/service-infra.jpg",
    accent: "var(--color-indigo-mid)",
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
  },
];

// ─── SERVICES (DETAILED) ───
// `image` is rendered inside the CardDeckSpread component. These are
// local photos in /public/images/services/. To swap any one, drop a
// new image into that folder and update the path here.
export const detailedServices = [
  {
    icon: "Wifi",
    title: "Managed Wi-Fi",
    tagline: "Seamless connectivity for stadiums, palaces, and oil fields.",
    clients: "Royal Flight — Salalah & Sohar",
    image: "/images/services/wifi.jpg",
  },
  {
    icon: "Lock",
    title: "Security Operations Center",
    tagline: "Cloud security and compliance management for enterprise banking clients.",
    clients: "Bank Dhofar",
    image: "/images/services/soc.jpg",
  },
  {
    icon: "Cloud",
    title: "Cloud Architecture",
    tagline: "Scalable, secure cloud environments built for Omani compliance.",
    clients: "Shell Oman, Omantel",
    image: "/images/services/cloud.jpg",
  },
  {
    icon: "BarChart3",
    title: "IT Strategy Consulting",
    tagline: "Technology roadmaps aligned with your five-year business goals.",
    clients: "Riyada SME portfolio companies",
    image: "/images/services/strategy.jpg",
  },
  {
    icon: "Globe",
    title: "Offshore Resources",
    tagline: "Extended engineering capacity from Canada and beyond. Certified talent on-demand.",
    clients: "Available across all enterprise tiers",
    image: "/images/services/offshore.jpg",
  },
  {
    icon: "Database",
    title: "ERP Development",
    tagline: "Custom ERP builds for finance, inventory, procurement, and operations — from scoping to go-live.",
    clients: "See ERP under Boutique Apps",
    image: "/images/services/erp.jpg",
  },
  {
    icon: "HardDrive",
    title: "In-house Data Centre",
    tagline: "On-premises server infrastructure at our Muscat facility, currently hosting enterprise asset management and ticketing systems for oil & gas clients.",
    clients: "Oil & gas enterprise",
    image: "/images/services/datacenter.jpg",
  },
  {
    icon: "Package",
    title: "Asset Management",
    tagline: "Track and govern every device, license, and contract across your estate.",
    clients: "Available across all enterprise tiers",
    image: "/images/services/assets.jpg",
  },
  {
    icon: "LifeBuoy",
    title: "Ticketing System",
    tagline: "Service-desk platform deployment and managed support operations.",
    clients: "Available across all enterprise tiers",
    image: "/images/services/ticketing.jpg",
  },
];

// ─── BOUTIQUE APPS ───
// `image` is the card background screenshot shown in the BoutiqueApps
// CardDeck. Set to null for any app without a screenshot — the card will
// fall back to the indigo brand gradient (used for the Coming Soon entry).
export const boutiqueApps = [
  {
    id: "hr",
    name: "HR Management",
    subtitle: "Human Resources",
    description:
      "End-to-end employee lifecycle management — recruitment, onboarding, payroll, and performance tracking for enterprise teams.",
    icon: "Users",
    href: "https://web-production-4310c.up.railway.app/",
    accent: "var(--color-indigo-mid)",
    span: "large" as const,
    comingSoon: false as const,
    image: "/images/apps/hr.jpg" as string | null,
  },
  {
    id: "erp",
    name: "ERP",
    subtitle: "Enterprise Resource Planning",
    description:
      "Unified finance, inventory, procurement, and operations in one intelligent platform.",
    icon: "Building2",
    href: "https://ci-aamt-erp-production.up.railway.app/dashboard",
    accent: "var(--color-indigo-mid)",
    span: "normal" as const,
    comingSoon: false as const,
    image: "/images/apps/erp.jpg" as string | null,
  },
  {
    id: "pms",
    name: "Property Management",
    subtitle: "Project Management",
    description:
      "Agile project tracking, resource allocation, and milestone dashboards for complex deliveries.",
    icon: "ClipboardList",
    href: "https://claude-pms-kahraman.vercel.app/properties",
    accent: "var(--color-indigo-mid)",
    span: "normal" as const,
    comingSoon: false as const,
    image: "/images/apps/pms.jpg" as string | null,
  },
  {
    id: "zamtech",
    name: "SME Business Suite",
    subtitle: "Field Operations",
    description:
      "Real-time field service management with IoT integration and predictive maintenance.",
    icon: "Zap",
    href: "https://gen-lang-client-0657594718.web.app/",
    accent: "var(--color-indigo-mid)",
    span: "normal" as const,
    comingSoon: false as const,
    image: "/images/apps/sme.jpg" as string | null,
  },
  {
    id: "fleet",
    name: "Staff & Vehicle Tracking",
    subtitle: "Fleet Management",
    description:
      "GPS tracking, route optimization, and vehicle health monitoring across your entire fleet.",
    icon: "Truck",
    href: "https://ci-aamt-staff-apk.vercel.app/",
    accent: "var(--color-indigo-mid)",
    span: "normal" as const,
    comingSoon: false as const,
    image: "/images/apps/fleet.jpg" as string | null,
  },
  {
    id: "vatwps",
    name: "WPS & VAT Suite",
    subtitle: "Compliance Suite",
    description:
      "Automated VAT filing, WPS salary processing, and regulatory reporting aligned with Omani CBO requirements.",
    icon: "Receipt",
    href: "#",
    accent: "var(--color-indigo-mid)",
    span: "wide" as const,
    comingSoon: true as const,
    image: null as string | null,
  },
];

// ─── CASE STUDIES ───
export const caseStudies = [
  {
    client: "Shell Oman",
    category: "IT Systems Support",
    title: "Long-term IT systems management for Shell's retail fuel network.",
    description:
      "IT support for the Hayat fuel retail management system across Shell mobility sites in Oman. 5-year contract.",
    image: "/images/case-shell.jpg",
    accentColor: "var(--color-indigo-mid)",
  },
  {
    client: "Bank Dhofar",
    category: "Cloud Infrastructure",
    title: "Bank-grade security without the friction.",
    description:
      "Cloud infrastructure management and security compliance deployment, delivered via Omantel.",
    image: "/images/case-bank.jpg",
    accentColor: "var(--color-indigo-mid)",
  },
  {
    client: "Omantel",
    category: "Managed IT Services",
    title: "Authorised delivery partner for enterprise ICT.",
    description:
      "Authorized delivery partner for Omantel — executing enterprise ICT projects across banking, aviation, and broadband. Active contracts include Royal Flight (WiFi, Salalah & Sohar) and Oman Broadband (3-year managed services).",
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
    "From Shell's retail fuel network to Omantel-led enterprise delivery, we build and operate infrastructure that organisations trust with their most critical operations.",
  ],
  stats: [
    { value: "3+", label: "Years in Oman" },
    { value: "5", label: "Enterprise Clients" },
    { value: "15–20", label: "Team Members" },
    { value: "OMR 380K+", label: "Active Contracts" },
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
  certifications: ["Riyada SME Registered"],
  team: [
    {
      name: "Leadership Team",
      role: "Canadian + Omani founders",
      detail: "Canadian technical depth with deep Omani market expertise",
    },
    {
      name: "Engineering Team",
      role: "Certified engineers based in Muscat",
      detail: "CCIE, CISSP, AWS Solutions Architect, Azure certifications across the team",
    },
    {
      name: "Operations Team",
      role: "Muscat-based service delivery",
      detail: "On-site and remote support with Canadian escalation protocols",
    },
  ],
};

// ─── SHUAA PROGRAM ───
export const shuaaContent = {
  badge: "CanIndigo Initiative",
  headline: "Shuaa Program",
  subheadline:
    "The Digital Pedestal — empowering Omani Gen Z with technology skills for the future.",
  description:
    "Running since 2022 — training Omani Gen Z in cloud infrastructure, cybersecurity, and software development. Entirely free. Registered under Riyada SME, Muscat.",
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
    { icon: "Mail", label: "Email", value: "sales@can-indigo.com" },
    { icon: "Phone", label: "Phone", value: "+968 98540055" },
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
      { name: "email", label: "Email", placeholder: "your@email.com", type: "email" },
      { name: "phone", label: "Phone", placeholder: "+968 XXXX XXXX", type: "tel" },
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
    privacyNote:
      "Your information is kept strictly confidential. We respond via email or WhatsApp within one business day.",
    successTitle: "Thank you.",
    successMessage:
      "We've received your enquiry and will be in touch shortly via email or WhatsApp.",
    errorTitle: "Something went wrong.",
    errorMessage:
      "Please try again, or reach us directly at sales@can-indigo.com or +968 98540055.",
  },
};

// ─── FOOTER (Ft5 Statement) ───
export const footerContent = {
  statement: "Canadian precision. Omani partnership.",
  companies: [
    "Abu Ayat Modern Trad (A Riyada SME)",
    "Amber Radiance",
  ],
  contact: {
    address: "Bait Al Falaj St, PC 112, Muscat, Sultanate of Oman",
    email: "sales@can-indigo.com",
    phone: "+968 98540055",
    whatsappHref,
  },
  copyright: `© ${new Date().getFullYear()} CanIndigo Oman. All rights reserved.`,
  registration: "Riyada SME Registered",
};

// ─── PRELOADER ───
export const preloaderContent = {
  logoText: "CanIndigo",
  tagline: "Loading experience",
};
