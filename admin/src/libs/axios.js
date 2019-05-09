import axios from 'axios'
import defaultSetting from '@/config'
import store from '@/store'
// import { Spin } from 'iview'
import { setToken, getToken,setCookie,getCookie} from '@/libs/util'
const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
 // if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

 /**
 * 需要认证的 Http 请求
 */
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url){
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      //debugger
			if(res.data.status == 443){
        // store.dispatch('handleLogOut').then(res=>{
        //   let rediretUrl ='http://'+window.location.host+'/#/login'
        //   window.location.href = rediretUrl //defaultSetting.baseUrl.pro
        // })
				return;
      }else{
          this.destroy(url)
          const { data, status } = res
          return { data, status }
      }
   
    }, error => {
      this.destroy(url)
      addErrorLog(error.response)
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
