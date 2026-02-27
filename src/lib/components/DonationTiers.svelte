<script lang="ts">
  import { scrollReveal } from '$lib/utils/scrollReveal'
  import { data } from '$lib/data/types'

  const { donations } = data
</script>

<section class="py-20 lg:py-28 bg-slate-50">
  <div class="max-w-6xl mx-auto px-6 lg:px-12">
    <div class="text-center max-w-2xl mx-auto mb-14" use:scrollReveal={{ delay: 0 }}>
      <p class="uppercase tracking-[0.2em] text-sm text-ocean-600 font-bold mb-3">{donations.eyebrow}</p>
      <h2 class="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-slate-900 leading-tight">{donations.headline}</h2>
      <p class="text-lg text-slate-500 mt-4">{donations.body}</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      {#each donations.tiers as tier, i (tier.title)}
        <article
          class="rounded-2xl p-8 bg-white flex flex-col gap-3 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 {tier.featured ? 'border-2 border-ocean-500 shadow-lg md:scale-105 relative' : 'border border-slate-200 shadow-sm'}"
          use:scrollReveal={{ delay: i * 150 }}
        >
          {#if tier.featured}
            <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-ocean-500 text-white text-xs font-bold py-1 px-4 rounded-full">
              Most popular
            </div>
          {/if}

          <p class="m-0 font-bold text-ocean-600 text-sm uppercase tracking-wider">{tier.title}</p>
          <p class="m-0 text-4xl font-extrabold text-slate-900">€{tier.amount}</p>
          <p class="m-0 text-coral-600 font-bold text-sm">{tier.impact}</p>

          <ul class="pl-0 m-0 mb-4 text-slate-500 text-sm list-none flex flex-col gap-2 mt-2">
            {#each tier.perks as perk}
              <li class="flex items-start gap-2">
                <svg class="w-4 h-4 text-ocean-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {perk}
              </li>
            {/each}
          </ul>

          <a
            href="/donate"
            class="mt-auto rounded-full font-bold py-3 px-7 text-center no-underline transition-all {tier.featured ? 'bg-gradient-to-r from-ocean-500 to-sky-600 text-white hover:shadow-lg' : 'border-2 border-ocean-500 text-ocean-600 hover:bg-ocean-50'}"
          >
            {tier.cta}
          </a>
        </article>
      {/each}
    </div>
  </div>
</section>
