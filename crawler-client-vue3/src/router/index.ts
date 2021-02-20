import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/bcy',
    name: 'Bcy',
    component: () => import(/* webpackChunkName: "bcy" */ '../views/Bcy.vue'),
  },
  {
    path: '/juejin',
    name: 'Juejin',
    component: () => import(/* webpackChunkName: "bcy" */ '../views/Juejin.vue'),
  },
  {
    path: '/weixin',
    name: 'WeChat',
    component: () => import(/* webpackChunkName: "bcy" */ '../views/WeChat.vue'),
  },
  {
    path: '/zhihu',
    name: 'Zhihu',
    component: () => import(/* webpackChunkName: "bcy" */ '../views/Zhihu.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
