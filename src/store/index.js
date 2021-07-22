import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储用户登录数据
    user: JSON.parse(window.localStorage.getItem('mobile-user') || null)
  },
  mutations: {
    // 用于修改 user
    setUser (state, payload) {
      // payload 为用户请求到的数据，为 JSON 格式，不方便操作，装维对象格式进行存储
      state.user = JSON.parse(payload)
      // 将数据存储到本地，本地存储无法存储对象，直接存储 JSON 格式的数据
      window.localStorage.setItem('mobile-user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
