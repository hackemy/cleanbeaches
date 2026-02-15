<template>
  <section class="gallery-view">
    <div class="gallery-hero">
      <p class="eyebrow">Impact gallery</p>
      <h1>Every cleanup documented end-to-end.</h1>
      <p>
        Browse verified photo sets, drone imagery, and telemetry snapshots before they hit the transparency dashboard.
      </p>
    </div>
    <GalleryGrid :photos="gallery" />
  </section>
</template>

<script setup>
import GalleryGrid from '@/components/GalleryGrid.vue'
import gallery from '@/data/gallery'
</script>

<style scoped>
.gallery-view {
  padding: 2rem 0 4rem;
}

.gallery-hero {
  max-width: 720px;
  margin: 0 auto 1rem;
  text-align: center;
  padding: 0 1.5rem;
}

.gallery-hero h1 {
  margin-bottom: 0.5rem;
}
</style>
