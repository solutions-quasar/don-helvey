import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { SITE_METADATA } from '../data/content';
import { RoutePath, ContactFormData } from '../types';
import { submitContactForm, SubmissionResult } from '../utils/security';

interface PageProps {
  onNavigate: (path: RoutePath, hash?: string) => void;
}

export const ContactPage: React.FC<PageProps> = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    concernType: 'Visible Mold',
    message: '',
    consent: true,
    _gotcha: ''
  });

  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionResult | null>(null);

  useEffect(() => {
    document.title = "Contact Don Helvey | Mold & Property Expertise in North Georgia";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Contact Don Helvey for mold remediation, inspection, and crawl space moisture guidance in North Atlanta, Georgia.'
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmissionStatus(null);

    const result = await submitContactForm(formData);
    setLoading(false);
    setSubmissionStatus(result);
  };

  return (
    <div className="py-12 sm:py-16 bg-warm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-xl mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight mb-2">
            Contact Don Helvey
          </h1>
          <p className="text-base text-navy-600">
            Call directly or request a quick callback below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Short Form First on Mobile */}
          <div className="md:col-span-7">
            <div className="rounded-2xl bg-white border border-navy-100 p-6 sm:p-7 shadow-card">
              {submissionStatus ? (
                <div className="p-5 rounded-xl bg-forest-50 border border-forest-200 text-center">
                  <CheckCircle2 className="w-10 h-10 text-forest-600 mx-auto mb-2.5" />
                  <h3 className="font-serif text-xl font-bold text-navy-900 mb-1.5">Request Received</h3>
                  <p className="text-sm text-navy-700 mb-4">
                    {submissionStatus.message}
                  </p>
                  <a
                    href={`tel:${SITE_METADATA.rawPhone}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-600 text-white font-semibold text-xs"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Don: {SITE_METADATA.phone}</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field */}
                  <div style={{ display: 'none' }} aria-hidden="true">
                    <label htmlFor="_gotcha_page">Leave this empty</label>
                    <input
                      id="_gotcha_page"
                      type="text"
                      name="_gotcha"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData._gotcha}
                      onChange={(e) => setFormData({ ...formData, _gotcha: e.target.value })}
                    />
                  </div>

                  {/* 1. Phone Number FIRST */}
                  <div>
                    <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(770) 555-0123"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-navy-200 text-sm focus:border-forest-600 outline-none"
                    />
                  </div>

                  {/* 2. Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-navy-200 text-sm focus:border-forest-600 outline-none"
                    />
                  </div>

                  {/* 3. Brief Optional Note */}
                  <div>
                    <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1">
                      How Can Don Help? <span className="text-navy-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder="City & brief note (e.g. Cumming — crawl space moisture or visible spots)"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-navy-200 text-sm focus:border-forest-600 outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl bg-forest-600 hover:bg-forest-700 text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-75"
                  >
                    <Send className="w-4 h-4 text-white" />
                    <span>{loading ? 'Sending...' : 'Send Request'}</span>
                  </button>

                  <p className="text-[11px] text-center text-navy-400">
                    100% Private & Confidential • Direct callback from Don Helvey
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Direct Contact Details */}
          <div className="md:col-span-5">
            <div className="rounded-2xl bg-white border border-navy-100 p-6 shadow-card space-y-5">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-navy-500 mb-1">
                  Phone
                </div>
                <a
                  href={`tel:${SITE_METADATA.rawPhone}`}
                  className="font-serif font-bold text-xl text-navy-900 hover:text-forest-700 flex items-center gap-2.5"
                >
                  <Phone className="w-5 h-5 text-forest-600 shrink-0" />
                  <span>{SITE_METADATA.phone}</span>
                </a>
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-navy-500 mb-1">
                  Email
                </div>
                <a
                  href={`mailto:${SITE_METADATA.email}`}
                  className="font-semibold text-sm text-navy-900 hover:text-forest-700 flex items-center gap-2.5"
                >
                  <Mail className="w-4 h-4 text-forest-600 shrink-0" />
                  <span>{SITE_METADATA.email}</span>
                </a>
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-navy-500 mb-1">
                  Service Area
                </div>
                <div className="text-xs text-navy-700 flex items-start gap-2.5 leading-relaxed">
                  <MapPin className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
                  <span>North Atlanta, GA (Cumming, Alpharetta, Dawsonville, Canton, Woodstock, Gainesville & Johns Creek)</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
