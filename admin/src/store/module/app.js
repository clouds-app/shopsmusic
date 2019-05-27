import {
    setTagNavListInLocalstorage,
    getTagNavListFromLocalstorage,
    getRouteTitleHandled,
    routeHasExist,
    getNextRoute,
    routeEqual,
  } from '@/libs/util'

import router from '@/router'
import config from '@/config'
const { homeName } = config

const closePage = (state, route) => {
  const nextRoute = getNextRoute(state.tagNavList, route)
  state.tagNavList = state.tagNavList.filter(item => {
    return !routeEqual(item, route)
  })
  router.push(nextRoute)
}

export default {
   state:{
        tagNavList:getTagNavListFromLocalstorage() || []
    },
    getters:{
        tagNavList_state:state =>state.tagNavList
    },
    mutations:{
    setTagNavList (state, list) {
            //debugger
            let tagList = []
            if (list) {
              tagList = [...list]
            } else tagList = getTagNavListFromLocalstorage() || []
            if (tagList[0] && tagList[0].name !== homeName) { //第一个必须是HOME
             // debugger
              tagList.shift()
            }
          
            let homeTagIndex = tagList.findIndex(item => item.name === homeName)
            if (homeTagIndex > 0) {
              let homeTag = tagList.splice(homeTagIndex, 1)[0]
              tagList.unshift(homeTag)
            }
            state.tagNavList = tagList
            setTagNavListInLocalstorage([...tagList])
          },
          addTag (state, { route, type = 'unshift' }) {
            //debugger
            let router = getRouteTitleHandled(route)
            if (!routeHasExist(state.tagNavList, router)) {
              if (type === 'push') state.tagNavList.push(router)
              else {
                if (router.name === homeName) state.tagNavList.unshift(router)
                else state.tagNavList.splice(1, 0, router)
              }
              setTagNavListInLocalstorage([...state.tagNavList])
            }
          },
          closeTag (state, route) {
            let tag = state.tagNavList.filter(item => routeEqual(item, route))
            route = tag[0] ? tag[0] : null
            if (!route) return
            closePage(state, route)
          },
    },
    actions:{

    }
}