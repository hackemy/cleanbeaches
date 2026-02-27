<script lang="ts">
  import { currentPath } from '$lib/router'
  import { scrollY } from '$lib/utils/stickyScroll'
  import { data } from '$lib/data/types'

  const { site, nav } = data

  let path = $state('/')
  let y = $state(0)
  let mobileOpen = $state(false)
  let announcementVisible = $state(true)

  currentPath.subscribe((v) => (path = v))
  scrollY.subscribe((v) => (y = v))

  function closeMobile() {
    mobileOpen = false
  }
</script>

<!-- Announcement bar -->
{#if announcementVisible}
  <div class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-coral-500 to-coral-600 text-white text-sm font-semibold flex items-center justify-center gap-3 h-9 px-4">
    <span>{@html nav.announcement.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</span>
    <a href={nav.announcement.linkHref} class="underline underline-offset-2 hover:no-underline">{nav.announcement.linkLabel}</a>
    <button
      onclick={() => (announcementVisible = false)}
      class="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-transparent border-none cursor-pointer text-lg leading-none"
      aria-label="Dismiss"
    >&times;</button>
  </div>
{/if}

<!-- Main header -->
<header
  class="fixed left-0 right-0 h-20 flex items-center justify-between px-6 lg:px-8 bg-white/95 backdrop-blur-xl border-b border-slate-900/8 z-40 transition-all duration-300"
  class:shadow-md={y > 20}
  style="top: {announcementVisible ? '36px' : '0px'}"
>
  <a href="/" class="flex items-center gap-3 no-underline" onclick={closeMobile}>
    <span class="text-3xl">{site.logo}</span>
    <div>
      <p class="text-base font-bold text-slate-900 m-0">{site.name}</p>
      <p class="text-xs text-slate-500 m-0">{site.tagline}</p>
    </div>
  </a>

  <!-- Desktop nav -->
  <nav class="hidden lg:flex items-center gap-6">
    {#each nav.links as link}
      <a href={link.href} class="nav-link" class:active={link.href === '/' ? path === '/' : path.startsWith(link.href)}>{link.label}</a>
    {/each}
  </nav>

  <!-- Desktop CTAs -->
  <div class="hidden lg:flex gap-3">
    {#each nav.cta as btn}
      <a
        href={btn.href}
        class="rounded-full font-semibold px-5 py-2 no-underline inline-flex items-center text-sm transition-all {btn.style === 'primary' ? 'bg-gradient-to-r from-ocean-500 to-sky-600 text-white hover:shadow-lg' : 'border border-ocean-500 text-ocean-600 bg-transparent hover:bg-ocean-50'}"
      >{btn.label}</a>
    {/each}
  </div>

  <!-- Mobile hamburger -->
  <button
    class="lg:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
    onclick={() => (mobileOpen = !mobileOpen)}
    aria-label="Toggle menu"
  >
    <span class="block w-6 h-0.5 bg-slate-900 rounded-full transition-transform duration-300" class:translate-y-2={mobileOpen} class:rotate-45={mobileOpen}></span>
    <span class="block w-6 h-0.5 bg-slate-900 rounded-full transition-opacity duration-300" class:opacity-0={mobileOpen}></span>
    <span class="block w-6 h-0.5 bg-slate-900 rounded-full transition-transform duration-300" class:-translate-y-2={mobileOpen} class:-rotate-45={mobileOpen}></span>
  </button>
</header>

<!-- Mobile overlay -->
{#if mobileOpen}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
    onclick={closeMobile}
    onkeydown={(e) => e.key === 'Escape' && closeMobile()}
    role="presentation"
  ></div>
{/if}

<!-- Mobile panel -->
<div
  class="fixed top-0 right-0 bottom-0 w-72 bg-white z-50 shadow-2xl flex flex-col p-8 pt-24 gap-6 transition-transform duration-300 ease-out"
  class:translate-x-0={mobileOpen}
  class:translate-x-full={!mobileOpen}
>
  {#each nav.links as link}
    <a href={link.href} class="text-lg font-semibold text-slate-900 no-underline" onclick={closeMobile}>{link.label}</a>
  {/each}
  <hr class="border-slate-200" />
  {#each nav.mobileCta as btn}
    <a
      href={btn.href}
      class="rounded-full font-semibold py-3 px-6 no-underline text-center {btn.style === 'primary' ? 'bg-gradient-to-r from-ocean-500 to-sky-600 text-white' : 'border border-ocean-500 text-ocean-600'}"
      onclick={closeMobile}
    >{btn.label}</a>
  {/each}
</div>

<style>
  @reference "../../app.css";
  .nav-link {
    @apply no-underline text-slate-700 font-semibold relative pb-1 text-sm transition-colors hover:text-slate-900;
  }
  .nav-link::after {
    content: '';
    @apply absolute left-0 bottom-0 w-full h-0.5 bg-ocean-500 origin-left transition-transform duration-200;
    transform: scaleX(0);
  }
  .nav-link.active {
    @apply text-slate-900;
  }
  .nav-link.active::after {
    transform: scaleX(1);
  }
</style>
