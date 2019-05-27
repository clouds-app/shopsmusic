<template>
   <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Sider ref="side1" class="leftSider" collapsible :collapsed-width="78" v-model="isCollapsed">
                  <Menu active-name="1-1" theme="dark" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                  <Icon type="ios-navigate"></Icon>
                                <span v-show="!isCollapsed">仪表盘</span>
                            </template>
                             <MenuItem to="/home" name="1-1">首页</MenuItem>
                             <MenuItem to="/login" name="1-2">
                             <span v-show="!isCollapsed">登陆</span>
                            </MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                               <span v-show="!isCollapsed">文章</span>
                            </template>
                            <MenuItem to="/home/postsList" name="2-1">文章列表</MenuItem>
                            <MenuItem to="/home/postsEdit" name="2-2">添加文章</MenuItem>
                            <MenuItem to="/home/category"  name="2-3">分类目录</MenuItem>
                            <MenuItem to="/home/meta"  name="2-4">标签列表</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                  <span v-show="!isCollapsed">页面</span>
                            </template>
                            <MenuItem to="/home/pageList" name="3-1">页面列表</MenuItem>
                            <MenuItem to="/home/pageList" name="3-2">添加页面</MenuItem>
                        </Submenu>
                    </Menu>
            </Sider>
            <Layout class="rightLayout" >
                 
                   <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
                        
                        <!--type="flex"  align="top" class="code-row-bg" -->
                           <Row >
                             <!-- 抽屉按钮 style="border: 1px solid blue;"-->
                            <Col span="2" >
                              <p>
                            <Icon @click.native="collapsedSider" :class="rotateIcon"  type="md-menu" size="24"></Icon>
                              </p>
                            </Col> 
                            <!-- 顶部菜单 style="border: 1px solid yellow;"-->
                            <Col span="20" >
                              <div style="height: 60px;overflow:hidden;">
                                <tags-nav  :value="$route" @input="handleClick" :list="tagNavList()"  @on-close="handleCloseTag"/>
                              </div>
                             
                            </Col>
                             <!--用户信息 style="border: 1px solid red;"-->
                            <Col span="2" >
                             <p>用户信息</p>
                            </Col>
                        </Row>
                 </Header>
               
  
          
                <!-- <tags-nav></tags-nav> -->
                <Content :style="{padding: '0 16px 16px'}">
                    <Breadcrumb :style="{margin: '10px 0'}">
                        <BreadcrumbItem>首页</BreadcrumbItem>
                        <!-- <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem> -->
                    </Breadcrumb>
                    <Card>
                        <div style="height: 600px">
                         <!-- 需要被缓存的路由入口 -->
                        <keep-alive>  
                            <router-view v-if="$route.meta.keepAlive"></router-view>
                        </keep-alive>

                        <!-- 不需要被缓存的路由入口 -->
                        <router-view v-if="!$route.meta.keepAlive"></router-view>
                        </div>
                    </Card>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>

import { getNewTagList, routeEqual,setTagNavList,addTag,closeTag,closeTagById,setTagNavListInLocalstorage, getTagNavListFromLocalstorage} from '_c/tags-nav/tools'
import TagsNav from '_c/tags-nav'
//import {mapMutations} from 'vuex'
export default {
  name: 'home',
  components: {
        TagsNav
  },
  data(){
    return {
      isCollapsed:false,
    }
  },
watch: {
     //监控路由，先将首页默认添加到菜单列表
    '$route' (newRoute) {
      if(newRoute!=null){
        const { name, query, params, meta } = newRoute
        addTag({
          route: { name, query, params, meta },
          type: 'push'
        })
       // debugger
        let tempArray = this.tagNavList()
        setTagNavList(getNewTagList(tempArray, newRoute)) //add home page in list
        }
    }
  },
  computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }, 
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
        },
  mounted(){
          this.addHomeFirst()
        },
  methods:{
     //...mapMutations(['setTagNavList','addTag','closeTag']),
     addHomeFirst(){
        const { name, params, query, meta } = this.$route
       addTag({
          route: { name, params, query, meta }
        })
     },
     collapsedSider () {
                this.$refs.side1.toggleCollapse();
            },
     handleCloseTag (res, type, route) {
       debugger
       if (type === 'all') {
                this.turnToPage(this.$config.homeName)
              }else if (type === 'others'){
               this.turnToPage(this.$config.homeName) //因数据不即时刷新，因跳转两次可以刷新数据
                let currentRoute=res[1].name
                this.turnToPage(currentRoute)
              }
              else {
              if (routeEqual(this.$route, route)) {
                  closeTag(route)
              }else{
                 closeTagById(route,this.$route)
              }
            }
            
       setTagNavList(res)
    },
     tagNavList() {
       let tempList= getTagNavListFromLocalstorage() || []
       return tempList
    },
     //跳转到指定页面
     handleClick (item) {
       this.turnToPage(item)
    },
    turnToPage (route) {
      //debugger
        let { name, params, query } = {}
        if (typeof route === 'string'){
            name = route
        } 
        else {
            name = route.name
            params = route.params
            query = route.query
        }
        if (name.indexOf('isTurnByHref_') > -1) {
            window.open(name.split('_')[1])
            return
        }
        this.$router.push({
            name,
            params,
            query
        })
        }
 }
  
}
</script>
<style lang="less" scoped>

.topMenu{
    width: 100%;
    border: 1px solid blue;
    background:white;
}
.ivu-layout-header{
  padding:0 15px;
}
.leftSider{
  // position:fixed;
  // left:0px;
  // top:0px;
  // z-index: 10;
  // width:30px;
  // height: 100%;
}
.rightLayout{
  // position: relative;;
  // left:30px;
}
 .layout-con{
        height: 100%;
        width: 100%;
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>

