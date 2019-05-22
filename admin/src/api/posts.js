import axios from '@/libs/api.request'
import Qs from 'qs'//这个库是 axios 里面包含的，不需要再下载了

/**
* @description 获取或设置页面
* @params {page,per_page,slug,status } 
* @detail https://developer.wordpress.org/rest-api/reference/posts/#list-posts
*/

export const getOrSetPosts = ({page,per_page,slug,status }) => {
    //参数
    const data = {
       // page,per_page,slug,status
    }
    return axios.request({
      url: '/api/wp-json/wp/v2/posts',
      data,
      method: 'get',
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
  }