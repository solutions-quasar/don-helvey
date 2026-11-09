import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/content';

interface HowItWorksProps {
  onRequestAssessment: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = () => {
  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-white border-b border-lightgray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight mb-3">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-navy-600">
            A straightforward four-step process to evaluate your property and plan the right solution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div
              key={step.step}
              className="rounded-2xl bg-warm border border-navy-100 p-6 sm:p-7"
            >
              <div className="font-serif text-2xl font-bold text-forest-700 mb-3">
                {step.step}
              </div>

              <h3 className="font-serif text-xl font-bold text-navy-900 mb-2">
                {step.title}
              </h3>

              <p className="text-sm sm:text-base text-navy-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
