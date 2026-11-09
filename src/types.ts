export type RoutePath = 
  | '/'
  | '/mold-remediation/'
  | '/mold-inspection/'
  | '/crawl-space-moisture/'
  | '/about/'
  | '/contact/';

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

