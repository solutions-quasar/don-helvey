import React, { useEffect } from 'react';
import { Phone, CheckCircle2 } from 'lucide-react';
import { SITE_METADATA } from '../data/content';
import { RoutePath } from '../types';

interface PageProps {
  onNavigate: (path: RoutePath, hash?: string) => void;
  onRequestAssessment: () => void;
}

export const MoldInspectionPage: React.FC<PageProps> = ({ onRequestAssessment }) => {
  useEffect(() => {
    document.title = "Mold Inspection & Moisture Assessment | Don Helvey";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Mold inspection, moisture diagnostics, and air sampling coordination in North Atlanta, GA with Don Helvey.'
      );
    }
  }, []);

  return (
    <div className="py-12 sm:py-16 bg-warm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-navy-900 tracking-tight mb-5">
          Mold Inspection & Moisture Assessment
        </h1>
        <p className="text-lg text-navy-700 leading-relaxed mb-10">
          Accurate answers start with finding the moisture source. Don Helvey evaluates your property’s crawl space, basement, attic, and living areas using calibrated moisture meters, and coordinates independent lab testing when needed.
        </p>

        <div className="bg-white rounded-2xl border border-navy-100 p-7 sm:p-9 shadow-card mb-10">
          <h2 className="font-serif text-2xl font-bold text-navy-900 mb-5">
            What an Assessment Includes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm sm:text-base text-navy-700">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-forest-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-navy-900 block">Visual Property Inspection</strong>
                Checking crawl spaces, basements, plumbing areas, and HVAC vents.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-forest-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-navy-900 block">Moisture Meter Readings</strong>
                Tracing hidden dampness inside walls, baseboards, and subflooring.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-forest-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-navy-900 block">Lab Testing Coordination</strong>
                Arranging third-party air or surface lab samples when formal verification is needed.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-forest-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-navy-900 block">Pre-Sale & Buyer Guidance</strong>
                Clear recommendations for homeowners and real estate transactions.
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
