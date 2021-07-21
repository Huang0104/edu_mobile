import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入 lib-flexible,自动计算 rem 基准值
import 'amfe-flexible'

// 引入 Vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 将 Vant 注册为 vue 插件使用
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
