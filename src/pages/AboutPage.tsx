import React, { useEffect } from 'react';
import { Phone, CheckCircle2 } from 'lucide-react';
import { SITE_METADATA } from '../data/content';
import { RoutePath } from '../types';

interface PageProps {
  onNavigate: (path: RoutePath, hash?: string) => void;
  onRequestAssessment: () => void;
}

export const AboutPage: React.FC<PageProps> = ({ onRequestAssessment }) => {
  useEffect(() => {
    document.title = "About Don Helvey | 30 Years Georgia Real Estate & Mold Expertise";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Meet Don Helvey, licensed Georgia real estate broker of 30 years, GREC approved CE instructor, and mold remediation specialist.'
      );
    }
  }, []);

  return (
    <div className="py-12 sm:py-16 bg-warm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center mb-12">
          <div className="md:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-soft border border-navy-100 bg-white max-w-sm mx-auto">
              <img
                src="./images/don-helvey.jpg?v=2"
                alt="Don Helvey"
                className="w-full aspect-square object-cover object-top block"
              />
            </div>
          </div>

          <div className="md:col-span-7">
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-navy-900 tracking-tight mb-5">
              Meet Don Helvey
            </h1>

            <div className="space-y-4 text-base sm:text-lg text-navy-700 leading-relaxed mb-7">
              <p>
                Don brings approximately 30 years of experience as a real estate broker, together with experience educating real estate professionals and inspecting properties.
              </p>
              <p>
                His combined knowledge of real estate transactions, building conditions, and mold remediation helps clients better understand property-related problems.
              </p>
              <p>
                Working in business development with <a href={SITE_METADATA.moldTrustUrl} target="_blank" rel="noopener noreferrer" className="text-forest-700 font-semibold underline">Mold Trust Inc.</a>, Don connects homeowners and real estate professionals directly with certified remediation, crawl space, and water restoration teams across North Georgia.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <div className="flex items-center gap-2 text-sm font-semibold text-navy-800">
                <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
                <span>30 Years in Real Estate</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-navy-800">
                <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
                <span>GREC Approved CE Instructor</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-navy-800">
                <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
                <span>Certified Mold Inspector & Remediator</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-navy-800">
                <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
                <span>Property Inspection Background</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`tel:${SITE_METADATA.rawPhone}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white font-semibold text-base shadow-sm"
              >
                <Phone className="w-4 h-4 text-gold-300" />
                <span>Speak With Don: {SITE_METADATA.phone}</span>
              </a>
              <button
                onClick={onRequestAssessment}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white hover:bg-lightgray text-navy-900 font-semibold text-base border border-navy-200"
              >
                Request an Assessment
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
