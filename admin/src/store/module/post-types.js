import * as postTypesServices from '@/api/post-types'
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
        * @description  获取 Post Types 列表/get Post Types list
        * @params {type,context} 
        * @detail https://developer.wordpress.org/rest-api/reference/post-types/#list-types
        * @example $ curl http://demo.wp-api.org/wp-json/wp/v2/types/<type>
        */
       getPostTypesList({ commit }, params){
        return new Promise((resolve, reject) => {
            try{
                postTypesServices.getPostTypes(params).then(res=>{
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
   
 }
}