<script lang="ts">
  import { scrollReveal } from '$lib/utils/scrollReveal'
  import { data } from '$lib/data/types'

  const { operations } = data
</script>

<section class="py-20 lg:py-28 bg-slate-50">
  <div class="max-w-6xl mx-auto px-6 lg:px-12">
    <div class="text-center max-w-2xl mx-auto mb-14" use:scrollReveal={{ delay: 0 }}>
      <p class="uppercase tracking-[0.2em] text-sm text-ocean-600 font-bold mb-3">{operations.eyebrow}</p>
      <h2 class="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-slate-900 leading-tight">{operations.headline}</h2>
      <p class="text-lg text-slate-500 mt-4">
        {operations.body}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {#each operations.items as op, i (op.id)}
        <article
          class="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
          use:scrollReveal={{ delay: i * 150 }}
        >
          <div class="overflow-hidden">
            <img
              src={op.photo}
              alt="{op.beach} cleanup photo"
              loading="lazy"
              class="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div class="p-6 flex flex-col gap-1 flex-1">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <p class="m-0 text-ocean-600 uppercase tracking-wider text-xs font-bold">{op.island}</p>
            </div>
            <h3 class="m-0 text-lg font-bold text-slate-900">{op.beach}</h3>
            <p class="m-0 font-bold text-slate-700">{op.impact}</p>
            <p class="m-0 text-slate-500 text-sm">{op.type}</p>
            <p class="mt-1 mb-0 text-slate-500 text-sm leading-relaxed">{op.description}</p>
            <div class="mt-3 flex flex-wrap gap-2">
              {#each op.partners as partner}
                <span class="py-1 px-3 rounded-full bg-ocean-50 text-ocean-700 text-xs font-semibold">{partner}</span>
              {/each}
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
