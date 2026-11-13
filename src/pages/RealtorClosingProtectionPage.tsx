import React, { useEffect, useState } from 'react';
import { Phone, ShieldCheck, CheckCircle2, AlertTriangle, FileText, ArrowRight, Clock, Award, Building } from 'lucide-react';
import { SITE_METADATA } from '../data/content';
import { RoutePath } from '../types';
import { submitContactForm } from '../utils/security';
import { getAssetUrl } from '../utils/assets';

interface PageProps {
  onNavigate: (path: RoutePath, hash?: string) => void;
  onRequestAssessment: () => void;
}

export const RealtorClosingProtectionPage: React.FC<PageProps> = () => {
  const [agentName, setAgentName] = useState('');
  const [brokerage, setBrokerage] = useState('');
  const [phone, setPhone] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [closingDate, setClosingDate] = useState('');
  const [inspectionIssue, setInspectionIssue] = useState('Crawl Space Moisture / Mold Flagged');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    document.title = "Save Your Real Estate Closing | Don Helvey (30-Yr GA Broker & Mold Specialist)";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Inspection flagged mold or moisture before closing? Don Helvey (30-year GA broker & GREC instructor) provides fast-track assessments and clearance documentation to keep your contract on schedule.'
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await submitContactForm({
      fullName: `${agentName.trim()} (${brokerage.trim() || 'Real Estate Agent'})`,
      phone: phone.trim(),
      email: '',
      city: propertyAddress.trim() || 'North Georgia Property',
      concernType: `Realtor Closing Emergency: ${inspectionIssue} (Closing: ${closingDate || 'Urgent'})`,
      message: `Property: ${propertyAddress}. Brokerage: ${brokerage}. Closing Date Target: ${closingDate}. Issue: ${inspectionIssue}`,
      consent: true,
      _gotcha: honeypot,
    });
    setIsSubmitting(false);
    if (result.success) {
      setSubmitSuccess(true);
    }
  };

  return (
    <div className="bg-warm text-navy-950 font-sans">
      {/* Top Realtor Emergency Header Banner */}
      <section className="bg-navy-950 text-white pt-12 pb-16 sm:pb-20 relative overflow-hidden border-b border-navy-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left 7 Cols: Headline, Badges & Stats */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/40 text-xs font-bold uppercase tracking-wider">
                <Award className="w-4 h-4 text-gold-400" />
                <span>Dedicated Real Estate Broker & Agent Fast-Track Solution</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Home Inspection Flagged Mold? <br />
                <span className="text-gold-400 italic">Don’t Let It Kill Your Closing.</span>
              </h1>

              <p className="text-base sm:text-lg text-navy-200 leading-relaxed max-w-2xl">
                As a <strong className="text-white font-semibold">30-year licensed Georgia Real Estate Broker</strong> and <strong className="text-white font-semibold">GREC-Approved CE Instructor</strong>, Don Helvey steps in immediately to evaluate moisture, calm anxious buyers, and provide lender-approved remediation clearance on schedule.
              </p>

              {/* Quick Stats Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-800 text-center sm:text-left">
                  <div className="text-gold-400 font-bold text-xl sm:text-2xl font-serif">24–48h</div>
                  <div className="text-[11px] text-navy-300 mt-0.5">Fast-Track Assessment</div>
                </div>
                <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-800 text-center sm:text-left">
                  <div className="text-white font-bold text-xl sm:text-2xl font-serif">30 Years</div>
                  <div className="text-[11px] text-navy-300 mt-0.5">GA Broker Experience</div>
                </div>
                <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-800 text-center sm:text-left">
                  <div className="text-forest-400 font-bold text-xl sm:text-2xl font-serif">Clearance</div>
                  <div className="text-[11px] text-navy-300 mt-0.5">Post-Remediation Verification</div>
                </div>
                <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-800 text-center sm:text-left">
                  <div className="text-gold-400 font-bold text-xl sm:text-2xl font-serif">GAR Ready</div>
                  <div className="text-[11px] text-navy-300 mt-0.5">Amendment & Scope Friendly</div>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Visual Card of Don Helvey */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-sm rounded-2xl overflow-hidden bg-navy-900 border-2 border-gold-400/40 shadow-2xl group">
                <img
                  src={getAssetUrl('images/don-helvey.jpg')}
                  alt="Don Helvey, Licensed Georgia Real Estate Broker & Certified Mold Remediator"
                  className="w-full aspect-[4/5] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5 space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-gold-500 text-navy-950 text-[10px] font-bold uppercase tracking-wider">
                    <span>Licensed GA Broker & CE Instructor</span>
                  </div>
                  <div className="font-serif font-bold text-xl text-white">Don Helvey</div>
                  <p className="text-xs text-navy-200 italic leading-snug">
                    "I speak contract deadlines. When an inspection report flags moisture, our job is to protect your closing with objective facts and fast lender clearance."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Conversion Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left 7 Cols: The Realtor Problem & Don's Solution */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* The Agent's Dilemma */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-navy-100 shadow-card space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>The Inspection Contingency Trap</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-navy-950">
                  Why Mold Findings Wreck Real Estate Contracts
                </h2>

                <div className="rounded-xl overflow-hidden aspect-[16/9] border border-navy-100 shadow-2xs my-2">
                  <img
                    src={getAssetUrl('images/pre-sale-home-walkthrough.jpg')}
                    alt="Pre-sale real estate inspection walkthrough"
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-sm sm:text-base text-navy-700 leading-relaxed">
                  When a private home inspector notes "microbial growth" or "elevated wood moisture" in a crawl space, panic sets in:
                </p>
                <ul className="space-y-3 text-sm text-navy-800">
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
                    <span><strong>Buyers panic:</strong> They assume toxic black mold and threaten to terminate under the due diligence period.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
                    <span><strong>Scare-tactic contractors:</strong> Other remediation firms give terrifying $18,000 quotes that sellers refuse to pay.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
                    <span><strong>Lender underwriting freezes:</strong> Mortgages stall until certified clearance documentation is provided.</span>
                  </li>
                </ul>
              </div>

              {/* How Don Helvey Protects the Transaction */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-navy-100 shadow-card space-y-5">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest-700">
                  <ShieldCheck className="w-4 h-4 text-forest-600" />
                  <span>The Broker-to-Broker Advantage</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-navy-950">
                  How Don Helvey Saves the Transaction
                </h2>

                <div className="rounded-xl overflow-hidden aspect-[16/9] border border-navy-100 shadow-2xs">
                  <img
                    src={getAssetUrl('images/moisture-meter-wall.jpg')}
                    alt="Calibrated diagnostic moisture meter testing on building materials"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-warm border border-navy-100 flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-forest-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-base text-navy-950">1. Fast-Track 24–48 Hour Response</h3>
                      <p className="text-xs sm:text-sm text-navy-600 mt-0.5">
                        Don understands due diligence deadlines. He walks the crawl space, basement, or attic within 24 to 48 hours to measure real moisture levels.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-warm border border-navy-100 flex items-start gap-3.5">
                    <FileText className="w-5 h-5 text-forest-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-base text-navy-950">2. Objective, Non-Alarmist Work Scope</h3>
                      <p className="text-xs sm:text-sm text-navy-600 mt-0.5">
                        No inflated fear-mongering. Don writes a clean, accurate work scope tailored to satisfy buyer concerns and appraisal underwriting.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-warm border border-navy-100 flex items-start gap-3.5">
                    <CheckCircle2 className="w-5 h-5 text-forest-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-base text-navy-950">3. Rapid Execution & Clearance via Mold Trust</h3>
                      <p className="text-xs sm:text-sm text-navy-600 mt-0.5">
                        Remediation is coordinated directly with certified Mold Trust Inc. crews. Includes third-party clearance documentation delivered before your closing date.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CE Instructor Callout */}
              <div className="p-6 rounded-2xl bg-navy-950 text-white border border-navy-800 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-gold-400">
                  Free Continuing Education (CE) for Your Brokerage
                </div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Want Don to Teach a Free GREC-Approved CE Class at Your Office?
                </h3>
                <p className="text-xs sm:text-sm text-navy-300 leading-relaxed">
                  Don Helvey is an approved instructor under the Georgia Real Estate Commission. He regularly teaches North Georgia brokerages how to navigate mold and moisture inspection issues without losing buyers.
                </p>
                <div className="pt-1">
                  <a
                    href={`tel:${SITE_METADATA.rawPhone}`}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gold-400 hover:text-gold-300"
                  >
                    <span>Contact Don to schedule a CE class for your office →</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Right 5 Cols: Emergency Realtor Request Card */}
            <div className="lg:col-span-5 sticky top-24">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-navy-100 shadow-card space-y-5">
                <div className="border-b border-navy-100 pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-forest-700">
                    Direct Realtor Hotline
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-navy-950 mt-1">
                    Request an Emergency Closing Assessment
                  </h3>
                  <p className="text-xs text-navy-600 mt-1">
                    Call Don directly or submit the property address below for same-day triage.
                  </p>
                </div>

                {/* Direct Call Button */}
                <a
                  href={`tel:${SITE_METADATA.rawPhone}`}
                  className="w-full py-3.5 px-4 rounded-xl bg-forest-600 hover:bg-forest-700 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-sm transition-all"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Don: {SITE_METADATA.phone}</span>
                </a>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-navy-100" />
                  <span className="flex-shrink mx-3 text-xs uppercase font-bold text-navy-400">
                    Or Submit Fast-Track Details
                  </span>
                  <div className="flex-grow border-t border-navy-100" />
                </div>

                {submitSuccess ? (
                  <div className="p-6 rounded-xl bg-forest-50 border border-forest-300 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-forest-700 mx-auto" />
                    <h4 className="font-bold text-navy-950 text-base">Inquiry Received!</h4>
                    <p className="text-xs text-navy-700">
                      Don Helvey has received your transaction details and will follow up promptly at <strong>{phone}</strong>.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5 text-xs sm:text-sm">
                    {/* Honeypot anti-spam */}
                    <input
                      type="text"
                      name="_gotcha"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div>
                      <label className="block text-xs font-bold uppercase text-navy-700 mb-1">
                        Agent Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={agentName}
                        onChange={(e) => setAgentName(e.target.value)}
                        placeholder="e.g. Sarah Mitchell"
                        className="w-full rounded-xl border border-navy-200 bg-warm px-3.5 py-2.5 text-navy-950 focus:outline-none focus:border-forest-600 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-navy-700 mb-1">
                        Brokerage / Office *
                      </label>
                      <input
                        type="text"
                        required
                        value={brokerage}
                        onChange={(e) => setBrokerage(e.target.value)}
                        placeholder="e.g. Keller Williams North Atlanta"
                        className="w-full rounded-xl border border-navy-200 bg-warm px-3.5 py-2.5 text-navy-950 focus:outline-none focus:border-forest-600 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-navy-700 mb-1">
                        Direct Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(770) 555-0123"
                        className="w-full rounded-xl border border-navy-200 bg-warm px-3.5 py-2.5 text-navy-950 focus:outline-none focus:border-forest-600 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-navy-700 mb-1">
                        Property Address & City *
                      </label>
                      <input
                        type="text"
                        required
                        value={propertyAddress}
                        onChange={(e) => setPropertyAddress(e.target.value)}
                        placeholder="e.g. 4120 Polo Club Dr, Cumming"
                        className="w-full rounded-xl border border-navy-200 bg-warm px-3.5 py-2.5 text-navy-950 focus:outline-none focus:border-forest-600 text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-xs font-bold uppercase text-navy-700 mb-1">
                          Closing Date
                        </label>
                        <input
                          type="text"
                          value={closingDate}
                          onChange={(e) => setClosingDate(e.target.value)}
                          placeholder="e.g. Nov 24"
                          className="w-full rounded-xl border border-navy-200 bg-warm px-3 py-2 text-navy-950 text-xs sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-navy-700 mb-1">
                          Flagged Issue
                        </label>
                        <select
                          value={inspectionIssue}
                          onChange={(e) => setInspectionIssue(e.target.value)}
                          className="w-full rounded-xl border border-navy-200 bg-warm px-2 py-2 text-navy-950 text-xs font-medium"
                        >
                          <option value="Crawl Space Moisture">Crawl Space</option>
                          <option value="Visible Mold on Joists">Joist Mold</option>
                          <option value="Basement Humidity">Basement</option>
                          <option value="Lender Re-Inspection">Lender Flag</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-4 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Details to Don Helvey'}
                      <ArrowRight className="w-4 h-4 text-gold-400" />
                    </button>
                  </form>
                )}

                <div className="pt-2 text-center text-xs text-navy-500 flex items-center justify-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-forest-700" />
                  <span>Brokerage consultations treated with strict confidentiality.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
