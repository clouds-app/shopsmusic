import axios from '@/libs/api.request'
import Qs from 'qs'//这个库是 axios 里面包含的，不需要再下载了

/**
* @description  获取文章列表/get post list
* @params {page,per_page,slug,status } 
* @detail https://developer.wordpress.org/rest-api/reference/posts/#list-posts
*/

export const getPosts = ({page,per_page,slug,status }) => {
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

/**
* @description  删除指定文章/delete post by id
* @params {id } 
* @detail https://developer.wordpress.org/rest-api/reference/posts/#delete-a-post
*/

export const deletePost = ({id}) => {
  //参数
  const data = {
   // id
  }
  return axios.request({
    url: `api/wp-json/wp/v2/posts/${id}`,
    data,
    method: 'delete',
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      return Qs.stringify(data)
    }],
  })
}



/**
* @description 添加/修改文章/创建/更新文章 /create or update a post by id
* @params {title,content，slug,status } 
* @update POST /wp/v2/posts/<id>
* @detail https://developer.wordpress.org/rest-api/reference/posts/#list-posts
*/
  export const createOrEditPosts= ({title,content,status,id}) => {
    //参数
    //debugger
    const data = {
      title,
      content,
      status,
      telephoneno:'13670287036'
      // acf:{
      //   telephoneno:'13670287036'
      // }
    }
    //debugger
    //更新操作
    let updateId= ''
    if(id!=0 && id !=null){
      updateId =`/${id}`
    }
    return axios.request({
      url: `/api/wp-json/wp/v2/posts${updateId}`,
      data,
      method: 'post',
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
  }


  export const createOrEditPostsACF = ({telephoneno,id}) => {
    //参数
    debugger
    const data = {
      telephoneno:'13670287036'
    }
    //debugger
    //更新操作
    let updateId= ''
    if(id!=0 && id !=null){
      updateId =`/${id}`
    }
    return axios.request({
      url: `/api/wp-json/acf/v3/posts${updateId}/?field_5cf0724f0f92d`,
      //data,
      //dataType: 'json',
      method: 'post',
      // transformRequest: [function (data) {
      //   // 对 data 进行任意转换处理
      //   return Qs.stringify(data)
      // }],
    })
  }