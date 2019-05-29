import axios from '@/libs/api.request'
import Qs from 'qs'//这个库是 axios 里面包含的，不需要再下载了

/** 
* @description  获取 Post Types 列表/get Post Types list
* @params {type,context} 
* @detail https://developer.wordpress.org/rest-api/reference/post-types/#list-types
* @example $ curl http://demo.wp-api.org/wp-json/wp/v2/types/<type>
*/

export const getPostTypes = ({type,context}) => {
    //参数
    const data = {
       // type,context
    }
    return axios.request({
      url: '/api/wp-json/wp/v2/types',
      data,
      method: 'get',
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
  }
  