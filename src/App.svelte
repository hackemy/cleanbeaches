<script lang="ts">
  import { currentPath, matchRoute } from '$lib/router'
  import NavigationBar from '$lib/components/NavigationBar.svelte'
  import FooterSection from '$lib/components/FooterSection.svelte'
  import FloatingDonateButton from '$lib/components/FloatingDonateButton.svelte'
  import HomeView from '$lib/views/HomeView.svelte'
  import GalleryView from '$lib/views/GalleryView.svelte'
  import ProblemView from '$lib/views/ProblemView.svelte'
  import GeoMediaView from '$lib/views/GeoMediaView.svelte'
  import DonateView from '$lib/views/DonateView.svelte'
  import LegalView from '$lib/views/LegalView.svelte'

  let path = $state('/')

  currentPath.subscribe((v) => (path = v))

  let legalSlug = $derived.by(() => {
    const match = matchRoute('/legal/:slug', path)
    return match?.slug ?? null
  })

  let route = $derived.by(() => {
    if (path === '/') return 'home'
    if (path === '/gallery') return 'gallery'
    if (path === '/problem') return 'problem'
    if (path === '/evidence-map') return 'evidence-map'
    if (path === '/donate') return 'donate'
    if (legalSlug) return 'legal'
    return 'home'
  })

  let isFullBleed = $derived(route === 'evidence-map')
</script>

<div class="app-shell">
  <NavigationBar />
  <main class="main-content" class:full-bleed={isFullBleed}>
    {#if route === 'home'}
      <HomeView />
    {:else if route === 'gallery'}
      <GalleryView />
    {:else if route === 'problem'}
      <ProblemView />
    {:else if route === 'evidence-map'}
      <GeoMediaView />
    {:else if route === 'donate'}
      <DonateView />
    {:else if route === 'legal' && legalSlug}
      <LegalView slug={legalSlug} />
    {/if}
  </main>
  {#if !isFullBleed}
    <FooterSection />
  {/if}
  <FloatingDonateButton />
</div>

<style>
  .app-shell {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: radial-gradient(circle at top, #ecfeff, #f0f9ff 40%, #f7fbff 70%, #ffffff);
  }

  .main-content {
    flex: 1;
    padding-top: 116px;
  }

  .main-content.full-bleed {
    padding-top: 116px;
    overflow: hidden;
  }
</style>
