<script lang="ts">
  import { scrollReveal } from '$lib/utils/scrollReveal'
  import { animatedCounter } from '$lib/utils/animatedCounter'
  import { scrollY } from '$lib/utils/stickyScroll'
  import { data } from '$lib/data/types'

  const { hero } = data

  let y = $state(0)
  scrollY.subscribe((v) => (y = v))
</script>

<section class="hero-gradient relative overflow-hidden">
  <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6 lg:px-12 py-12 lg:py-20">

    <!-- Copy -->
    <div use:scrollReveal={{ delay: 0 }}>
      <p class="uppercase tracking-[0.2em] text-sm text-coral-500 font-bold mb-4">{hero.badge}</p>
      <h1 class="text-[clamp(2.4rem,4.5vw,4rem)] text-slate-900 leading-[1.1] font-extrabold mb-6">
        {@html hero.headline.replace(/<accent>(.*?)<\/accent>/g, '<span class="text-ocean-600">$1</span>').replace(/\n/g, '<br />')}
      </h1>
      <p class="text-lg text-slate-600 max-w-xl mb-8 leading-relaxed">
        {hero.body}
      </p>
      <div class="flex gap-4 flex-wrap">
        {#each hero.cta as btn}
          <a
            class="rounded-full font-bold py-3.5 px-8 no-underline inline-flex items-center justify-center transition-all {btn.style === 'primary' ? 'bg-gradient-to-r from-ocean-500 to-sky-600 text-white hover:shadow-lg hover:-translate-y-0.5' : 'border-2 border-ocean-500 text-ocean-600 bg-transparent hover:bg-ocean-50'}"
            href={btn.href}
          >{btn.label}</a>
        {/each}
      </div>

      <!-- Animated stats -->
      <div class="flex gap-10 flex-wrap border-t border-slate-200 pt-8 mt-10">
        {#each hero.stats as stat}
          <div>
            <p class="text-4xl font-extrabold m-0 text-slate-900" use:animatedCounter={{ target: stat.value, suffix: stat.suffix || undefined }}></p>
            <p class="m-0 text-slate-500 text-sm">{stat.label}</p>
          </div>
        {/each}
      </div>
    </div>

    <!-- Visual -->
    <div class="relative flex justify-center" use:scrollReveal={{ delay: 200 }}>
      <!-- Glow orb -->
      <div class="absolute w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.3),transparent_70%)] blur-md -top-12 right-0 pointer-events-none"></div>

      <div class="relative w-full overflow-hidden rounded-3xl shadow-[0_25px_60px_rgba(15,23,42,0.18)]">
        <img
          src={hero.image}
          alt={hero.imageAlt}
          class="w-full h-[420px] lg:h-[480px] object-cover transition-transform duration-700"
          style="transform: translateY({y * 0.08}px)"
        />
        <!-- Gradient overlay at bottom -->
        <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
        <!-- Badge -->
        <div class="absolute bottom-5 left-5 bg-coral-500 text-white py-2.5 px-5 rounded-xl font-bold text-sm flex items-center gap-2">
          <span class="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          {hero.badgeOverlay}
        </div>
      </div>
    </div>
  </div>

  <!-- Scroll indicator -->
  <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 animate-gentle-bounce">
    <span class="text-xs font-medium tracking-wider uppercase">Scroll</span>
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</section>

<style>
  .hero-gradient {
    background: linear-gradient(135deg, #ecfeff, #f0f9ff, #e0f2fe, #f0f9ff);
    background-size: 300% 300%;
    animation: gradient-shift 15s ease infinite;
  }

  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  @keyframes gentle-bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(8px); }
  }
  .animate-gentle-bounce {
    animation: gentle-bounce 2s ease-in-out infinite;
  }
</style>
