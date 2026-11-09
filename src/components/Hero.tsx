import React from 'react';
import { Phone, CalendarCheck, CheckCircle2 } from 'lucide-react';
import { SITE_METADATA } from '../data/content';
import { GeorgiaFlag } from './GeorgiaFlag';

interface HeroProps {
  onTalkToDon: () => void;
  onRequestAssessment: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onTalkToDon, onRequestAssessment }) => {
  return (
    <section className="relative w-full min-h-[620px] lg:min-h-[660px] flex items-center bg-[#18222C] overflow-hidden border-b border-navy-800">
      
      {/* Responsive Background Images */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Mobile & Tablet Vertical Portrait Background */}
        <img
          src="./images/don-helvey-hero-mobile.jpg?v=2"
          alt="Don Helvey — Property & Mold Remediation Specialist"
          className="lg:hidden w-full h-full object-cover object-[center_8%] translate-x-[9%] sm:translate-x-0 scale-[1.02] sm:scale-100"
        />
        {/* Desktop Widescreen 16:9 Background */}
        <img
          src="./images/don-helvey-hero-banner.jpg?v=2"
          alt="Don Helvey — Property & Mold Remediation Specialist"
          className="hidden lg:block w-full h-full object-cover object-[center_22%]"
        />

        {/* Subtle Left & Bottom Vignette on Mobile for Crisp Text & Buttons */}
        <div className="absolute inset-0 lg:hidden bg-gradient-to-r from-[#141E28]/85 via-[#141E28]/35 via-55% to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 lg:hidden bg-gradient-to-t from-[#101820]/95 via-[#101820]/55 to-transparent" />

        {/* Desktop Left-Only Gradient */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#0C1926]/75 via-[#0C1926]/25 via-45% to-transparent" />
        <div className="hidden lg:block absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0C1926]/45 to-transparent" />
      </div>

      {/* Foreground Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full pt-8 pb-10 sm:py-16 lg:py-28">
        <div className="max-w-xl lg:max-w-[600px] text-left">
          
          {/* Eyebrow with Georgia Flag */}
          <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.1em] text-white/95 leading-snug">
            <GeorgiaFlag className="w-5 h-3.5 shadow-sm shrink-0" />
            <div>
              <span className="block sm:inline">North Atlanta & North Georgia</span>
              <span className="hidden sm:inline"> • </span>
              <span className="block sm:inline text-white/85">Mold & Property Expertise</span>
            </div>
          </div>

          {/* Gold Accent Line */}
          <div className="w-16 h-[2.5px] bg-gold-400 mt-3.5 mb-5 sm:mb-7 rounded-full" />

          {/* Headline & Copy: Top lines stay clear of Don's face (54%), while "Get Expert Guidance." sits on one bold line below his chin */}
          <div className="mb-7 sm:mb-9">
            <h1 className="font-serif text-[31px] sm:text-5xl lg:text-[54px] font-bold text-white leading-[1.09] tracking-tight mb-4 sm:mb-5 drop-shadow-sm">
              <span className="block max-w-[54%] sm:max-w-none">
                Worried About Mold in Your Home?
              </span>
              <span className="block italic font-normal text-[#6EB8F0] text-[25px] sm:text-5xl lg:text-[52px] leading-[1.15] mt-2 whitespace-nowrap">
                Get Expert Guidance.
              </span>
            </h1>

            <p className="text-[14px] sm:text-lg text-white/90 leading-[1.48] sm:leading-relaxed max-w-[57%] sm:max-w-lg font-normal">
              With 30 years of real estate experience, Don Helvey helps homeowners identify and resolve mold and moisture issues with confidence.
            </p>
          </div>

          {/* Full-Width Stacked Buttons on Mobile, Side-by-Side on Desktop */}
          <div id="hero-ctas" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-7 sm:mb-10">
            <a
              href={`tel:${SITE_METADATA.rawPhone}`}
              onClick={onTalkToDon}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 rounded-xl bg-[#1F6CA6] hover:bg-[#19598A] text-white font-semibold text-base shadow-lg transition-all whitespace-nowrap border border-[#4998D4]/50"
            >
              <Phone className="w-4 h-4 text-white shrink-0" />
              <span>Talk to Don: {SITE_METADATA.phone}</span>
            </a>

            <button
              onClick={onRequestAssessment}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 rounded-xl bg-[#111C27]/80 hover:bg-[#111C27]/95 text-white font-semibold text-base border border-white/60 backdrop-blur-sm transition-all whitespace-nowrap"
            >
              <CalendarCheck className="w-4 h-4 text-white/90 shrink-0" />
              <span>Request a Mold Assessment</span>
            </button>
          </div>

          {/* Bottom Trust Bar */}
          <div className="pt-5 border-t border-white/15 grid grid-cols-2 lg:grid-cols-3 gap-4 items-center">
            <div className="flex items-center gap-2.5 text-white/95 pr-2 border-r border-white/20 lg:border-r-0">
              <CheckCircle2 className="w-5 h-5 text-[#6EB8F0] shrink-0" />
              <div className="text-xs font-semibold leading-snug">
                30+ Years in <br />
                Real Estate
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-white/95 pl-1 lg:pl-0">
              <CheckCircle2 className="w-5 h-5 text-[#6EB8F0] shrink-0" />
              <div className="text-xs font-semibold leading-snug">
                Property <br />
                Inspection & Guidance
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2.5 text-white/95">
              <CheckCircle2 className="w-5 h-5 text-[#6EB8F0] shrink-0" />
              <div className="text-xs font-semibold leading-snug">
                Mold Remediation <br />
                Expertise
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
