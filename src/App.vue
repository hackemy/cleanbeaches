<template>
  <div class="app-shell">
    <NavigationBar />
    <main class="main-content">
      <RouterView />
    </main>
    <FooterSection />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import NavigationBar from '@/components/NavigationBar.vue'
import FooterSection from '@/components/FooterSection.vue'
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(circle at top, #f0f9ff, #f7fbff 45%, #ffffff 80%);
}

.main-content {
  flex: 1;
  padding-top: 80px;
}
</style>
