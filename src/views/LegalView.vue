<template>
  <section class="legal-view">
    <div class="legal-hero">
      <p class="eyebrow">Compliance</p>
      <h1>{{ title }}</h1>
      <p>
        CleanBeaches Greece is legally conservative by design. These documents evolve as we progress through AMKE registration
        and begin public fundraising activities.
      </p>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <LegalMarkdown v-else :content="content" />
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import LegalMarkdown from '@/components/LegalMarkdown.vue'

const route = useRoute()
const content = ref('')
const error = ref('')

const markdownFiles = import.meta.glob('../content/legal/*.md', { query: '?raw', import: 'default' })

const title = computed(() => {
  const slug = String(route.params.slug || '')
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
})

async function loadMarkdown(slug) {
  const key = `../content/legal/${slug}.md`
  if (!markdownFiles[key]) {
    error.value = 'Document not found.'
    content.value = ''
    return
  }
  try {
    error.value = ''
    content.value = await markdownFiles[key]()
  } catch (err) {
    error.value = 'Failed to load document.'
    console.error(err)
  }
}

watch(
  () => route.params.slug,
  (slug) => {
    if (slug) {
      loadMarkdown(String(slug).toLowerCase())
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.legal-view {
  padding: 2rem 0 4rem;
}

.legal-hero {
  text-align: center;
  max-width: 760px;
  margin: 0 auto;
  padding: 0 1.5rem 2rem;
}

.error {
  color: #b91c1c;
  text-align: center;
  font-weight: 600;
}
</style>
