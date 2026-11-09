import React from 'react';
import { Phone, Mail, MapPin, ExternalLink, ArrowUp } from 'lucide-react';
import { SITE_METADATA } from '../data/content';
import { RoutePath } from '../types';
import { GeorgiaFlag } from './GeorgiaFlag';

interface FooterProps {
  onNavigate: (path: RoutePath, hash?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-950 text-white pt-16 pb-24 lg:pb-16 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-navy-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-navy-800 flex items-center justify-center text-warm font-serif font-bold text-xl border border-gold-400/40">
                DH
              </div>
              <div>
                <div className="font-serif font-bold text-xl text-white tracking-tight">DON HELVEY</div>
                <div className="text-[11px] font-semibold tracking-wider uppercase text-gold-400">
                  Mold Remediation & Property Expertise
                </div>
              </div>
            </div>

            <p className="text-xs text-navy-300 leading-relaxed max-w-sm">
              Providing North Atlanta homeowners, buyers, and real estate professionals with objective moisture guidance, inspection diagnostics, and certified remediation coordination.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-navy-900 border border-navy-800 text-xs text-navy-200">
              <GeorgiaFlag className="w-5 h-3.5" />
              <span>Serving North Atlanta & North Georgia</span>
            </div>

            <div className="pt-1 text-xs text-navy-400">
              <span className="text-white font-medium">Business Development:</span> In partnership with{' '}
              <a 
                href={SITE_METADATA.moldTrustUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-forest-400 hover:text-forest-300 underline inline-flex items-center gap-1"
              >
                Mold Trust Inc. <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-gold-400">
              Dedicated Pages
            </div>
            <ul className="space-y-2 text-xs text-navy-300">
              <li>
                <button onClick={() => onNavigate('/mold-remediation/')} className="hover:text-white transition-colors">
                  Mold Remediation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/mold-inspection/')} className="hover:text-white transition-colors">
                  Mold & Moisture Inspection
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/crawl-space-moisture/')} className="hover:text-white transition-colors">
                  Crawl Space Moisture Solutions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about/')} className="hover:text-white transition-colors">
                  About Don Helvey
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact/')} className="hover:text-white transition-colors">
                  Contact & Assessment Inquiries
                </button>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => onNavigate('/admin/')}
                  className="inline-flex items-center gap-1.5 text-gold-400 hover:text-gold-300 font-semibold transition-colors"
                >
                  <span>→ 250K Homeowner ERP & Admin Demo</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Key Services */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-gold-400">
              Core Capabilities
            </div>
            <ul className="space-y-2 text-xs text-navy-300">
              <li>Visual Moisture Mapping</li>
              <li>IICRC S520 Remediation</li>
              <li>Crawl Space Encapsulation</li>
              <li>Commercial Dehumidification</li>
              <li>Pre-Sale Inspection Advisory</li>
              <li>Radon Gas Inquiries</li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-gold-400">
              Direct Contact
            </div>
            
            <div className="space-y-2.5 text-xs text-navy-300">
              <a
                href={`tel:${SITE_METADATA.rawPhone}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-forest-400 shrink-0" />
                <span className="font-semibold text-white">{SITE_METADATA.phone}</span>
              </a>

              <a
                href={`mailto:${SITE_METADATA.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-forest-400 shrink-0" />
                <span>{SITE_METADATA.email}</span>
              </a>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-forest-400 shrink-0 mt-0.5" />
                <span>North Atlanta, GA (Cumming, Alpharetta, Dawsonville, Canton, Woodstock, Gainesville & Johns Creek)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimers & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-navy-400">
          <div className="space-y-1 text-center md:text-left">
            <p>
              © {new Date().getFullYear()} Don Helvey. All rights reserved. Professional Property & Mold Advisory.
            </p>
            <p className="text-[11px] text-navy-500">
              Don Helvey is an approved Continuing Education Instructor under the Georgia Real Estate Commission (GREC) and acts in client business development for Mold Trust Inc.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-xs text-navy-300 hover:text-white transition-colors border border-navy-800"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
