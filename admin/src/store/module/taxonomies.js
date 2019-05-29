import * as taxonomiesServices from '@/api/taxonomies'
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
        * @description  获取系统分类Taxonomies列表/get Taxonomies list
        * @params {context,type} 
        * @detail https://developer.wordpress.org/rest-api/reference/taxonomies/#list-taxonomies
        * @example $ curl http://demo.wp-api.org/wp-json/wp/v2/taxonomies
        */
       getTaxonomiesList({ commit }, params){
        return new Promise((resolve, reject) => {
            try{
                taxonomiesServices.getTaxonomies(params).then(res=>{
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