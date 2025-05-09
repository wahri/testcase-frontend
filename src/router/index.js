import { createRouter, createWebHistory } from 'vue-router'

// Import views
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import Item from '@/views/Item.vue'
import Transaction from '@/views/Transaction.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true } // Tambahkan metadata untuk auth
  },
  {
    path: '/item',
    name: 'Item',
    component: Item,
    meta: { requiresAuth: true } // Tambahkan metadata untuk auth
  },
  {
    path: '/transaction',
    name: 'Transaction',
    component: Transaction,
    meta: { requiresAuth: true } // Tambahkan metadata untuk auth
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('access_token')

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    // Cegah user kembali ke login jika sudah login
    next('/dashboard')
  } else {
    next()
  }
})

export default router
