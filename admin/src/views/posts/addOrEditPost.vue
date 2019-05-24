<template>
    <div class="container">
         <Spin size="large" fix v-if="spinShow"></Spin>
        <Form ref="postForm" :model="postForm" :rules="postRules" :lable-width="80">
            <FormItem lable="title" prop="title">
                <Input type="text" v-model="postForm.title" placeholder="文章标题"></Input>
            </FormItem>
            <FormItem label="状态">
            <Select disabled v-model="postForm.status">
                <Option value="publish">发布</Option>
                <Option value="future">未来</Option>
                <Option value="draft">草稿</Option>
                <Option value="pending">待审核</Option>
               <Option value="private">私密</Option>
            </Select>
        </FormItem>
            <FormItem lable="content" prop="content">
                <Input type="textarea" v-model="postForm.content" :rows="4" placeholder="请输入文章内容"></Input>
            </FormItem>
            <Form>
                <Button @click="handleSubmit()" type="primary">{{buttonName}}</Button>
                <Button @click="handleReset()" style="margin-left:8px">取消{{isEdit}}</Button>
            </Form>
        </Form>
    </div>
</template>

<script>
//文章添加修改页面
var postFormFixed={
                title:'',
                status:'publish',//发布状态下，才可以查询
                content:'',
            } //固定值 保持不变
import base_mixins from '@/views/mixins'
import * as type from '@/enums'
export default {
    name:'addOrEditPost',
    mixins:[base_mixins],
    components:{},
    data(){
        return {
            buttonName:'确认',
            isEdit:false,
            editId:0,
            currentData:[],
            spinShow:false,
            postForm:Object.assign({},postFormFixed) //不能直接赋值，否则postFormFixed值会变化
        }
    },
     props:{
           //可以添加多个验证规则
           titleRules:{
                    type:Array,
                    default:()=>{
                        return [
                            {
                                required:true,message:'标题不能为空',trigger:'blur'
                            }
                        ]
                    }
                },
              contentRules:{
                    type:Array,
                    default:()=>{
                        return [
                            {
                                required:true,message:'内容不能为空',trigger:'blur'
                            }
                        ]
                    }
                }
    },
    watch:{
    //   '$route.path':function(newVal,oldVal){
    //     console.log(newVal.path+"---"+oldVal.path);
    //   },
      $route(to, from) {
        //   console.log('to:'+to.path);
      }
    },
    //经过仔细分析官方文档后发现next中的函数执行在页面mounted之后
   // 列表总是需要一秒后才能加载出来，出现了页面抖动，
   //在解决这个问题时想到了路由中的beforeRouteEnter方法，
   //在路由跳转前加载数据
     beforeRouteEnter(to, from, next) {
         //alert('beforeRouteEnter')
    // console.log(this, 'beforeRouteEnter'); // undefined
    // console.log(to, '组件独享守卫beforeRouteEnter第一个参数');
    // console.log(from, '组件独享守卫beforeRouteEnter第二个参数');
    // console.log(next, '组件独享守卫beforeRouteEnter第三个参数');
    next(vm => {
       // alert('beforeRouteEnter-next')
      //因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      //console.log(vm);//当前组件的实例
      //===============正确用法================
    //   axios.get('/api/getCity.json').then(res=>{
    //       next(vm =>vm.setData(res)) //不要直接调用方法
    //   })
      //===============================
    });
  },
   //当路径不变，只有参数query或param改变时，用watch监控不到，可以用导航守卫beforeRouteUpdate。
  beforeRouteUpdate(to, from, next) {
      //debugger
      this.isEdit = false
      this.postForm =postFormFixed
      this.buttonName='确认'
    //在当前路由改变，但是该组件被复用时调用
    //对于一个带有动态参数的路径 /good/:id，在 /good/1 和 /good/2 之间跳转的时候，
    // 由于会渲染同样的good组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    // console.log(this, 'beforeRouteUpdate'); //当前组件实例
    // console.log(to, '组件独享守卫beforeRouteUpdate第一个参数');
    // console.log(from, '组件独享守beforeRouteUpdate卫第二个参数');
    // console.log(next, '组件独享守beforeRouteUpdate卫第三个参数');
    next();
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // console.log(this, 'beforeRouteLeave'); //当前组件实例
    // console.log(to, '组件独享守卫beforeRouteLeave第一个参数');
    // console.log(from, '组件独享守卫beforeRouteLeave第二个参数');
    // console.log(next, '组件独享守卫beforeRouteLeave第三个参数');
    next();
  },
    computed:{
        postRules(){
             return { //可以一次返回多个值控制验证
             title:this.titleRules,
             content:this.contentRules
          }
        }
    },
    methods:{
        //提交文章
        handleSubmit(){
            let _self=this
            this.$refs.postForm.validate((valid)=>{ //validate 为iview Form 表单内置方法，详细参考：https://www.iviewui.com/components/form
            if(valid){
               _self.spinShow =true
               

               let params=_self.postForm
               //更新操作
                params.id = 0 
                debugger
               if(_self.isEdit){
                    params.id=_self.editId
               }
               
               _self.$store.dispatch('createOrUpdatePosts',params).then(res=>{
                _self.spinShow =false
                let config ={
                   type:type.tipMessage_success,
                   msg:(_self.isEdit?'更新文章成功':'添加文章成功！')
               }
               _self.showMsg(config)
               
               //发布成功后等待跳转
                 setTimeout(() => {
                   _self.HandleRedirectName('postsList')
                }, 300);
               }).catch(err=>{
                   _self.spinShow =false
                   let config ={
                   type:type.tipMessage_error,
                   msg:(_self.isEdit?'更新章失败！ 代号：':'添加章失败！ 代号：'+err)
               }
               _self.showMsg(config)
               })
            }
        })
        },
        //重置文章
        handleReset(){
              this.$refs.postForm.resetFields(); //resetFields 为iview Form 表单内置方法，
        },
        //重缓存中获取需要编辑的数据
        getCurrentData(id){
              //debugger
            this.currentData={}
            let postList=this.$store.getters.postsList_state;
          if(postList && postList.length>0){
                let tempDataList=  postList//JSON.parse(postList)
                let  tempData = tempDataList;//Array.from(tempDataList)
                if(tempData && tempData.length >0 ){
                   // console.log('tempData:'+typeof(tempData))
                    if(typeof(tempData)=='string')
                    {
                        tempData =Array.from(JSON.parse(tempData))
                        // console.log('tempData2:'+tempData)
                    }
                   
                    this.currentData = tempData.filter(item=>{
                        //debugger
                        if(item.id==id){
                            return item;
                        } 
                        
                    })
                    //console.warn('this.currentData'+this.currentData.length)
          }
          }
        },
        //初始化编辑数据
        initEditData(){
            if(this.currentData.length>0){
                 //debugger
                    this.postForm.title = this.currentData[0].title.rendered
                    this.postForm.status = this.currentData[0].status
                    this.postForm.content = this.currentData[0].content.rendered
            }
        }
       
    },
    created(){
        //alert('created')
        //获取编辑ID
        let currentId =this.$route.query.id 
        if(currentId != undefined && currentId!=null){
            this.editId =currentId
            if(this.editId!=0){
                this.isEdit=true
                this.buttonName ='更新'
                  
                    this.getCurrentData(this.editId)
            }
        }
      
    },
    mounted(){
         //alert('mounted')
        //初始化编辑数据
        this.$nextTick(()=>{
            //alert('mounted-nextTick')
              if(this.isEdit){
                this.initEditData();
               }
       
        })
    },
    
}
</script>

<style lang="less" scoped>

</style>
