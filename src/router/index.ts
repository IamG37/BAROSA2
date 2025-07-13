import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BasicCalculator from '../components/calculators/BasicCalculator.vue'
import ScientificCalculator from '../components/calculators/ScientificCalculator.vue'
import UnitCalculator from '../components/calculators/UnitCalculator.vue'
import FinancialCalculator from '../components/calculators/FinancialCalculator.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/services',
      name: 'services',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: HomeView // 추후 AboutView로 교체 가능
    },
    {
      path: '/contact',
      name: 'contact',
      component: HomeView // 추후 ContactView로 교체 가능
    },
    {
      path: '/calculator37/basic',
      name: 'basic-calculator',
      component: BasicCalculator
    },
    {
      path: '/calculator37/scientific',
      name: 'scientific-calculator',
      component: ScientificCalculator
    },
    {
      path: '/calculator37/unit',
      name: 'unit-calculator',
      component: UnitCalculator
    },
    {
      path: '/calculator37/financial',
      name: 'financial-calculator',
      component: FinancialCalculator
    }
  ]
})

export default router
