import React, { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { SERVICE_AREAS } from '../data/content';
import { GeorgiaFlag } from './GeorgiaFlag';

interface CityCoord {
  name: string;
  county: string;
  x: number;
  y: number;
  labelAlign?: 'left' | 'right' | 'top' | 'bottom';
}

const MAP_CITIES: CityCoord[] = [
  { name: 'Dawsonville', county: 'Dawson County', x: 245, y: 78, labelAlign: 'top' },
  { name: 'Gainesville', county: 'Hall County', x: 355, y: 125, labelAlign: 'right' },
  { name: 'Canton', county: 'Cherokee County', x: 115, y: 165, labelAlign: 'left' },
  { name: 'Cumming', county: 'Forsyth County', x: 245, y: 175, labelAlign: 'left' },
  { name: 'Woodstock', county: 'Cherokee County', x: 110, y: 245, labelAlign: 'left' },
  { name: 'Alpharetta', county: 'Fulton County', x: 215, y: 255, labelAlign: 'left' },
  { name: 'Johns Creek', county: 'Fulton County', x: 265, y: 290, labelAlign: 'right' },
  { name: 'Surrounding North Atlanta', county: 'North Georgia', x: 195, y: 345, labelAlign: 'bottom' },
];

export const ServiceAreas: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('Cumming');
  const [mapMode, setMapMode] = useState<'diagram' | 'live'>('diagram');

  const activeArea =
    SERVICE_AREAS.find((a) => a.name === selectedCity) || SERVICE_AREAS[0];

  return (
    <section id="service-areas" className="py-16 sm:py-20 bg-white border-b border-lightgray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Georgia Flag */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-warm border border-navy-100 text-xs font-bold uppercase tracking-wider text-navy-800 mb-3.5">
            <GeorgiaFlag className="w-6 h-4" />
            <span>Proudly Serving North Georgia</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight mb-3">
            North Atlanta & North Georgia Service Areas
          </h2>
          <p className="text-base sm:text-lg text-navy-600">
            Local property expertise across the GA-400, I-575, and Lake Lanier corridors.
          </p>
        </div>

        {/* Split Layout: Interactive Map + Service Cities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: North Georgia Map */}
          <div className="lg:col-span-6 flex flex-col rounded-2xl bg-navy-900 border border-navy-800 overflow-hidden shadow-premium">
            
            {/* Map Top Bar */}
            <div className="px-5 py-3.5 bg-navy-950 border-b border-navy-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <GeorgiaFlag className="w-5 h-3.5" />
                <span className="text-xs font-bold uppercase tracking-wider text-warm">
                  North Georgia Coverage Map
                </span>
              </div>

              <div className="inline-flex rounded-lg bg-navy-900 p-0.5 border border-navy-700 text-xs">
                <button
                  onClick={() => setMapMode('diagram')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                    mapMode === 'diagram'
                      ? 'bg-forest-600 text-white'
                      : 'text-navy-300 hover:text-white'
                  }`}
                >
                  Corridor Map
                </button>
                <button
                  onClick={() => setMapMode('live')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                    mapMode === 'live'
                      ? 'bg-forest-600 text-white'
                      : 'text-navy-300 hover:text-white'
                  }`}
                >
                  Interactive Map
                </button>
              </div>
            </div>

            {/* Map Canvas */}
            <div className="relative flex-grow min-h-[340px] sm:min-h-[380px] flex items-center justify-center bg-[#0D2134]">
              {mapMode === 'diagram' ? (
                <svg
                  viewBox="0 0 460 390"
                  className="w-full h-full max-h-[390px] select-none"
                  role="img"
                  aria-label="North Georgia Service Corridor Map"
                >
                  <defs>
                    <radialGradient id="coverageGlow" cx="50%" cy="48%" r="48%">
                      <stop offset="0%" stopColor="#2779B5" stopOpacity="0.32" />
                      <stop offset="70%" stopColor="#2779B5" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#10283F" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Subtle County Grid Lines */}
                  <g stroke="#1E3F65" strokeWidth="1" strokeDasharray="4 4" opacity="0.45">
                    <line x1="175" y1="20" x2="175" y2="370" />
                    <line x1="305" y1="20" x2="305" y2="370" />
                    <line x1="40" y1="125" x2="420" y2="125" />
                    <line x1="40" y1="225" x2="420" y2="225" />
                    <line x1="40" y1="315" x2="420" y2="315" />
                  </g>

                  {/* Service Radius Highlight */}
                  <circle cx="230" cy="195" r="165" fill="url(#coverageGlow)" />
                  <circle
                    cx="230"
                    cy="195"
                    r="150"
                    fill="none"
                    stroke="#52A8DF"
                    strokeWidth="1.2"
                    strokeDasharray="6 6"
                    opacity="0.6"
                  />

                  {/* Lake Lanier Stylized Water Body */}
                  <path
                    d="M278 195 C285 170, 305 148, 332 132 C345 125, 355 135, 342 152 C330 168, 322 185, 305 205 C292 215, 275 210, 278 195 Z"
                    fill="#1D4E6E"
                    stroke="#3B7A9E"
                    strokeWidth="1.5"
                    opacity="0.85"
                  />
                  <text
                    x="328"
                    y="182"
                    fill="#7E9EBF"
                    fontSize="10"
                    fontStyle="italic"
                    fontWeight="600"
                  >
                    Lake Lanier
                  </text>

                  {/* Major North Georgia Highways */}
                  {/* I-575 Corridor (Woodstock -> Canton) */}
                  <path
                    d="M195 345 Q135 285 110 245 T115 165 L120 95"
                    fill="none"
                    stroke="#2A5582"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* GA-400 Corridor (Atlanta -> Alpharetta -> Cumming -> Dawsonville) */}
                  <path
                    d="M195 345 L215 255 L245 175 L245 78"
                    fill="none"
                    stroke="#C4A46A"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                  {/* I-985 / Gainesville Corridor */}
                  <path
                    d="M195 345 Q265 290 310 215 T355 125"
                    fill="none"
                    stroke="#2A5582"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Highway Badges */}
                  <g transform="translate(222, 118)">
                    <rect width="42" height="16" rx="4" fill="#10283F" stroke="#C4A46A" strokeWidth="1" />
                    <text x="21" y="11.5" textAnchor="middle" fill="#C4A46A" fontSize="9" fontWeight="700">
                      GA-400
                    </text>
                  </g>

                  <g transform="translate(76, 198)">
                    <rect width="36" height="16" rx="4" fill="#10283F" stroke="#4D75A0" strokeWidth="1" />
                    <text x="18" y="11.5" textAnchor="middle" fill="#B0C5D8" fontSize="9" fontWeight="700">
                      I-575
                    </text>
                  </g>

                  {/* Interactive City Pins */}
                  {MAP_CITIES.map((city) => {
                    const isSelected = selectedCity === city.name;

                    let textX = city.x;
                    let textY = city.y - 14;
                    let anchor: 'middle' | 'start' | 'end' = 'middle';

                    if (city.labelAlign === 'left') {
                      textX = city.x - 14;
                      textY = city.y + 4;
                      anchor = 'end';
                    } else if (city.labelAlign === 'right') {
                      textX = city.x + 14;
                      textY = city.y + 4;
                      anchor = 'start';
                    } else if (city.labelAlign === 'bottom') {
                      textY = city.y + 22;
                    }

                    return (
                      <g
                        key={city.name}
                        className="cursor-pointer"
                        onClick={() => setSelectedCity(city.name)}
                        onMouseEnter={() => setSelectedCity(city.name)}
                      >
                        {isSelected && (
                          <circle
                            cx={city.x}
                            cy={city.y}
                            r="16"
                            fill="#2779B5"
                            opacity="0.45"
                          />
                        )}
                        <circle
                          cx={city.x}
                          cy={city.y}
                          r={isSelected ? 7.5 : 5.5}
                          fill={isSelected ? '#C4A46A' : '#2779B5'}
                          stroke="#FAFBFD"
                          strokeWidth="2"
                        />
                        <text
                          x={textX}
                          y={textY}
                          textAnchor={anchor}
                          fill={isSelected ? '#FFFFFF' : '#D9E3EC'}
                          fontSize={isSelected ? '13' : '11.5'}
                          fontWeight={isSelected ? '700' : '600'}
                        >
                          {city.name === 'Surrounding North Atlanta' ? 'North Atlanta' : city.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              ) : (
                <iframe
                  title="North Georgia Service Area Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d211160.3621899573!2d-84.2941838!3d34.2073196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f59acc747c607b%3A0x600f06e1455267a!2sCumming%2C%20GA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  className="w-full h-full min-h-[360px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </div>

            {/* Active Selected City Footer */}
            <div className="px-5 py-4 bg-navy-950 border-t border-navy-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-forest-600/20 border border-forest-500/40 flex items-center justify-center text-gold-400 shrink-0">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">
                    {activeArea.name}{' '}
                    <span className="text-xs font-normal text-gold-400">
                      • {activeArea.county}
                    </span>
                  </div>
                  <div className="text-xs text-navy-300">{activeArea.notes}</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive City Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 content-between">
            {SERVICE_AREAS.map((area) => {
              const isSelected = selectedCity === area.name;

              return (
                <button
                  key={area.name}
                  type="button"
                  onClick={() => setSelectedCity(area.name)}
                  onMouseEnter={() => setSelectedCity(area.name)}
                  className={`text-left rounded-xl p-4 border transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-forest-50/70 border-forest-600 shadow-sm'
                      : 'bg-warm border-navy-100 hover:border-navy-200 hover:bg-white'
                  }`}
                >
                  <MapPin
                    className={`w-5 h-5 shrink-0 mt-0.5 ${
                      isSelected ? 'text-forest-700' : 'text-navy-500'
                    }`}
                  />
                  <div>
                    <h3 className="font-serif font-bold text-base text-navy-900">
                      {area.name}
                    </h3>
                    <div className="text-xs font-semibold text-forest-700 mb-1">
                      {area.county}
                    </div>
                    <p className="text-xs text-navy-600 leading-relaxed">
                      {area.notes}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
