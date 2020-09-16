import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Uploader from "@/views/Uploader.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Uploader",
    component: Uploader,
    props: true
  },
  {
    path: "/Home",
    name: "Home",
    component: Home,
    props: true
  },
];

const router = new VueRouter({
  routes
});

export default router;
