<template>
  <section class="problem-view">
    <div class="problem-hero">
      <p class="eyebrow">The Problem</p>
      <h1>What we are up against.</h1>
      <p>
        Real, unfiltered shots from the Greek coastline. Each upload feeds the case for mechanical fleets, municipal funding,
        and EU environmental interventions.
      </p>
    </div>
    <ProblemGallery />
  </section>
</template>

<script setup>
import ProblemGallery from '@/components/ProblemGallery.vue'
</script>

<style scoped>
.problem-view {
  padding: 2rem 0 4rem;
}

.problem-hero {
  text-align: center;
  max-width: 760px;
  margin: 0 auto 1.5rem;
  padding: 0 1.5rem;
}
</style>
