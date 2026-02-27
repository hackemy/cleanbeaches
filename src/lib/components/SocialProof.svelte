<script lang="ts">
  import { scrollReveal } from '$lib/utils/scrollReveal'
  import { data } from '$lib/data/types'

  const { socialProof } = data
</script>

<section class="py-20 lg:py-28 bg-slate-50">
  <div class="max-w-6xl mx-auto px-6 lg:px-12">

    <!-- Header -->
    <div class="text-center mb-16" use:scrollReveal={{ delay: 0 }}>
      <p class="uppercase tracking-[0.2em] text-sm text-ocean-600 font-bold mb-3">{socialProof.eyebrow}</p>
      <h2 class="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-slate-900 leading-tight">
        {socialProof.headline}
      </h2>
    </div>

    <!-- Testimonial cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {#each socialProof.testimonials as t, i}
        <div
          class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
          use:scrollReveal={{ delay: i * 150 }}
        >
          <!-- Quote mark -->
          <svg class="w-10 h-10 text-ocean-200 mb-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
          </svg>

          <!-- Quote text -->
          <p class="text-slate-600 leading-relaxed flex-1 mb-6">
            {t.quote}
          </p>

          <!-- Author -->
          <div class="flex items-center gap-3 pt-4 border-t border-slate-100">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br {t.color} text-white flex items-center justify-center text-sm font-bold shrink-0">
              {t.initials}
            </div>
            <div>
              <p class="text-sm font-bold text-slate-900 m-0">{t.name}</p>
              <p class="text-xs text-slate-500 m-0">{t.role}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
