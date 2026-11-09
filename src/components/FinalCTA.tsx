import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { SITE_METADATA } from '../data/content';

interface FinalCTAProps {
  onRequestAssessment: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onRequestAssessment }) => {
  return (
    <section className="py-16 sm:py-20 bg-navy-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Concerned About Mold in Your Property?
        </h2>

        <p className="text-lg sm:text-xl text-navy-200 mb-8">
          Get clear guidance on your next steps.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`tel:${SITE_METADATA.rawPhone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-forest-600 hover:bg-forest-500 text-white font-semibold text-base shadow-md transition-all"
          >
            <Phone className="w-5 h-5 text-gold-300" />
            <span>Call Don: {SITE_METADATA.phone}</span>
          </a>

          <button
            onClick={onRequestAssessment}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-warm hover:bg-white text-navy-900 font-semibold text-base shadow-md transition-all"
          >
            <span>Request an Assessment</span>
            <ArrowRight className="w-4 h-4 text-forest-700" />
          </button>
        </div>

      </div>
    </section>
  );
};
