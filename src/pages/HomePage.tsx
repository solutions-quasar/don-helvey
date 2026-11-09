import React, { useEffect } from 'react';
import { Hero } from '../components/Hero';
import { ProblemCards } from '../components/ProblemCards';
import { ServicesSection } from '../components/ServicesSection';
import { AboutSection } from '../components/AboutSection';
import { MoldTrustPartnership } from '../components/MoldTrustPartnership';
import { HowItWorks } from '../components/HowItWorks';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ServiceAreas } from '../components/ServiceAreas';
import { FAQSection } from '../components/FAQSection';
import { FinalCTA } from '../components/FinalCTA';
import { RoutePath } from '../types';

interface HomePageProps {
  onNavigate: (path: RoutePath, hash?: string) => void;
  onRequestAssessment: () => void;
  onTalkToDon: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onRequestAssessment,
  onTalkToDon
}) => {
  useEffect(() => {
    document.title = "Don Helvey | Mold Remediation & Property Expertise in North Georgia";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Contact Don Helvey for guidance on mold remediation, moisture concerns and property-related issues in the North Atlanta, Georgia area.'
      );
    }
  }, []);

  return (
    <div>
      <Hero 
        onTalkToDon={onTalkToDon} 
        onRequestAssessment={onRequestAssessment} 
      />

      <ProblemCards 
        onRequestAssessment={onRequestAssessment} 
      />

      <ServicesSection 
        onNavigate={onNavigate} 
        onRequestAssessment={onRequestAssessment} 
      />

      <AboutSection 
        onSpeakWithDon={onRequestAssessment} 
      />

      <MoldTrustPartnership />

      <HowItWorks 
        onRequestAssessment={onRequestAssessment} 
      />

      <TestimonialsSection />

      <ServiceAreas />

      <FAQSection />

      <FinalCTA 
        onRequestAssessment={onRequestAssessment} 
      />
    </div>
  );
};

