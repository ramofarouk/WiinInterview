import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/home",
    name: "home",
    component: () => import("./components/Home")
  },
  {
    path: "/add-contact",
    alias: "/add-contact",
    name: "add_contact",
    component: () => import("./components/AddContact")
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;