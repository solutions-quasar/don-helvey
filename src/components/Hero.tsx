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
    <section className="relative w-full min-h-[640px] lg:min-h-[660px] flex items-center bg-[#18222C] overflow-hidden border-b border-navy-800">
      
      {/* Responsive Background Images */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Mobile & Tablet Vertical Portrait Background — shifted slightly right so there is generous room between text and Don */}
        <img
          src="./images/don-helvey-hero-mobile.jpg?v=1"
          alt="Don Helvey — Property & Mold Remediation Specialist"
          className="lg:hidden w-full h-full object-cover object-[center_10%] translate-x-[7%] sm:translate-x-0 scale-[1.03] sm:scale-100"
        />
        {/* Desktop Widescreen 16:9 Background */}
        <img
          src="./images/don-helvey-hero-banner.jpg?v=1"
          alt="Don Helvey — Property & Mold Remediation Specialist"
          className="hidden lg:block w-full h-full object-cover object-[center_22%]"
        />

        {/* Subtle Left & Bottom Vignette on Mobile for Crisp Text & Buttons */}
        <div className="absolute inset-0 lg:hidden bg-gradient-to-r from-[#141E28]/75 via-[#141E28]/25 via-55% to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 lg:hidden bg-gradient-to-t from-[#101820]/95 via-[#101820]/55 to-transparent" />

        {/* Desktop Left-Only Gradient */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#0C1926]/75 via-[#0C1926]/25 via-45% to-transparent" />
        <div className="hidden lg:block absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0C1926]/45 to-transparent" />
      </div>

      {/* Foreground Content Container with Generous Vertical & Horizontal Room */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full pt-10 pb-11 sm:py-16 lg:py-28">
        <div className="max-w-xl lg:max-w-[600px] text-left">
          
          {/* Eyebrow with Georgia Flag */}
          <div className="flex items-center gap-3 text-[11px] sm:text-xs font-bold uppercase tracking-[0.11em] text-white/95 leading-relaxed">
            <GeorgiaFlag className="w-6 h-4 shadow-sm shrink-0" />
            <div>
              <span className="block sm:inline">North Atlanta & North Georgia</span>
              <span className="hidden sm:inline"> • </span>
              <span className="block sm:inline text-white/85">Mold & Property Expertise</span>
            </div>
          </div>

          {/* Gold Accent Line */}
          <div className="w-16 h-[2.5px] bg-gold-400 mt-4 mb-6 sm:mb-7 rounded-full" />

          {/* Primary Headline — Spaced Cleanly Away From Don's Face on Mobile */}
          <h1 className="font-serif text-[29px] sm:text-5xl lg:text-[54px] font-bold text-white leading-[1.15] tracking-tight mb-5 sm:mb-6 drop-shadow-sm">
            <span className="block max-w-[54%] sm:max-w-none">
              Worried About Mold in Your Home?
            </span>
            <span className="block italic font-normal text-[#6EB8F0] text-[26px] sm:text-5xl lg:text-[52px] mt-2">
              Get Expert Guidance.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-[14px] sm:text-lg text-white/90 leading-[1.55] sm:leading-relaxed mb-8 sm:mb-10 max-w-[54%] sm:max-w-lg font-normal">
            With 30 years of real estate experience, Don Helvey helps homeowners identify and resolve mold and moisture issues with confidence.
          </p>

          {/* Full-Width Stacked Buttons on Mobile, Side-by-Side on Desktop */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-8 sm:mb-10">
            <a
              href={`tel:${SITE_METADATA.rawPhone}`}
              onClick={onTalkToDon}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#1F6CA6] hover:bg-[#19598A] text-white font-semibold text-base shadow-lg transition-all whitespace-nowrap border border-[#4998D4]/50"
            >
              <Phone className="w-4 h-4 text-white shrink-0" />
              <span>Talk to Don: {SITE_METADATA.phone}</span>
            </a>

            <button
              onClick={onRequestAssessment}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#111C27]/75 hover:bg-[#111C27]/90 text-white font-semibold text-base border border-white/60 backdrop-blur-sm transition-all whitespace-nowrap"
            >
              <CalendarCheck className="w-4 h-4 text-white/90 shrink-0" />
              <span>Request a Mold Assessment</span>
            </button>
          </div>

          {/* Bottom Trust Bar */}
          <div className="pt-6 border-t border-white/15 grid grid-cols-2 lg:grid-cols-3 gap-5 items-center">
            <div className="flex items-center gap-3 text-white/95 pr-3 border-r border-white/20 lg:border-r-0">
              <CheckCircle2 className="w-5 h-5 text-[#6EB8F0] shrink-0" />
              <div className="text-xs font-semibold leading-snug">
                30+ Years in <br />
                Real Estate
              </div>
            </div>

            <div className="flex items-center gap-3 text-white/95 pl-2 lg:pl-0">
              <CheckCircle2 className="w-5 h-5 text-[#6EB8F0] shrink-0" />
              <div className="text-xs font-semibold leading-snug">
                Property <br />
                Inspection & Guidance
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-3 text-white/95">
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
