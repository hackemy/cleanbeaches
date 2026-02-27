<script lang="ts">
  import { marked } from 'marked'

  let { content = '' }: { content: string } = $props()

  let htmlContent = $derived(content ? marked.parse(content) as string : '')
</script>

<section class="p-8 max-w-3xl mx-auto">
  {#if content}
    <article class="legal-content">
      {@html htmlContent}
    </article>
  {:else}
    <p class="text-center">Loading document…</p>
  {/if}
</section>

<style>
  @reference "../../app.css";
  .legal-content :global(h1),
  .legal-content :global(h2),
  .legal-content :global(h3) {
    @apply mt-6 text-slate-900;
  }
  .legal-content :global(p),
  .legal-content :global(li) {
    @apply text-slate-700 leading-relaxed;
  }
</style>
