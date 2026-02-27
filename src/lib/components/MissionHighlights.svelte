<script lang="ts">
  import { scrollReveal } from '$lib/utils/scrollReveal'
  import { data } from '$lib/data/types'

  const { roadmap } = data
</script>

<section id="roadmap" class="py-20 lg:py-28 bg-slate-900">
  <div class="max-w-6xl mx-auto px-6 lg:px-12">
    <div class="text-center max-w-2xl mx-auto mb-14" use:scrollReveal={{ delay: 0 }}>
      <p class="uppercase tracking-[0.2em] text-sm text-ocean-400 font-bold mb-3">{roadmap.eyebrow}</p>
      <h2 class="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-white leading-tight">{roadmap.headline}</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {#each roadmap.phases as item, i (item.title)}
        <article
          class="p-8 rounded-2xl bg-slate-800/80 border border-slate-700/50 text-slate-200 hover:-translate-y-1 hover:bg-slate-800 transition-all duration-300"
          use:scrollReveal={{ delay: i * 150 }}
        >
          <p class="m-0 font-bold text-ocean-400 uppercase text-sm tracking-wider">{item.phase}</p>
          <h3 class="mt-2 mb-3 text-xl font-bold text-white">{item.title}</h3>
          <p class="text-slate-400 text-sm leading-relaxed">{item.description}</p>
          <ul class="pl-0 mt-4 list-none flex flex-col gap-2">
            {#each item.points as point}
              <li class="flex items-start gap-2 text-sm text-slate-300">
                <svg class="w-4 h-4 text-ocean-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {point}
              </li>
            {/each}
          </ul>
        </article>
      {/each}
    </div>
  </div>
</section>
