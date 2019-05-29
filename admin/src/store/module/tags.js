import * as tagsServices from '@/api/tags'
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
        * @description  获取Tags列表/get Tags list
        * @params {context,page,per_page,search,exclude,include,offset,order,orderby,hide_empty, post,slug} 
        * @detail https://developer.wordpress.org/rest-api/reference/tags/#list-tags
        * @example $ curl http://demo.wp-api.org/wp-json/wp/v2/tags
        */
       getTagsList({ commit }, params){
        return new Promise((resolve, reject) => {
            try{
                tagsServices.getTags(params).then(res=>{
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
     * @description  删除指定tags/delete Tags by id
     * @params {id,force } 
     * @detail https://developer.wordpress.org/rest-api/reference/tags/#list-tags
     * @example $ curl -X DELETE http://demo.wp-api.org/wp-json/wp/v2/tags/<id>
     */
    deleteTagsById({ commit }, params){
        return new Promise((resolve, reject) => {
            try{
                tagsServices.deleteTags(params).then(res=>{
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
     * @description 添加/修改Tags/创建/更新Tags /create or update a Tags by id
     * @params {description,name,slug,meta} 
     * @detail https://developer.wordpress.org/rest-api/reference/tags/#list-tags
     * @example $ curl http://demo.wp-api.org/wp-json/wp/v2/tags/<id>
     */
    createOrEditTags({ commit }, params){
       // debugger
        return new Promise((resolve, reject) => {
            try{
                tagsServices.createOrEditTags(params).then(res=>{
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