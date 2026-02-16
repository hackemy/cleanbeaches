<template>
  <section id="donate" class="cta">
    <div>
      <p class="eyebrow">Fund the fleet</p>
      <h2>Every €10,400 funds one full beach clean with telemetry + recycling.</h2>
      <p>
        Donations activate machinery leases, pay machine operators, and cover POSIDONIA-safe disposal.
        We publish every receipt and outcome in the transparency dashboard.
      </p>
    </div>
    <div class="cta-actions">
      <RouterLink class="solid-button" to="/donate">Sponsor a cleanup</RouterLink>
      <a class="ghost-button" href="mailto:fundraising@cleanbeaches.gr">Talk to us</a>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.cta {
  background: #0f172a;
  color: #e2e8f0;
  border-radius: 32px;
  margin: 3rem 2rem;
  padding: 3rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
}

h2 {
  margin: 0.5rem 0;
  font-size: clamp(2rem, 3vw, 2.8rem);
}

p {
  max-width: 520px;
}

.cta-actions {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

button,
.ghost-button {
  border-radius: 999px;
  font-weight: 600;
  padding: 0.9rem 2rem;
  cursor: pointer;
  border: none;
}

.ghost-button {
  border: 1px solid #38bdf8;
  color: #38bdf8;
  background: transparent;
  text-align: center;
  text-decoration: none;
}

.solid-button {
  background: linear-gradient(120deg, #22d3ee, #0ea5e9);
  color: #0f172a;
}
</style>
