import * as commentsServices from '@/api/comments'
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
        * @description  获取 Comments 列表/get Comments list
        * @params {context,page,per_page,search,after,author,author_exclude,author_email,before,exclude,include,offset,order,orderby,parent,parent_exclude, post,status,type,password} 
        * @detail https://developer.wordpress.org/rest-api/reference/comments/#list-comments
        * @example $ curl http://demo.wp-api.org/wp-json/wp/v2/comments
        */
       getCommentsList({ commit }, params){
        return new Promise((resolve, reject) => {
            try{
                commentsServices.getComments(params).then(res=>{
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
     * @description  删除指定 Comments /delete Comments by id
     * @params {id,force,password } 
    * @detail https://developer.wordpress.org/rest-api/reference/comments/#list-comments
    * @example $ curl http://demo.wp-api.org/wp-json/wp/v2/comments
    */
    deleteCommentsById({ commit }, params){
        return new Promise((resolve, reject) => {
            try{
                commentsServices.deleteComments(params).then(res=>{
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
      /**
     * @description 添加/修改 Comments/创建/更新 Comments /create or update a Comments by id
     * @params {author,author_email,author_ip,author_name,author_url,author_user_agent,content,date,date_gmt,parent,post,status,meta} 
     * @detail https://developer.wordpress.org/rest-api/reference/comments/#list-comments
     * @example $ curl http://demo.wp-api.org/wp-json/wp/v2/comments
     */
    createOrEditComments({ commit }, params){
       // debugger
        return new Promise((resolve, reject) => {
            try{
                commentsServices.createOrEditComments(params).then(res=>{
                    //debugger
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
    }
    }
}