import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "@/views/DashboardView.vue";
import LeagueView from "@/views/LeagueView.vue";
import TeamView from "@/views/TeamView.vue";
import PlayerView from "@/views/PlayerView.vue";
import DraftView from "@/views/DraftView.vue";
import MatchView from "@/views/MatchView.vue";
import TradeView from "@/views/TradeView.vue";
import SignInPage from "@/views/SignInPage.vue";

const routes = [
  { path: "/login", name: "Login", component: SignInPage },
  { path: "/dashboard", name: "Dashboard", component: DashboardView},
  { path: "/leagues", name: "Leagues", component: LeagueView, meta: { requiresAuth: true } },
  { path: "/teams", name: "Teams", component: TeamView, meta: { requiresAuth: true } },
  { path: "/players", name: "Players", component: PlayerView, meta: { requiresAuth: true } },
  { path: "/drafts", name: "Drafts", component: DraftView, meta: { requiresAuth: true } },
  { path: "/matches", name: "Matches", component: MatchView, meta: { requiresAuth: true } },
  { path: "/trades", name: "Trades", component: TradeView, meta: { requiresAuth: true } },
  { 
    path: "/", 
    redirect: () => {
      const isAuthenticated = !!localStorage.getItem("authToken");
      return isAuthenticated ? "/login" : "/login"; // 动态重定向
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫：保护需要身份验证的路由
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next("/login"); // 如果未登录，跳转到登录页面
  } else {
    next();
  }
});

export default router;




