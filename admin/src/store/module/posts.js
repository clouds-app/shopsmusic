import * as postsServices from '@/api/posts'
const serverBusyTips="网络繁忙，请稍后再试！"

export default {
    state:{
        postsList:[]
    },
    getters:{
        setPostsList_state:state=>state.postsList
    },
    mutations:{
        setPostsList (state, data) {
            state.postsList = data
          }
    },
    actions:{   
        getPostsList({ commit }, params){
            
            return new Promise((resolve, reject) => {
                try{
                    postsServices.getOrSetPosts(params).then(res=>{
                        //debugger
                        let data =res.data
                        resolve(data)
                        commit('setPostsList',data)
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