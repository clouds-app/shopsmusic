import Home from '@/views/Home.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path:'/login',
    name:'login',
    component:()=>import(/* webpackChunkName: "about" */ '@/views/login/login.vue')
  }
]