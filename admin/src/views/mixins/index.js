
//全局 vue 基类，使用方法：vue引入mixins 后即可使用 
//import base_mixins from '@/views/mixins'
//eg.  mixins:[base_mixins],注意：是数组形式引入
import * as type from '@/enums'
export default {
    data(){
      return {
        showToastLoading: {},
      }
    },
    props: {
    
    },
    computed: {
    },
    methods: {
        showMsg(config){
            switch (config.type) {
                    case type.tipMessage_info:
                      this.$Message.info(config.msg)
                    break;
                    case type.tipMessage_success:
                     this.$Message.success(config.msg)
                     break;
                     case type.tipMessage_warning:
                       this.$Message.warning(config.msg)
                     break;
                     case type.tipMessage_error:
                       this.$Message.error(config.msg)
                      break;
                      case type.tipMessage_loading:
                       this.$Message.loading(config.msg)
                      break;     
                default:
                      this.$Message.info(config.msg)
                    break;
           }
        },
          //跳转路由地址
          HandleRedirectName(pathName){
            this.$router.push({
                name: pathName
                });
        },
         //跳转路由地址
         HandleRedirectPath(pathName){
          this.$router.push({
              path: pathName
              });
      },
    }
  };
  
