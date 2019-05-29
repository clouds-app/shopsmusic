import axios from '@/libs/api.request'
import Qs from 'qs'//这个库是 axios 里面包含的，不需要再下载了

/** 
* @description  获取 Comments 列表/get Comments list
* @params {context,page,per_page,search,after,author,author_exclude,author_email,before,exclude,include,offset,order,orderby,parent,parent_exclude, post,status,type,password} 
* @detail https://developer.wordpress.org/rest-api/reference/comments/#list-comments
* @example $ curl http://demo.wp-api.org/wp-json/wp/v2/comments
*/

export const getComments = ({context,page,per_page,search,after,author,author_exclude,author_email,before,exclude,include,offset,order,orderby,parent,parent_exclude, post,status,type,password}) => {
    //参数
    const data = {
       // context,page,per_page,search,after,author,author_exclude,author_email,before,exclude,include,offset,order,orderby,parent,parent_exclude, post,status,type,password
    }
    return axios.request({
      url: '/api/wp-json/wp/v2/comments',
      data,
      method: 'get',
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
  }
  
  
  /**
  * @description  删除指定 Comments /delete Comments by id
  * @params {id,force,password } 
* @detail https://developer.wordpress.org/rest-api/reference/comments/#list-comments
* @example $ curl http://demo.wp-api.org/wp-json/wp/v2/comments
  */
  
  export const deleteComments = ({id,force,password}) => {
  //参数
  const data = {
   // id,force,password
  }
  return axios.request({
    url: `api/wp-json/wp/v2/comments/${id}`,
    data,
    method: 'delete',
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      return Qs.stringify(data)
    }],
  })
  }
  
  
  
  /**
  * @description 添加/修改 Comments/创建/更新 Comments /create or update a Comments by id
  * @params {author,author_email,author_ip,author_name,author_url,author_user_agent,content,date,date_gmt,parent,post,status,meta} 
  * @detail https://developer.wordpress.org/rest-api/reference/comments/#list-comments
  * @example $ curl http://demo.wp-api.org/wp-json/wp/v2/comments
  */
  export const createOrEditComments = ({author,author_email,author_ip,author_name,author_url,author_user_agent,content,date,date_gmt,parent,post,status,meta,id}) => {
    //参数
    //debugger
    const data = {
       // author,author_email,author_ip,author_name,author_url,author_user_agent,content,date,date_gmt,parent,post,status,meta
    }
    //debugger
    //更新操作
    let updateId= ''
    if(id!=0 && id !=null){
      updateId =`/${id}`
    }
    return axios.request({
      url: `/api/wp-json/wp/v2/comments${updateId}`,
      data,
      method: 'post',
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
  }