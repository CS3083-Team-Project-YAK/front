import { createRouter, createWebHistory } from "vue-router";
import SignInPage from "@/views/SignInPage.vue"; // Adjust path if necessary

const routes = [
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignInPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
