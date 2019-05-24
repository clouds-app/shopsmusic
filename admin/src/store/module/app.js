import {
    setTagNavListInLocalstorage,
    getTagNavListFromLocalstorage,
    getRouteTitleHandled,
    routeHasExist
  } from '@/libs/util'

import config from '@/config'
const { homeName } = config

export default {
   state:{
        tagNavList:[],
    },
    getters:{
        tagNavList_state:state =>state.tagNavList
    },
    mutations:{
    setTagNavList (state, list) {
            let tagList = []
            if (list) {
              tagList = [...list]
            } else tagList = getTagNavListFromLocalstorage() || []
            if (tagList[0] && tagList[0].name !== homeName) tagList.shift()
            let homeTagIndex = tagList.findIndex(item => item.name === homeName)
            if (homeTagIndex > 0) {
              let homeTag = tagList.splice(homeTagIndex, 1)[0]
              tagList.unshift(homeTag)
            }
            state.tagNavList = tagList
            setTagNavListInLocalstorage([...tagList])
          },
          addTag (state, { route, type = 'unshift' }) {
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
    },
    actions:{

    }
}