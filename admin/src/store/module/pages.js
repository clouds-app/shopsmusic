import * as pageServices from '@/api/pages'
const serverBusyTips="网络繁忙，请稍后再试！"

export default {
    state:{
        pageList:[]
    },
    getters:{
        setPageList_state:state=>state.pageList
    },
    mutations:{
        setPageList (state, data) {
            state.pageList = data
          }
    },
    actions:{   
        getPageList({ commit }, params){
            
            return new Promise((resolve, reject) => {
                try{
                    pageServices.getOrSetPages(params).then(res=>{
                        //debugger
                        let data =res.data
                        resolve(data)
                        commit('setPageList',data)
                    }).catch(err=>{
                        reject(err)
                    })
                }catch(err){
                    reject(serverBusyTips)
                }
             
            })
        }
    }
}