<template>
    <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <!-- <Avatar :src="userAvatar"/> -->
        <Avatar style="background-color: #87d068" icon="ios-person" />
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="message" >
          消息中心<Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
        </DropdownItem>
         <DropdownItem divided name="userinfo">用户中心</DropdownItem>
        <DropdownItem divided name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script>
export default {
    name:'user-info',
    data(){
        return {

        }
    },
    props: {
    userAvatar: {
      type: String,
      default: ''
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
    methods:{
        //下拉菜单点击事件
        handleClick (name) {
            //debugger
            switch (name) {
             case 'logout': 
             this.logout()
                break
             case 'message': 
             this.showMessage()
                break   
            case 'userinfo': 
             this.userInfo()
                break   
      }
    },
    //退出登录
    logout(){
          this.$Notice.success({
                    title: '提示',
                    desc: '退出登录',
                    render: h => {
                        return h('span', [
                            '退出登录.... '
                           
                        ])
                    }
                });
      },
   //跳转到信息列表
    showMessage(){
        this.$Notice.success({
                    title: '提示',
                    desc: '信息列表',
                    render: h => {
                        return h('span', [
                            '信息列表中心.... '
                           
                        ])
                    }
                });
    },
    //用户中心
    userInfo(){
      this.$Notice.success({
                    title: '提示',
                    desc: '用户中心',
                    render: h => {
                        return h('span', [
                            '用户中心.... '
                             ])
                    }
                });
    }

 },
 
}
</script>

<style lang="less" scoped>
.user{
  &-avatar-dropdown{
    cursor: pointer;
    display: inline-block;
    // height: 64px;
    vertical-align: middle;
    // line-height: 64px;
    .ivu-badge-dot{
      top: 16px;
    }
  }
}

</style>
