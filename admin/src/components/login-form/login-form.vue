<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
      <FormItem prop="userName">
          <Input v-model="form.userName" placeholder="请输入用户名">
          <span slot="prepend">
              <Icon :size="16" type="ios-person"></Icon>
          </span>
          </Input>
      </FormItem>
       <FormItem prop="password">
          <Input type="password" v-model="form.password" placeholder="请输入用户名">
          <span slot="prepend">
              <Icon :size="14" type="md-lock"></Icon>
          </span>
          </Input>
      </FormItem>
      <FormItem> 
          <Button @click="handleSubmit" type="primary" long>登陆</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
    name:'login-form',
    data(){
        return {
            form:{
                userName:'test',
                password:'^0RywT@Of%JQwC&6M6Sg@u!y'
            }
          
        }
    },
    props:{
           userNameRules:{
                    type:Array,
                    default:()=>{
                        return [
                            {
                                required:true,message:'账户不能为空',trigger:'blur'
                            }
                        ]
                    }
                },
                passwordRules:{
                    type:Array,
                    default:()=>{
                        return [
                            {
                                required:true,message:'密码不能为空',trigger:'blur'
                            }
                        ]
                    }
                }
    },
    computed:{
        //验证规则
        rules(){
          return {
             userName:this.userNameRules,
             password:this.passwordRules
          }
        }
    },
    methods:{
        //验证数据
        handleSubmit(){
        this.$refs.loginForm.validate((valid)=>{
            if(valid){
                this.$emit('on-success-valid',
                {
                    username:this.form.userName,
                    password:this.form.password
                })
            }
        })
        }
    }
    
}
</script>
<style lang="less" scoped>

</style>
