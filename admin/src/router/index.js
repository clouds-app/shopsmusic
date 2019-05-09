import Vue from 'vue'
import Router from 'vue-router'
//import Home from '@/views/Home.vue'
import routes from './routers'

Vue.use(Router)

const router = new Router({
    routes:routes
})


export default router
