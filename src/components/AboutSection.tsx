import React from 'react';
import { Award, GraduationCap, Building2, ShieldCheck } from 'lucide-react';
import { GeorgiaFlag } from './GeorgiaFlag';

interface AboutSectionProps {
  onSpeakWithDon: () => void;
}

const CREDENTIALS = [
  {
    title: 'Licensed Real Estate Broker',
    authority: 'State of Georgia • 30 Years Experience',
    description:
      'Three decades guiding buyers, sellers, and agents through residential inspections, disclosures, and property evaluations.',
    icon: Building2,
    tag: 'Broker License',
  },
  {
    title: 'GREC Approved CE Instructor',
    authority: 'Georgia Real Estate Commission',
    description:
      'Certified Continuing Education instructor educating licensed Georgia realtors on moisture, mold, and environmental property health.',
    icon: GraduationCap,
    tag: 'Approved Instructor',
  },
  {
    title: 'Certified Mold Inspector & Remediator',
    authority: 'CMI & CMR Industry Credentials',
    description:
      'Formally certified in building moisture diagnostics, inspection protocols, and industry-standard mold remediation procedures.',
    icon: Award,
    tag: 'Certified Specialist',
  },
  {
    title: 'Radon & Property Inspection Specialist',
    authority: 'Environmental & Foundation Diagnostics',
    description:
      'Specialized background in residential property inspections, radon gas testing, and crawl space moisture dynamics.',
    icon: ShieldCheck,
    tag: 'Certified Inspector',
  },
];

export const AboutSection: React.FC<AboutSectionProps> = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-b border-lightgray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Bio Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-14">
          
          {/* Portrait */}
          <div className="lg:col-span-4">
            <div className="max-w-xs sm:max-w-sm mx-auto rounded-2xl overflow-hidden shadow-premium border border-navy-100 bg-white">
              <img
                src="./images/don-helvey.jpg?v=2"
                alt="Don Helvey"
                className="w-full aspect-square object-cover object-top block"
                loading="lazy"
              />
            </div>
          </div>

          {/* Bio Copy */}
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-forest-700 mb-3">
              <GeorgiaFlag className="w-5 h-3.5" />
              <span>Licensed & Certified Georgia Authority</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight mb-5">
              Meet Don Helvey
            </h2>

            <div className="space-y-4 text-navy-700 text-base sm:text-lg leading-relaxed max-w-3xl">
              <p>
                Don brings approximately 30 years of experience as a licensed real estate broker, together with experience educating real estate professionals and inspecting properties across North Georgia.
              </p>
              <p>
                His combined knowledge of real estate transactions, building conditions, and mold remediation helps homeowners and real estate professionals understand property-related problems clearly and make confident decisions.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Row: 4 Premium Certifications & Licensing Cards */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-900">
              Licensing, Certifications & Professional Credentials
            </h3>
            <div className="hidden sm:block h-px flex-grow bg-navy-100 ml-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CREDENTIALS.map((cred) => {
              const IconComponent = cred.icon;
              return (
                <div
                  key={cred.title}
                  className="rounded-2xl bg-gradient-to-b from-warm to-white border border-navy-100 p-6 shadow-card hover:shadow-premium hover:border-gold-400/70 transition-all flex flex-col justify-between relative overflow-hidden group"
                >
                  {/* Top Gold Accent Bar */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-navy-800 via-gold-400 to-forest-600" />

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-5 pt-1">
                      <div className="w-11 h-11 rounded-xl bg-navy-900 text-gold-300 flex items-center justify-center shadow-sm">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-forest-800 bg-forest-50 border border-forest-200/70 px-2.5 py-1 rounded-md">
                        {cred.tag}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-navy-900 mb-1 leading-snug">
                      {cred.title}
                    </h4>

                    <div className="text-xs font-semibold text-gold-600 mb-3">
                      {cred.authority}
                    </div>

                    <p className="text-xs sm:text-sm text-navy-600 leading-relaxed">
                      {cred.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
