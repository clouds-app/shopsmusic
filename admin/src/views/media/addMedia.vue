<template>
   <Layout>
        <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
           <span class="mediaTitleDesc">
               上传新媒体文件
           </span>
       </Header>
       <Content  :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
            <Card class="mediaContent" style="width:100%">
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
               媒体描述
            </p>
       <Form style="width:350px" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      
        <FormItem label="uploadImg">
             <UploadFile></UploadFile>
        </FormItem>
        <FormItem label="Name" prop="name">
            <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="E-mail" prop="mail">
            <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
        </FormItem>
        <FormItem label="City" prop="city">
            <Select v-model="formValidate.city" placeholder="Select your city">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem label="Date">
            <Row>
                <Col span="11">
                    <FormItem prop="date">
                        <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                    <FormItem prop="time">
                        <TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>
                    </FormItem>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="Gender" prop="gender">
            <RadioGroup v-model="formValidate.gender">
                <Radio label="male">Male</Radio>
                <Radio label="female">Female</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="Hobby" prop="interest">
            <CheckboxGroup v-model="formValidate.interest">
                <Checkbox label="Eat"></Checkbox>
                <Checkbox label="Sleep"></Checkbox>
                <Checkbox label="Run"></Checkbox>
                <Checkbox label="Movie"></Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem label="Desc" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem>
      </Form>
        <span>上传新媒体文件2</span>
        <form id="imageUpload" enctype="multipart/form-data"> 
        <input type="file" id="file" />
        <input type="button" @click="handleUpload" value="save file" />
     </form>
    </Card>
       
       </Content>
       <Footer :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
           <div class="footer">
               <Row>
                <Col span="18">
                  <span>您正在使用多文件上传工具。遇到问题？请尝试使用标准浏览器上传工具 。</span>
                </Col>
                <Col span="6">
                  <!-- multiple -->
                <!-- <Upload
                    action="//jsonplaceholder.typicode.com/posts/">
                    <Button icon="ios-cloud-upload-outline">上传</Button>
                </Upload> -->
              
                </Col>
            </Row>
             
             
           </div>
           <div>
               <span>
                   最大上传文件大小：2 MB。
                   <Icon type="md-alert" /> 暂不支持 IE9 浏览器。
               </span>
           </div>
       </Footer>
   </Layout>
    
</template>

<script>
  import axios from 'axios'
  import { setToken, getToken,setCookie,getCookie,AuthorizationCheck} from '@/libs/util'
  import Qs from 'qs'//这个库是 axios 里面包含的，不需要再下载了
  import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
    import UploadFile  from '_c/upload-files'
    export default {
        name:'addMedia',
        components:{
            UploadFile
        },
         data () {
            return {
                formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                        { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                        { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleUpload(){
                alert(1)
                         // var fileObject = $('input#file')[0].files[0] 
                            // 或者使用原生方法获取文件 
                            debugger
                           let fileObject = document.getElementById("file").files[0];
                           let filename = fileObject.name;

                            // 创建一个虚拟的表单，把文件放到这个表单里面
                            var imageData = new FormData();
                            imageData.append( "file", fileObject);
                            let data ={
                                file:fileObject,
                                slug:filename,
                                title:filename,
                                alt_text:filename,
                                description:filename,
                            }
                            let tokenString = AuthorizationCheck()
                            axios({
                                method:'post',
                                url:`${baseUrl}api/wp-json/wp/v2/media`,
                                data, //这个是上一步，创建的对象
                                cache: false,
                                contentType: false,
                                processData: false,
                                headers: { 
                                    'Content-Disposition': `attachment;filename=${filename}`,
                                    'content-type': 'application/json',
                                    'Authorization': tokenString 
                                    },
                                // transformRequest: [function (data) {
                                //     // 对 data 进行任意转换处理
                                //     return Qs.stringify(data)
                                // }],
                                })
                                .then(function(response) {
                                    resolve(true);
                                   console.log(response);
                                })
                                .catch(function (error) {
                                   console.log(error);
                               });
            }
        }
        
    }
</script>
<style lang="less" scoped>
 .mediaTitleDesc{
     font-size: 18px;
     font-weight: bolder;
 }
 .footer{
     text-align: left;
     vertical-align:middle;
 }
 .mediaContent{
      text-align:center;
     vertical-align:middle;
 }
</style>
