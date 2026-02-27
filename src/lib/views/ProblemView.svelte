<script lang="ts">
  import { scrollReveal } from '$lib/utils/scrollReveal'
  import { animatedCounter } from '$lib/utils/animatedCounter'
  import ProblemGallery from '$lib/components/ProblemGallery.svelte'
  import { data } from '$lib/data/types'

  const pageConfig = data.pages.problem
</script>

<section class="py-8 pb-16">
  <!-- Intro -->
  <div class="text-center max-w-3xl mx-auto mb-8 px-6" use:scrollReveal={{ delay: 0 }}>
    <p class="uppercase tracking-[0.2em] text-sm text-coral-600 font-bold mb-3">{pageConfig.eyebrow}</p>
    <h1 class="text-[clamp(2rem,4vw,3rem)] font-extrabold text-slate-900 leading-tight">{pageConfig.headline}</h1>
    <p class="text-lg text-slate-500 mt-4 leading-relaxed">
      {pageConfig.body}
    </p>
  </div>

  <!-- Urgent stat bar -->
  <div class="max-w-4xl mx-auto px-6 mb-12" use:scrollReveal={{ delay: 200 }}>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {#each pageConfig.stats as stat}
        <div class="bg-coral-50 border border-coral-200 rounded-xl p-5 text-center">
          <p class="text-3xl font-extrabold text-coral-600 m-0" use:animatedCounter={{ target: stat.value, suffix: stat.suffix }}></p>
          <p class="text-sm text-slate-600 m-0 mt-1">{stat.label}</p>
        </div>
      {/each}
    </div>
  </div>

  <ProblemGallery />
</section>
