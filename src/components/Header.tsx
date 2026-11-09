import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { SITE_METADATA } from '../data/content';
import { RoutePath } from '../types';

interface HeaderProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath, hash?: string) => void;
  onRequestAssessment: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate, onRequestAssessment }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path: RoutePath, hash?: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    onNavigate(path, hash);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-navy-100/70 py-3.5'
          : 'bg-warm border-b border-lightgray py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3 text-left shrink-0 focus:outline-none group"
            aria-label="Don Helvey Home"
          >
            <div className="w-10 h-10 rounded-lg bg-navy-800 flex items-center justify-center text-warm font-serif font-bold text-lg border border-gold-400/50 shrink-0">
              DH
            </div>
            <div className="whitespace-nowrap">
              <div className="font-serif font-bold text-lg text-navy-900 tracking-tight leading-none">
                DON HELVEY
              </div>
              <div className="text-[11px] font-semibold tracking-wider uppercase text-forest-600 mt-1">
                Mold & Property Expertise
              </div>
            </div>
          </button>

          {/* Streamlined Desktop Navigation — 4 Clear Options */}
          <nav className="hidden md:flex items-center gap-9">
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('/', '#services')}
                className={`flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap transition-colors hover:text-forest-600 py-1 ${
                  currentPath.includes('mold') || currentPath.includes('crawl')
                    ? 'text-forest-600'
                    : 'text-navy-800'
                }`}
              >
                <span>Mold Services</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-60 pt-1.5 z-50">
                  <div className="bg-white rounded-xl shadow-premium border border-navy-100 p-1.5 space-y-0.5">
                    <button
                      onClick={() => handleNavClick('/mold-inspection/')}
                      className="w-full text-left px-3.5 py-2.5 text-sm font-medium rounded-lg text-navy-800 hover:bg-forest-50 hover:text-forest-700 transition-colors block"
                    >
                      Mold Inspection
                    </button>
                    <button
                      onClick={() => handleNavClick('/mold-remediation/')}
                      className="w-full text-left px-3.5 py-2.5 text-sm font-medium rounded-lg text-navy-800 hover:bg-forest-50 hover:text-forest-700 transition-colors block"
                    >
                      Mold Remediation
                    </button>
                    <button
                      onClick={() => handleNavClick('/crawl-space-moisture/')}
                      className="w-full text-left px-3.5 py-2.5 text-sm font-medium rounded-lg text-navy-800 hover:bg-forest-50 hover:text-forest-700 transition-colors block"
                    >
                      Crawl Space Moisture
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('/about/')}
              className={`text-sm font-semibold whitespace-nowrap transition-colors hover:text-forest-600 ${
                currentPath === '/about/' ? 'text-forest-600' : 'text-navy-800'
              }`}
            >
              About Don
            </button>

            <button
              onClick={() => handleNavClick('/', '#service-areas')}
              className="text-sm font-semibold text-navy-800 whitespace-nowrap transition-colors hover:text-forest-600"
            >
              Service Areas
            </button>

            <button
              onClick={() => handleNavClick('/contact/')}
              className={`text-sm font-semibold whitespace-nowrap transition-colors hover:text-forest-600 ${
                currentPath === '/contact/' ? 'text-forest-600' : 'text-navy-800'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Single Clean Header CTA */}
          <div className="hidden md:flex items-center shrink-0">
            <button
              onClick={onRequestAssessment}
              className="bg-forest-600 hover:bg-forest-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-sm transition-all whitespace-nowrap"
            >
              Request an Assessment
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={`tel:${SITE_METADATA.rawPhone}`}
              className="p-2.5 text-forest-700 bg-forest-50 rounded-lg"
              aria-label="Call Don"
            >
              <Phone className="w-5 h-5" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-navy-800 hover:bg-navy-50"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-navy-100 shadow-lg px-4 pt-3 pb-6 space-y-2">
          <button
            onClick={() => handleNavClick('/')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-base font-medium text-navy-800 hover:bg-forest-50"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('/mold-inspection/')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-base font-medium text-navy-800 hover:bg-forest-50"
          >
            Mold Inspection
          </button>
          <button
            onClick={() => handleNavClick('/mold-remediation/')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-base font-medium text-navy-800 hover:bg-forest-50"
          >
            Mold Remediation
          </button>
          <button
            onClick={() => handleNavClick('/crawl-space-moisture/')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-base font-medium text-navy-800 hover:bg-forest-50"
          >
            Crawl Space Moisture
          </button>
          <button
            onClick={() => handleNavClick('/about/')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-base font-medium text-navy-800 hover:bg-forest-50"
          >
            About Don
          </button>
          <button
            onClick={() => handleNavClick('/', '#service-areas')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-base font-medium text-navy-800 hover:bg-forest-50"
          >
            Service Areas
          </button>
          <button
            onClick={() => handleNavClick('/contact/')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-base font-medium text-navy-800 hover:bg-forest-50"
          >
            Contact
          </button>

          <div className="pt-3 border-t border-navy-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestAssessment();
              }}
              className="w-full py-3 rounded-lg bg-forest-600 text-white font-semibold text-sm text-center"
            >
              Request an Assessment
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
