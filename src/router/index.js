/*
 * @Author: Sule
 * @Date: 2021-03-29 15:26:45
 * @LastEditors: Sule
 * @LastEditTime: 2021-04-15 14:35:41
 * @Description: 
 */
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  , {
    path: '/',
    component: () => import(/* webpackChunkName: "Container" */ '../views/Container.vue'),
    meta: { title: '主页' },
    children: [
      {
        path: '/power',
        component: () => import(/* webpackChunkName: "Power" */  '../views/Power.vue'),
        meta: { title: '无权限' }
      },
      {
        path: '/list',
        component: () => import(/* webpackChunkName: "List" */ '../components/main/List.vue'),
      },
    ]
  },
  {
    path: '/login',
    component:() => import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/map',
    component:() => import(/* webpackChunkName: "Map" */ '../views/Map.vue'),
    meta: { title: 'map' }
  },
  {
    path: '/dialogSplitWin',
    component:() => import(/* webpackChunkName: "dialogSplitWin" */ '../components/common/dialogs/dialogSplitWin.vue'),
    meta: { title: '分屏' }
  },
  {
    path: '/404',
    name: 'noFind',
    component:() => import(/* webpackChunkName: "Login" */ '../views/404.vue'),
    meta: { title: '404' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
