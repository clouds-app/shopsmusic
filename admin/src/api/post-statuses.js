import axios from '@/libs/api.request'
import Qs from 'qs'//这个库是 axios 里面包含的，不需要再下载了

/** 
* @description  获取 Post Statuses 列表/get Post Statuses list
* @params {type,context} 
* @detail https://developer.wordpress.org/rest-api/reference/post-statuses/#list-statuses
* @example $ curl http://demo.wp-api.org/wp-json/wp/v2/statuses/<status>
*/

export const getPostStatuses = ({type,context}) => {
    //参数
    const data = {
       // type,context
    }
    return axios.request({
      url: '/api/wp-json/wp/v2/statuses',
      data,
      method: 'get',
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
  }
  