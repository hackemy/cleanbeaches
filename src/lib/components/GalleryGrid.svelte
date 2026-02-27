<script lang="ts">
  import { scrollReveal } from '$lib/utils/scrollReveal'
  import type { GalleryPhoto } from '$lib/data/types'

  let { photos }: { photos: GalleryPhoto[] } = $props()
</script>

<section class="max-w-6xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each photos as photo, i (photo.id)}
    <article
      class="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
      use:scrollReveal={{ delay: (i % 3) * 100 }}
    >
      <div class="overflow-hidden relative">
        <img
          src={photo.image}
          alt={photo.title}
          loading="lazy"
          class="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <p class="text-white font-semibold text-sm m-0">{photo.location}</p>
        </div>
      </div>
      <div class="p-6 flex flex-col gap-2">
        <div>
          <p class="m-0 uppercase text-xs tracking-wider text-ocean-500 font-bold">{photo.location}</p>
          <h3 class="mt-1 mb-0 text-lg font-bold text-slate-900">{photo.title}</h3>
        </div>
        <p class="m-0 text-slate-500 text-sm leading-relaxed">{photo.description}</p>
      </div>
    </article>
  {/each}
</section>
