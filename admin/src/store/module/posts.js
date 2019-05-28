import * as postsServices from '@/api/posts'
import {setSessionstorage,getSessionstorage} from '@/libs/util'
const serverBusyTips="网络繁忙，请稍后再试！"

export default {
    //使用方法：this.$store.state.posts.属性名称,【注意：需要指定模块module名称posts】
    state:{
        //使用Sessionstorage存储，防止刷新界面 数据丢失
        postsList:(getSessionstorage('postsList')===false ? []:getSessionstorage('postsList')) 
    },
     //使用方法：this.$store.getters.属性名称
    getters:{
        postsList_state:state=>state.postsList,
        // setPostsList_state:function(state){
        //     return state.postsList.map(item=>{
        //         return item.score >=60 ?'done':'pending'
        //     })
        // }
        //  doneTodos: state => {
        //     //通过方法访问
        //     return state.todos.filter(todo => todo.done)
        //   },
        //   doneTodosCount: (state, getters) => {
        //       //通过属性访问
        //       return getters.doneTodos.length
        //   }
    },
    //使用方法：this.$store.commit('setPostsList',data)
    mutations:{
        setPostsList (state, data) {
            state.postsList = data
            //debugger
            setSessionstorage('postsList',JSON.stringify(data)) 
          }
    },
    //使用方法：this.$store.dispatch('getPostsList',params)
    actions:{ 
        /**
        * @description  获取文章列表/get post list
        * @params {page,per_page,slug,status } 
        * @detail https://developer.wordpress.org/rest-api/reference/posts/#list-posts
        */  
        getPostsList({ commit }, params){
            return new Promise((resolve, reject) => {
                try{
                    postsServices.getPosts(params).then(res=>{
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
        * @description  删除指定文章/delete post by id
        * @params {id } 
        * @detail https://developer.wordpress.org/rest-api/reference/posts/#delete-a-post
        */
        DeletePostById({ commit }, params){
            return new Promise((resolve, reject) => {
                try{
                    postsServices.deletePost(params).then(res=>{
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
        * @description 添加/修改页面
        * @params {title,content，slug,status } 
        * @update POST /wp/v2/posts/<id>
        * @detail https://developer.wordpress.org/rest-api/reference/posts/#list-posts
        */
        createOrUpdatePosts({ commit }, params){
           // debugger
            return new Promise((resolve, reject) => {
                try{
                    postsServices.createOrEditPosts(params).then(res=>{
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