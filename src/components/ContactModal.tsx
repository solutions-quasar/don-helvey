import React, { useState } from 'react';
import { X, Phone, ShieldCheck, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { SITE_METADATA } from '../data/content';
import { ContactFormData } from '../types';
import { submitContactForm, SubmissionResult } from '../utils/security';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultConcern?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultConcern = 'Visible Mold'
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    concernType: defaultConcern,
    message: '',
    consent: true,
    _gotcha: ''
  });

  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionResult | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmissionStatus(null);

    const result = await submitContactForm(formData);
    setLoading(false);
    setSubmissionStatus(result);

    if (result.success && !result.isBotRejected) {
      // Clear fields on successful human submission
      setTimeout(() => {
        // Keep message visible for user confirmation
      }, 500);
    }
  };

  const handleReset = () => {
    setSubmissionStatus(null);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      city: '',
      concernType: defaultConcern,
      message: '',
      consent: true,
      _gotcha: ''
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      
      {/* Modal Card */}
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-navy-100 overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Header Bar */}
        <div className="bg-navy-900 text-white p-5 sm:p-6 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Assessment Request & Inquiry</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Connect With Don Helvey
            </h3>
            <p className="text-xs text-navy-200 mt-1">
              Speak directly with a 30-year Georgia real estate and mold specialist.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-navy-300 hover:text-white hover:bg-navy-800 transition-colors"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7">
          
          {submissionStatus ? (
            /* App-Native Confirmation State */
            <div className={`p-6 rounded-xl border text-center ${
              submissionStatus.success 
                ? 'bg-forest-50/70 border-forest-200 text-forest-950' 
                : 'bg-red-50 border-red-200 text-red-900'
            }`}>
              {submissionStatus.success ? (
                <>
                  <div className="w-14 h-14 rounded-full bg-forest-600 text-white flex items-center justify-center mx-auto mb-4 shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-navy-900 mb-2">
                    Inquiry Received
                  </h4>
                  <p className="text-sm text-navy-700 leading-relaxed mb-6">
                    {submissionStatus.message}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`tel:${SITE_METADATA.rawPhone}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-forest-600 text-white text-xs font-semibold shadow"
                    >
                      <Phone className="w-4 h-4 text-gold-300" />
                      <span>Call Don: {SITE_METADATA.phone}</span>
                    </a>
                    <button
                      onClick={onClose}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-warm border border-navy-200 text-navy-800 text-xs font-semibold hover:bg-lightgray"
                    >
                      Done
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-red-950 mb-2">
                    Notice
                  </h4>
                  <p className="text-sm text-red-800 leading-relaxed mb-6">
                    {submissionStatus.message}
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-xl bg-navy-900 text-white text-xs font-semibold"
                  >
                    Try Again
                  </button>
                </>
              )}
            </div>
          ) : (
            /* Contact Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Honeypot Field (Anti-Spam Bot Trap) */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="_gotcha_modal">Do not fill this</label>
                <input
                  id="_gotcha_modal"
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData._gotcha}
                  onChange={(e) => setFormData({ ...formData, _gotcha: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Michael Smith"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-navy-200 text-sm focus:ring-2 focus:ring-forest-500/40 focus:border-forest-600 outline-none transition-all"
                  />
                </div>

                {/* Phone */}
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-navy-200 text-sm focus:ring-2 focus:ring-forest-500/40 focus:border-forest-600 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-navy-200 text-sm focus:ring-2 focus:ring-forest-500/40 focus:border-forest-600 outline-none transition-all"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1">
                    City / Community <span className="text-navy-400 font-normal">(Georgia)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cumming, Alpharetta, etc."
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-navy-200 text-sm focus:ring-2 focus:ring-forest-500/40 focus:border-forest-600 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Concern Type */}
              <div>
                <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1">
                  Type of Property Concern
                </label>
                <select
                  value={formData.concernType}
                  onChange={(e) => setFormData({ ...formData, concernType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-navy-200 text-sm focus:ring-2 focus:ring-forest-500/40 focus:border-forest-600 outline-none transition-all bg-white"
                >
                  <option value="Visible Mold">Visible Mold on Walls, Ceilings or Vents</option>
                  <option value="Moisture & Water Damage">Moisture Intrusion / Plumbing or Roof Leak</option>
                  <option value="Crawl Space Concerns">Crawl Space / Musty Odors / Encapsulation</option>
                  <option value="Real Estate / Pre-Sale">Real Estate Due Diligence / Pre-Sale Inspection</option>
                  <option value="General Property Consultation">General Property Moisture Consultation</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1">
                  Briefly Describe What You've Noticed
                </label>
                <textarea
                  rows={3}
                  placeholder="Share details such as how long you've noticed it, home foundation type (crawl space, basement, slab), or inspection timelines..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-navy-200 text-sm focus:ring-2 focus:ring-forest-500/40 focus:border-forest-600 outline-none transition-all resize-none"
                />
              </div>

              {/* Consent and Privacy */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  id="consent_modal"
                  type="checkbox"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded text-forest-600 focus:ring-forest-500 border-navy-300"
                />
                <label htmlFor="consent_modal" className="text-xs text-navy-600 leading-snug">
                  I agree to receive a direct phone call or email from Don Helvey regarding my property inquiry. Your information remains completely confidential.
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-forest-600 hover:bg-forest-700 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 focus:ring-2 focus:ring-forest-500/50 disabled:opacity-75"
                >
                  {loading ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-gold-300" />
                      <span>Submit Request to Don Helvey</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct Call Alternative */}
              <div className="text-center pt-2">
                <p className="text-xs text-navy-500">
                  Prefer an immediate conversation? Call directly:{' '}
                  <a href={`tel:${SITE_METADATA.rawPhone}`} className="font-bold text-forest-700 hover:underline">
                    (770) 833-7410
                  </a>
                </p>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};

