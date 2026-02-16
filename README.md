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
  components/       // Reusable UI primitives (hero, metrics, gallery, markdown renderer, forms, maps)
  content/legal/    // Markdown files for privacy policy, terms, etc.
  data/             // Shared datasets (gallery photos, operations, geo media pins)
  router/           // Public routes only (no auth needed yet)
  views/            // Page-level layouts assembling components
```

Add new legal pages by dropping Markdown files into `src/content/legal/` and linking to `/legal/<slug>`.
Add new operations/gallery cards via the data modules under `src/data/` to keep components clean.

### “The Problem” Gallery
- Upload raw JPGs into `public/problem-media/`.
- Describe them in `src/data/problemCases.js` (id, title, description, relative path).
- The `/problem` route automatically renders the gallery.

### Geo-tagged Evidence Map Workflow
1. Drop EXIF-intact photos into `public/evidence-source/` (committed to `main`).
2. Run `npm run sync:evidence` to parse GPS + timestamp data and rebuild `src/data/geoMedia.json`.
3. Optionally edit the generated JSON to add better titles/descriptions/notes.
4. Commit/push — the `/evidence-map` page will render the pins automatically on the next deploy.

Remember: assets from `public/` are copied verbatim into both the AWS and GitHub Pages deployments, so high-res media belongs there.

## Deployment
### AWS (S3 + CloudFront)
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

### GitHub Pages
- Workflow: `.github/workflows/deploy.yml`
- Trigger: every push to `main` (plus manual dispatch)
- Flow: build with `npm ci && npm run build`, upload artifact, and publish through `actions/deploy-pages`
- Base path: set through `VITE_PUBLIC_BASE_PATH=/cleanbeaches/` during the build step so assets resolve under project pages

To preview the GitHub Pages output locally, mimic the workflow by running:
```bash
VITE_PUBLIC_BASE_PATH=/cleanbeaches/ npm run build
```

By default (e.g., AWS or local dev) the base path falls back to `/`, so no extra config is required.

## Roadmap
- Wire Stripe Checkout + SEPA donations once AMKE registration is finalized
- Build transparency dashboard with live KPIs (kg collected, beaches cleaned, cost per km)
- Connect to municipal + EU funding applications for recurring reporting
- Extend gallery with authenticated uploads for on-site crews

"Clean beaches. Real impact. No excuses."
