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
      title: '首页',
      needLogin:false,
      icon: 'logo-buffer',
      keepAlive:true
    },
    children:[ 
      {
      path:'pageList', //嵌套路径path不需要’/‘
      name:'pageList',
      meta: {
        hideInMenu: false,
        title: '页面列表',
        notCache: true,
        icon: 'md-home'
      },
      component:()=>import(/* webpackChunkName: "pageList" */ '@/views/page/pageList.vue')
      },
      {
        path:'postsList',//嵌套路径path不需要’/‘
        name:'postsList',
        meta: {
          hideInMenu: false,
          title: '文章列表',
          notCache: true,
          icon: 'md-home'
        },
        component:()=>import(/* webpackChunkName: "pageList" */ '@/views/posts/postList.vue')
      },
      {
        path:'postsEdit',//嵌套路径path不需要’/‘
        name:'postsEdit',
        meta: {
          hideInMenu: false,
          title: '文章编辑',
          notCache: true,
          icon: 'md-home'
        },
        component:()=>import(/* webpackChunkName: "addOrEditPost" */ '@/views/posts/addOrEditPost.vue')
      },
      {
        path:'category',//嵌套路径path不需要’/‘
        name:'category',
        meta: {
          hideInMenu: false,
          title: '类别列表',
          notCache: true,
          icon: 'md-home'
        },
        component:()=>import(/* webpackChunkName: "addOrEditPost" */ '@/views/category/category.vue')
      },
      {
        path:'meta',//嵌套路径path不需要’/‘
        name:'meta',
        meta: {
          hideInMenu: false,
          title: '标签列表',
          notCache: true,
          icon: 'md-home'
        },
        component:()=>import(/* webpackChunkName: "addOrEditPost" */ '@/views/meta/meta.vue')
      },
    ]
  },
 
]