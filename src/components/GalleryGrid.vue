<template>
  <section class="gallery-grid">
    <article v-for="photo in photos" :key="photo.id" class="gallery-card">
      <img :src="photo.image" :alt="photo.title" loading="lazy" />
      <div class="gallery-info">
        <div>
          <p class="location">{{ photo.location }}</p>
          <h3>{{ photo.title }}</h3>
        </div>
        <p class="description">{{ photo.description }}</p>
      </div>
    </article>
  </section>
</template>

<script setup>
defineProps({
  photos: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.gallery-grid {
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.gallery-card {
  border-radius: 20px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 15px 45px rgba(15, 23, 42, 0.12);
  display: flex;
  flex-direction: column;
}

img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.gallery-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.location {
  margin: 0;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: #0ea5e9;
}

h3 {
  margin: 0.3rem 0 0;
}

.description {
  margin: 0;
  color: #475569;
}
</style>
