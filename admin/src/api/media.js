import axios from '@/libs/api.request'
import Qs from 'qs'//这个库是 axios 里面包含的，不需要再下载了

/**
* @description  获取Media列表/get Media list
* @params {context,page,per_page,search,after,author,author_exclude,before,exclude,include,offset,order,orderby,parent,parent_exclude,slug,status,media_type,mime_type } 
* @detail https://developer.wordpress.org/rest-api/reference/media/#list-media
* @example $ curl http://demo.wp-api.org/wp-json/wp/v2/media
*/

export const getMedia = ({context,page,per_page,search,after,author,author_exclude,before,exclude,include,offset,order,orderby,parent,parent_exclude,slug,status,media_type,mime_type}) => {
    //参数
    const data = {
       // context,page,per_page,search,after,author,author_exclude,before,exclude,include,offset,order,orderby,parent,parent_exclude,slug,status,media_type,mime_type
    }
    return axios.request({
      url: '/api/wp-json/wp/v2/media',
      data,
      method: 'get',
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
  }
  
  
  /**
  * @description  删除指定Media/delete media by id
  * @params {id,force } 
  * @detail https://developer.wordpress.org/rest-api/reference/media/#delete-a-media-item
  * @example $ curl -X DELETE http://demo.wp-api.org/wp-json/wp/v2/media/<id>
  */
  
  export const deleteMedia = ({id,force}) => {
  //参数
  const data = {
   // id,force
  }
  return axios.request({
    url: `api/wp-json/wp/v2/media/${id}`,
    data,
    method: 'delete',
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      return Qs.stringify(data)
    }],
  })
  }
  
  
  
  /**
  * @description 添加/修改Media/创建/更新Media /create or update a Media by id
  * @params {date,date_gmt,slug,status,title,author,comment_status,ping_status,meta,template,alt_text,caption,description,post} 
  * @update POST /wp/v2/users/<id>
  * @detail https://developer.wordpress.org/rest-api/reference/users/#create-a-user
  * @example $ curl http://demo.wp-api.org/wp-json/wp/v2/users/<id>
  */
  export const createOrEditMedia = ({date,date_gmt,slug,status,title,author,comment_status,ping_status,meta,template,alt_text,caption,description,post,id}) => {
    //参数
    //debugger
    const data = {
       // date,date_gmt,slug,status,title,author,comment_status,ping_status,meta,template,alt_text,caption,description,post
    }
    //debugger
    //更新操作
    let updateId= ''
    if(id!=0 && id !=null){
      updateId =`/${id}`
    }
    return axios.request({
      url: `/api/wp-json/wp/v2/media${updateId}`,
      data,
      method: 'post',
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
  }