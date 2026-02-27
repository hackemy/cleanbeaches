<script lang="ts">
  import GalleryGrid from '$lib/components/GalleryGrid.svelte'
  import { data } from '$lib/data/types'

  const { gallery } = data
  const pageConfig = data.pages.gallery
</script>

<section class="py-8 pb-16">
  <div class="max-w-2xl mx-auto mb-4 text-center px-6">
    <p class="uppercase tracking-[0.28em] text-xs text-sky-600 font-bold">{pageConfig.eyebrow}</p>
    <h1 class="mb-2">{pageConfig.headline}</h1>
    <p>
      {pageConfig.body}
    </p>
  </div>
  <GalleryGrid photos={gallery.photos} />
</section>
