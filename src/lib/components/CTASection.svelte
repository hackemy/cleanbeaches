<script lang="ts">
  import { scrollReveal } from '$lib/utils/scrollReveal'
  import { data } from '$lib/data/types'

  const { ctaSection } = data

  let tonnesSinceLoad = $state(0)

  $effect(() => {
    const perSecond = ctaSection.dailyPollutionRate / 86400

    const interval = setInterval(() => {
      tonnesSinceLoad += perSecond
    }, 1000)

    return () => clearInterval(interval)
  })
</script>

<section id="donate" class="py-20 lg:py-28 cta-gradient">
  <div class="max-w-5xl mx-auto px-6 lg:px-12 text-center" use:scrollReveal={{ delay: 0 }}>
    <p class="uppercase tracking-[0.2em] text-sm text-ocean-300 font-bold mb-4">{ctaSection.eyebrow}</p>
    <h2 class="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-white leading-tight max-w-3xl mx-auto">
      {ctaSection.headline}
    </h2>
    <p class="text-lg text-slate-300 mt-6 max-w-2xl mx-auto leading-relaxed">
      {ctaSection.body}
    </p>

    <!-- Live counter -->
    <div class="mt-8 inline-flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-2xl py-4 px-8 border border-white/10">
      <p class="text-3xl font-extrabold text-coral-400 m-0">
        +{tonnesSinceLoad.toFixed(4)} tonnes
      </p>
      <p class="text-sm text-slate-400 m-0">{ctaSection.counterLabel}</p>
    </div>

    <div class="flex gap-4 justify-center flex-wrap mt-10">
      {#each ctaSection.cta as btn}
        <a
          href={btn.href}
          class="rounded-full font-bold py-4 px-8 no-underline inline-flex items-center justify-center transition-all text-lg {btn.style === 'primary' ? 'bg-gradient-to-r from-coral-400 to-coral-500 text-white hover:shadow-lg hover:-translate-y-0.5' : 'border-2 border-white/30 text-white bg-transparent hover:border-white/60'}"
        >
          {btn.label}
        </a>
      {/each}
    </div>
  </div>
</section>

<style>
  .cta-gradient {
    background: linear-gradient(135deg, #0f172a, #0c4a6e, #0f172a);
  }
</style>
