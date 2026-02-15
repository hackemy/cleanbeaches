<template>
  <section class="gallery-preview">
    <div class="section-heading">
      <p class="eyebrow">Success gallery</p>
      <h2>See the difference in every operation.</h2>
      <RouterLink to="/gallery" class="ghost-button">View full gallery</RouterLink>
    </div>
    <div class="preview-grid">
      <article v-for="photo in featured" :key="photo.id" class="preview-card">
        <img :src="photo.image" :alt="photo.title" />
        <div class="preview-info">
          <p class="location">{{ photo.location }}</p>
          <p class="title">{{ photo.title }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import gallery from '@/data/gallery'

const featured = computed(() => gallery.slice(0, 4))
</script>

<style scoped>
.gallery-preview {
  padding: 3rem 2rem 4rem;
}

.section-heading {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
}

.preview-grid {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.preview-card {
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(15, 23, 42, 0.12);
}

img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.preview-info {
  padding: 0.8rem 1rem 1.5rem;
}

.location {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.75rem;
  color: #0ea5e9;
  margin: 0;
}

.title {
  margin: 0.4rem 0 0;
  font-size: 1.1rem;
  color: #0f172a;
}

.ghost-button {
  border-radius: 999px;
  border: 1px solid #0ea5e9;
  color: #0ea5e9;
  padding: 0.6rem 1.4rem;
  text-decoration: none;
}
</style>
