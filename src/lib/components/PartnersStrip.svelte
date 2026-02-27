<script lang="ts">
  import { scrollReveal } from '$lib/utils/scrollReveal'
  import { data } from '$lib/data/types'

  const { partners } = data

  // Double for seamless marquee
  const marqueeItems = [...partners.items, ...partners.items]
</script>

<section class="py-16 bg-white overflow-hidden">
  <div class="max-w-6xl mx-auto px-6 lg:px-12 mb-8" use:scrollReveal={{ delay: 0 }}>
    <p class="uppercase tracking-[0.2em] text-sm text-ocean-600 font-bold mb-2 text-center">{partners.eyebrow}</p>
    <h3 class="text-xl font-extrabold text-slate-900 text-center m-0">{partners.headline}</h3>
  </div>

  <div class="relative" aria-label="Partner logos">
    <!-- Fade edges -->
    <div class="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
    <div class="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

    <div class="flex gap-6 animate-marquee">
      {#each marqueeItems as partner}
        <div class="py-4 px-8 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-700 whitespace-nowrap text-sm shrink-0">
          {partner}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .animate-marquee {
    animation: marquee 25s linear infinite;
    width: max-content;
  }
</style>
