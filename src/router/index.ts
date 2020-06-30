import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

export const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/index.vue")
  },
  {
    path: "/table",
    name: "Table",
    component: () => import("../views/table.vue")
  },
  {
    path: "/form",
    name: "Form",
    component: () => import("../views/form.vue")
  },
  {
    path: "/403",
    name: "403",
    component: () => import("../views/error-page/403.vue")
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/error-page/404.vue")
  },
  {
    path: "/500",
    name: "500",
    component: () => import("../views/error-page/500.vue")
  },
  {
    path: "*",
    component: () => import("../views/error-page/404.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: string) {
  return (routerPush.call(this, location) as any).catch((error: any) => error);
};

const routerReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location: string) {
  return (routerReplace.call(this, location) as any).catch(
    (error: any) => error
  );
};

export default router;
