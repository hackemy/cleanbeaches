import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import GalleryView from '@/views/GalleryView.vue'
import GeoMediaView from '@/views/GeoMediaView.vue'
import ProblemView from '@/views/ProblemView.vue'
import DonateView from '@/views/DonateView.vue'

const LegalView = () => import('@/views/LegalView.vue')

const router = createRouter({
  // Hash history works reliably on GitHub Pages and still behaves as a SPA.
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
      path: '/problem',
      name: 'problem',
      component: ProblemView,
    },
    {
      path: '/evidence-map',
      name: 'evidence-map',
      component: GeoMediaView,
    },
    {
      path: '/donate',
      name: 'donate',
      component: DonateView,
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
