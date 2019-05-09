import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/iview.js'
import config from '@/config'
/**
 * @description 全局注册应用配置 
 * @action this.$config.属性名称
 */
Vue.prototype.$config = config

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
