<script lang="ts">
  import { data } from '$lib/data/types'

  const pageConfig = data.pages.donate
</script>

<section class="p-8 pb-16 flex flex-col gap-8 max-w-4xl mx-auto">
  <div class="text-center">
    <p class="uppercase tracking-[0.28em] text-xs text-sky-600 font-bold">{pageConfig.eyebrow}</p>
    <h1>{pageConfig.headline}</h1>
    <p>
      {pageConfig.body}
    </p>
  </div>
  <form class="flex flex-col gap-4 bg-white p-10 rounded-[2rem] shadow-[0_25px_60px_rgba(15,23,42,0.12)] max-sm:p-6" onsubmit={(e) => e.preventDefault()}>
    {#each pageConfig.form.fields as field}
      <label class="flex flex-col font-semibold text-slate-900 gap-1">
        {field.label}
        {#if field.type === 'select' && 'options' in field}
          <select name={field.name} required={field.required} class="rounded-2xl border border-slate-900/15 p-3 text-base font-normal">
            {#each field.options as opt}
              {#if typeof opt === 'string'}
                <option value={opt}>{opt}</option>
              {:else}
                <option value={opt.value}>{opt.label}</option>
              {/if}
            {/each}
          </select>
        {:else if field.type === 'textarea'}
          <textarea name={field.name} rows="4" placeholder={field.placeholder || ''} class="rounded-2xl border border-slate-900/15 p-3 text-base font-normal resize-y"></textarea>
        {:else}
          <input type={field.type} name={field.name} placeholder={field.placeholder || ''} required={field.required} class="rounded-2xl border border-slate-900/15 p-3 text-base font-normal" />
        {/if}
      </label>
    {/each}
    <button type="submit" class="self-start rounded-full font-semibold py-3 px-7 bg-gradient-to-r from-sky-500 to-sky-600 text-white border-none cursor-pointer">{pageConfig.form.submitLabel}</button>
    <p class="m-0 text-sm text-slate-500">{pageConfig.form.disclaimer}</p>
  </form>
</section>
