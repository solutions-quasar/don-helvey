import React, { useEffect, useState } from 'react';
import { Phone, HeartHandshake, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Home } from 'lucide-react';
import { SITE_METADATA } from '../data/content';
import { RoutePath } from '../types';
import { submitContactForm } from '../utils/security';
import { getAssetUrl } from '../utils/assets';

interface PageProps {
  onNavigate: (path: RoutePath, hash?: string) => void;
  onRequestAssessment: () => void;
}

export const HomeownerHealthPage: React.FC<PageProps> = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [symptomsOrConcern, setSymptomsOrConcern] = useState('Musty Smell & Odor');
  const [notes, setNotes] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    document.title = "Healthy Home & Family Air Quality | Don Helvey (Certified Mold Inspector)";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Worried that crawl space moisture or mold is affecting your family’s health? Don Helvey provides calm, scientific moisture evaluations and certified remediation coordination in North Georgia.'
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await submitContactForm({
      fullName: name.trim(),
      phone: phone.trim(),
      email: '',
      city: city.trim() || 'North Georgia Home',
      concernType: `Family Health & Air Quality: ${symptomsOrConcern}`,
      message: `Homeowner Health Inquiry. City: ${city}. Concern: ${symptomsOrConcern}. Notes: ${notes}`,
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
      {/* Top Health Header */}
      <section className="bg-navy-950 text-white pt-12 pb-16 sm:pb-20 relative overflow-hidden border-b border-navy-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left 7 Cols: Headline & Key Stats */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-500/20 text-forest-300 border border-forest-400/40 text-xs font-bold uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4 text-forest-400" />
                <span>Protecting Family Air Quality & Living Spaces</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Worried Mold in Your Home is <br />
                <span className="text-gold-400 italic">Affecting Your Family’s Health?</span>
              </h1>

              <p className="text-base sm:text-lg text-navy-200 leading-relaxed max-w-2xl">
                Up to 50% of the air on your first floor comes directly from your crawl space or basement. Don Helvey provides <strong className="text-white font-semibold">calm, scientific moisture diagnostics</strong> and honest guidance—without the fear-mongering high-pressure sales tactics.
              </p>

              {/* Key Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-800 text-center sm:text-left">
                  <div className="text-gold-400 font-bold text-xl sm:text-2xl font-serif">Zero Panic</div>
                  <div className="text-[11px] text-navy-300 mt-0.5">Honest, Calm Guidance</div>
                </div>
                <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-800 text-center sm:text-left">
                  <div className="text-forest-400 font-bold text-xl sm:text-2xl font-serif">Air Quality</div>
                  <div className="text-[11px] text-navy-300 mt-0.5">Air Flow Analysis</div>
                </div>
                <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-800 text-center sm:text-left">
                  <div className="text-white font-bold text-xl sm:text-2xl font-serif">Scientific</div>
                  <div className="text-[11px] text-navy-300 mt-0.5">Calibrated RH % Data</div>
                </div>
                <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-800 text-center sm:text-left">
                  <div className="text-gold-400 font-bold text-xl sm:text-2xl font-serif">Mold Trust</div>
                  <div className="text-[11px] text-navy-300 mt-0.5">IICRC Certified Work</div>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Visual Card of Healthy Home & Don */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-sm rounded-2xl overflow-hidden bg-navy-900 border-2 border-forest-400/40 shadow-2xl group">
                <img
                  src={getAssetUrl('images/property-exterior.jpg')}
                  alt="Healthy North Georgia Home and Living Environment"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5 space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-forest-600 text-white text-[10px] font-bold uppercase tracking-wider">
                    <span>Clean Air & Healthy Home Promise</span>
                  </div>
                  <div className="font-serif font-bold text-xl text-white">Objective Diagnosis</div>
                  <p className="text-xs text-navy-200 italic leading-snug">
                    "I measure with calibrated instruments to tell you the real story—no high-pressure fear tactics, just pure facts to protect your family."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Conversion Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left 7 Cols: The Homeowner Symptoms & Science */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Common Signs Box */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-navy-100 shadow-card space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <span>Signs Your Home Has a Hidden Moisture Problem</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-navy-950">
                  What Are You Noticing in Your Home?
                </h2>

                <div className="rounded-xl overflow-hidden aspect-[16/9] border border-navy-100 shadow-2xs my-2">
                  <img
                    src={getAssetUrl('images/hepa-remediation-equipment.jpg')}
                    alt="Certified HEPA indoor air purification and moisture control"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 rounded-xl bg-warm border border-navy-100 space-y-1">
                    <h3 className="font-bold text-sm text-navy-900">Musty Odor from AC Vents</h3>
                    <p className="text-xs text-navy-600">A damp, earthy smell that gets stronger when heating or air conditioning turns on.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-warm border border-navy-100 space-y-1">
                    <h3 className="font-bold text-sm text-navy-900">Morning Sinus Congestion</h3>
                    <p className="text-xs text-navy-600">Waking up with itchy eyes, coughing, or headaches that improve when leaving the house.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-warm border border-navy-100 space-y-1">
                    <h3 className="font-bold text-sm text-navy-900">Cupping Hardwood Floors</h3>
                    <p className="text-xs text-navy-600">Hardwood floorboards slightly bowing or edges rising due to subfloor moisture below.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-warm border border-navy-100 space-y-1">
                    <h3 className="font-bold text-sm text-navy-900">High Indoor Humidity (&gt;60%)</h3>
                    <p className="text-xs text-navy-600">A heavy, sticky feeling indoors even with the central AC running all day.</p>
                  </div>
                </div>
              </div>

              {/* The "Stack Effect" Explanation */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-navy-100 shadow-card space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest-700">
                  <ShieldCheck className="w-4 h-4 text-forest-600" />
                  <span>The Science of Indoor Air</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-navy-950">
                  Why Crawl Space Air Enters Your Bedrooms
                </h2>

                <div className="rounded-xl overflow-hidden aspect-[16/9] border border-navy-100 shadow-2xs">
                  <img
                    src={getAssetUrl('images/crawl-space-inspection.jpg')}
                    alt="Sealed crawl space encapsulation with clean vapor barrier"
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-sm sm:text-base text-navy-700 leading-relaxed">
                  Through the natural architectural phenomenon known as the <strong>« Stack Effect »</strong>, warm air rises through your home and escapes through the attic. This creates a vacuum on the lower level, pulling up to <strong>50% of your indoor breathing air directly from the crawl space or basement</strong> through subfloor penetrations, plumbing cutouts, and HVAC returns.
                </p>
                <div className="p-4 rounded-xl bg-forest-50/70 border border-forest-200 text-xs sm:text-sm text-navy-800">
                  <strong className="text-forest-800 block mb-1">Don Helvey's Promise:</strong>
                  « I don't use scary doomsday sales pitches. I measure your relative humidity and wood moisture levels with calibrated diagnostic tools. If it's a minor seasonal variance, I'll tell you. If it needs encapsulation, I coordinate a certified solution with Mold Trust. »
                </div>
              </div>

            </div>

            {/* Right 5 Cols: Family Health Assessment Form */}
            <div className="lg:col-span-5 sticky top-24">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-navy-100 shadow-card space-y-5">
                <div className="border-b border-navy-100 pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-forest-700">
                    Get Peace of Mind
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-navy-950 mt-1">
                    Request a Healthy Home Moisture Check
                  </h3>
                  <p className="text-xs text-navy-600 mt-1">
                    Speak directly with Don Helvey or request an on-site evaluation below.
                  </p>
                </div>

                {/* Direct Call Button */}
                <a
                  href={`tel:${SITE_METADATA.rawPhone}`}
                  className="w-full py-3.5 px-4 rounded-xl bg-forest-600 hover:bg-forest-700 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-sm transition-all"
                >
                  <Phone className="w-5 h-5" />
                  <span>Talk to Don: {SITE_METADATA.phone}</span>
                </a>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-navy-100" />
                  <span className="flex-shrink mx-3 text-xs uppercase font-bold text-navy-400">
                    Or Request an Evaluation
                  </span>
                  <div className="flex-grow border-t border-navy-100" />
                </div>

                {submitSuccess ? (
                  <div className="p-6 rounded-xl bg-forest-50 border border-forest-300 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-forest-700 mx-auto" />
                    <h4 className="font-bold text-navy-950 text-base">Request Received!</h4>
                    <p className="text-xs text-navy-700">
                      Don Helvey has received your information and will follow up with you directly at <strong>{phone}</strong> to discuss your home's air quality.
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
                        Your Phone Number *
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
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. David & Jennifer Miller"
                        className="w-full rounded-xl border border-navy-200 bg-warm px-3.5 py-2.5 text-navy-950 focus:outline-none focus:border-forest-600 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-navy-700 mb-1">
                        City / Community *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Cumming, Alpharetta, Gainesville..."
                        className="w-full rounded-xl border border-navy-200 bg-warm px-3.5 py-2.5 text-navy-950 focus:outline-none focus:border-forest-600 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-navy-700 mb-1">
                        Primary Concern
                      </label>
                      <select
                        value={symptomsOrConcern}
                        onChange={(e) => setSymptomsOrConcern(e.target.value)}
                        className="w-full rounded-xl border border-navy-200 bg-warm px-3.5 py-2.5 text-navy-950 text-xs sm:text-sm font-medium"
                      >
                        <option value="Musty Smell & AC Odor">Musty Smell & AC Odor</option>
                        <option value="Visible Mold on Walls/Joists">Visible Mold Spots</option>
                        <option value="Allergy & Respiratory Concerns">Family Allergy / Respiratory Symptoms</option>
                        <option value="Crawl Space Moisture / Dampness">Damp Crawl Space / Standing Water</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-navy-700 mb-1">
                        Brief Details (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Tell Don a little about your home (foundation type, age, or symptoms)..."
                        className="w-full rounded-xl border border-navy-200 bg-warm px-3.5 py-2 text-navy-950 text-xs sm:text-sm focus:outline-none focus:border-forest-600"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-4 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? 'Sending...' : 'Request Family Moisture Check'}
                      <ArrowRight className="w-4 h-4 text-gold-400" />
                    </button>
                  </form>
                )}

                <div className="pt-2 text-center text-xs text-navy-500 flex items-center justify-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-forest-700" />
                  <span>No high-pressure sales. Objective diagnostics for your family.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
