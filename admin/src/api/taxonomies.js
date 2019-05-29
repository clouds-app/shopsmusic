import axios from '@/libs/api.request'
import Qs from 'qs'//这个库是 axios 里面包含的，不需要再下载了

/** 
* @description  获取系统分类Taxonomies列表/get Taxonomies list
* @params {context,type} 
* @detail https://developer.wordpress.org/rest-api/reference/taxonomies/#list-taxonomies
* @example $ curl http://demo.wp-api.org/wp-json/wp/v2/taxonomies
*/

export const getTaxonomies = ({context,type}) => {
    //参数
    const data = {
       // context,type
    }
    return axios.request({
      url: '/api/wp-json/wp/v2/tags',
      data,
      method: 'get',
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
  }
  
  