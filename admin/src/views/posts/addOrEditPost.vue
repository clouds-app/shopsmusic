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
                <Button @click="handleSubmit()" type="primary">确认</Button>
                <Button @click="handleReset()" style="margin-left:8px">取消</Button>
            </Form>
        </Form>
    </div>
</template>

<script>
//文章添加修改页面
import base_mixins from '@/views/mixins'
import * as type from '@/enums'
export default {
    name:'addOrEditPost',
    mixins:[base_mixins],
    components:{},
    data(){
        return {
            isEdit:false,
            editId:0,
            currentData:[],
            spinShow:false,
            postForm:{
                title:'',
                status:'publish',
                content:'',
            }
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
            this.$refs.postForm.validate((valid)=>{ //validate 为iview Form 表单内置方法，详细参考：https://www.iviewui.com/components/form
            if(valid){
               this.spinShow =true
               let _self=this

               let params=this.postForm
                   //params.status =type.status_post_publish //发布状态下，才可以查询
               this.$store.dispatch('createOrUpdatePosts',params).then(res=>{
                _self.spinShow =false
                let config ={
                   type:type.tipMessage_success,
                   msg:'添加文章成功！'
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
                   msg:'添加章失败！ 代号：'+err
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
            let postList=this.$store.getters.postsList_state;
          if(postList && postList.length>0){
                let tempData=  JSON.parse(postList)
                 tempData =Array.from(tempData)
                if(tempData && tempData.length >0 ){
              this.currentData = tempData.map(item=>{
                  //debugger
                  if(item.id==id){
                     return item;
                  } 
                
              })
             console.warn('this.currentData'+this.currentData.length)
          }
          }
        },
        //初始化编辑数据
        initEditData(){
            if(this.currentData.length>0){
                 debugger
                    this.postForm.title = this.currentData[0].title.rendered
                    this.postForm.status = this.currentData[0].status
                    this.postForm.content = this.currentData[0].content.rendered
            }
        }
       
    },
    created(){
        //debugger
        //获取编辑ID
        let currentId =this.$route.query.id 
        if(currentId != undefined && currentId!=null){
            this.editId =currentId
            if(this.editId!=0){
                this.isEdit=true
                    this.getCurrentData(this.editId)
            }
        }
      
    },
    mounted(){
        //初始化编辑数据
        if(this.isEdit){
                this.initEditData();
        }
       
    },
    
}
</script>

<style lang="less" scoped>

</style>
