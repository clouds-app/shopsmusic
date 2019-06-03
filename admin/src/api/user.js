import axios from '@/libs/api.request'
import Qs from 'qs'//这个库是 axios 里面包含的，不需要再下载了

/**
* @description 用户登录
* @params { username, password }
*/

export const login = ({ username, password }) => {
  //debugger
  //参数
  const data = {
    username,
    password
  }
  return axios.request({
    url: '/api/wp-json/jwt-auth/v1/token',
    data,
    method: 'post',
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      return Qs.stringify(data)
    }],
  })
}
/**
* @description 用户退出--
*/
export const logout = () => {
    //参数
    const data = {
   }
   return axios.request({
     url: '/api/user/loginOut',
     data,
     method: 'post',
     transformRequest: [function (data) {
       // 对 data 进行任意转换处理
       return Qs.stringify(data)
     }],
   })
 }
/**
* @description 获取用户信息--暂时无此接口
*/
export const getUserInfo = (token) => {
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

/**
* @description 验证token 是否正确 
*/
export const tokenValidate = (token) => {
   //参数
   const data = {
    token
  }
  return axios.request({
    url: 'api/wp-json/jwt-auth/v1/token/validate',
    data,
    method: 'post',
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      return Qs.stringify(data)
    }],
  })
}

/**
* @description 操作文章接口
* Example Request #Example Request
* $ curl -X DELETE http://demo.wp-api.org/wp-json/wp/v2/posts/<id>
*/
export const operationPageById = ({id,type}) => {
  //参数
  const data = {
   // title:'update title'
  }
  return axios.request({
    url: `api/wp-json/wp/v2/posts/${id}`,
    data,
    method: type,
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      return Qs.stringify(data)
    }],
  })
}

//=============================================================================

/**
* @description  获取用户列表/get user list
* @params {context,page,per_page,search,exclude,include,offset,order,orderby,slug,roles } 
* @detail https://developer.wordpress.org/rest-api/reference/users/#list-users
* @example $ curl http://demo.wp-api.org/wp-json/wp/v2/users
*/

export const getUsers = ({context,page,per_page,search,exclude,include,offset,order,orderby,slug,roles}) => {
  //参数
  const data = {
     // context,page,per_page,search,exclude,include,offset,order,orderby,slug,roles
  }
  return axios.request({
    url: '/api/wp-json/wp/v2/users',
    data,
    method: 'get',
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      return Qs.stringify(data)
    }],
  })
}


/**
* @description  删除指定用户/delete user by id
* @params {id,force,reassign } 
* @detail https://developer.wordpress.org/rest-api/reference/users/#delete-a-user
* @example $ curl -X DELETE http://demo.wp-api.org/wp-json/wp/v2/users/<id>
*/

export const deleteUser = ({id,force,reassign}) => {
//参数
const data = {
 // id,force,reassign
}
return axios.request({
  url: `api/wp-json/wp/v2/users/${id}`,
  data,
  method: 'delete',
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理
    return Qs.stringify(data)
  }],
})
}



/**
* @description 添加/修改用户/创建/更新用户 /create or update a user by id
* @params {username【require】,name,first_name,last_name,email【require】,url,description,locale,nickname,slug,roles,password【require】,meta} 
* @update POST /wp/v2/users/<id>
* @detail https://developer.wordpress.org/rest-api/reference/users/#create-a-user
* @example $ curl http://demo.wp-api.org/wp-json/wp/v2/users/<id>
*/
export const createOrEditUser = ({username,name,first_name,last_name,email,url,description,locale,nickname,slug,roles,password,meta,id,acf_email}) => {
  //参数
  //debugger
  const data = {
    username,email,password,description,
    //fields:{email:'hdeqi@qq.com'}
    // acf:{
    //   email:'dk@qq.com'
    // }
  }
  //debugger
  //更新操作
  let updateId= ''
  if(id!=0 && id !=null){
    updateId =`/${id}`
  }
  return axios.request({
    url: `/api/wp-json/wp/v2/users${updateId}`,
    data,
    method: 'post',
    // transformRequest: [function (data) {
    //   // 对 data 进行任意转换处理
    //   return Qs.stringify(data)
    // }],
  })
}


export const createOrEditUserACF = ({email,_wechat,id}) => {
  //参数
  debugger
  const data = {
    "acf":{_wechat:'hdeqi@qq.com'}
  }
  //debugger
  //更新操作
  let updateId= ''
  if(id!=0 && id !=null){
    updateId =`/${id}`
  }
  return axios.request({
    url: `/api/wp-json/acf/v3/users${updateId}`,
    data,
    //dataType: 'json',
    method: 'post',
    // transformRequest: [function (data) {
    //   // 对 data 进行任意转换处理
    //   return Qs.stringify(data)
    // }],
  })
}