import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '@/views/DashboardView.vue';
import LoginView from '@/views/LoginView.vue';

const routes = [
  { path: '/login', name: 'Login', component: LoginView },
  { 
    path: '/dashboard', 
    name: 'Dashboard', 
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  { path: '/', redirect: '/login' }, // 默认跳转到登录页面
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login'); // 未登录用户跳转到登录页面
  } else {
    next();
  }
});

export default router;

