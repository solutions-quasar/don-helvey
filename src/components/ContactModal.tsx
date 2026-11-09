import React, { useState } from 'react';
import { X, Phone, Send, CheckCircle2, AlertCircle } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 bg-navy-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      
      {/* Compact Modal Card */}
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-navy-100 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Compact Header */}
        <div className="bg-navy-900 text-white px-5 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-white leading-tight">
              Request a Callback
            </h3>
            <p className="text-xs text-navy-200 mt-0.5">
              Direct response from Don Helvey
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

        {/* Form Body */}
        <div className="p-5">
          {submissionStatus ? (
            <div
              className={`p-5 rounded-xl border text-center ${
                submissionStatus.success
                  ? 'bg-forest-50 border-forest-200 text-navy-900'
                  : 'bg-red-50 border-red-200 text-red-900'
              }`}
            >
              {submissionStatus.success ? (
                <>
                  <CheckCircle2 className="w-10 h-10 text-forest-600 mx-auto mb-2.5" />
                  <h4 className="font-serif text-xl font-bold text-navy-900 mb-1.5">
                    Request Received
                  </h4>
                  <p className="text-xs sm:text-sm text-navy-700 leading-relaxed mb-4">
                    {submissionStatus.message}
                  </p>
                  <button
                    onClick={onClose}
                    className="w-full py-2.5 rounded-xl bg-navy-900 text-white text-xs font-semibold"
                  >
                    Done
                  </button>
                </>
              ) : (
                <>
                  <AlertCircle className="w-10 h-10 text-red-600 mx-auto mb-2.5" />
                  <p className="text-xs sm:text-sm text-red-800 mb-4">
                    {submissionStatus.message}
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-5 py-2 rounded-xl bg-navy-900 text-white text-xs font-semibold"
                  >
                    Try Again
                  </button>
                </>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
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

              {/* 1. Phone Number FIRST */}
              <div>
                <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  autoFocus
                  placeholder="(770) 555-0123"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-navy-200 text-sm focus:ring-2 focus:ring-forest-500/40 focus:border-forest-600 outline-none"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-navy-200 text-sm focus:ring-2 focus:ring-forest-500/40 focus:border-forest-600 outline-none"
                />
              </div>

              {/* 3. Short Optional Note */}
              <div>
                <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1">
                  How Can Don Help? <span className="text-navy-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="City & brief note (e.g. Cumming — musty crawl space or visible spots)"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-navy-200 text-sm focus:ring-2 focus:ring-forest-500/40 focus:border-forest-600 outline-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-75"
              >
                <Send className="w-4 h-4 text-white" />
                <span>{loading ? 'Sending...' : 'Send Request'}</span>
              </button>

              {/* Direct Call Link */}
              <div className="text-center pt-1 flex items-center justify-between text-xs text-navy-500 border-t border-navy-100 mt-2">
                <span>100% Private & Confidential</span>
                <a
                  href={`tel:${SITE_METADATA.rawPhone}`}
                  className="font-bold text-forest-700 hover:underline inline-flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{SITE_METADATA.phone}</span>
                </a>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
