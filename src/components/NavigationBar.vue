<template>
  <header class="nav-wrapper">
    <RouterLink to="/" class="brand">
      <span class="brand-mark">🏝️</span>
      <div>
        <p class="brand-name">CleanBeaches Greece</p>
        <p class="brand-tagline">Clean beaches. Real impact.</p>
      </div>
    </RouterLink>

    <nav class="nav-links">
      <RouterLink to="/" class="nav-link">Mission</RouterLink>
      <RouterLink to="/gallery" class="nav-link">Gallery</RouterLink>
      <RouterLink to="/problem" class="nav-link">The Problem</RouterLink>
      <RouterLink to="/evidence-map" class="nav-link">Map</RouterLink>
      <RouterLink :to="{ name: 'legal', params: { slug: 'privacy' } }" class="nav-link">Legal</RouterLink>
    </nav>

    <div class="nav-cta">
      <a class="ghost-button" href="#impact">See impact</a>
      <RouterLink to="/donate" class="solid-button">Donate</RouterLink>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.nav-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  z-index: 10;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}

.brand-mark {
  font-size: 2rem;
}

.brand-name {
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.brand-tagline {
  font-size: 0.8rem;
  color: #475569;
  margin: 0;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  text-decoration: none;
  color: #0f172a;
  font-weight: 600;
  position: relative;
  padding-bottom: 4px;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #0ea5e9;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s ease;
}

.nav-link.router-link-active::after {
  transform: scaleX(1);
}

.nav-cta {
  display: flex;
  gap: 0.75rem;
}

button,
.ghost-button,
.solid-button {
  border-radius: 999px;
  font-weight: 600;
  padding: 0.55rem 1.4rem;
  cursor: pointer;
  border: none;
}

.ghost-button {
  border: 1px solid #0ea5e9;
  color: #0ea5e9;
  background: transparent;
  text-decoration: none;
}

.solid-button {
  background: linear-gradient(120deg, #0ea5e9, #0284c7);
  color: #fff;
}

@media (max-width: 900px) {
  .nav-wrapper {
    flex-direction: column;
    gap: 0.5rem;
    height: auto;
    padding: 1rem;
  }

  .nav-links {
    order: 3;
  }

  .nav-cta {
    width: 100%;
    justify-content: center;
  }
}
</style>
