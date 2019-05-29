import * as mediaServices from '@/api/media'
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
        * @description  获取Media列表/get Media list
        * @params {context,page,per_page,search,after,author,author_exclude,before,exclude,include,offset,order,orderby,parent,parent_exclude,slug,status,media_type,mime_type } 
        * @detail https://developer.wordpress.org/rest-api/reference/media/#list-media
        * @example $ curl http://demo.wp-api.org/wp-json/wp/v2/media
        */
       getMediaList({ commit }, params){
        return new Promise((resolve, reject) => {
            try{
                commentsServices.getMedia(params).then(res=>{
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
     * @description  删除指定Media/delete media by id
     * @params {id,force } 
     * @detail https://developer.wordpress.org/rest-api/reference/media/#delete-a-media-item
     * @example $ curl -X DELETE http://demo.wp-api.org/wp-json/wp/v2/media/<id>
     */
    deleteMediaById({ commit }, params){
        return new Promise((resolve, reject) => {
            try{
                commentsServices.deleteMedia(params).then(res=>{
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
     * @description 添加/修改Media/创建/更新Media /create or update a Media by id
     * @params {date,date_gmt,slug,status,title,author,comment_status,ping_status,meta,template,alt_text,caption,description,post} 
     * @update POST /wp/v2/users/<id>
     * @detail https://developer.wordpress.org/rest-api/reference/users/#create-a-user
     * @example $ curl http://demo.wp-api.org/wp-json/wp/v2/users/<id>
     */
    createOrEditMedia({ commit }, params){
       // debugger
        return new Promise((resolve, reject) => {
            try{
                commentsServices.createOrEditMedia(params).then(res=>{
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