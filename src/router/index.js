import Vue from 'vue'
import VueRouter from 'vue-router'

import Course from '@/views/course'
import store from '@/store'

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
    component: () => import(/* webpackChunkName: 'learn' */'@/views/learn'),
    meta: { requiresAuth: true }
  },
  // 用户路由组件
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: 'user' */'@/views/user'),
    meta: { requiresAuth: true }
  },
  // 课程详情路由组件
  {
    path: '/course-info/:courseId',
    name: 'course-info',
    component: () => import(/* webpackChunkName: 'course-info' */'@/views/course-info'),
    props: true
  },
  // 视频播放路由组件
  {
    path: '/course-video/:lessonId',
    name: 'course-video',
    component: () => import(/* webpackChunkName: 'course-video' */'@/views/course-info/video'),
    props: true
  },
  // 支付功能路由组件
  {
    path: '/pay/:courseId',
    name: 'pay',
    component: () => import(/* webpackChunkName: 'pay' */'@/views/pay/index'),
    meta: { requiresAuth: true },
    props: true
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

// 通过导航守卫进行登录检测与跳转
router.beforeEach((to, from, next) => {
  // 判断即将跳转的路由是否需要登录
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 判断 Vuex 中的 store 用户信息存在
    if (!store.state.user) {
      // 表示未登录
      return next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    }
    // 已登录
    next()
  } else {
    // 不需登录
    next()
  }
})

export default router
