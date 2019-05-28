// import router from '@/router'
// import { reject } from 'q';

export const homeName ='home' //首页标签路由名称
export var currentRoute= {} //当前路径路由
/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
    localStorage.tagNaveList = JSON.stringify(list)
  }

  /**
   * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
   */
  export const getTagNavListFromLocalstorage = () => {
    const list = localStorage.tagNaveList
    return list ? JSON.parse(list) : []
  }

export var tagNavList = getTagNavListFromLocalstorage() || [] //[] //路由列表

  //获取路由标题
export const getRouteTitleHandled = (route) => {
    let router = {...route}
    let meta = {...route.meta}
    let title = ''
    if (meta.title) {
      if (typeof meta.title === 'function') title = meta.title(router)
      else title = meta.title
    }
    meta.title = title
    router.meta = meta
    return router
  }


  /**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNavList, routeItem) => {
    let len = tagNavList.length
    let res = false
    doCustomTimes(len, (index) => {
      if (routeEqual(tagNavList[index], routeItem)) res = true
    })
    return res
  }

  /**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
    let i = -1
    while (++i < times) {
      callback(i)
    }
  }

  /**
 * @description 获取关闭后的上一个页面标签
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextRoute = (list, route) => {
    //debugger
    let res = {}
    if (list.length === 2) {
      res = getHomeRoute(list)
    } else {
      const index = list.findIndex(item => routeEqual(item, route))
      if (index === list.length - 1) res = list[list.length - 2]
      else res = list[index + 1]
    }
    return res
  }

  /**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象/首页标签
 */
export const getHomeRoute = (routers, homeName = 'home') => {
    let i = -1
    let len = routers.length
    let homeRoute = {}
    while (++i < len) {
      let item = routers[i]
      if (item.children && item.children.length) {
        let res = getHomeRoute(item.children, homeName)
        if (res.name) return res
      } else {
        if (item.name === homeName) homeRoute = item
      }
    }
    return homeRoute
  }

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
    const { name, path, meta } = newRoute
    let newList = [...list]
    if (newList.findIndex(item => item.name === name) >= 0) return newList
    else newList.push({ name, path, meta })
    return newList
  }


/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
    //debugger
    const params1 = route1.params || {}
    const params2 = route2.params || {}
    const query1 = route1.query || {}
    const query2 = route2.query || {}
    return  (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2)
  }


/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1, obj2) => {
    const keysArr1 = Object.keys(obj1)
    const keysArr2 = Object.keys(obj2)
    if (keysArr1.length !== keysArr2.length) return false
    else if (keysArr1.length === 0 && keysArr2.length === 0) {
        return true
    }
    /* eslint-disable-next-line */
    else{
        return !keysArr1.some(key => obj1[key] != obj2[key])
    } 
  }

  //======================================
//从标签列表读取设置
  export const setTagNavList = (list) =>{
    let tagList = []
    if (list) {
      tagList = [...list]
    } 
    else {
        tagList = getTagNavListFromLocalstorage() || []
    }
    if (tagList[0] && tagList[0].name !== homeName) { //第一个必须是HOME
      tagList.shift()
    }
  
    let homeTagIndex = tagList.findIndex(item => item.name === homeName)
    if (homeTagIndex > 0) {
      let homeTag = tagList.splice(homeTagIndex, 1)[0]
      tagList.unshift(homeTag)
    }
    tagNavList = tagList
    setTagNavListInLocalstorage([...tagList])
  }

  //添加标签
  // 使用方法：addTag({route: { name, query, params, meta }, type: 'push'})
  export const addTag = ({ route, type = 'unshift' })=> {
      //debugger 
    let router = getRouteTitleHandled(route)
    if (!routeHasExist(tagNavList, router)) {
      if (type === 'push') {
        tagNavList.push(router)
      }
      else {
        if (router.name === homeName) tagNavList.unshift(router)
        else tagNavList.splice(1, 0, router)
      }
      setTagNavListInLocalstorage([...tagNavList])
    }
  }

  //关闭标签
  export const  closeTag = (route,callback) =>{
      //debugger
    let tag = tagNavList.filter(item => routeEqual(item, route))
    route = tag[0] ? tag[0] : null
    if (!route) {
        return
    }
    closePage(route,callback)
  }

  
  //关闭指定标签 返回需要跳转的页面
  export const  closeTagById = (route,currentRoute,callback) =>{
    debugger
  let tag = tagNavList.filter(item => routeEqual(item, route))
  route = tag[0] ? tag[0] : null
  if (!route) {
      return
  }
  // router.push(homeName)  ////因数据不即时刷新，因跳转两次可以刷新数据 import router from '@/router'
  // router.push(currentRoute) 
  callback(currentRoute)
}

  //关闭页面,返回需要跳转的页面
  export const closePage = (route,callback) => {
    debugger
    const nextRoute = getNextRoute(tagNavList, route)
    tagNavList = tagNavList.filter(item => {
      //debugger
      return !routeEqual(item, route)
    })
    callback(nextRoute)
    //router.push(nextRoute) //跳转到指定路由页面，  import router from '@/router'
  }
//==================================below  wat out temp=======================================================
  //添加页面到列表 actionPath,title
  export const addMenuToTagEven = (actionPath,title,callback)=>{
   let tagRoute={name:actionPath,params:{}, query:{}, meta:{title:title}}
   addRoutToTagEven(tagRoute,callback)
  }

  //添加RoutT页面到列表 tagRoute
  export const addRoutToTagEven = (tagRoute,callback) =>{
    currentRoute=tagRoute
     addTag({
       route: tagRoute,
       type:'push'
     })
    // turnToPage(homeName)
     turnToPage(tagRoute,callback)
  }

  //跳转到指定页面
  export const  turnToPage =(route,callback) =>{
      let { name, params, query } = {}
      if (typeof route === 'string'){
          name = route
      } 
      else {
          name = route.name
          params = route.params
          query = route.query
          meta =route.meta
      }
      if (name.indexOf('isTurnByHref_') > -1) {
          window.open(name.split('_')[1])
          return
      }
      callback({
        name,
        params,
        query,
        meta
       })
     }
//关闭指定页面，关闭所有，关闭其他
export const  handleCloseTagEven = (res, type, route) => {
      if (type === 'all') {
               addMenuToTag('home','首页')
             }
             else if (type === 'others'){
                let currentRoute=res[1]
                addRoutToTag(currentRoute)
             }
             else {
             if (routeEqual(currentRoute, route)) {
                   closeTag(route,(res=>{
                         addRoutToTag(res)
                   }))
             }else{
              closeTagById(route,currentRoute,(res=>{
                     addRoutToTag(res)
              }))
             }
           }
      setTagNavList(res)
   }
