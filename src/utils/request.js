import axios from 'axios'
import store from '@/store'
import router from '@/router'

const request = axios.create({
  baseURL: 'http://edufront.lagou.com'
})

// 通过请求拦截器进行接口鉴权
request.interceptors.request.use(config => {
  const { user } = store.state
  // 判断 user 是否存在数据，有则设置 token
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
})

// 封装函数，用于登录跳转页
function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

// 刷新 token 状态
let isRefreshing = false
// 存储刷新时发送的请求
let requests = []
// 设置响应拦截器
request.interceptors.response.use(response => {
  return response
}, async error => {
  // 存在响应，但是出错
  if (error.response) {
    // 判断响应内容是否为 401
    if (error.response.status === 401) {
      // 是否存在用户信息
      if (!store.state.user) {
        redirectLogin()
        // 如果不存在，结束并将错误抛到后面
        return Promise.reject(error)
      }
      // 存在用户信息
      // 在发送请求前，判断是否刷新了 access_token
      if (isRefreshing) {
        // 如果刷新了，将错误请求再次发送即可
        return requests.push(() => {
          // error.config 是失败请求时的配置对象
          request(error.config)
        })
      }
      isRefreshing = true
      // 发送请求，刷新 token
      const { data } = await request({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: new window.URLSearchParams({
          refreshtoken: store.state.user.refresh_token
        }).toString()
      })
      // 判断是否刷新成功
      if (data.state !== 1) {
        // 刷新失败
        store.commit('setUser', null)
        redirectLogin()
        return Promise.reject(error)
      }
      // 刷新成功,将所有请求重新发送
      requests.forEach(callback => callback())
      // 请求发送之后，清空
      requests = []
      // 将状态重置会默认
      isRefreshing = false
      return request(error.config)
    }
  }
  return Promise.reject(error)
})

export default request
