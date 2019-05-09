<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
     <Button type="primary" @click="handleLogin()">测试登陆</Button>
     <br/>
      <br/>
     <Button type="primary" @click="handleCheckToken()">验证Token</Button>
    <br/>
     <br/>
     <Button type="primary" @click="handleDeletePage()">删除页面</Button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods:{
    handleLogin(){
      let params={
        username:'test',
        password:'000123'
      }
      this.$store.dispatch('handleLogin',params).then(res=>{
          alert('登陆成功！')
      }).catch(err=>{
          alert(err)
      })
    },
    //用于验证 Token 是否正确
    handleCheckToken(){
     this.$store.dispatch('CheckToken').then(res=>{
          alert('验证成功！')
      }).catch(err=>{
          alert(err)
      })
    },
    //删除页面
    handleDeletePage(){
      let params={
        id:5,
        force:true,
        type:'delete'
      }
     this.$store.dispatch('getOperationPageById',params).then(res=>{
          alert('删除成功！')
      }).catch(err=>{
          alert(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
