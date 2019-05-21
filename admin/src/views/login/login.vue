<template>
<div class="login">
       <Spin size="large" fix v-if="spinShow"></Spin>
         <div class="login-con">
            <Card icon="log-in" Title="欢迎登陆" :bordered="false">
                <div class="form-con">
                     <login-form @on-success-valid="handleSuccessValid"></login-form>
                </div>
            </Card>
         </div>
    </div>
   
</template>
<script>
import loginForm from '_c/login-form'
import base_mixins from '@/views/mixins'
import * as type from '@/enums'
import {mapActions} from 'vuex'
export default {
    name:'login',
    mixins:[base_mixins],
    components:{
        loginForm
    },
    data(){
        return{
            spinShow:false
        }
    },
    methods:{
        ...mapActions(['handleLogin']),//导出并合并当前方法列表
        handleSuccessValid(formData){ //formData 从子控件 login-form 返回过来
           //登陆
           let _self=this
           this.spinShow =true
           this.handleLogin(formData).then(res=>{
               let config ={
                   type:type.tipMessage_success,
                   msg:'登陆成功！'
               }
               _self.showMsg(config)
               //登陆成功后等待跳转
                 setTimeout(() => {
                    this.spinShow =false
                   _self.HandleRedirectName('home')
                }, 500);
           }).catch(err=>{
               this.spinShow =false
               let config ={
                   type:type.tipMessage_error,
                   msg:'用户名或密码错误 代号：'+err
               }
               _self.showMsg(config)
           })
        },
    }

    
}
</script>

<style lang="less" scoped>

</style>
