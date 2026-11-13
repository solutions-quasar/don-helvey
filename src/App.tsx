import React, { useState, useEffect } from 'react';
import { RoutePath } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { StickyMobileBar } from './components/StickyMobileBar';
import { HomePage } from './pages/HomePage';
import { MoldRemediationPage } from './pages/MoldRemediationPage';
import { MoldInspectionPage } from './pages/MoldInspectionPage';
import { CrawlSpacePage } from './pages/CrawlSpacePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { RealtorClosingProtectionPage } from './pages/RealtorClosingProtectionPage';
import { HomeownerHealthPage } from './pages/HomeownerHealthPage';
import { AdminErpPage } from './pages/AdminErpPage';
import { SITE_METADATA } from './data/content';

// Helper to determine the repository base path on GitHub Pages
const getBasePath = (): string => {
  if (typeof window !== 'undefined') {
    if (window.location.hostname.endsWith('github.io')) {
      return '/don-helvey';
    }
    if (window.location.pathname.startsWith('/don-helvey')) {
      return '/don-helvey';
    }
  }
  return '';
};

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<RoutePath>('/');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConcern, setModalConcern] = useState('Visible Mold');

  // Parse path and resolve GitHub Pages SPA redirect queries (?p=/...)
  useEffect(() => {
    const parseLocation = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const redirectPath = urlParams.get('p');
      const basePath = getBasePath();

      if (redirectPath) {
        // Clean up URL without query parameter, keeping repository basePath
        let cleanPath = redirectPath.startsWith('/') ? redirectPath : `/${redirectPath}`;
        if (!cleanPath.endsWith('/')) {
          cleanPath = `${cleanPath}/`;
        }
        const normalizedTarget = `${basePath}${cleanPath}${window.location.hash}`;
        window.history.replaceState(null, '', normalizedTarget);
        if (['/', '/mold-remediation/', '/mold-inspection/', '/crawl-space-moisture/', '/about/', '/contact/', '/realtor-closing-protection/', '/homeowner-mold-health/', '/admin/'].includes(cleanPath)) {
          setCurrentPath(cleanPath as RoutePath);
        } else {
          setCurrentPath('/');
        }
        return;
      }

      // Standard pathname detection relative to base
      let pathname = window.location.pathname;
      // Strip repo name if hosted under solutions-quasar.github.io/don-helvey/
      if (pathname.includes('/don-helvey')) {
        pathname = pathname.replace('/don-helvey', '');
      }

      // Normalize trailing slash
      if (!pathname.endsWith('/')) {
        pathname = `${pathname}/`;
      }

      if (['/', '/mold-remediation/', '/mold-inspection/', '/crawl-space-moisture/', '/about/', '/contact/', '/realtor-closing-protection/', '/homeowner-mold-health/', '/admin/'].includes(pathname)) {
        setCurrentPath(pathname as RoutePath);
      } else {
        setCurrentPath('/');
      }
    };

    parseLocation();

    const handlePopState = () => {
      parseLocation();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: RoutePath, hash?: string) => {
    setCurrentPath(path);

    // Update browser URL preserving GitHub Pages repo basePath
    const basePath = getBasePath();
    const targetUrl = `${basePath}${path}${hash || ''}`;
    window.history.pushState(null, '', targetUrl);

    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openAssessmentModal = (concern?: string) => {
    if (concern) setModalConcern(concern);
    setIsModalOpen(true);
  };

  const renderCurrentView = () => {
    switch (currentPath) {
      case '/mold-remediation/':
        return (
          <MoldRemediationPage
            onNavigate={handleNavigate}
            onRequestAssessment={() => openAssessmentModal('Mold Remediation')}
          />
        );
      case '/mold-inspection/':
        return (
          <MoldInspectionPage
            onNavigate={handleNavigate}
            onRequestAssessment={() => openAssessmentModal('Mold Inspection')}
          />
        );
      case '/crawl-space-moisture/':
        return (
          <CrawlSpacePage
            onNavigate={handleNavigate}
            onRequestAssessment={() => openAssessmentModal('Crawl Space Concerns')}
          />
        );
      case '/about/':
        return (
          <AboutPage
            onNavigate={handleNavigate}
            onRequestAssessment={() => openAssessmentModal('General Consultation')}
          />
        );
      case '/contact/':
        return (
          <ContactPage
            onNavigate={handleNavigate}
          />
        );
      case '/realtor-closing-protection/':
        return (
          <RealtorClosingProtectionPage
            onNavigate={handleNavigate}
            onRequestAssessment={() => openAssessmentModal('Realtor Closing Issue')}
          />
        );
      case '/homeowner-mold-health/':
        return (
          <HomeownerHealthPage
            onNavigate={handleNavigate}
            onRequestAssessment={() => openAssessmentModal('Family Health & Air Quality')}
          />
        );
      case '/':
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onRequestAssessment={() => openAssessmentModal('Visible Mold')}
            onTalkToDon={() => {
              window.location.href = `tel:${SITE_METADATA.rawPhone}`;
            }}
          />
        );
    }
  };

  if (currentPath === '/admin/') {
    return <AdminErpPage onNavigate={handleNavigate} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-warm text-navy-800 font-sans">
      
      {/* Top Header */}
      <Header
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onRequestAssessment={() => openAssessmentModal()}
      />

      {/* Main Content Page View */}
      <main className="flex-grow">
        {renderCurrentView()}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Sticky Mobile Conversion Bar (360-430px optimized) */}
      <StickyMobileBar
        onRequestAssessment={() => openAssessmentModal()}
      />

      {/* Assessment / Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultConcern={modalConcern}
      />

    </div>
  );
};

export default App;

