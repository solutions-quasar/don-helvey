import React from 'react';
import { SearchCheck, ShieldAlert, Home, Droplets, FileCheck2, ArrowRight } from 'lucide-react';
import { PRIMARY_SERVICES } from '../data/content';
import { RoutePath } from '../types';
import { getAssetUrl } from '../utils/assets';

interface ServicesSectionProps {
  onNavigate: (path: RoutePath) => void;
  onRequestAssessment: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigate }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'SearchCheck':
        return <SearchCheck className="w-5 h-5 text-forest-700" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-forest-700" />;
      case 'Home':
        return <Home className="w-5 h-5 text-forest-700" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-forest-700" />;
      case 'FileCheck2':
        return <FileCheck2 className="w-5 h-5 text-forest-700" />;
      default:
        return <SearchCheck className="w-5 h-5 text-forest-700" />;
    }
  };

  const getServiceImage = (id: string) => {
    switch (id) {
      case 'mold-assessment':
        return getAssetUrl('images/remediation-service.jpg');
      case 'mold-remediation':
        return getAssetUrl('images/hepa-remediation-equipment.jpg');
      case 'crawl-space-moisture':
        return getAssetUrl('images/crawl-space-inspection.jpg');
      case 'water-damage-restoration':
        return getAssetUrl('images/water-restoration-drying.jpg');
      case 'pre-sale-concerns':
        return getAssetUrl('images/property-exterior.jpg');
      default:
        return getAssetUrl('images/property-exterior.jpg');
    }
  };

  return (
    <section id="services" className="py-20 sm:py-24 bg-warm border-b border-lightgray">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mx-auto text-center mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight mb-4">
            Practical Solutions for Mold and Moisture Problems
          </h2>
          <p className="text-base sm:text-lg text-navy-600 leading-relaxed">
            Personal property consultations by Don Helvey, paired with certified remediation and moisture services through Mold Trust Inc.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRIMARY_SERVICES.map((service) => {
            const isPersonal = service.performedBy === 'Personal Consultation & Coordination';

            return (
              <div
                key={service.id}
                className="rounded-2xl bg-white border border-navy-100 overflow-hidden flex flex-col justify-between shadow-card hover:shadow-premium transition-all duration-300 group"
              >
                <div>
                  {/* Solution Card Image Header */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-900">
                    <img
                      src={getServiceImage(service.id)}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-sm shadow-sm flex items-center justify-center">
                      {getIcon(service.iconName)}
                    </div>
                    <span
                      className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-md shadow-sm ${
                        isPersonal
                          ? 'bg-navy-900/95 text-warm'
                          : 'bg-forest-700/95 text-white'
                      }`}
                    >
                      {service.tagline}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 pb-4">
                    <h3 className="font-serif text-xl font-bold text-navy-900 mb-2.5">
                      {service.title}
                    </h3>

                    <p className="text-sm sm:text-base text-navy-600 leading-relaxed mb-5">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-4 pt-4 border-t border-navy-100 text-sm text-navy-700">
                      {service.bulletPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-forest-600 mt-2 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-6 sm:px-7 pb-6">
                  <button
                    onClick={() => onNavigate(service.path)}
                    className="text-sm font-semibold text-forest-700 hover:text-forest-800 inline-flex items-center gap-1.5 group/btn w-fit"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
