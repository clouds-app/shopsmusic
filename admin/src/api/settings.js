import axios from '@/libs/api.request'
import Qs from 'qs'//这个库是 axios 里面包含的，不需要再下载了

/** 
* @description  获取 settings 列表/get settings list
* @params {} 
* @detail https://developer.wordpress.org/rest-api/reference/settings/#list-settings
* @example $ curl http://demo.wp-api.org/wp-json/wp/v2/settings
*/

export const getSettings = () => {
    //参数
    const data = {
       // 
    }
    return axios.request({
      url: '/api/wp-json/wp/v2/settings',
      data,
      method: 'get',
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
  }
  
  
  /**
  * @description 添加/修改 Settings/创建/更新Settings/create or update a Settings by id
  * @params {title,description,timezone,date_format,time_format,start_of_week,language,use_smilies,default_category,default_post_format,posts_per_page,default_ping_status} 
  * @detail https://developer.wordpress.org/rest-api/reference/settings/#list-settings
  * @example $ curl http://demo.wp-api.org/wp-json/wp/v2/settings/<id>
  */
  export const createOrEditSettings = ({title,description,timezone,date_format,time_format,start_of_week,language,use_smilies,default_category,default_post_format,posts_per_page,default_ping_status,id}) => {
    //参数
    //debugger
    const data = {
       // title,description,timezone,date_format,time_format,start_of_week,language,use_smilies,default_category,default_post_format,posts_per_page,default_ping_status
    }

    return axios.request({
      url: `/api/wp-json/wp/v2/settings`,
      data,
      method: 'post',
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
  }