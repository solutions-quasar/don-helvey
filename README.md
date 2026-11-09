# Don Helvey — Property & Mold Remediation Expert

A premium, mobile-first personal-brand website for **Don Helvey**, property and mold remediation specialist serving Cumming, Alpharetta, Dawsonville, and the greater North Atlanta, Georgia area.

---

## 1. Technology Stack

- **React 18** + **TypeScript**
- **Vite 5** (Fast static bundling & development)
- **Tailwind CSS 3** (Custom color palette, responsive typography, glassmorphism)
- **Lucide React** (Clean, modern iconography)
- **Zero Backend Required** (Static hosting optimized for GitHub Pages)
- **Configurable Form Integration** (Formspree / Web3Forms with Honeypot anti-spam and Cyrillic screening)

---

## 2. Brand Identity & Visual Palette

| Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Deep Navy** | `#10283F` | Primary header text, brand anchor, footers |
| **Forest Green** | `#276B59` | Primary call-to-actions, badges, environmental cues |
| **Warm White** | `#F8FAF8` | Clean, non-clinical background canvas |
| **Light Gray** | `#EDF2F1` | Section dividers, borders, structural framing |
| **Gold Accent** | `#C4A46A` | Badges, credential borders, star highlights |

---

## 3. Dedicated Pages & Architecture

- `/` — Comprehensive home landing page with Hero, Problem Recognition, Services, About Don, Mold Trust Partnership, How It Works, Testimonials, Service Areas, FAQ, and Final CTA.
- `/mold-remediation/` — In-depth breakdown of IICRC S520 containment, negative air scrubbing, and Mold Trust Inc. execution.
- `/mold-inspection/` — Non-invasive thermal moisture mapping, calibrated moisture meters, and independent lab coordination.
- `/crawl-space-moisture/` — The stack effect, reinforced multi-mil vapor barriers, and commercial crawl space dehumidification.
- `/about/` — Don Helvey’s 30-year Georgia real estate brokerage background, GREC-approved CE instructor credentials, and approach.
- `/contact/` — Direct contact channels ((770) 833-7410 / helveyd@gmail.com), coverage area breakdown, and protected assessment form.

---

## 4. Anti-Spam & Contact Form Security

Adhering to strict cybersecurity standards:
- **Honeypot Trap**: `<input name="_gotcha">` hidden field silently drops bot submissions without triggering email dispatches.
- **Cyrillic Character Filter**: Automated regex rejects Eastern European bot payloads.
- **Client Secret Header**: `x-donhelvey-client: secure-form-v1` header attached to outbound API requests.
- **No Open-Relay Auto-Responders**: Prevents spammers from using the form to bounce spam to third parties.
- **App-Native Feedback**: All modals and confirmation states use custom UI (no native browser `alert()` or `confirm()` prompts).

---

## 5. Local Development

Assigned port: **`3085`** (recorded in `local_port_registry.md`).

```bash
cd "d:\Antigravity projects\don-helvey"
npm install
npm run dev
```

Visit: `http://localhost:3085/`

---

## 6. Production Build & GitHub Pages Deployment

```bash
npm run build
```

The output will be placed in `dist/`.

### GitHub Actions Deployment
The project includes `.github/workflows/deploy.yml` which automatically builds and publishes the site to GitHub Pages under `solutions-quasar.github.io/don-helvey/`.

### Custom Domain Configuration (Optional)
If attaching a custom domain (e.g. `donhelvey.com`):
1. Place a `CNAME` file in the `public/` directory with `donhelvey.com`.
2. Configure DNS records at your registrar:
   - `A` records pointing to GitHub Pages IPs (`185.199.108.153`, etc.)
   - `CNAME` record for `www` pointing to `solutions-quasar.github.io`.

