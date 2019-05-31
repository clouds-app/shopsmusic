<template>
     <div>
        <Spin size="large" fix v-if="spinShow"></Spin>
         <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="站点标题" prop="title">
            <Input v-model="formValidate.title" placeholder="站点标题"></Input>
        </FormItem>
        <FormItem label="站点描述" prop="description">
            <Input v-model="formValidate.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="站点描述"></Input>
        </FormItem>
        <FormItem label="站点地址（URL）" prop="url">
            <Input :disabled="true" v-model="formValidate.url" placeholder="站点地址（URL）"></Input>
        </FormItem>
         <FormItem label="电子邮件地址" prop="email">
            <Input :disabled="true" v-model="formValidate.email" placeholder="电子邮件地址"></Input>
        </FormItem>
          <FormItem label="日期格式" prop="date_format">
            <Input :disabled="true" v-model="formValidate.date_format" placeholder="日期格式"></Input>
        </FormItem>
          <FormItem label="时间格式" prop="time_format">
            <Input :disabled="true" v-model="formValidate.time_format" placeholder="时间格式"></Input>
        </FormItem>
          <FormItem label="页面至多显示" prop="posts_per_page">
            <Input :disabled="true" v-model="formValidate.posts_per_page" placeholder="博客页面至多显示"></Input>
        </FormItem>
         <FormItem label="站点语言" prop="language">
            <Select :disabled="true" v-model="formValidate.language" placeholder="选择站点语言">
                <Option value="zh_CN">中文</Option>
            </Select>
        </FormItem>
         <FormItem label="默认文章分类" prop="default_category">
            <Select :disabled="true"  v-model="formValidate.default_category" placeholder="默认文章分类">
                <Option value = "1" >未分类</Option>
            </Select>
        </FormItem>
        <FormItem label="默认文章形式" prop="default_post_format">
            <Select :disabled="true" v-model="formValidate.default_post_format" placeholder="默认文章形式">
                <Option value="0">标准</Option>
                <Option value="chat">聊天</Option>
                <Option value="gallery">相册</Option>
                <Option value="link">链接</Option>
                <Option value="image">图像</Option>
                <Option value="quote">引语</Option>
                <Option value="status">状态</Option>
                <Option value="video">视频</Option>
                <Option value="audio">音频</Option>
            </Select>
        </FormItem>
           <FormItem label="pingback">
            <i-switch v-model="formValidate.default_ping_status" size="large">
                <span slot="open">on</span>
                <span slot="close">off</span>
            </i-switch>
            <span>  允许其他博客发送链接通知（pingback和trackback）到新文章</span>
        </FormItem>
           <FormItem label="评论">
            <i-switch v-model="formValidate.default_comment_status" size="large">
                <span slot="open">on</span>
                <span slot="close">off</span>
            </i-switch>
               <span>  允许他人在新文章上发表评论</span>
        </FormItem>
         <FormItem label="时区" prop="timezone">
            <Select :disabled="true" v-model="formValidate.timezone" placeholder="选择时区">
                <Option value="Asia/Shanghai">上海</Option>
            </Select>
        </FormItem>
           <FormItem label="一星期开始于" prop="start_of_week">
            <Select :disabled="true" v-model="formValidate.start_of_week" placeholder="一星期开始于">
                <Option value = "0">星期日</Option>
                <Option value = "1">星期一</Option>
                <Option value = "2">星期二</Option>
                <Option value = "3">星期三</Option>
                <Option value = "4">星期四</Option>
                <Option value = "5">星期五</Option>
                <Option value = "6">星期六</Option>
            </Select>
        </FormItem>
       
        
        
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">更新</Button>
            <!-- <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button> -->
        </FormItem>
    </Form>
     </div>
   
</template>
<script>
    export default {
        data () {
            return {
                spinShow:false,
                formValidate: {
                    title: 'shopsmusic',
                    description: 'welcome to my shopsmusic',
                    url: 'shopsmusic.com',
                    email: 'hdeqi@qq.com',
                    timezone: 'Asia/Shanghai',
                    date_format: 'Y年n月j日',
                    time_format: 'ag:i',
                    start_of_week:'1',
                    language: 'zh_CN',
                    use_smilies: true,
                    default_category:"1",
                    default_post_format:'0',
                    posts_per_page: 10,
                    default_ping_status: true,
                    default_comment_status: true,
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '站点标题 不能为空', trigger: 'blur' }
                    ],
                    description: [
                        { required: true, message: '站点标题 不能为空', trigger: 'blur' },
                        { type: 'string', min: 10, message: '不能少于10个文字描述', trigger: 'blur' }
                    ],
                    url: [
                        { required: true, message: '站点地址（URL）不能为空', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '邮件 不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮件格式不正确', trigger: 'blur' }
                    ],
                    timezone: [
                        { required: true, message: '时区不能为空', trigger: 'change' }
                    ],
                    date_format: [
                        { required: true, type: 'string', message: '日期格式 不能为空', trigger: 'change' }
                    ],
                    time_format: [
                        { required: true, type: 'string', message: '时间格式 不能为空', trigger: 'change' }
                    ],
                    start_of_week: [
                        { required: true, message: '一星期开始于 不能为空', trigger: 'change' }
                    ],
                    language: [
                        { required: true, message: '站点语言 不能为空', trigger: 'change' }
                    ],
                    default_post_format: [
                        { required: true, message: '默认文章形式 不能为空', trigger: 'change' }
                    ],
                    posts_per_page: [
                        { required: true, type: 'integer', message: '页面至多显示 不能为空', trigger: 'change' }
                    ],
                   
                   
                   
                  
                }
            }
        },
        created(){
             //初始化设置信息
            this.intiSettingData()
        },
        methods: {
           //初始化设置信息
            intiSettingData(){
             this.spinShow=true
             let _self=this
              this.$store.dispatch('getSettingsList').then(res=>{
                 // console.warn("初始化设置信息 :"+ JSON.stringify(res))
                  let tempData =Object.assign({}, res);
                  tempData.default_category= tempData.default_category.toString()
                  tempData.default_ping_status= tempData.default_ping_status=='open'? true :false
                  tempData.default_comment_status=  tempData.default_comment_status =='open'? true :false
                  tempData.start_of_week =tempData.start_of_week.toString()
                  //需要转换值后才赋值给当前对象，不然有些控件 对应格式不正确

                   _self.formValidate =tempData
                   _self.spinShow=false
              }).catch(err=>{
                // console.warn("初始化设置信息失败！ :"+err)
                 _self.$Message.error('初始化设置信息失败!'+err);
                  _self.spinShow=false
              })
            },
            handleSubmit (name) {
               this.spinShow=true
               let _self=this
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        debugger
                        let params =_self.formValidate
                        debugger
                        if(_self.formValidate.default_ping_status){ 
                          params.default_ping_status="open"
                        }else{
                           params.default_ping_status="closed"
                        }
                         if(_self.formValidate.default_comment_status){
                          params.default_comment_status="open"
                        }else{
                           params.default_comment_status="closed"
                        }
                        if(_self.formValidate.default_category!=null && _self.formValidate.default_category !=""){
                          params.default_category = Number(_self.formValidate.default_category)
                        }
                      
                        _self.$store.dispatch('createOrEditSettings',params).then(res=>{
                          _self.$Message.success('更新成功!');
                            _self.spinShow=false
                        }).catch(err=>{
                           _self.$Message.error("更新失败！"+ err);
                             _self.spinShow=false
                        })
                       
                    } else {
                        _self.$Message.error('更新失败！');
                          _self.spinShow=false
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>