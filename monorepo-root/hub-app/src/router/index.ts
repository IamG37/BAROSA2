import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ServiceFrame from '../components/ServiceFrame.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/calculator37', component: ServiceFrame, props: { src: '/services/calculator37/' } },
    { path: '/converter', component: ServiceFrame, props: { src: '/services/converter/' } }
  ]
})

export default router 