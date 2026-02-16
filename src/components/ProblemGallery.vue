<template>
  <section class="problem-gallery">
    <article v-for="item in problemCases" :key="item.id" class="problem-card">
      <img :src="item.photo" :alt="item.title" loading="lazy" />
      <div class="problem-meta">
        <p class="eyebrow">Field report</p>
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </article>
  </section>
</template>

<script setup>
import problemCases from '@/data/problemCases'
</script>

<style scoped>
.problem-gallery {
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.75rem;
}

.problem-card {
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12);
  background: #fff;
  display: flex;
  flex-direction: column;
}

img {
  width: 100%;
  height: 260px;
  object-fit: cover;
}

.problem-meta {
  padding: 1.5rem;
}

h3 {
  margin: 0.4rem 0 0.6rem;
}

p {
  margin: 0;
  color: #475569;
}
</style>
