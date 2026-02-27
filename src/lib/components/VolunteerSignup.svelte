<script lang="ts">
  import { scrollReveal } from '$lib/utils/scrollReveal'
  import { animatedCounter } from '$lib/utils/animatedCounter'
  import { data } from '$lib/data/types'

  const { volunteer } = data
</script>

<section id="volunteer" class="py-20 lg:py-28 bg-ocean-50">
  <div class="max-w-6xl mx-auto px-6 lg:px-12">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

      <!-- Left: copy -->
      <div use:scrollReveal={{ delay: 0 }}>
        <p class="uppercase tracking-[0.2em] text-sm text-ocean-600 font-bold mb-3">{volunteer.eyebrow}</p>
        <h2 class="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-slate-900 leading-tight mb-2">
          {volunteer.headline}
        </h2>
        <p class="text-lg text-slate-600 leading-relaxed mb-8">
          {volunteer.body}
        </p>

        <!-- Counter -->
        <div class="inline-flex items-baseline gap-2 mb-6">
          <span class="text-3xl font-extrabold text-ocean-600" use:animatedCounter={{ target: volunteer.counter.value, suffix: volunteer.counter.suffix }}></span>
          <span class="text-slate-500 font-semibold">{volunteer.counter.label}</span>
        </div>

        <!-- Checklist -->
        <ul class="list-none pl-0 flex flex-col gap-3">
          {#each volunteer.checklist as item}
            <li class="flex items-center gap-3 text-slate-700">
              <svg class="w-5 h-5 text-ocean-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {item}
            </li>
          {/each}
        </ul>
      </div>

      <!-- Right: form -->
      <div use:scrollReveal={{ delay: 200 }}>
        <form
          class="flex flex-col gap-5 p-8 rounded-2xl bg-white shadow-lg"
          onsubmit={(e) => e.preventDefault()}
        >
          {#each volunteer.form.fields as field}
            <label class="flex flex-col font-semibold text-slate-900 gap-1.5 text-sm">
              {field.label}
              {#if field.type === 'select' && 'options' in field}
                <select
                  name={field.name}
                  required={field.required}
                  class="rounded-xl border border-slate-200 py-3 px-4 text-base focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20 outline-none transition-all"
                >
                  {#each field.options as opt}
                    {#if typeof opt === 'string'}
                      <option value={opt}>{opt}</option>
                    {:else}
                      <option value={opt.value}>{opt.label}</option>
                    {/if}
                  {/each}
                </select>
              {:else}
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder || ''}
                  required={field.required}
                  class="rounded-xl border border-slate-200 py-3 px-4 text-base focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20 outline-none transition-all"
                />
              {/if}
            </label>
          {/each}
          <button
            type="submit"
            class="rounded-full font-bold py-3.5 px-7 bg-gradient-to-r from-ocean-500 to-sky-600 text-white border-none cursor-pointer text-base transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            {volunteer.form.submitLabel}
          </button>
          <p class="m-0 text-xs text-slate-400">{volunteer.form.disclaimer}</p>
        </form>
      </div>
    </div>
  </div>
</section>
