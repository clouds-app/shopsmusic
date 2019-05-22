import Home from '@/views/home/Home.vue'

export default [
  {
      path: '/',
      redirect: { name: 'home' }
  },
  {
    path:'/login',
    name:'login',
    component:()=>import(/* webpackChunkName: "login" */ '@/views/login/login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta:{
      title:'',
      needLogin:false,
      icon: 'logo-buffer',
      keepAlive:true
    },
    children:[ 
      {
      path:'pageList',
      name:'pageList',
      component:()=>import(/* webpackChunkName: "pageList" */ '@/views/page/pageList.vue')
      },
    ]
  },
 
]