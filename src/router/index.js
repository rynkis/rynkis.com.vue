import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/design',
      name: 'design',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DesignView.vue')
    },
    {
      path: '/skill',
      name: 'skill',
      component: () => import('../views/SkillView.vue')
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('../views/GameView.vue')
    },
    {
      path: '/poetry',
      name: 'poetry',
      component: () => import('../views/PoetryView.vue')
    },
    {
      path: '/music',
      name: 'music',
      component: () => import('../views/MusicView.vue')
    }
  ]
})

export default router
