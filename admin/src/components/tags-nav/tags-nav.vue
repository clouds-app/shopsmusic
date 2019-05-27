<template>
    <div class="tags-nav">
      <!-- 左边-滚动按钮 start-->
      <div class="btn-con left-btn">
        <Button type="text" @click="handleScrollEvent(240)">
            <Icon :size="18" type="ios-arrow-back" />
        </Button>
      </div><!-- 左边-滚动按钮 end-->
     <!--下拉按钮关闭 start--> 
      <ul v-show="visibleMenuList" :style="{left: contextMenuLeft + 'px', top: contextMenuTop + 'px'}" class="contextmenu">
        <li v-for="(item, key) of menuList" @click="handleTagsOption(key)" :key="key">{{item}}</li>
      </ul>
     <!-- 右边-滚动按钮 start-->
    <div class="btn-con right-btn">
      <Button type="text" @click="handleScrollEvent(-240)">
        <Icon :size="18" type="ios-arrow-forward" />
      </Button>
    </div><!-- 右边-滚动按钮 end-->

      <!-- 下拉按钮关闭 start-->
       <div class="close-con">
        <Dropdown transfer @on-click="handleTagsOption" style="margin-top:2px;">
          <Button size="small" type="text">
            <Icon :size="18" type="ios-close-circle-outline" />
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="close-all" >关闭所有</DropdownItem>
            <DropdownItem name="close-others" divided>关闭其他</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <!-- 下拉按钮关闭 end-->

    <!-- 鼠标滚轮事件 FF使用DOMMouseScroll，其他浏览器都是用mousewheel-->
    <div class="scroll-outer" ref="scrollOuter" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
        <div  ref="scrollBody" class="scroll-body" :style="{left: tagBodyLeft + 'px'}">
        <transition-group name="taglist-moving-animation">
            <!-- 详细：https://www.iviewui.com/components/tag -->
            <Tag class="single-Tag" 
            type="dot"
            v-for="(item, index) in list"
            ref="tagsPageOpened"
            :key="`tag-nav-${index}`"
            :name="item.name"
            :data-route-item="item"
            @on-close="handleClose(item)"
            @click.native="handleClick(item)"
            :closable="item.name !== $config.homeName"
            :color="isCurrentTag(item) ? 'primary' : 'default'"
            @contextmenu.prevent.native="contextMenu(item, $event)">
            {{ showTitleInside(item) }}
            </Tag>
        </transition-group>
        </div>
    </div><!-- 滚动条 end-->

    </div>
</template>
<script>
import { routeEqual } from './tools'
//import beforeClose from '@/router/before-close'
export default {
    name:'tags-nav',
    props: {
        value: Object,//当前路由对象
        list: {
            type: Array,
            default () {
                return []
            }
        }
     },
    data(){
        return {
            tagBodyLeft: 0,
            rightOffset: 40,
            outerPadding: 4,
            contextMenuLeft: 0,
            contextMenuTop: 0,
            visibleMenuList: false,
            menuList: {
                others: '关闭其他',
                all: '关闭所有'
            }
        }
    },
  computed: {
    //当前路由对象
    currentRouteObj () {
      const { name, params, query } = this.value
      return { name, params, query }
    }
  },
   watch: {
        //监控路由变化
        '$route' (to) {
            this.getTagElementByRoute(to) //通过路由获取所有tag元素
        },
        //监控下拉关闭按钮是否可见
        visibleMenuList (value) {
            if (value) {
                document.body.addEventListener('click', this.closeMenu) //添加关闭事件
            } else {
                document.body.removeEventListener('click', this.closeMenu)//移除关闭事件
            }
        }
    },
    mounted () {
           let _self=this
            setTimeout(() => {
            _self.getTagElementByRoute(_self.$route) //通过路由获取所有tag元素
            }, 200)
    },
    methods:{
        //Tag-关闭时触发事件
         handleClose (current) {
              this.close(current)
            // if (current.meta && current.meta.beforeCloseName && current.meta.beforeCloseName in beforeClose) {
            //     new Promise(beforeClose[current.meta.beforeCloseName]).then(close => {
            //     if (close) {
            //         this.close(current)
            //     }
            //     })
            //   } else {
            //      // debugger
            //     this.close(current)
            // }
        },
        //关闭指定标签窗口
       close (route) {
           // debugger
        let res = this.list.filter(item => !routeEqual(route, item))
        this.$emit('on-close', res, undefined, route)
        },
        //Tag-原生点击事件click.native
        handleClick (item) {
           // debugger
          this.$emit('input', item) //触发input事件
        },
        //判断两个路由对象是否相等(当前页面，即将关闭页面)
         isCurrentTag (item) {
            return routeEqual(this.currentRouteObj, item) 
        },
        //显示标题
        showTitleInside (item) {
          return item.meta.title //showTitle(item, this)
        },
        //从当前菜单上下文，获取偏移变量
         contextMenu (item, e) {
            if (item.name === this.$config.homeName) {
                return
            }
            this.visibleMenuList = true
            const offsetLeft = this.$el.getBoundingClientRect().left //在实例挂载之后，元素可以用 vm.$el 访问。限制：只在由 new 创建的实例中遵守
            this.contextMenuLeft = e.clientX - offsetLeft + 10
            this.contextMenuTop = e.clientY - 64
        },
        //下拉关闭按钮点击处理/点击菜单项时触发
         handleTagsOption (type) {
             debugger
             //console.warn('type.includes:'+type.includes('all'));
            if (type.includes('all')) {
                // 关闭所有，除了home
                let res = this.list.filter(item => item.name === this.$config.homeName)
                this.$emit('on-close', res, 'all')
            } else if (type.includes('others')) {
                // 关闭除当前页和home页的其他页
                if(this.list && this.list.length>0)
                {
                        let resData = this.list.filter(item => routeEqual(this.currentRouteObj, item) || item.name === this.$config.homeName)
                        this.$emit('on-close', resData, 'others', this.currentRouteObj)
                        // setTimeout(() => {
                        //     this.getTagElementByRoute(this.currentRouteObj)
                        // }, 100)
                }
              
            }
        },
        //通过路由获取所有tag或添加元素
         getTagElementByRoute (route) {
             debugger
             let _self=this
            this.$nextTick(() => {
               let refsTag = _self.$refs.tagsPageOpened
               if(refsTag && refsTag!=null && refsTag.length>0){
                    refsTag.forEach((item, index) => {
                        //当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，
                        //并且可以通过 v-bind="$attrs" 传入内部组件
                        if (routeEqual(route, item.$attrs['data-route-item'])) {
                            let tag = refsTag[index].$el
                            this.moveToView(tag)
                        }
                    })
                }
            })
        },
        //添加tag标签在可视区域
        moveToView (tag) {
            const outerWidth = this.$refs.scrollOuter.offsetWidth
            const bodyWidth = this.$refs.scrollBody.offsetWidth
            if (bodyWidth < outerWidth) {
                this.tagBodyLeft = 0
            } else if (tag.offsetLeft < -this.tagBodyLeft) {
                // 标签在可视区域左侧
                this.tagBodyLeft = -tag.offsetLeft + this.outerPadding
            } else if (tag.offsetLeft > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth) {
                // 标签在可视区域
                this.tagBodyLeft = Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding)
            } else {
                // 标签在可视区域右侧
                this.tagBodyLeft = -(tag.offsetLeft - (outerWidth - this.outerPadding - tag.offsetWidth))
            }
        },
       //鼠标滚动事件
        handlescroll (e) {
            var type = e.type
            let delta = 0
            if (type === 'DOMMouseScroll' || type === 'mousewheel') {
                delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
            }
                this.handleScrollEvent(delta)
        },
         //左右-滚动按钮点击处理
         handleScrollEvent (offset) {
            const outerWidth = this.$refs.scrollOuter.offsetWidth
            const bodyWidth = this.$refs.scrollBody.offsetWidth
            if (offset > 0) {
                this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
            } else {
                if (outerWidth < bodyWidth) {
                if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
                    this.tagBodyLeft = this.tagBodyLeft
                } else {
                    this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth)
                }
                } else {
                this.tagBodyLeft = 0
                }
            }
        },
        closeMenu () {
             this.visibleMenuList = false //下拉关闭按钮不可见
        }
    }
    
}
</script>
<style lang="less" scoped>
@import './tags-nav.less';
</style>
