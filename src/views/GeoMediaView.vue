<template>
  <section class="geo-media-view">
    <div class="geo-hero">
      <p class="eyebrow">Incident tracking</p>
      <h1>Map every polluted shoreline before we clean it.</h1>
      <p>
        Upload geo-tagged photos to <code>public/media/</code>, log their coordinates in <code>src/data/geoMedia.js</code>,
        and the map will update automatically on the next deploy. Each pin links evidence to municipal escalations.
      </p>
    </div>
    <GeoMediaMap />
  </section>
</template>

<script setup>
import GeoMediaMap from '@/components/GeoMediaMap.vue'
</script>

<style scoped>
.geo-media-view {
  padding: 2rem 0 4rem;
}

.geo-hero {
  text-align: center;
  max-width: 760px;
  margin: 0 auto 1.5rem;
  padding: 0 1.5rem;
}

code {
  background: #e0f2fe;
  padding: 0 0.35rem;
  border-radius: 6px;
}
</style>
