<template>
  <div class="container">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Form ref="userForm" :model="userForm" :rules="userRules" :lable-width="80">
      <FormItem prop="username">
          <Input :disabled="disabledUserName" v-model="userForm.username" placeholder="请输入用户名">
            <span slot="prepend">
                <Icon :size="16" type="ios-person"></Icon>
            </span>
          </Input>
      </FormItem>
       <FormItem prop="password">
          <Input type="password" v-model="userForm.password" placeholder="请输入密码">
          <span slot="prepend">
              <Icon :size="14" type="md-lock"></Icon>
          </span>
          </Input>
      </FormItem>
        <FormItem prop="email">
          <Input v-model="userForm.email" placeholder="请输入邮箱">
          <span slot="prepend">
              <Icon :size="16" type="md-mail" />
          </span>
         </Input>
      </FormItem>
      <FormItem lable="content" prop="content">
        <Input type="textarea" v-model="userForm.description" :rows="4" placeholder="请输入个人描述"></Input>
      </FormItem>
      <Form>
        <Button
          :disabled="disabledSubmit"
          @click="handleSubmit()"
          long
          type="success"
        >{{buttonName}}</Button>
        <!-- <Button @click="handleReset()" style="margin-left:8px">取消</Button> -->
      </Form>
    </Form>
  </div>
</template>

<script>
//文章添加修改页面
var userFormFixed = {
  username: "",
  password:"1234565554546464",
  email: "", //发布状态下，才可以查询
  description: ""
}; //固定值 保持不变
import base_mixins from "@/views/mixins";
import * as type from "@/enums";
export default {
  name: "addOrEditPost",
  mixins: [base_mixins],
  components: {},
  data() {
    return {
      disabledSubmit: false,
      disabledUserName:false,
      buttonName: "确认",
      isEdit: false,
      editId: 0,
      currentData: [],
      spinShow: false,
      userForm: Object.assign({}, userFormFixed) //不能直接赋值，否则postFormFixed值会变化
    };
  },
  props: {
    //可以添加多个验证规则
    usernameRules: {
      type: Array,
      default: () => {
        return [
          {
            required: true,
            message: "名称不能为空",
            trigger: "blur"
          }
        ];
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ];
      }
    },
    emailRules: {
      type: Array,
      default: () => {
        return [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur"
          }
        ];
      }
    },
   
  },
  //当路径不变，只有参数query或param改变时，用watch监控不到，可以用导航守卫beforeRouteUpdate。
  beforeRouteUpdate(to, from, next) {
    //debugger
    this.isEdit = false;
    this.userForm = Object.assign({}, userFormFixed);
    this.buttonName = "确认";
    this.disabledUserName=false
    next();
  },
 
  computed: {
    userRules() {
      return {
        //可以一次返回多个值控制验证
        username: this.usernameRules,
        password: this.passwordRules,
        email: this.emailRules
      };
    }
  },
  methods: {
    //提交文章
    handleSubmit() {
      let _self = this;
      this.$refs.userForm.validate(valid => {
        //validate 为iview Form 表单内置方法，详细参考：https://www.iviewui.com/components/form
        if (valid) {
          _self.spinShow = true;
          _self.disabledSubmit = true;

          let params = _self.userForm;
          //更新操作
          params.id = 0;
          //debugger
          if (_self.isEdit) {
            params.id = _self.editId;
          }

          _self.$store
            .dispatch("createOrUpdateUser", params)
            .then(res => {
              _self.spinShow = false;
              let config = {
                type: type.tipMessage_success,
                msg: _self.isEdit ? "更新用户成功" : "添加用户成功！"
              };
              _self.showMsg(config);
              if (!_self.isEdit) {
                //添加成功后，清空数据
                _self.userForm = Object.assign({}, userFormFixed);
              }

              //发布成功后等待跳转
              setTimeout(() => {
                //_self.HandleRedirectName('postsList')
                _self.disabledSubmit = false;
                _self;
              }, 2000);
            })
            .catch(err => {
              _self.disabledSubmit = false;
              _self.spinShow = false;
              let config = {
                type: type.tipMessage_error,
                msg: _self.isEdit
                  ? "更新用户失败！ 代号：" + err
                  : "添加用户失败！ 代号：" + err
              };
              _self.showMsg(config);
            });
        }
      });
    },
    //重置文章
    handleReset() {
      this.$refs.postForm.resetFields(); //resetFields 为iview Form 表单内置方法，
    },
    //重缓存中获取需要编辑的数据
    getCurrentData(id) {
     // debugger
      this.currentData = {};
      let dataList = this.$store.getters.userList_state;
      if (dataList && dataList.length > 0) {
        let tempDataList = [...dataList]; //JSON.parse(postList)
        let tempData = tempDataList; //Array.from(tempDataList)
        if (tempData && tempData.length > 0) {
          if (typeof tempData == "string") {
            tempData = Array.from(JSON.parse(tempData));
          }
          this.currentData = tempData.filter(item => {
             // debugger
            if (item.id == id) {
              return item;
            }
          });
          //console.warn('this.currentData'+this.currentData.length)
        }
      }
    },
    //初始化编辑数据
    initEditData() {
      if (this.currentData.length > 0) {
          //debugger
            this.userForm.username = this.currentData[0].name;
            //this.userForm.password = this.currentData[0].password;
            if( this.currentData[0].acf){
              this.userForm.email = this.currentData[0].acf.email;
            }
          
            this.userForm.description = this.currentData[0].description;
           
      }
    }
  },
  created() {
    //alert('created')
    //获取编辑ID
    let currentId = this.$route.query.id;
    if (currentId != undefined && currentId != null) {
      this.editId = currentId;
      if (this.editId != 0) {
        this.isEdit = true;
        this.disabledUserName=true
        this.buttonName = "更新";

        this.getCurrentData(this.editId);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.isEdit) {
        this.initEditData();
      }
    });
  }
};
</script>

<style lang="less" scoped>
</style>
