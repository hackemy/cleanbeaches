<template>
  <section class="partners">
    <p class="eyebrow">Allies & funders</p>
    <div class="marquee" aria-label="Partner logos">
      <div class="marquee-track">
        <div v-for="partner in partners" :key="partner" class="partner-chip">{{ partner }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
const partners = [
  'Region South Aegean',
  'Cyclades Ports',
  'Blue Flag Hellas',
  'Ocean Conservancy',
  'AEGEAN CSR',
  'Latsis Foundation',
]
</script>

<style scoped>
.partners {
  padding: 2rem;
  background: #f0f9ff;
}

.marquee {
  overflow: hidden;
  position: relative;
}

.marquee-track {
  display: flex;
  gap: 1.5rem;
  animation: scroll 20s linear infinite;
}

.partner-chip {
  padding: 0.8rem 1.4rem;
  border-radius: 999px;
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  font-weight: 600;
  white-space: nowrap;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
</style>
