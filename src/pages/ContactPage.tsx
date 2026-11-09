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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mb-10">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-navy-900 tracking-tight mb-3">
            Contact Don Helvey
          </h1>
          <p className="text-base sm:text-lg text-navy-600">
            Call directly or complete the form below to discuss a mold or moisture concern.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Details */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white border border-navy-100 p-7 shadow-card space-y-6">
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
                  className="font-semibold text-base text-navy-900 hover:text-forest-700 flex items-center gap-2.5"
                >
                  <Mail className="w-5 h-5 text-forest-600 shrink-0" />
                  <span>{SITE_METADATA.email}</span>
                </a>
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-navy-500 mb-1">
                  Service Area
                </div>
                <div className="text-sm text-navy-700 flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-forest-600 shrink-0 mt-0.5" />
                  <span>North Atlanta, GA (Cumming, Alpharetta, Dawsonville, Canton, Woodstock, Gainesville & Johns Creek)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white border border-navy-100 p-7 sm:p-8 shadow-card">
              {submissionStatus ? (
                <div className="p-6 rounded-xl bg-forest-50 border border-forest-200 text-center">
                  <CheckCircle2 className="w-10 h-10 text-forest-600 mx-auto mb-3" />
                  <h3 className="font-serif text-2xl font-bold text-navy-900 mb-2">Thank You</h3>
                  <p className="text-sm text-navy-700 mb-5">
                    {submissionStatus.message}
                  </p>
                  <a
                    href={`tel:${SITE_METADATA.rawPhone}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-600 text-white font-semibold text-sm"
                  >
                    <Phone className="w-4 h-4 text-gold-300" />
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-navy-200 text-sm focus:border-forest-600 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-navy-200 text-sm focus:border-forest-600 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-navy-200 text-sm focus:border-forest-600 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-navy-200 text-sm focus:border-forest-600 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1">
                      Type of Concern
                    </label>
                    <select
                      value={formData.concernType}
                      onChange={(e) => setFormData({ ...formData, concernType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-navy-200 text-sm focus:border-forest-600 outline-none bg-white"
                    >
                      <option value="Visible Mold">Visible Mold</option>
                      <option value="Moisture & Water Damage">Moisture & Water Damage</option>
                      <option value="Crawl Space Concerns">Crawl Space Concerns</option>
                      <option value="Real Estate / Pre-Sale">Property & Pre-Sale Mold Concerns</option>
                      <option value="Other">Other Property Concern</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-navy-200 text-sm focus:border-forest-600 outline-none resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      id="consent_page"
                      type="checkbox"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded text-forest-600 border-navy-300"
                    />
                    <label htmlFor="consent_page" className="text-xs text-navy-600">
                      I consent to be contacted by Don Helvey regarding my inquiry. Your contact information is kept private.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl bg-forest-600 hover:bg-forest-700 text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-75"
                  >
                    <Send className="w-4 h-4 text-gold-300" />
                    <span>{loading ? 'Sending...' : 'Request an Assessment'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
