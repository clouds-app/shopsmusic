import axios from '@/libs/api.request'
import Qs from 'qs'//这个库是 axios 里面包含的，不需要再下载了
//原因就是这次的接口使用 java spring mvc 
//并且在这个方法上使用了注解 @RequestParam
//只能从请求的地址中取出参数，也就是只能从 username=admin&password=admin这种字符串中解析出参数。

/**
* @description  获取类别列表/get Categories list
* @params {context,page,per_page,search,exclude,include,order,orderby,hide_empty,parent,post,slug}
* @detail https://developer.wordpress.org/rest-api/reference/categories/#list-categories
*/
export const getCategories = ({params}) =>{
    const data ={
        //params
    }
    return axios.request({
        url: '/api/wp-json/wp/v2/categories',
        data,
        method: 'get',
        transformRequest: [function (data) {
          // 对 data 进行任意转换处理,转换成： username=admin&password=admin
          return Qs.stringify(data)
        }],
     })
}


/**
 * @description 创建/更新类型 create/update-a-category
 * @params { [id],description,name【Required】,slug,parent, meta } 
 * @detail  https://developer.wordpress.org/rest-api/reference/categories/#create-a-category
 * @Example  http://demo.wp-api.org/wp-json/wp/v2/categories/<id>
 */

 export const createOrUpdateCategory = ({name,slug,id = 0,description = name,parent = 0}) =>{
    const data = {
        name,
        description,
        parent,
        slug
    }
     //更新操作
     let updateId= ''
     if(id!=0 && id !=null){
       updateId =`/${id}`
     }
    return  axios.request({
        url: `/api/wp-json/wp/v2/categories${updateId}`,
        data,
        method:'post',
        transformRequest:[function (data){
            // 对 data 进行任意转换处理,转换成： username=admin&password=admin
            return Qs.stringify(data)
        }]
    })
 }

 /**
  * @description 删除指定类别 Delete a Category
  * @params {id【Required】,force}
  * @detail https://developer.wordpress.org/rest-api/reference/categories/#delete-a-category
  * @Example  DELETE http://demo.wp-api.org/wp-json/wp/v2/categories/<id>
  */

  export const deleteCategory = ({id}) =>{
      const data = {
        force:true
      }
     return axios.request({
         url: `/api/wp-json/wp/v2/categories/${id}`,
         data,
         method:'delete',
        //  transformRequest:[function (data){
        //      return Qs.stringify(data)
        //  }]
     })
  }