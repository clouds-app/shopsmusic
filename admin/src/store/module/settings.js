import * as settingsServices from '@/api/settings'
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
        * @description  获取 settings 列表/get settings list
        * @params {} 
        * @detail https://developer.wordpress.org/rest-api/reference/settings/#list-settings
        * @example $ curl http://demo.wp-api.org/wp-json/wp/v2/settings
        */
       getSettingsList({ commit }, params){
        return new Promise((resolve, reject) => {
            try{
                settingsServices.getSettings(params).then(res=>{
                    //debugger
                    let data =res.data
                    resolve(data)
                   // commit('setPostsList',data)
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
     * @description 添加/修改 Settings/创建/更新Settings/create or update a Settings by id
     * @params {title,description,timezone,date_format,time_format,start_of_week,language,use_smilies,default_category,default_post_format,posts_per_page,default_ping_status} 
     * @detail https://developer.wordpress.org/rest-api/reference/settings/#list-settings
     * @example $ curl http://demo.wp-api.org/wp-json/wp/v2/settings/<id>
     */
    createOrEditSettings({ commit }, params){
       // debugger
        return new Promise((resolve, reject) => {
            try{
                settingsServices.createOrEditSettings(params).then(res=>{
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