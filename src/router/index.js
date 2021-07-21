import Vue from 'vue'
import VueRouter from 'vue-router'

import Course from '@/views/course'

Vue.use(VueRouter)

const routes = [
  // 登录路由组件
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login')
  },
  // 选课路由组件
  {
    path: '/',
    name: 'course',
    component: Course
  },
  // 学习路由组件
  {
    path: '/learn',
    name: 'learn',
    component: () => import(/* webpackChunkName: 'learn' */'@/views/learn')
  },
  // 用户路由组件
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: 'user' */'@/views/user')
  },
  // 错误路由组件
  {
    path: '*',
    name: 'error',
    component: () => import(/* webpackChunkName: 'error' */'@/views/error-page')
  }
]

const router = new VueRouter({
  routes
})

export default router
