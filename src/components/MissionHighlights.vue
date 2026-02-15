<template>
  <section id="roadmap" class="highlights">
    <div class="section-heading">
      <p class="eyebrow">2025 rollout</p>
      <h2>Scaling from pilots to national coverage.</h2>
    </div>
    <div class="timeline">
      <article v-for="item in timeline" :key="item.title" class="timeline-card">
        <p class="phase">{{ item.phase }}</p>
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <ul>
          <li v-for="point in item.points" :key="point">{{ point }}</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<script setup>
const timeline = [
  {
    phase: 'Q1 2025',
    title: 'Legal + Fleet Setup',
    description: 'Finalize AMKE registration, procure first two sifters, onboard core ops team.',
    points: ['Articles + GEMI complete', 'Stripe + finance stack live', 'Fleet tests in Attica'],
  },
  {
    phase: 'Q2 2025',
    title: 'Island Partnerships',
    description: 'Multi-island agreements for recurring machine + volunteer cleanups.',
    points: ['Milos, Paros, Naxos signed', 'Regional co-funding secured', 'Volunteer academy launch'],
  },
  {
    phase: 'Q3-Q4 2025',
    title: 'National Dashboard',
    description: 'Public data portal with live KPIs, transparency docs, and open impact API.',
    points: ['Telemetry streaming to dashboard', 'Impact API for partners', 'Annual transparency report'],
  },
]
</script>

<style scoped>
.highlights {
  padding: 3rem 2rem;
}

.timeline {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.timeline-card {
  padding: 1.75rem;
  border-radius: 24px;
  background: #0f172a;
  color: #e2e8f0;
  min-height: 320px;
}

.phase {
  margin: 0;
  font-weight: 600;
  color: #0ea5e9;
  text-transform: uppercase;
}

.timeline-card h3 {
  margin: 0.5rem 0;
}

ul {
  padding-left: 1.1rem;
}

li {
  margin-bottom: 0.3rem;
}
</style>
