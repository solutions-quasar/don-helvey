import React from 'react';
import { MessageSquareQuote, ExternalLink } from 'lucide-react';
import { SITE_METADATA } from '../data/content';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-warm border-b border-lightgray">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight mb-3">
          What Homeowners & Agents Value
        </h2>
        <p className="text-base sm:text-lg text-navy-600 max-w-2xl mx-auto mb-10">
          Trusted across North Atlanta for clear communication, thorough property knowledge, and dependable remediation support through Mold Trust.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-8">
          <div className="rounded-2xl bg-white border border-navy-100 p-6 shadow-card">
            <MessageSquareQuote className="w-6 h-6 text-forest-600 mb-3" />
            <h3 className="font-serif font-bold text-lg text-navy-900 mb-2">
              Clear, Honest Explanations
            </h3>
            <p className="text-sm text-navy-600 leading-relaxed">
              Homeowners appreciate understanding the actual moisture source in plain language without alarmist sales pressure.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-navy-100 p-6 shadow-card">
            <MessageSquareQuote className="w-6 h-6 text-forest-600 mb-3" />
            <h3 className="font-serif font-bold text-lg text-navy-900 mb-2">
              Real Estate Transaction Insight
            </h3>
            <p className="text-sm text-navy-600 leading-relaxed">
              Buyers, sellers, and agents rely on Don’s 30-year brokerage perspective to navigate home inspection findings smoothly.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-navy-100 p-6 shadow-card">
            <MessageSquareQuote className="w-6 h-6 text-forest-600 mb-3" />
            <h3 className="font-serif font-bold text-lg text-navy-900 mb-2">
              Verified Mold Trust Execution
            </h3>
            <p className="text-sm text-navy-600 leading-relaxed">
              When remediation or crawl space encapsulation is needed, Mold Trust delivers clean, documented results.
            </p>
          </div>
        </div>

        <a
          href={SITE_METADATA.moldTrustUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 hover:text-forest-800"
        >
          <span>Read verified client reviews at MoldTrust.com</span>
          <ExternalLink className="w-4 h-4" />
        </a>

      </div>
    </section>
  );
};
