import React from 'react';
import { Eye, Droplets, Warehouse } from 'lucide-react';
import { PROBLEM_CARDS } from '../data/content';

interface ProblemCardsProps {
  onRequestAssessment: () => void;
}

export const ProblemCards: React.FC<ProblemCardsProps> = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'visible-mold':
        return <Eye className="w-5 h-5 text-forest-700" />;
      case 'moisture-water-damage':
        return <Droplets className="w-5 h-5 text-forest-700" />;
      case 'crawl-space-concerns':
        return <Warehouse className="w-5 h-5 text-forest-700" />;
      default:
        return <Eye className="w-5 h-5 text-forest-700" />;
    }
  };

  const getImage = (id: string) => {
    switch (id) {
      case 'visible-mold':
        return './images/moisture-meter-wall.jpg';
      case 'moisture-water-damage':
        return './images/water-restoration-drying.jpg';
      case 'crawl-space-concerns':
        return './images/crawl-space-inspection.jpg';
      default:
        return './images/moisture-meter-wall.jpg';
    }
  };

  return (
    <section id="problem-recognition" className="py-16 sm:py-20 bg-white border-b border-lightgray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight mb-3">
            Noticed Mold, Moisture, or a Musty Smell?
          </h2>
          <p className="text-base sm:text-lg text-navy-600">
            Identifying the warning signs early helps protect your property and resolve moisture at the source.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PROBLEM_CARDS.map((card) => (
            <div
              key={card.id}
              className="rounded-2xl bg-warm border border-navy-100 overflow-hidden flex flex-col justify-between shadow-card hover:shadow-premium transition-all duration-300 group"
            >
              <div>
                {/* Card Image Header */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-900">
                  <img
                    src={getImage(card.id)}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-sm shadow-sm flex items-center justify-center">
                    {getIcon(card.id)}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-900 mb-2.5">
                    {card.title}
                  </h3>

                  <p className="text-sm sm:text-base text-navy-600 leading-relaxed mb-5">
                    {card.explanation}
                  </p>

                  <ul className="space-y-2.5 pt-4 border-t border-navy-200/60 text-sm text-navy-700">
                    {card.warningSigns.map((sign, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-forest-600 mt-2 shrink-0" />
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
