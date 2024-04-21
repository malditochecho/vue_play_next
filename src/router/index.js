import { createRouter, createWebHistory } from 'vue-router'
import useAuthUser from '@/composables/useAuthUser'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter: async () => {
      const { logout } = useAuthUser()
      await logout()
      return { name: 'login' }
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NofFoundView.vue')
  },
  {
    path: '/error/:error',
    name: 'error',
    component: () => import('@/views/ErrorView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// cada vez que se ingresa a una ruta...
router.beforeEach(async (to) => {
  const { isLoggedIn } = useAuthUser()
  if (!isLoggedIn && to.meta.requiresAuth) {
    return { name: 'login' }
  }
})

export default router
