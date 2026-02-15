<template>
  <section class="operations">
    <div class="section-heading">
      <p class="eyebrow">Field operations</p>
      <h2>Live programs across the islands.</h2>
      <p>
        Each cleanup run combines municipal funding, CSR sponsors, and volunteer task forces. We publish outcomes within 48 hours.
      </p>
    </div>
    <div class="operation-grid">
      <article v-for="op in operations" :key="op.id" class="operation-card">
        <img :src="op.photo" :alt="`${op.beach} cleanup photo`" loading="lazy" />
        <div class="operation-meta">
          <p class="island">{{ op.island }}</p>
          <h3>{{ op.beach }}</h3>
          <p class="impact">{{ op.impact }}</p>
          <p class="type">{{ op.type }}</p>
          <p class="description">{{ op.description }}</p>
          <div class="partners">
            <span v-for="partner in op.partners" :key="partner" class="chip">{{ partner }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import operations from '@/data/operations'
</script>

<style scoped>
.operations {
  padding: 3rem 2rem;
}

.operation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.operation-card {
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: #fff;
  box-shadow: 0 15px 40px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
}

img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.operation-meta {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.island {
  margin: 0;
  color: #0ea5e9;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: 0.75rem;
}

.impact {
  margin: 0;
  font-weight: 700;
  color: #0f172a;
}

.type {
  margin: 0;
  color: #475569;
  font-size: 0.9rem;
}

.description {
  margin: 0.2rem 0 0;
  color: #475569;
}

.partners {
  margin-top: 0.8rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.chip {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: #e0f2fe;
  color: #0369a1;
  font-size: 0.8rem;
  font-weight: 600;
}
</style>
