<script lang="ts">
  import { scrollReveal } from '$lib/utils/scrollReveal'
  import { animatedCounter } from '$lib/utils/animatedCounter'
  import { data } from '$lib/data/types'

  const { impact } = data
  const progressPercent = (impact.progress.current / impact.progress.goal) * 100
</script>

<section id="impact" class="py-20 lg:py-28 bg-white">
  <div class="max-w-6xl mx-auto px-6 lg:px-12">
    <div class="text-center max-w-2xl mx-auto mb-14" use:scrollReveal={{ delay: 0 }}>
      <p class="uppercase tracking-[0.2em] text-sm text-ocean-600 font-bold mb-3">{impact.eyebrow}</p>
      <h2 class="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-slate-900 leading-tight">{impact.headline}</h2>
      <p class="text-lg text-slate-500 mt-4">{impact.body}</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each impact.metrics as metric, i (metric.label)}
        <article
          class="relative p-6 pt-8 rounded-2xl border border-slate-900/8 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          use:scrollReveal={{ delay: i * 100 }}
        >
          <!-- Accent bar -->
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ocean-400 to-ocean-600"></div>

          <p class="text-4xl font-extrabold m-0 text-slate-900" use:animatedCounter={{ target: metric.value, suffix: metric.suffix, separator: ',' }}></p>
          <p class="my-1 font-semibold text-slate-700">{metric.label}</p>
          <p class="m-0 text-slate-500 text-sm leading-relaxed">{metric.description}</p>
        </article>
      {/each}
    </div>

    <!-- Progress bar -->
    <div class="mt-12 max-w-2xl mx-auto" use:scrollReveal={{ delay: 400 }}>
      <div class="flex justify-between text-sm mb-2">
        <span class="text-slate-600 font-semibold">{impact.progress.label}</span>
        <span class="text-ocean-600 font-bold">{impact.progress.current} of {impact.progress.goal} {impact.progress.unit}</span>
      </div>
      <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
        <div
          class="h-full bg-gradient-to-r from-ocean-400 to-ocean-600 rounded-full"
          style="width: 0%; animation: fill-bar 1.5s ease-out 0.5s forwards; --target-width: {progressPercent}%"
        ></div>
      </div>
      <p class="text-sm text-slate-500 mt-2 text-center">{impact.progress.callout}</p>
    </div>
  </div>
</section>

<style>
  @keyframes fill-bar {
    to { width: var(--target-width); }
  }
</style>
