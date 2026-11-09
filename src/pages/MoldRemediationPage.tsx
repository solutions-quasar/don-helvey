import React, { useEffect } from 'react';
import { Phone, CheckCircle2 } from 'lucide-react';
import { SITE_METADATA } from '../data/content';
import { RoutePath } from '../types';

interface PageProps {
  onNavigate: (path: RoutePath, hash?: string) => void;
  onRequestAssessment: () => void;
}

export const MoldRemediationPage: React.FC<PageProps> = ({ onRequestAssessment }) => {
  useEffect(() => {
    document.title = "Mold Remediation | Don Helvey & Mold Trust Inc.";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Certified mold remediation support in North Atlanta, Georgia through Don Helvey and Mold Trust Inc.'
      );
    }
  }, []);

  return (
    <div className="py-12 sm:py-16 bg-warm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-navy-900 tracking-tight mb-5">
          Mold Remediation
        </h1>
        <p className="text-lg text-navy-700 leading-relaxed mb-10">
          When active mold growth requires professional removal, Don Helvey coordinates certified remediation through <strong className="text-navy-900 font-semibold">Mold Trust Inc.</strong> so the issue is contained and resolved properly.
        </p>

        <div className="rounded-2xl overflow-hidden shadow-soft border border-navy-100 mb-12 aspect-[16/9]">
          <img
            src="./images/remediation-service.jpg"
            alt="Mold remediation consultation"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-white rounded-2xl border border-navy-100 p-7 sm:p-9 shadow-card mb-10">
          <h2 className="font-serif text-2xl font-bold text-navy-900 mb-5">
            Our Remediation Approach
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm sm:text-base text-navy-700">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-forest-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-navy-900 block">Negative-Air Containment</strong>
                Sealing affected areas with HEPA filtration so spores do not spread to clean rooms.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-forest-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-navy-900 block">Safe Material Removal</strong>
                Careful removal of damaged drywall or insulation that cannot be salvaged.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-forest-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-navy-900 block">HEPA Cleaning & Treatment</strong>
                Surface cleaning and EPA-registered antimicrobial treatment on framing timbers.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-forest-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-navy-900 block">Source Moisture Control</strong>
                Addressing the leak or humidity source so mold does not return.
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href={`tel:${SITE_METADATA.rawPhone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white font-semibold text-base shadow-sm"
          >
            <Phone className="w-4 h-4 text-gold-300" />
            <span>Call Don: {SITE_METADATA.phone}</span>
          </a>
          <button
            onClick={onRequestAssessment}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-navy-800 hover:bg-navy-900 text-white font-semibold text-base"
          >
            Request an Assessment
          </button>
        </div>

      </div>
    </div>
  );
};
