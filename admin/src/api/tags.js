import axios from '@/libs/api.request'
import Qs from 'qs'//这个库是 axios 里面包含的，不需要再下载了

/** {id,count,description,link,name,slug,taxonomy,meta } 
* @description  获取Tags列表/get Tags list
* @params {context,page,per_page,search,exclude,include,offset,order,orderby,hide_empty, post,slug} 
* @detail https://developer.wordpress.org/rest-api/reference/tags/#list-tags
* @example $ curl http://demo.wp-api.org/wp-json/wp/v2/tags
*/

export const getTags = ({context,page,per_page,search,exclude,include,offset,order,orderby,hide_empty, post,slug}) => {
    //参数
    const data = {
       // context,page,per_page,search,exclude,include,offset,order,orderby,hide_empty, post,slug
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
  
  
  /**
  * @description  删除指定tags/delete Tags by id
  * @params {id,force } 
  * @detail https://developer.wordpress.org/rest-api/reference/tags/#list-tags
  * @example $ curl -X DELETE http://demo.wp-api.org/wp-json/wp/v2/tags/<id>
  */
  
  export const deleteTags = ({id,force}) => {
  //参数
  const data = {
   // id,force
  }
  return axios.request({
    url: `api/wp-json/wp/v2/tags/${id}`,
    data,
    method: 'delete',
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      return Qs.stringify(data)
    }],
  })
  }
  
  
  
  /**
  * @description 添加/修改Tags/创建/更新Tags /create or update a Tags by id
  * @params {description,name,slug,meta} 
  * @detail https://developer.wordpress.org/rest-api/reference/tags/#list-tags
  * @example $ curl http://demo.wp-api.org/wp-json/wp/v2/tags/<id>
  */
  export const createOrEditTags = ({description,name,slug,meta,id}) => {
    //参数
    //debugger
    const data = {
       // description,name,slug,meta
    }
    //debugger
    //更新操作
    let updateId= ''
    if(id!=0 && id !=null){
      updateId =`/${id}`
    }
    return axios.request({
      url: `/api/wp-json/wp/v2/tags${updateId}`,
      data,
      method: 'post',
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
  }