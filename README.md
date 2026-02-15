# CleanBeaches Greece Web Platform

CleanBeaches Greece is an AMKE-grade nonprofit focused on engineering systematic, measurable coastal cleanup programs
across the Greek islands and mainland. This repository hosts the public-facing Vue 3 application that powers fundraising,
impact storytelling, and transparency reporting.

## Stack
- [Vue 3](https://vuejs.org/) with the Composition API and `<script setup>`
- [Vue Router](https://router.vuejs.org/) for public routes (mission, gallery, legal)
- [Vite](https://vitejs.dev/) build pipeline with modern ES modules
- Markdown-driven legal content rendered via a lightweight presenter component
- `deploy.sh` helper to compile the site and push static assets to S3 → CloudFront (eu-central-1)

## Local Development
```bash
# Install dependencies
npm install

# Run the dev server with hot module reload
npm run dev -- --open

# Lint / type-check hooks can be added later
```

### Project Structure Highlights
```
src/
  components/       // Reusable UI primitives (hero, metrics, gallery, markdown renderer)
  content/legal/    // Markdown files for privacy policy, terms, etc.
  data/gallery.js   // Centralized dataset powering gallery & previews
  router/           // Public routes only (no auth needed yet)
  views/            // Page-level layouts assembling components
```

Add new legal pages by dropping Markdown files into `src/content/legal/` and linking to `/legal/<slug>`.

## Deployment
The static site is deployed to an S3 bucket fronted by CloudFront. The helper script assumes the `.env` file contains:

```
S3_BUCKET=s3://your-target-bucket
CLOUDFRONT_DISTRIBUTION_ID=XXXXXXXXXXXX
AWS_PROFILE=cleanbeaches
AWS_REGION=eu-central-1
```

Deploy via:
```bash
./deploy.sh
```
The script installs dependencies (to ensure CI/CD parity), builds the production bundle, syncs `dist/` to the bucket with
`aws s3 sync --delete`, and issues a CloudFront invalidation.

## Roadmap
- Wire Stripe Checkout + SEPA donations once AMKE registration is finalized
- Build transparency dashboard with live KPIs (kg collected, beaches cleaned, cost per km)
- Connect to municipal + EU funding applications for recurring reporting
- Extend gallery with authenticated uploads for on-site crews

"Clean beaches. Real impact. No excuses."
