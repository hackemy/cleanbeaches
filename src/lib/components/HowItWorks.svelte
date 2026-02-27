<script lang="ts">
  import { scrollReveal } from '$lib/utils/scrollReveal'
  import { data } from '$lib/data/types'

  const { howItWorks } = data

  const icons: Record<string, string> = {
    pin: '<path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />',
    people: '<path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />',
    chart: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />',
  }
</script>

<section class="py-20 lg:py-28 bg-white">
  <div class="max-w-6xl mx-auto px-6 lg:px-12">

    <!-- Header -->
    <div class="text-center mb-16" use:scrollReveal={{ delay: 0 }}>
      <p class="uppercase tracking-[0.2em] text-sm text-ocean-600 font-bold mb-3">{howItWorks.eyebrow}</p>
      <h2 class="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-slate-900 leading-tight">
        {howItWorks.headline}
      </h2>
      <p class="text-lg text-slate-500 mt-4 max-w-2xl mx-auto">
        {howItWorks.body}
      </p>
    </div>

    <!-- Steps -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">

      <!-- Connector line (desktop only) -->
      <div class="hidden md:block absolute top-16 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-0.5 border-t-2 border-dashed border-ocean-200 pointer-events-none"></div>

      {#each howItWorks.steps as step, i}
        <div class="flex flex-col items-center text-center" use:scrollReveal={{ delay: i * 150 }}>
          <div class="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-ocean-400 to-ocean-600 text-white flex items-center justify-center text-2xl font-extrabold shadow-lg shadow-ocean-200 mb-6">
            {i + 1}
          </div>
          <div class="mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-ocean-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              {@html icons[step.icon] || icons.pin}
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
          <p class="text-slate-500 leading-relaxed max-w-xs">
            {step.description}
          </p>
        </div>
      {/each}
    </div>

    <!-- CTA -->
    <div class="text-center mt-14" use:scrollReveal={{ delay: 400 }}>
      <a
        href={howItWorks.cta.href}
        class="rounded-full font-bold py-3.5 px-8 bg-gradient-to-r from-ocean-500 to-sky-600 text-white no-underline inline-flex items-center justify-center transition-all hover:shadow-lg hover:-translate-y-0.5"
      >
        {howItWorks.cta.label}
      </a>
    </div>
  </div>
</section>
