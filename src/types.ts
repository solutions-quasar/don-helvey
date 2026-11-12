export type RoutePath = 
  | '/'
  | '/mold-remediation/'
  | '/mold-inspection/'
  | '/crawl-space-moisture/'
  | '/about/'
  | '/contact/'
  | '/realtor-closing-protection/'
  | '/homeowner-mold-health/'
  | '/admin/';

export type LeadStage =
  | 'New Lead'
  | 'Spoke with Don'
  | 'Assessment Booked'
  | 'Sent to Mold Trust'
  | 'Completed';

export interface HomeownerRecord {
  id: string;
  fullName: string;
  address: string;
  city: string;
  county: string;
  zip: string;
  phone: string;
  email: string;
  yearBuilt: number;
  foundation: 'Crawl Space' | 'Basement' | 'Slab';
  sqft: number;
  humidityRisk: 'High Risk' | 'Moderate' | 'Low';
  outreachStatus: 'Never Contacted' | 'In Drip' | 'Opened / Clicked' | 'Replied (Lead)' | 'Do Not Contact';
  lastTouch?: string;
}

export interface OutreachCampaign {
  id: string;
  name: string;
  targetCity: string;
  targetFoundation: string;
  targetAgeGroup: string;
  status: 'Active' | 'Paused' | 'Completed';
  channel: 'Email + SMS Drip' | 'SMS Advisory' | 'Email Newsletter' | 'Postcard + SMS';
  totalAudience: number;
  sentCount: number;
  deliveredRate: number;
  replyCount: number;
  dailyLimit: number;
  subjectOrHook: string;
  messagePreview: string;
}

export interface ErpLeadItem {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  concernType: string;
  foundation: 'Crawl Space' | 'Basement' | 'Slab';
  yearBuilt: number;
  stage: LeadStage;
  source: 'Website Form' | 'Outreach Drip Reply' | 'Realtor Referral' | 'Direct Call';
  createdAt: string;
  notes: string;
  estimatedJobValue: number;
  donCommissionRate: number; // e.g. 0.15 (15%)
  moldTrustJobType?: string;
  appointmentTime?: string;
  moistureReadingRH?: number;
  woodMoisturePct?: number;
}

export interface NavItem {
  label: string;
  href: string;
  path?: RoutePath;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  bulletPoints: string[];
  performedBy: 'Personal Consultation & Coordination' | 'Full Remediation via Mold Trust' | 'Specialized Execution via Mold Trust';
  path: RoutePath;
  iconName: string;
}

export interface ProblemCard {
  id: string;
  title: string;
  warningSigns: string[];
  explanation: string;
  recommendation: string;
  badge: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface ServiceArea {
  name: string;
  county: string;
  notes: string;
  primaryZipCodes?: string;
}

export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  concernType: string;
  message: string;
  consent: boolean;
  _gotcha?: string; // honeypot
}

