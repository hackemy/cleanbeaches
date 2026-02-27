<script lang="ts">
  import { scrollReveal } from '$lib/utils/scrollReveal'
  import problemCases from '$lib/data/problemCases'
</script>

<section class="max-w-6xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
  {#each problemCases as item, i (item.id)}
    <article
      class="rounded-2xl overflow-hidden shadow-sm bg-coral-50/50 border border-coral-100 flex flex-col group hover:shadow-lg transition-all duration-300"
      use:scrollReveal={{ delay: i * 150 }}
    >
      <div class="overflow-hidden">
        <img
          src={item.photo}
          alt={item.title}
          loading="lazy"
          class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div class="p-6">
        <p class="uppercase tracking-[0.2em] text-xs text-coral-600 font-bold m-0">Field report</p>
        <h3 class="mt-2 mb-2 text-lg font-bold text-slate-900">{item.title}</h3>
        <p class="m-0 text-slate-500 text-sm leading-relaxed">{item.description}</p>
      </div>
    </article>
  {/each}
</section>
