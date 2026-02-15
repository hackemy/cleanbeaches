# CleanBeaches Greece Web Platform

CleanBeaches Greece is a nonprofit initiative focused on restoring and protecting the coastlines of Greece through large-scale, systematic, and transparent beach-cleaning operations. This repository hosts the modern fundraising and impact website that will power our outreach, volunteer coordination, and donation funnels.

## Vision
- **Real impact**: Track kilograms of waste removed, stretches of coastline cleaned, and volunteer participation.
- **Full transparency**: Publish budgets, project status, and donor reports in real time.
- **World-class UX**: Deliver an Airbnb-quality experience built with Vue.js, optimized for both desktop and mobile.

## Tech Stack (Planned)
- Vue.js + Vite for the frontend experience
- Tailwind CSS for design system consistency
- Stripe integration for international donations (one-time & recurring)
- AWS S3 + CloudFront for global hosting
- GitHub Actions for CI/CD and linting

## Getting Started
1. Clone the repository using the dedicated SSH alias:
   ```bash
   git clone git@github-cleanbeaches:hackemy/cleanbeaches.git code/
   ```
2. Install dependencies (package manifest coming soon):
   ```bash
   pnpm install
   # or npm install / yarn install depending on the final toolchain
   ```
3. Run the local development server:
   ```bash
   pnpm dev
   ```

## Roadmap
- [ ] Finalize brand assets and UI kit
- [ ] Scaffold Vue.js application with routing, layouts, and design tokens
- [ ] Implement donation flow with Stripe Checkout + SEPA
- [ ] Build impact dashboard (beaches cleaned, kg collected, volunteer hours)
- [ ] Publish transparency reports and governance documents

## Governance & Compliance
CleanBeaches Greece will operate as an Αστική Μη Κερδοσκοπική Εταιρεία (ΑΜΚΕ). All code, infrastructure, and financial flows are designed with legal compliance, auditing, and donor trust in mind.

---
"Clean beaches. Real impact. No excuses."
