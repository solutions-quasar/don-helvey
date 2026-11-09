import React from 'react';
import { ExternalLink, Shield, Waves, Sparkles, Activity } from 'lucide-react';
import { SITE_METADATA } from '../data/content';

export const MoldTrustPartnership: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-navy-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Experienced Remediation Support Through Mold Trust
          </h2>
          <p className="text-base sm:text-lg text-navy-200 leading-relaxed">
            Don works in business development and client advisory with <strong className="text-white font-semibold">Mold Trust Inc.</strong>, connecting homeowners directly with certified North Georgia remediation crews.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <div className="bg-navy-800/80 rounded-xl p-6 border border-navy-700">
            <Shield className="w-6 h-6 text-gold-400 mb-3" />
            <h3 className="font-serif font-bold text-lg text-white mb-1.5">Mold Remediation</h3>
            <p className="text-sm text-navy-200 leading-relaxed">
              HEPA negative-air containment, safe material removal, and antimicrobial treatment.
            </p>
          </div>

          <div className="bg-navy-800/80 rounded-xl p-6 border border-navy-700">
            <Waves className="w-6 h-6 text-gold-400 mb-3" />
            <h3 className="font-serif font-bold text-lg text-white mb-1.5">Water Restoration</h3>
            <p className="text-sm text-navy-200 leading-relaxed">
              Water extraction, structural drying, and commercial dehumidification.
            </p>
          </div>

          <div className="bg-navy-800/80 rounded-xl p-6 border border-navy-700">
            <Sparkles className="w-6 h-6 text-gold-400 mb-3" />
            <h3 className="font-serif font-bold text-lg text-white mb-1.5">Crawl Space Services</h3>
            <p className="text-sm text-navy-200 leading-relaxed">
              Heavy-duty vapor barriers, encapsulation, sump pumps, and humidity control.
            </p>
          </div>

          <div className="bg-navy-800/80 rounded-xl p-6 border border-navy-700">
            <Activity className="w-6 h-6 text-gold-400 mb-3" />
            <h3 className="font-serif font-bold text-lg text-white mb-1.5">Radon Services</h3>
            <p className="text-sm text-navy-200 leading-relaxed">
              Radon testing and mitigation support where ground gas conditions require attention.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-navy-800 text-sm text-navy-300">
          <p>
            Don serves in a business development role in partnership with Mold Trust Inc., an independent restoration company.
          </p>
          <a
            href={SITE_METADATA.moldTrustUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-forest-600 hover:bg-forest-500 text-white font-semibold text-sm transition-colors whitespace-nowrap shrink-0"
          >
            <span>Visit MoldTrust.com</span>
            <ExternalLink className="w-4 h-4 text-gold-300" />
          </a>
        </div>

      </div>
    </section>
  );
};
