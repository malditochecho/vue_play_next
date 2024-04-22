import { createRouter, createWebHistory } from 'vue-router'
import useAuthUser from '@/composables/useAuthUser'

const routes = [
  // pages routes
  {
    name: 'Home',
    path: '/',
    redirect: '/games'
  },
  {
    name: 'Games',
    path: '/games',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/GameList.vue')
  },

  // auth routes
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    name: 'Logout',
    path: '/logout',
    beforeEnter: async () => {
      const { logout } = useAuthUser()
      await logout()
      return { name: 'Login' }
    }
  },

  // other routes
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/views/NofFound.vue')
  },
  {
    path: '/error/:error',
    name: 'error',
    component: () => import('@/views/Error.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// cada vez que se ingresa a una ruta...
router.beforeEach((to, from, next) => {
  const { isLoggedIn } = useAuthUser()
  if (!isLoggedIn() && to.meta.requiresAuth) next({ name: 'Login' })
  else next()
})

export default router
