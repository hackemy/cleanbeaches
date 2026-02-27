<script lang="ts">
  import HeroSection from '$lib/components/HeroSection.svelte'
  import WaveDivider from '$lib/components/WaveDivider.svelte'
  import ImpactMetrics from '$lib/components/ImpactMetrics.svelte'
  import HowItWorks from '$lib/components/HowItWorks.svelte'
  import OperationsShowcase from '$lib/components/OperationsShowcase.svelte'
  import SocialProof from '$lib/components/SocialProof.svelte'
  import GalleryPreview from '$lib/components/GalleryPreview.svelte'
  import PartnersStrip from '$lib/components/PartnersStrip.svelte'
  import DonationTiers from '$lib/components/DonationTiers.svelte'
  import CTASection from '$lib/components/CTASection.svelte'
  import VolunteerSignup from '$lib/components/VolunteerSignup.svelte'
  import MissionHighlights from '$lib/components/MissionHighlights.svelte'
</script>

<div>
  <!-- 1. Hook with urgency + animated stats -->
  <HeroSection />
  <WaveDivider color="#ffffff" />

  <!-- 2. Proof via animated counters -->
  <ImpactMetrics />
  <WaveDivider color="#ffffff" />

  <!-- 3. Volunteer funnel -->
  <HowItWorks />
  <WaveDivider color="#f8fafc" />

  <!-- 4. Real operations evidence -->
  <OperationsShowcase />
  <WaveDivider color="#f8fafc" />

  <!-- 5. Testimonials from all audiences -->
  <SocialProof />
  <WaveDivider color="#ffffff" />

  <!-- 6. Visual proof -->
  <GalleryPreview />

  <!-- 7. Institutional authority -->
  <PartnersStrip />
  <WaveDivider color="#f8fafc" />

  <!-- 8. The ask (trust is now built) -->
  <DonationTiers />
  <WaveDivider color="#0f172a" className="bg-slate-50" />

  <!-- 9. Final urgency push -->
  <CTASection />
  <WaveDivider color="#eff6ff" className="cta-gradient-bg" />

  <!-- 10. Capture leads -->
  <VolunteerSignup />
  <WaveDivider color="#0f172a" className="bg-ocean-50" />

  <!-- 11. Roadmap for detail-oriented audience -->
  <MissionHighlights />
</div>
