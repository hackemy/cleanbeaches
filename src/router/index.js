import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import GalleryView from '@/views/GalleryView.vue'
import GeoMediaView from '@/views/GeoMediaView.vue'

const LegalView = () => import('@/views/LegalView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: GalleryView,
    },
    {
      path: '/evidence-map',
      name: 'evidence-map',
      component: GeoMediaView,
    },
    {
      path: '/legal/:slug',
      name: 'legal',
      component: LegalView,
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
