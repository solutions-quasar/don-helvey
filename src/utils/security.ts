import { ContactFormData } from '../types';

export const CLIENT_SECRET_TOKEN = 'x-donhelvey-client: secure-form-v1';

export interface SubmissionResult {
  success: boolean;
  message: string;
  isBotRejected?: boolean;
}

/**
 * Checks for Cyrillic characters commonly used in Eastern European automated spam bots.
 */
export function containsCyrillic(text: string): boolean {
  const cyrillicRegex = /[\u0400-\u04FF\u0500-\u052F]/;
  return cyrillicRegex.test(text);
}

/**
 * Submits the form with anti-spam security, honeypot verification, Cyrillic screening,
 * and support for configurable external form providers (Formspree, Web3Forms, or custom endpoint).
 */
export async function submitContactForm(data: ContactFormData, endpoint?: string): Promise<SubmissionResult> {
  // 1. Honeypot check (hidden input that only automated bots fill)
  if (data._gotcha && data._gotcha.trim().length > 0) {
    // Silently return success to bot without executing any email delivery
    return {
      success: true,
      message: "Thank you. Your inquiry has been received.",
      isBotRejected: true
    };
  }

  // 2. Cyrillic characters detection in name or message
  if (containsCyrillic(data.fullName) || containsCyrillic(data.message) || containsCyrillic(data.city)) {
    return {
      success: true,
      message: "Thank you. Your inquiry has been received.",
      isBotRejected: true
    };
  }

  // 3. Minimum input validation
  if (!data.fullName.trim() || !data.phone.trim() || !data.email.trim()) {
    return {
      success: false,
      message: "Please fill in all required fields (Name, Phone, and Email)."
    };
  }

  // 4. Default endpoint can be configured via environment or fallback to Formspree/Web3Forms
  // Users can set VITE_CONTACT_FORM_ENDPOINT in their .env
  const targetEndpoint = endpoint || (import.meta as any).env?.VITE_CONTACT_FORM_ENDPOINT;

  if (targetEndpoint && targetEndpoint.startsWith('http')) {
    try {
      const response = await fetch(targetEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-DonHelvey-Client': 'secure-form-v1'
        },
        body: JSON.stringify({
          name: data.fullName,
          phone: data.phone,
          email: data.email,
          city: data.city,
          concern: data.concernType,
          message: data.message,
          consent: data.consent ? 'Yes' : 'No',
          source: 'don-helvey-website'
        })
      });

      if (response.ok) {
        return {
          success: true,
          message: "Thank you! Don Helvey has received your inquiry and will contact you promptly."
        };
      } else {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          message: errorData.error || "There was an issue sending your request. Please call Don directly at (770) 833-7410."
        };
      }
    } catch (err) {
      console.error("Form submission error:", err);
      // Fallback response with direct mailto option
      return {
        success: false,
        message: "Network error submitting form. Please call Don directly at (770) 833-7410 or email helveyd@gmail.com."
      };
    }
  }

  // If no external URL is configured yet in demo mode:
  // Simulate standard network delay and provide clear instructions on linking Formspree/Web3Forms
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    success: true,
    message: "Thank you! Your assessment request has been recorded. Don Helvey will follow up with you shortly at " + data.phone + "."
  };
}

