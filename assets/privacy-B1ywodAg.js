const e=`# Privacy Policy

_Last updated: January 2025_

CleanBeaches Greece (operating as an Αστική Μη Κερδοσκοπική Εταιρεία – AMKE) respects your privacy and is building its
systems to comply with the General Data Protection Regulation (EU) 2016/679 (GDPR) and Greek Law 4624/2019.

## Data We Collect
- Identification and contact information you provide when subscribing, volunteering, or donating
- Payment metadata handled via PCI-compliant processors (Stripe) — we never store card numbers
- Operational telemetry from cleanup machinery (environmental sensors, GPS, load data)

## How We Use Data
- To process donations, issue tax receipts, and maintain transparency reporting
- To schedule volunteer deployments and coordinate local authorities
- To analyze environmental impact and publish aggregated statistics

## Your Rights
You may request access, correction, or deletion of your personal data at any time. Contact **privacy@cleanbeaches.gr** and we
will respond within 30 days.

## Data Retention & Security
- Donor and financial records: 10 years (minimum Greek accounting requirement)
- Volunteer and event data: 3 years after last activity
- Telemetry and anonymized impact datasets: retained indefinitely for scientific comparison

All production data will be stored in EU regions (AWS eu-central-1) with encryption at rest (KMS) and in transit (TLS 1.2+).

## Third Parties
We only share data with vetted processors required for operations (Stripe, AWS, analytics). All processors sign DPAs and provide
adequate safeguards under GDPR.

---
For questions, email **privacy@cleanbeaches.gr**. We will update this policy as the organization formalizes its governance. 
`;export{e as default};
