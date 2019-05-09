import { 
    login, 
    logout, 
    getUserInfo,
    tokenValidate,
    operationPageById,
  } from '@/api/user'
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
      hasGetInfo: false
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
      }
    },
    actions: {
      // 用户登录
      handleLogin ({ commit }, {username, password}) {
        // username = username.trim()
        return new Promise((resolve, reject) => {
          login({
            username,
            password
          }).then(res => {
              debugger
              console.warn(res)
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
            reject(serverBusyTips)
          })
        })
      },
      // 退出登录
      handleLogOut ({ state, commit }) {
        //debugger
        return new Promise((resolve, reject) => {
          logout().then(() => {
            commit('setToken', '')
            commit('setUserId','');
            commit('setUserName','');
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
            getUserInfo(state.token).then(res => {
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
          debugger
        return new Promise((resolve, reject) => {
          try {
            tokenValidate(state.token).then(res => {
            debugger
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
        debugger
      return new Promise((resolve, reject) => {
        try {
          operationPageById(params).then(res => {
          debugger
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
    }
  }