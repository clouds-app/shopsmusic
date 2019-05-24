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

/* eslint-disable no-new */
// new Vue({
//   el: '#app',  //在实例挂载之后，元素可以用 vm.$el 访问。限制：只在由 new 创建的实例中遵守。
//   router,
//   i18n,
//   store,
//   render: h => h(App)
// })

