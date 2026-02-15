<template>
  <section class="legal-wrapper">
    <article v-if="content" v-html="htmlContent" class="legal-content"></article>
    <p v-else class="loading">Loading document…</p>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { marked } from 'marked'

const props = defineProps({
  content: {
    type: String,
    default: '',
  },
})

const htmlContent = computed(() => (props.content ? marked.parse(props.content) : ''))
</script>

<style scoped>
.legal-wrapper {
  padding: 2rem;
  max-width: 760px;
  margin: 0 auto;
}

.legal-content :deep(h1),
.legal-content :deep(h2),
.legal-content :deep(h3) {
  margin-top: 1.5rem;
  color: #0f172a;
}

.legal-content :deep(p),
.legal-content :deep(li) {
  color: #334155;
  line-height: 1.7;
}

.loading {
  text-align: center;
}
</style>
