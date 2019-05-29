import axios from '@/libs/api.request'
import Qs from 'qs'//这个库是 axios 里面包含的，不需要再下载了

/** 
* @description  获取 Post-revisions 列表/get Post-revisions list
* @params {parent} 
* @detail https://developer.wordpress.org/rest-api/reference/post-revisions/#list-post-revisions
* @example $ curl  http://demo.wp-api.org/wp-json/wp/v2/posts/<parent>/revisions
*/

export const getPostsRevisions = ({parent}) => {
    //参数
    const data = {
       //parent
    }
    return axios.request({
      url: `/api/wp-json/wp/v2/${parent}/revisions`,
      data,
      method: 'get',
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
  }
  
  
  /**
  * @description  删除指定 Post-revisions /delete Post-revisions by id
  * @params {id,parent } 
  * @detail https://developer.wordpress.org/rest-api/reference/post-revisions/#list-post-revisions
  * @example $ curl http://demo.wp-api.org/wp-json/wp/v2/posts/<parent>/revisions/<id>
  */
  
  export const deletePostsRevisions = ({id,parent}) => {
  //参数
  const data = {
   // id,parent
  }
  return axios.request({
    url: `api/wp-json/wp/v2/${parent}/revisions/${id}`,
    data,
    method: 'delete',
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      return Qs.stringify(data)
    }],
  })
  }
  