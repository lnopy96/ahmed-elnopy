// Single source of truth for all site text, links and data.
// Components must never hardcode copy. Missing data → 'TODO: ...'.

export interface Link {
  label: string
  href: string
}

export interface NavItem {
  id: string
  label: string
}

export interface Identity {
  name: string
  initials: string
  title: string
  badge: string
  valueProp: string
  email: string
  phones: { label: string; number: string }[]
  linkedin: string
  location: string
  cvUrl: string
  /** Path to a portrait image; initials are shown until one is added. */
  photo?: string
  photoAlt: string
}

export interface Stat {
  value: number
  suffix?: string
  label: string
}

export type FocusIcon = 'power' | 'lightCurrent' | 'office' | 'bim'

export interface FocusArea {
  icon: FocusIcon
  title: string
  description: string
}

export interface Fact {
  label: string
  value: string
}

export interface Project {
  id: number
  title: string
  company: string
  country: 'UAE' | 'KSA' | 'EG'
  sector: string
  description: string
  tags: string[]
  /** Shows a 'Current project' badge. */
  current?: boolean
  /** Cover image; a designed placeholder is shown when missing. */
  image?: string
  /** Owner of the render, shown as a small credit. */
  imageCredit?: string
  link?: string
}

export interface Job {
  company: string
  role: string
  location: string
  start: string
  end: string
  current?: boolean
  bullets: string[]
}

export interface AutomationTool {
  title: string
  problem: string
  tool: string
  timeSaved: string
}

export interface SkillGroup {
  letter: string
  title: string
  skills: string[]
}

export interface Cert {
  title: string
  issuer: string
  date: string
  description?: string
  kind: 'degree' | 'certification'
}

export interface SectionMeta {
  id: string
  number: string
  label: string
  heading: string
}

export interface Seo {
  title: string
  description: string
  ogImage: string
  ogImageAlt: string
  knowsAbout: string[]
}

export interface Content {
  seo: Seo
  identity: Identity
  nav: NavItem[]
  sections: Record<string, SectionMeta>
  stats: Stat[]
  tools: string[]
  about: {
    paragraphs: string[]
    focusAreas: FocusArea[]
    facts: Fact[]
  }
  projects: Project[]
  experience: Job[]
  automation: AutomationTool[]
  skills: SkillGroup[]
  education: Cert[]
  footer: { tagline: string }
  ui: {
    skipLink: string
    hireMe: string
    viewWork: string
    downloadCv: string
    openMenu: string
    closeMenu: string
    primaryNav: string
    homeLink: string
    emailLabel: string
    linkedinLabel: string
    phoneLabel: string
    statsHeading: string
    toolsHeading: string
    filterSector: string
    filterCountry: string
    filterAll: string
    /** {n} = shown, {total} = all */
    showing: string
    noProjects: string
    resetFilters: string
    viewProject: string
    renderCredit: string
    countries: Record<Project['country'], string>
    current: string
    currentProject: string
    themeToLight: string
    themeToDark: string
    problemLabel: string
    solutionLabel: string
    savedLabel: string
    degreeLabel: string
    certLabel: string
    contactIntro: string
    copyEmail: string
    copied: string
    copyFailed: string
    locationLabel: string
    cvLabel: string
    backToTop: string
    rights: string
  }
}

export const content: Content = {
  seo: {
    title: 'Ahmed Gamal Elnopy — Electrical Engineer · MEP & BIM',
    description:
      'Electrical engineer in Abu Dhabi delivering MEP electrical design, BIM coordination and shop drawings across the UAE, Saudi Arabia and Egypt. Revit, Navisworks, Dynamo and C# automation.',
    ogImage: '/og.png',
    ogImageAlt: 'Ahmed Gamal Elnopy — Electrical Engineer, MEP & BIM',
    knowsAbout: ['Electrical design', 'BIM', 'Revit', 'Navisworks', 'Shop drawings', 'Light current systems', 'Revit API'],
  },
  identity: {
    name: 'Ahmed Gamal Elnopy',
    initials: 'AE',
    title: 'Electrical Engineer · MEP & BIM',
    badge: 'Open to opportunities · Abu Dhabi, UAE',
    valueProp:
      'I turn electrical designs into coordinated, buildable BIM models and shop drawings — across the UAE, Saudi Arabia and Egypt.',
    email: 'lnopy67@gmail.com',
    phones: [
      { label: 'UAE', number: '+971 50 180 0351' },
      { label: 'Egypt', number: '+20 109 490 5285' },
    ],
    linkedin: 'https://www.linkedin.com/in/lnopy/',
    location: 'Abu Dhabi, UAE',
    cvUrl: '/cv/Ahmed-Elnopy-CV.pdf',
    photo: '/images/profile.webp',
    photoAlt: 'Ahmed Gamal Elnopy on site in Abu Dhabi, wearing a hard hat and MTEC safety vest',
  },

  nav: [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'automation', label: 'Automation' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ],

  sections: {
    about: { id: 'about', number: '01', label: 'Profile', heading: 'From load schedule to site-ready drawing.' },
    projects: { id: 'projects', number: '02', label: 'Projects', heading: 'Selected work across three countries.' },
    experience: { id: 'experience', number: '03', label: 'Experience', heading: 'Six companies, one discipline.' },
    automation: { id: 'automation', number: '04', label: 'Automation & Tools', heading: 'One click instead of one afternoon.' },
    skills: { id: 'skills', number: '05', label: 'Skills', heading: 'What I bring to a project team.' },
    education: { id: 'education', number: '06', label: 'Education & Certifications', heading: 'Built on engineering, sharpened by BIM.' },
    contact: { id: 'contact', number: '07', label: 'Contact', heading: "Let's build something coordinated." },
  },

  stats: [
    { value: 6, suffix: '+', label: 'Years of experience' },
    { value: 3, label: 'Countries · UAE, KSA, Egypt' },
    { value: 6, label: 'Companies' },
    { value: 10, suffix: '+', label: 'Projects delivered' },
  ],

  tools: [
    'Revit',
    'AutoCAD',
    'Navisworks',
    'ETAP',
    'DIALux evo',
    'Dynamo',
    'C# / Revit API',
    'BIM 360',
    'ACC',
  ],

  about: {
    paragraphs: [
      'I am an electrical engineer with six years in design and technical office roles on commercial, governmental and large entertainment projects in Egypt, Saudi Arabia and the UAE.',
      'My work covers LV/MV power design and light current systems, and turning them into approved shop drawings and submittals. I coordinate MEP models in Revit and Navisworks, and I write Dynamo scripts and C# add-ins to automate repetitive Revit work.',
    ],
    focusAreas: [
      { icon: 'power', title: 'Power & LV/MV', description: 'Load schedules, single-line diagrams and BOQs.' },
      { icon: 'lightCurrent', title: 'Light current', description: 'Fire alarm, data networks, CCTV and sound systems.' },
      { icon: 'office', title: 'Technical office', description: 'Shop drawings, details and material submittals.' },
      { icon: 'bim', title: 'BIM & automation', description: 'Revit, Navisworks coordination, Dynamo and C# add-ins.' },
    ],
    facts: [
      { label: 'Based in', value: 'Abu Dhabi, UAE' },
      { label: 'Current', value: 'MTEC · since Jul 2025' },
      { label: 'Degree', value: 'BSc Electrical Engineering, South Valley University' },
      { label: 'Languages', value: 'Arabic (native), English' },
    ],
  },

  projects: [
    {
      id: 1,
      title: 'Manchester City Yas Residences by Ohana',
      current: true,
      company: 'MTEC',
      country: 'UAE',
      sector: 'Residential',
      description: 'Electrical shop drawings on Yas Island, Abu Dhabi.',
      tags: ['Shop Drawings', 'Lighting', 'Containment'],
      image: '/images/projects/mancity.webp',
      imageCredit: 'Ohana',
    },
    {
      id: 2,
      title: 'Elie Saab Waterfront by Ohana',
      company: 'MTEC',
      country: 'UAE',
      sector: 'Residential',
      description: 'Electrical shop drawings on Al Reem Island, Abu Dhabi.',
      tags: ['Shop Drawings', 'Power', 'Lighting'],
      image: '/images/projects/eliesaab.webp',
      imageCredit: 'Ohana',
    },
    {
      id: 3,
      title: 'Jacob & Co. Beachfront Living by Ohana',
      company: 'MTEC',
      country: 'UAE',
      sector: 'Residential',
      description: 'Electrical shop drawings at Al Jurf, Abu Dhabi.',
      image: '/images/projects/jacobco.webp',
      imageCredit: 'Ohana',
      tags: ['Shop Drawings', 'Power', 'Containment'],
    },
    {
      id: 4,
      title: 'RCU AlUla Schools',
      company: 'EGEC',
      country: 'KSA',
      sector: 'Education',
      description: 'Complete electrical design for Royal Commission for AlUla school projects.',
      tags: ['Full Design', 'Revit', 'BIM'],
    },
    {
      id: 5,
      title: 'MODON Projects',
      company: 'EGEC',
      country: 'KSA',
      sector: 'Industrial',
      description: 'Electrical design packages for the Saudi Authority for Industrial Cities.',
      image: '/images/projects/modon.webp',
      tags: ['Power', 'Lighting', 'LV'],
    },
    {
      id: 6,
      title: 'Madina Entertainment Complex (SEVEN)',
      company: 'Albawani',
      country: 'KSA',
      sector: 'Entertainment',
      description: 'BIM models and construction drawings for an entertainment complex in Madinah.',
      tags: ['BIM Model', 'Construction Dwgs', 'Revit'],
      image: '/images/projects/madina.webp',
      imageCredit: 'SEVEN',
    },
    {
      id: 7,
      title: 'IL-Bosco, New Administrative Capital',
      company: 'Solid Construction',
      country: 'EG',
      sector: 'Residential',
      description: 'Electrical shop drawings for a residential development in the New Capital.',
      tags: ['Shop Drawings', 'Revit', 'RFIs'],
      image: '/images/projects/ilbosco.webp',
      imageCredit: 'Misr Italia',
    },
    {
      id: 8,
      title: 'Odyssia City, Mostakbal City',
      company: 'Solid Construction',
      country: 'EG',
      sector: 'Residential',
      description: 'Electrical shop drawings for a residential community in Mostakbal City.',
      image: '/images/projects/odyssia.webp',
      imageCredit: 'Solid Construction',
      tags: ['Shop Drawings', 'Revit', 'Site Support'],
    },
    {
      id: 9,
      title: 'District 5 – Marakez',
      company: 'Solid Construction',
      country: 'EG',
      sector: 'Mixed-use',
      description: 'Optimized electrical layouts to cut rework during construction.',
      tags: ['Layout Optimization', 'RFIs', 'Shop Drawings'],
      image: '/images/projects/district5.webp',
      imageCredit: 'Marakez',
    },
  ],

  experience: [
    {
      company: 'MTEC',
      role: 'BIM Electrical Technical Office Engineer',
      location: 'Abu Dhabi, UAE',
      start: 'Jul 2025',
      end: 'Present',
      current: true,
      bullets: [
        'Produce shop drawings for power distribution, lighting and cable containment — currently on Manchester City Yas Residences.',
        'Coordinate with consultants and clients to secure design approvals and close technical queries.',
        'Prepare technical submittals, load distribution schedules and compliance reports.',
        'Projects: Manchester City Yas Residences (Yas Island), Elie Saab Waterfront (Al Reem Island) and Jacob & Co. Beachfront Living (Al Jurf) — all by Ohana.',
      ],
    },
    {
      company: 'C&P',
      role: 'BIM Electrical Technical Office Engineer',
      location: 'Cairo, Egypt',
      start: 'May 2025',
      end: 'Jul 2025',
      bullets: [
        'Prepared shop drawings for lighting, mechanical power, small power and light current systems.',
        'Assisted with material submittals and coordinated supplier approvals.',
        'Supported project BOQ preparation.',
      ],
    },
    {
      company: 'EGEC',
      role: 'BIM Electrical Design Engineer',
      location: 'Cairo, Egypt',
      start: 'Jul 2024',
      end: 'May 2025',
      bullets: [
        'Designed complete electrical systems for RCU school projects in AlUla using Revit and BIM standards.',
        'Delivered power, lighting and LV distribution design packages for MODON projects.',
        'Resolved model clashes with mechanical and civil teams in Navisworks.',
      ],
    },
    {
      company: 'Albawani',
      role: 'BIM Electrical Technical Office Engineer',
      location: 'Riyadh, KSA',
      start: 'May 2023',
      end: 'Jul 2024',
      bullets: [
        'Developed BIM models and construction drawings for the Madina Entertainment Complex.',
        'Coordinated with architects and contractors on King Salman Park and AlUla projects.',
        'Conducted quantity take-offs and kept project documentation accurate through design stages.',
      ],
    },
    {
      company: 'Solid Construction',
      role: 'BIM Electrical Technical Office Engineer',
      location: 'Cairo, Egypt',
      start: 'Dec 2021',
      end: 'May 2023',
      bullets: [
        'Produced shop drawings for IL-Bosco (New Capital) and Odyssia City (Mostakbal City).',
        'Optimized electrical layouts for District 5 – Marakez to minimize rework on site.',
        'Issued design revisions and answered RFIs within project timelines.',
      ],
    },
    {
      company: 'Power Tech Co. for Earthing',
      role: 'Electrical Technical Office Engineer',
      location: 'Cairo, Egypt',
      start: 'Dec 2020',
      end: 'Dec 2021',
      bullets: [
        'Prepared tender documents and BOQs for earthing and lightning protection systems.',
        'Produced technical drawings and specifications for earthing installations.',
        'Supported site supervision and answered technical queries during execution.',
      ],
    },
  ],

  automation: [
    {
      title: 'One-click circuiting',
      problem: 'Creating electrical circuits device by device in Revit is slow and error-prone.',
      tool: 'C# Revit add-in that creates circuits for the whole project, or for a selected circuit, in one click.',
      timeSaved: 'Saves about 80% of the task time',
    },
    {
      title: 'One-click view dimensions',
      problem: 'Dimensioning every view by hand takes hours on each drawing set.',
      tool: 'C# Revit add-in that dimensions the active view in one click.',
      timeSaved: 'Saves about 80% of the task time',
    },
  ],

  skills: [
    {
      letter: 'A',
      title: 'BIM & Software',
      skills: ['Revit', 'Navisworks', 'AutoCAD', 'BIM 360 / ACC', 'Dynamo', 'C# / Revit API'],
    },
    {
      letter: 'B',
      title: 'Electrical Design',
      skills: ['Load schedules', 'Single-line diagrams', 'LV/MV distribution', 'ETAP', 'DIALux evo', 'Earthing & lightning protection'],
    },
    {
      letter: 'C',
      title: 'Light Current',
      skills: ['Fire alarm', 'Data networks', 'CCTV', 'Sound systems'],
    },
    {
      letter: 'D',
      title: 'Technical Office',
      skills: ['Shop drawings', 'Submittals', 'BOQ & QTO', 'RFIs', 'Consultant coordination'],
    },
  ],

  education: [
    {
      kind: 'degree',
      title: 'BSc Electrical Engineering',
      issuer: 'South Valley University',
      date: '2015 – 2020',
      description: 'Graduation project: Power System Distribution and Light Current (Excellent).',
    },
    {
      kind: 'certification',
      title: 'Mastering Revit API',
      issuer: 'Elzohry Academy',
      date: '2023',
      description: 'C#, Revit API, element manipulation, discipline automation, UI and deployment.',
    },
    {
      kind: 'certification',
      title: 'MEP BIM Diploma',
      issuer: 'Kaitech Scholarship',
      date: '2021',
      description: 'Revit MEP, clash detection, Dynamo and 4D–7D simulation.',
    },
    {
      kind: 'certification',
      title: 'Power System Distribution',
      issuer: 'JELECOM',
      date: '2020',
      description: 'Lighting design, power distribution, equipment sizing, earthing and low current systems.',
    },
    {
      kind: 'certification',
      title: 'PLC & Automation',
      issuer: 'ATS',
      date: '2020',
    },
  ],

  footer: {
    tagline: 'Electrical design, BIM coordination and automation.',
  },

  ui: {
    skipLink: 'Skip to content',
    hireMe: 'Hire me',
    viewWork: 'View work',
    downloadCv: 'Download CV',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    primaryNav: 'Primary',
    homeLink: 'Back to top',
    emailLabel: 'Email',
    linkedinLabel: 'LinkedIn',
    phoneLabel: 'Phone',
    statsHeading: 'At a glance',
    toolsHeading: 'Tools I work with',
    filterSector: 'Sector',
    filterCountry: 'Country',
    filterAll: 'All',
    showing: 'Showing {n} of {total} projects',
    noProjects: 'No projects match these filters.',
    resetFilters: 'Reset filters',
    viewProject: 'View project',
    renderCredit: 'Render:',
    countries: { UAE: 'UAE', KSA: 'Saudi Arabia', EG: 'Egypt' },
    current: 'Current',
    currentProject: 'Current project',
    themeToLight: 'Switch to light mode',
    themeToDark: 'Switch to dark mode',
    problemLabel: 'Problem',
    solutionLabel: 'Solution',
    savedLabel: 'Time saved',
    degreeLabel: 'Degree',
    certLabel: 'Certification',
    contactIntro:
      'Looking for an electrical engineer who can take a package from design to approved shop drawings? Send me a message — I usually reply within a day.',
    copyEmail: 'Copy email',
    copied: 'Email copied to clipboard',
    copyFailed: 'Could not copy — please select the address manually',
    locationLabel: 'Location',
    cvLabel: 'Curriculum vitae',
    backToTop: 'Back to top',
    rights: 'All rights reserved.',
  },
}
