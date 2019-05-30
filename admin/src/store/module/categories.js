import * as categoryServices from '@/api/categories'
import {setSessionstorage,getSessionstorage} from '@/libs/util'
const serverBusyTips="网络繁忙，请稍后再试！"


export default {
    state:{
       categoryList:getSessionstorage('categoryList')|[],
    },
    getters:{
        //categoryList_state:state=>state.categoryList
        categoryList_state:state => {
            //通过方法访问
            return state.categoryList
        },
        //使用标准案例 官方版本
        // someGetter (state, getters, rootState, rootGetters) {
        //     getters.someOtherGetter // -> 'foo/someOtherGetter'
        //     rootGetters.someOtherGetter // -> 'someOtherGetter'
        //   },
     
    },
    mutations:{
        setCategoryList(state,data){
            state.categoryList = data
            setSessionstorage('categoryList',JSON.stringify(data)) 
        }
    },
    actions:{
        
        /**
        * @description  获取类别列表/get Categories list
        * @params {context,page,per_page,search,exclude,include,order,orderby,hide_empty,parent,post,slug}
        * @detail https://developer.wordpress.org/rest-api/reference/categories/#list-categories
        */
        getCategoryList({commit},params){
            return new Promise((resolve,reject)=>{
                try {
                    categoryServices.getCategories(params).then(res=>{
                        let data =res.data;
                        commit('setCategoryList',data)
                        resolve(data)
                    }).catch(err=>{
                        let errData=err.response.data
                        reject(errData.message)
                    })
                } catch (err) {
                    console.error(err)
                    reject(serverBusyTips)
                }
            })
        },
        
        /**
         * @description 创建/更新类型 create/update-a-category
         * @params { [id],description,name【Required】,slug,parent, meta } 
         * @detail  https://developer.wordpress.org/rest-api/reference/categories/#create-a-category
         * @Example  http://demo.wp-api.org/wp-json/wp/v2/categories/<id>
         * [context]={dispatch, commit, getters, rootGetters}
         */
        createOrUpdateCatetory(context,params){
            return new Promise((resolve,reject)=>{
                try {
                    categoryServices.createOrUpdateCategory(params).then(res=>{
                        let data =res.data
                        resolve(data)
                    }).catch(err=>{
                        let errData=err.response.data
                        reject(errData.message)
                    })
                } catch (err) {
                    console.error(err)
                    reject(serverBusyTips)
                }
               
            })
        },
         /**
         * @description 删除指定类别 Delete a Category
         * @params {id【Required】,force}
         * @detail https://developer.wordpress.org/rest-api/reference/categories/#delete-a-category
         * @Example  DELETE http://demo.wp-api.org/wp-json/wp/v2/categories/<id>
         * [context]={dispatch, commit, getters, rootGetters}
         */
        deleteCategoryById(context,params){
            return new Promise((resolve,reject)=>{
                try {
                    categoryServices.deleteCategory(params).then(res=>{
                        let data =res.data
                        resolve(data)
                    }).catch(err=>{
                        let errData=err.response.data
                        reject(errData.message)
                    })
                } catch (err) {
                    console.error(err)
                    reject(serverBusyTips)
                }
            })
        }
    }
}


