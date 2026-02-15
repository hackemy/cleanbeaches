<template>
  <section id="impact" class="metrics">
    <div class="section-heading">
      <p class="eyebrow">Impact dashboard</p>
      <h2>We track every kilogram we collect.</h2>
      <p>Metrics update after each operation and sync to the public dashboard.</p>
    </div>
    <div class="metrics-grid">
      <article v-for="metric in metrics" :key="metric.label" class="metric-card">
        <p class="metric-value">{{ metric.value }}</p>
        <p class="metric-label">{{ metric.label }}</p>
        <p class="metric-desc">{{ metric.description }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
const metrics = [
  {
    value: '24,800 kg',
    label: 'Plastic removed',
    description: 'Pilot phase across Attica, Cyclades, and Sporades (2024 data).',
  },
  {
    value: '32 km',
    label: 'Coastline restored',
    description: 'Machine-assisted cleansing of high-traffic beaches.',
  },
  {
    value: '1,920',
    label: 'Volunteer hours',
    description: 'Locals + visitors onboarded through municipalities.',
  },
  {
    value: '4',
    label: 'Custom machines',
    description: 'Tracked sifters adapted to rocky/pebble beaches.',
  },
]
</script>

<style scoped>
.metrics {
  padding: 3rem 2rem;
}

.section-heading {
  text-align: center;
  max-width: 620px;
  margin: 0 auto 2.5rem;
}

.section-heading h2 {
  margin: 0.4rem 0;
  font-size: clamp(2rem, 3vw, 2.8rem);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.metric-card {
  padding: 1.5rem;
  border-radius: 20px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
}

.metric-value {
  font-size: 2rem;
  margin: 0;
  color: #0f172a;
}

.metric-label {
  margin: 0.2rem 0;
  font-weight: 600;
}

.metric-desc {
  margin: 0;
  color: #475569;
}
</style>
