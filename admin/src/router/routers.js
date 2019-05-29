import Home from '@/views/home/Home.vue'

export default [
  {
      path: '/',
      redirect: { path: '/home' }
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
    redirect:'/home/', //默认自路由跳转
    children:[ 
      {
        path:'/', //嵌套路径path不需要’/‘
        name:'tableExample',
        meta: {
          hideInMenu: false,
          title: '',
          notCache: false,
          keepAlive: true, 
          icon: 'md-home'
        },
        component:()=>import(/* webpackChunkName: "tableExample" */ '_c/TableSelectByKey.vue')
      },
      {
      path:'pageList', //嵌套路径path不需要’/‘
      name:'pageList',
      meta: {
        hideInMenu: false,
        title: '页面列表',
        notCache: false,
        keepAlive: true, 
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
          keepAlive: true, 
          notCache: false, //this.$route.meta.keepAlive = false;
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
          keepAlive: false, 
          notCache: false,
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
          notCache: false,
          icon: 'md-home'
        },
        component:()=>import(/* webpackChunkName: "category" */ '@/views/category/category.vue')
      },
      {
        path:'meta',//嵌套路径path不需要’/‘
        name:'meta',
        meta: {
          hideInMenu: false,
          title: '标签列表',
          notCache: false,
          icon: 'md-home'
        },
        component:()=>import(/* webpackChunkName: "meta" */ '@/views/meta/meta.vue')
      },
      {
        path:'user',//嵌套路径path不需要’/‘
        name:'user',
        meta: {
          hideInMenu: false,
          title: '用户列表',
          keepAlive: false, 
          notCache: false,
          icon: 'md-home'
        },
        component:()=>import(/* webpackChunkName: "userList" */ '@/views/user/userList.vue')
      },
      {
        path:'userEdit',//嵌套路径path不需要’/‘
        name:'userEdit',
        meta: {
          hideInMenu: false,
          title: '用户编辑',
          notCache: false,
          icon: 'md-home'
        },
        component:()=>import(/* webpackChunkName: "addOrEditPost" */ '@/views/user/addOrEditUser.vue')
      },
      {
         path:'*', //others route redirect to home/base
         redirect:'/'
      }
      
    ]
  },
  {
     path:'*',
     redirect:'/home'
  }
]