import React from 'react';
import { Phone, CalendarCheck } from 'lucide-react';
import { SITE_METADATA } from '../data/content';

interface StickyMobileBarProps {
  onRequestAssessment: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ onRequestAssessment }) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-navy-200/80 px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="max-w-md mx-auto grid grid-cols-2 gap-2.5">
        
        {/* CALL DON CTA */}
        <a
          href={`tel:${SITE_METADATA.rawPhone}`}
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-navy-900 text-warm font-bold text-xs uppercase tracking-wider active:scale-[0.98] transition-all shadow-sm"
          aria-label="Call Don Helvey"
        >
          <Phone className="w-4 h-4 text-gold-400 shrink-0" />
          <span className="truncate">CALL DON</span>
        </a>

        {/* REQUEST HELP CTA */}
        <button
          onClick={onRequestAssessment}
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-forest-600 text-white font-bold text-xs uppercase tracking-wider active:scale-[0.98] transition-all shadow-sm"
          aria-label="Request Assessment"
        >
          <CalendarCheck className="w-4 h-4 text-gold-300 shrink-0" />
          <span className="truncate">REQUEST HELP</span>
        </button>

      </div>
    </div>
  );
};

