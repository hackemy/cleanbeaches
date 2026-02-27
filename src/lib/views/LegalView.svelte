<script lang="ts">
  import LegalMarkdown from '$lib/components/LegalMarkdown.svelte'
  import { data } from '$lib/data/types'

  let { slug }: { slug: string } = $props()

  const legalConfig = data.pages.legal

  let content = $state('')
  let error = $state('')

  const markdownFiles = import.meta.glob('../../content/legal/*.md', {
    query: '?raw',
    import: 'default',
  }) as Record<string, () => Promise<string>>

  let title = $derived(
    slug
      .split('-')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  )

  async function loadMarkdown(s: string) {
    const key = `../../content/legal/${s}.md`
    if (!markdownFiles[key]) {
      error = 'Document not found.'
      content = ''
      return
    }
    try {
      error = ''
      content = await markdownFiles[key]()
    } catch {
      error = 'Failed to load document.'
    }
  }

  $effect(() => {
    if (slug) {
      loadMarkdown(slug.toLowerCase())
    }
  })
</script>

<section class="py-8 pb-16">
  <div class="text-center max-w-3xl mx-auto px-6 pb-8">
    <p class="uppercase tracking-[0.28em] text-xs text-sky-600 font-bold">{legalConfig.eyebrow}</p>
    <h1>{title}</h1>
    <p>
      {legalConfig.body}
    </p>
  </div>
  {#if error}
    <div class="text-red-700 text-center font-semibold">{error}</div>
  {:else}
    <LegalMarkdown {content} />
  {/if}
</section>
