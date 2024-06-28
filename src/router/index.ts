import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { isTokenExpired, logout } from '@/services/authService';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('../views/CategoryView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: { requiresAuth: true },
      component: () => import('../layouts/DLayout.vue'),
      children: [
        {
          path: '',
          name: 'd-index-view',
          component: () => import('../views/dashboard/DIndexView.vue')
        }
      ]
    }
  ]
});

// use middleware
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired(token)) {
      logout();
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
