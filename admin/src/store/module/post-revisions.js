import * as postRevisionsServices from '@/api/post-revisions'
import {setSessionstorage,getSessionstorage} from '@/libs/util'
const serverBusyTips="网络繁忙，请稍后再试！"


export default {
    state:{
       // pageList:[]
    },
    getters:{
        //setPageList_state:state=>state.pageList
    },
    mutations:{
        // setPageList (state, data) {
        //     state.pageList = data
        //   }
    },
    actions:{   
      /** 
    * @description  获取 Post-revisions 列表/get Post-revisions list
    * @params {parent} 
    * @detail https://developer.wordpress.org/rest-api/reference/post-revisions/#list-post-revisions
    * @example $ curl  http://demo.wp-api.org/wp-json/wp/v2/posts/<parent>/revisions
    */
      getPostsRevisionsList({ commit }, params){
        return new Promise((resolve, reject) => {
            try{
                postRevisionsServices.getPostsRevisions(params).then(res=>{
                    //debugger
                    let data =res.data
                    resolve(data)
                    commit('setPostsList',data)
                }).catch(err=>{
                    let errData=err.response.data
                    reject(errData.message)
                })
            }catch(err){
                console.error(err)
                reject(serverBusyTips)
            }
         
        })
    },
     /**
     * @description  删除指定 Post-revisions /delete Post-revisions by id
     * @params {id,parent } 
     * @detail https://developer.wordpress.org/rest-api/reference/post-revisions/#list-post-revisions
     * @example $ curl http://demo.wp-api.org/wp-json/wp/v2/posts/<parent>/revisions/<id>
     */
    deletePostsRevisionsById({ commit }, params){
        return new Promise((resolve, reject) => {
            try{
                postRevisionsServices.deletePostsRevisions(params).then(res=>{
                    let data =res.data
                    resolve(data)
                }).catch(err=>{
                    let errData=err.response.data
                      reject(errData.message)
                })
            }catch(err){
                console.error(err)
                reject(serverBusyTips)
            }
         
        })
    },
   
 }
}