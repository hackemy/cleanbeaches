// ---------------------------------------------------------------------------
// paralies.org -- Site data types
// Single import point: `import { data, type SiteData } from '$lib/data/types'`
// ---------------------------------------------------------------------------

import rawData from './data.json'

// ---- Shared / reusable primitives ----------------------------------------

export interface LinkItem {
  label: string
  href: string
}

export interface CtaButton extends LinkItem {
  style: 'primary' | 'outline'
}

export interface SocialLink {
  platform: string
  url: string
}

export interface StatItem {
  value: number
  suffix: string
  label: string
}

// ---- Gallery (used by GalleryGrid, GalleryPreview, GalleryView) ----------

export interface GalleryPhoto {
  id: number
  title: string
  location: string
  description: string
  image: string
}

// ---- Section-level interfaces --------------------------------------------

export interface SiteInfo {
  name: string
  tagline: string
  legalEntity: string
  regions: string
  logo: string
  email: string
  fundraisingEmail: string
  phone: string
  social: SocialLink[]
}

export interface NavAnnouncement {
  text: string
  linkLabel: string
  linkHref: string
}

export interface NavConfig {
  announcement: NavAnnouncement
  links: LinkItem[]
  cta: CtaButton[]
  mobileCta: CtaButton[]
}

export interface HeroSection {
  badge: string
  headline: string
  body: string
  image: string
  imageAlt: string
  badgeOverlay: string
  cta: CtaButton[]
  stats: StatItem[]
}

export interface ImpactMetric {
  value: number
  suffix: string
  label: string
  description: string
}

export interface ImpactProgress {
  label: string
  current: number
  goal: number
  unit: string
  callout: string
}

export interface ImpactSection {
  eyebrow: string
  headline: string
  body: string
  metrics: ImpactMetric[]
  progress: ImpactProgress
}

export interface HowItWorksStep {
  title: string
  description: string
  icon: string
}

export interface HowItWorksSection {
  eyebrow: string
  headline: string
  body: string
  steps: HowItWorksStep[]
  cta: LinkItem
}

export interface Operation {
  id: string
  island: string
  beach: string
  type: string
  impact: string
  description: string
  partners: string[]
  photo: string
}

export interface OperationsSection {
  eyebrow: string
  headline: string
  body: string
  items: Operation[]
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  initials: string
  color: string
}

export interface SocialProofSection {
  eyebrow: string
  headline: string
  testimonials: Testimonial[]
}

export interface GallerySection {
  eyebrow: string
  headline: string
  ctaLabel: string
  previewCount: number
  photos: GalleryPhoto[]
}

export interface PartnersSection {
  eyebrow: string
  headline: string
  items: string[]
}

export interface DonationTier {
  title: string
  amount: string
  impact: string
  perks: string[]
  cta: string
  featured: boolean
}

export interface DonationsSection {
  eyebrow: string
  headline: string
  body: string
  tiers: DonationTier[]
}

export interface CtaSection {
  eyebrow: string
  headline: string
  body: string
  dailyPollutionRate: number
  counterLabel: string
  cta: CtaButton[]
}

export interface VolunteerCounter {
  value: number
  suffix: string
  label: string
}

export interface FormFieldBase {
  name: string
  label: string
  type: string
  placeholder?: string
  required: boolean
}

export interface TextFormField extends FormFieldBase {
  type: 'text' | 'email' | 'number' | 'textarea'
}

export interface SelectOption {
  value: string
  label: string
}

export interface SelectFormField extends FormFieldBase {
  type: 'select'
  options: string[] | SelectOption[]
}

export type FormField = TextFormField | SelectFormField

export interface FormConfig {
  fields: FormField[]
  submitLabel: string
  disclaimer: string
}

export interface VolunteerSection {
  eyebrow: string
  headline: string
  body: string
  counter: VolunteerCounter
  checklist: string[]
  form: FormConfig
}

export interface RoadmapPhase {
  phase: string
  title: string
  description: string
  points: string[]
}

export interface RoadmapSection {
  eyebrow: string
  headline: string
  phases: RoadmapPhase[]
}

export interface NewsletterConfig {
  headline: string
  body: string
  placeholder: string
  submitLabel: string
}

export interface FooterSection {
  links: LinkItem[]
  newsletter: NewsletterConfig
  copyright: string
}

export interface FloatingDonate {
  label: string
  href: string
}

// ---- Page-specific configs -----------------------------------------------

export interface GalleryPageConfig {
  eyebrow: string
  headline: string
  body: string
}

export interface ProblemPageStat {
  value: number
  suffix: string
  label: string
}

export interface ProblemPageConfig {
  eyebrow: string
  headline: string
  body: string
  stats: ProblemPageStat[]
}

export interface DonatePageConfig {
  eyebrow: string
  headline: string
  body: string
  form: FormConfig
}

export interface LegalPageConfig {
  eyebrow: string
  body: string
}

export interface PagesConfig {
  gallery: GalleryPageConfig
  problem: ProblemPageConfig
  donate: DonatePageConfig
  legal: LegalPageConfig
}

// ---- Root SiteData -------------------------------------------------------

export interface SiteData {
  site: SiteInfo
  nav: NavConfig
  hero: HeroSection
  impact: ImpactSection
  howItWorks: HowItWorksSection
  operations: OperationsSection
  socialProof: SocialProofSection
  gallery: GallerySection
  partners: PartnersSection
  donations: DonationsSection
  ctaSection: CtaSection
  volunteer: VolunteerSection
  roadmap: RoadmapSection
  footer: FooterSection
  floatingDonate: FloatingDonate
  pages: PagesConfig
}

// ---- Typed data export ---------------------------------------------------

export const data: SiteData = rawData as SiteData
