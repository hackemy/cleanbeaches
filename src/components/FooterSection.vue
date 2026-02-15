<template>
  <footer class="footer">
    <div>
      <p class="footer-title">CleanBeaches Greece</p>
      <p class="footer-text">Αστική Μη Κερδοσκοπική Εταιρεία (υπό σύσταση)</p>
      <p class="footer-text">Athens • Cyclades • Dodecanese</p>
    </div>

    <div>
      <p class="footer-title">Contact</p>
      <a href="mailto:hello@cleanbeaches.gr" class="footer-link">hello@cleanbeaches.gr</a>
      <p class="footer-text">+30 210 000 0000 (HQ)</p>
    </div>

    <div>
      <p class="footer-title">Quick links</p>
      <RouterLink to="/gallery" class="footer-link">Impact Gallery</RouterLink>
      <RouterLink :to="{ name: 'legal', params: { slug: 'terms' } }" class="footer-link">Terms of Service</RouterLink>
      <RouterLink :to="{ name: 'legal', params: { slug: 'privacy' } }" class="footer-link">Privacy Policy</RouterLink>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.footer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  padding: 3rem 2rem;
  background: #0f172a;
  color: #e2e8f0;
}

.footer-title {
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.footer-text {
  margin: 0.2rem 0;
  color: #cbd5f5;
}

.footer-link {
  color: #38bdf8;
  text-decoration: none;
  display: block;
  margin: 0.2rem 0;
  font-weight: 600;
}
</style>
