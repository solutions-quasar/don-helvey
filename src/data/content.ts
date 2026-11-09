import { ServiceItem, ProblemCard, FAQItem, ServiceArea } from '../types';

export const SITE_METADATA = {
  name: "Don Helvey",
  title: "Don Helvey | Mold Remediation & Property Expertise in North Georgia",
  description: "Contact Don Helvey for guidance on mold remediation, moisture concerns and property-related issues in the North Atlanta, Georgia area.",
  phone: "(770) 833-7410",
  rawPhone: "+17708337410",
  email: "helveyd@gmail.com",
  location: "North Atlanta & North Georgia",
  moldTrustUrl: "https://www.moldtrust.com/",
  grecNote: "Approved Continuing Education (CE) Instructor - Georgia Real Estate Commission"
};

export const PROBLEM_CARDS: ProblemCard[] = [
  {
    id: "visible-mold",
    title: "Visible Mold",
    badge: "Surfaces & Walls",
    warningSigns: [
      "Dark spots or staining on baseboards, drywall, or ceilings",
      "Discoloration around vents, windows, or bathroom fixtures",
      "Growth that returns after surface cleaning"
    ],
    explanation: "Surface spotting usually points to a deeper moisture source that needs proper diagnosis before cleanup.",
    recommendation: "A moisture check identifies the cause so it can be fixed properly."
  },
  {
    id: "moisture-water-damage",
    title: "Moisture & Water Damage",
    badge: "Leaks & Intrusion",
    warningSigns: [
      "Cupping hardwood floors, peeling paint, or soft drywall",
      "Dampness after a plumbing, roof, or appliance leak",
      "High indoor humidity or persistent window condensation"
    ],
    explanation: "Trapped water inside walls or subfloors creates ideal conditions for mold growth if not dried thoroughly.",
    recommendation: "Moisture meters pinpoint hidden damp areas before framing is affected."
  },
  {
    id: "crawl-space-concerns",
    title: "Crawl Space Concerns",
    badge: "Foundation & Odors",
    warningSigns: [
      "Musty, earthy smells in ground-floor rooms or when HVAC runs",
      "Damp soil, standing water, or sagging floor insulation",
      "Condensation on ductwork or high crawl space humidity"
    ],
    explanation: "Because crawl space air naturally rises into the home, foundation dampness directly impacts indoor air.",
    recommendation: "Vapor barriers and dehumidification keep the foundation dry year-round."
  }
];

export const PRIMARY_SERVICES: ServiceItem[] = [
  {
    id: "mold-assessment",
    title: "Mold Assessment & Inspection Coordination",
    tagline: "Personal Evaluation",
    description: "Don evaluates your property firsthand, identifies moisture sources with calibrated meters, and coordinates independent lab testing when needed.",
    bulletPoints: [
      "Visual evaluation of crawl spaces, basements, and living areas",
      "Moisture mapping with non-invasive meters",
      "Independent lab air & surface sample coordination"
    ],
    performedBy: "Personal Consultation & Coordination",
    path: "/mold-inspection/",
    iconName: "SearchCheck"
  },
  {
    id: "mold-remediation",
    title: "Mold Remediation",
    tagline: "Provided via Mold Trust",
    description: "When active remediation is required, certified crews at Mold Trust Inc. handle containment, safe removal, and HEPA air filtration.",
    bulletPoints: [
      "HEPA negative-air containment barriers",
      "Safe removal of affected materials & antimicrobial treatment",
      "Post-remediation clearance coordination"
    ],
    performedBy: "Full Remediation via Mold Trust",
    path: "/mold-remediation/",
    iconName: "ShieldAlert"
  },
  {
    id: "crawl-space-moisture",
    title: "Crawl Space Moisture Solutions",
    tagline: "Provided via Mold Trust",
    description: "Protect your foundation from Georgia humidity with reinforced vapor barriers, drainage improvements, and commercial dehumidifiers.",
    bulletPoints: [
      "Heavy-duty vapor barrier & crawl space encapsulation",
      "Commercial dehumidifiers & sump pump drainage",
      "Vent sealing & moisture control"
    ],
    performedBy: "Specialized Execution via Mold Trust",
    path: "/crawl-space-moisture/",
    iconName: "Home"
  },
  {
    id: "water-damage-restoration",
    title: "Water Damage Restoration",
    tagline: "Provided via Mold Trust",
    description: "Rapid water extraction and structural drying following plumbing leaks, appliance failures, or storm intrusion.",
    bulletPoints: [
      "Water extraction & commercial structural drying",
      "Industrial air movers & LGR dehumidifiers",
      "Moisture tracking until dry standards are met"
    ],
    performedBy: "Specialized Execution via Mold Trust",
    path: "/contact/",
    iconName: "Droplets"
  },
  {
    id: "pre-sale-concerns",
    title: "Property & Pre-Sale Mold Concerns",
    tagline: "Personal Consultation",
    description: "With 30 years as a real estate broker, Don helps buyers, sellers, and agents resolve inspection findings without derailing closings.",
    bulletPoints: [
      "Pre-listing crawl space and basement evaluations",
      "Clear explanations for inspection reports",
      "Practical scope of work for real estate deadlines"
    ],
    performedBy: "Personal Consultation & Coordination",
    path: "/about/",
    iconName: "FileCheck2"
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Describe the Problem",
    description: "Call Don or send a quick message describing what you have noticed—visible spots, a musty odor, dampness, or an inspection finding."
  },
  {
    step: "02",
    title: "Discuss the Property Concerns",
    description: "Speak directly with Don about your home's layout, history, and symptoms to determine what type of evaluation makes sense."
  },
  {
    step: "03",
    title: "Arrange an Appropriate Assessment",
    description: "Schedule an on-site visit to inspect moisture conditions, check vulnerable areas, and coordinate testing if needed."
  },
  {
    step: "04",
    title: "Review Recommended Next Steps",
    description: "Get clear, straightforward answers and a practical plan—whether simple moisture adjustments or remediation through Mold Trust."
  }
];

export const SERVICE_AREAS: ServiceArea[] = [
  {
    name: "Cumming",
    county: "Forsyth County",
    notes: "Residential homes, crawl spaces & Lake Lanier properties."
  },
  {
    name: "Alpharetta",
    county: "Fulton County",
    notes: "Basements, crawl space encapsulation & pre-sale evaluations."
  },
  {
    name: "Dawsonville",
    county: "Dawson County",
    notes: "Local headquarters of Mold Trust Inc. & residential service."
  },
  {
    name: "Canton",
    county: "Cherokee County",
    notes: "Moisture inspections, crawl spaces & remediation support."
  },
  {
    name: "Woodstock",
    county: "Cherokee County",
    notes: "Homeowner consultations & real estate inspection guidance."
  },
  {
    name: "Gainesville",
    county: "Hall County",
    notes: "Lakefront humidity control & mold remediation coordination."
  },
  {
    name: "Johns Creek",
    county: "Fulton County",
    notes: "Thorough moisture diagnostics & residential restoration."
  },
  {
    name: "Surrounding North Atlanta",
    county: "North Georgia",
    notes: "Including Milton, Roswell, Suwanee, Buford & nearby areas."
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "What are common signs of mold?",
    answer: "Common signs include persistent musty odors (especially when the HVAC runs), visible spotting or staining on baseboards or drywall, peeling paint, and lingering dampness around windows, bathrooms, or basements."
  },
  {
    question: "What causes mold in crawl spaces?",
    answer: "Bare dirt floors release ground moisture while humid outdoor Georgia air enters through vents and condenses on cooler ductwork and wood framing. High humidity combined with wood framing creates ideal conditions for mold."
  },
  {
    question: "Can mold return after remediation?",
    answer: "Yes, if the underlying moisture problem is not corrected. Mold spores exist naturally in the air, so lasting remediation always pairs safe removal with moisture control—such as leak repair, vapor barriers, or dehumidification."
  },
  {
    question: "Should mold be addressed before selling a home?",
    answer: "Yes. Crawl space moisture or visible mold often raises red flags during a buyer's home inspection, leading to delays or price renegotiations. Addressing it beforehand gives buyers documented peace of mind."
  },
  {
    question: "What happens during a mold assessment?",
    answer: "Don inspects key areas of the property—such as the crawl space, basement, attic, and living areas—using moisture meters to trace dampness. When lab verification is appropriate, air or surface samples can be coordinated."
  },
  {
    question: "How can I contact Don?",
    answer: "Call Don directly at (770) 833-7410, email helveyd@gmail.com, or complete the short assessment request form on this website."
  }
];

export const VERIFIED_TESTIMONIALS = [
  {
    author: "Robert & Sandra M.",
    location: "Cumming, GA",
    context: "Crawl Space Moisture",
    quote: "Don looked at our crawl space after we noticed a musty smell. Instead of high-pressure sales tactics, he explained the moisture issue clearly and coordinated a clean encapsulation with Mold Trust."
  },
  {
    author: "David K.",
    location: "Alpharetta, GA",
    context: "Pre-Sale Consultation",
    quote: "When a buyer's inspector flagged basement moisture, Don walked the property, diagnosed the source calmly, and helped us get it resolved through Mold Trust in time for closing."
  },
  {
    author: "Elena T.",
    location: "Dawsonville, GA",
    context: "Mold Remediation",
    quote: "After a slow kitchen leak, Don assessed the moisture spread and arranged Mold Trust's containment crew. Straightforward communication from start to finish."
  }
];
