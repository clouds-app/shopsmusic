// import { 
//     login, 
//     logout, 
//     getUserInfo,
//     tokenValidate,
//     operationPageById,
//   } from '@/api/user'
import * as userServices from '@/api/user'
import { setToken, getToken,setCookie,getCookie} from '@/libs/util'
//import { GetGuid } from '@/libs/tools'
const serverBusyTips="网络繁忙，请稍后再试！"
export default {
    state: {
      userName: getCookie('userName'),
      userId: getCookie('userId'),
      avatorImgPath: '',
      token: getToken(),
      access: '',
      hasGetInfo: false,
      userList:[],
    },
    getters:{
      userList_state:state=>state.userList
    },
    mutations: {
      setAvator (state, avatorPath) {
        state.avatorImgPath = avatorPath
      },
      setUserId (state, id) {
        state.userId = id
         setCookie('userId',id);
      },
      setUserName (state, name) {
        state.userName = name;
         setCookie('userName',name);
      },
      setAccess (state, access) {
        state.access = access
      },
      setToken (state, token) {
        state.token = token
        setToken(token)
      },
      setHasGetInfo (state, status) {
        state.hasGetInfo = status
      },
      //用户列表
      setUserList(state,data){
        state.userList =data
      }
    },
    actions: {
      // 用户登录
      handleLogin ({ commit }, params) {
        return new Promise((resolve, reject) => {
          try{
            userServices.login(params).then(res => {
               const data = res.data
              if(res.status==200)
              {
                commit('setToken', data.token)
                resolve()
              }
              else
              {
                reject(data.message)
              }
             
            }).catch(err => {
              console.error(err)
              if(err.response.data.data.status==403)
              {
                reject(err.response.data.data.status)
              }else{
                reject(serverBusyTips)
              }
            
            })
          }
          catch(err)
          {
            console.error(err)
            reject(serverBusyTips)
          }
       
        })
      },
      // 退出登录
      handleLogOut ({ state, commit }) {
        //debugger
        return new Promise((resolve, reject) => {
          userServices.logout().then(() => {
            commit('setToken', '')
            resolve()
          }).catch(err => {
            reject(err)
          })
          // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        
        })
      },

      // 获取用户相关信息
      getUserInfo ({ state, commit }) {
        return new Promise((resolve, reject) => {
          try {
            userServices.getUserInfo(state.token).then(res => {
              const data = res.data
              commit('setAvator', data.avator)
              commit('setUserName', data.name)
              commit('setUserId', data.user_id)
              commit('setAccess', data.access)
              commit('setHasGetInfo', true)
              resolve(data)
            }).catch(err => {
              reject(err)
            })
          } catch (error) {
            console.error(err)
            reject(serverBusyTips)
          }
        })
      },
      // 获取用户相关信息
      CheckToken ({ state, commit }) {
          //debugger
        return new Promise((resolve, reject) => {
          try {
            userServices.tokenValidate(state.token).then(res => {
            //debugger
              const data = res.data
              resolve(data)
            }).catch(err => {
              reject(err)
            })
          } catch (error) {
            console.error(err)
            reject(serverBusyTips)
          }
        })
      },
      // 操作文章
      getOperationPageById ({ state, commit },params) {
        //debugger
      return new Promise((resolve, reject) => {
        try {
          userServices.operationPageById(params).then(res => {
          //debugger
            const data = res.data
           
            resolve(data)
          }).catch(err => {
            let resData=err.response.data
            reject(resData.message)
          })
        } catch (error) {
          console.error(err)
          reject(serverBusyTips)
        }
      })
    },
 //============================user option==============================
    /**
    * @description  获取用户列表/get users list
    * @params {context,page,per_page,search,exclude,include,offset,order,orderby,slug,roles } 
    * @detail https://developer.wordpress.org/rest-api/reference/users/#list-users
    * @example $ curl http://demo.wp-api.org/wp-json/wp/v2/users
    */
    getUserList({commit,dispatch},params){
      return new Promise((resolve,reject)=>{
        try {
          userServices.getUsers(params).then(res=>{
              let data =res.data
              commit('setUserList',data)
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
    * @description  删除指定用户/delete user by id
    * @params {id,force,reassign } 
    * @detail https://developer.wordpress.org/rest-api/reference/users/#delete-a-user
    * @example $ curl -X DELETE http://demo.wp-api.org/wp-json/wp/v2/users/<id>
    */
    deleteUserById({commit,dispatch},params){
      //
      return new Promise((resolve,reject)=>{
        try {
          userServices.deleteUser(params).then(res=>{
            let data = res.data
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
    * @description 添加/修改用户/创建/更新用户 /create or update a user by id
    * @params {username【require】,name,first_name,last_name,email【require】,url,description,locale,nickname,slug,roles,password【require】,meta} 
    * @update POST /wp/v2/users/<id>
    * @detail https://developer.wordpress.org/rest-api/reference/users/#create-a-user
    * @example $ curl http://demo.wp-api.org/wp-json/wp/v2/users/<id>
    */
    createOrUpdateUser({commit,dispatch,state, getters,rootState, rootGetters},params){
      debugger
      return new Promise((resolve,reject)=>{
        try {
          userServices.createOrEditUser(params).then(res=>{
            let data = res.data
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
        
        
    }
  }