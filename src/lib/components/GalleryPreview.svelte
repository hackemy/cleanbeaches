<script lang="ts">
  import { scrollReveal } from '$lib/utils/scrollReveal'
  import { data } from '$lib/data/types'

  const { gallery } = data
  const featured = gallery.photos.slice(0, gallery.previewCount)
</script>

<section class="py-20 lg:py-28 bg-white">
  <div class="max-w-6xl mx-auto px-6 lg:px-12">
    <div class="flex flex-wrap items-end gap-4 justify-between mb-12" use:scrollReveal={{ delay: 0 }}>
      <div>
        <p class="uppercase tracking-[0.2em] text-sm text-ocean-600 font-bold mb-3">{gallery.eyebrow}</p>
        <h2 class="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-slate-900 leading-tight m-0">{gallery.headline}</h2>
      </div>
      <a
        href="/gallery"
        class="rounded-full border-2 border-ocean-500 text-ocean-600 py-2.5 px-6 no-underline font-semibold text-sm transition-colors hover:bg-ocean-50"
      >
        {gallery.ctaLabel}
      </a>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each featured as photo, i (photo.id)}
        <article
          class="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
          use:scrollReveal={{ delay: i * 100 }}
        >
          <div class="overflow-hidden relative">
            <img
              src={photo.image}
              alt={photo.title}
              loading="lazy"
              class="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <!-- Hover overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p class="text-white font-semibold text-sm m-0">{photo.location}</p>
            </div>
          </div>
          <div class="py-3 px-4 pb-5 bg-white">
            <p class="uppercase tracking-wider text-xs text-ocean-500 font-bold m-0">{photo.location}</p>
            <p class="mt-1 mb-0 text-base font-semibold text-slate-900">{photo.title}</p>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
