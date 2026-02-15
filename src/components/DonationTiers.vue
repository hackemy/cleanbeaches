<template>
  <section class="tiers">
    <div class="section-heading">
      <p class="eyebrow">Donation design</p>
      <h2>Pick an impact package.</h2>
      <p>Recurring sponsors receive telemetry packets, receipts, and brand placement on machines.</p>
    </div>
    <div class="tier-grid">
      <article v-for="tier in tiers" :key="tier.title" class="tier-card">
        <p class="label">{{ tier.title }}</p>
        <p class="amount">€{{ tier.amount }}</p>
        <ul>
          <li v-for="perk in tier.perks" :key="perk">{{ perk }}</li>
        </ul>
        <button class="solid-button">Sponsor</button>
      </article>
    </div>
  </section>
</template>

<script setup>
const tiers = [
  {
    title: 'Micro cleanup',
    amount: '1,200',
    perks: ['One-day volunteer deployment', 'Impact photo set', 'Public dashboard badge'],
  },
  {
    title: 'Machine lease',
    amount: '10,400',
    perks: ['Tracked sifter + operator', 'Real-time telemetry feed', 'Press kit + co-branding'],
  },
  {
    title: 'Island guardian',
    amount: '48,000',
    perks: ['Season-long program', 'Custom reporting + ESG alignment', 'Board-level quarterly brief'],
  },
]
</script>

<style scoped>
.tiers {
  padding: 3rem 2rem;
}

.tier-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.tier-card {
  border: 1px solid rgba(15, 23, 42, 0.1);
  border-radius: 24px;
  padding: 1.75rem;
  background: #fff;
  box-shadow: 0 15px 45px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.label {
  margin: 0;
  font-weight: 700;
  color: #0ea5e9;
}

.amount {
  margin: 0;
  font-size: 2.4rem;
  font-weight: 800;
  color: #0f172a;
}

ul {
  padding-left: 1.2rem;
  margin: 0 0 1rem;
  color: #475569;
}

button {
  margin-top: auto;
  align-self: flex-start;
  border: none;
}
</style>
