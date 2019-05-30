<template>
  <div class="container">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Form ref="postForm" :model="postForm" :rules="userRules" :lable-width="80">
      <FormItem prop="name" label="名称">
          <Input v-model="postForm.name" placeholder="请输入名称">
           
          </Input>
      </FormItem>
       <FormItem prop="slug" label="别名[拼音或英语]">
          <Input  v-model="postForm.slug" placeholder="请输入别名">
          </Input>
      </FormItem>
       <FormItem label="父类">
            <Select v-model="postForm.parent">
                <Option  v-for="(item) in CategoryList" :key="item.id" :value="item.id.toString()">{{item.name}}</Option>
                <Option key="-1" value="0">顶级类别</Option>
            </Select>
        </FormItem>
      <FormItem lable="描述">
        <Input type="textarea" v-model="postForm.description" :rows="4" placeholder="请输入描述"></Input>
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
var postFormFixed = {
  name: "",
  slug:"",
  parent: "0", //发布状态下，才可以查询
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
      currentCategoryList:[],
      CategoryList:[],
      buttonName: "确认",
      isEdit: false,
      editId: 0,
      currentData: [],
      spinShow: false,
      postForm: Object.assign({}, postFormFixed) //不能直接赋值，否则postFormFixed值会变化
    };
  },
  props: {
    //可以添加多个验证规则
    nameRules: {
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
    slugdRules: {
      type: Array,
      default: () => {
        return [
          {
            required: true,
            message: "别名不能为空",
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
    this.postForm = Object.assign({}, postFormFixed);
    this.buttonName = "确认";
    this.disabledUserName=false
    this.CategoryList =[...this.currentCategoryList] //所有类别
    next();
  },
 
  computed: {
    userRules() {
      return {
        //可以一次返回多个值控制验证
        name: this.nameRules,
        slug: this.slugdRules,
      };
    }
  },
  methods: {
   
    //提交数据
    handleSubmit() {
     
      let _self = this;
      this.$refs.postForm.validate(valid => {
        //validate 为iview Form 表单内置方法，详细参考：https://www.iviewui.com/components/form
        if (valid) {
          _self.spinShow = true;
          _self.disabledSubmit = true;

          let params = _self.postForm;
          //更新操作
          params.id = 0;
          //debugger
          if (_self.isEdit) {
            params.id = _self.editId;
          }

          _self.$store
            .dispatch("createOrUpdateCatetory", params)
            .then(res => {
              _self.spinShow = false;
              let config = {
                type: type.tipMessage_success,
                msg: _self.isEdit ? "更新类别成功" : "添加类别成功！"
              };
              _self.showMsg(config);
              if (!_self.isEdit) {
                //添加成功后，清空数据
                _self.postForm = Object.assign({}, postFormFixed);
              }

              //发布成功后等待跳转
              setTimeout(() => {
                //_self.HandleRedirectName('postsList')
                _self.disabledSubmit = false;
              }, 2000);
            })
            .catch(err => {
              _self.disabledSubmit = false;
              _self.spinShow = false;
              let config = {
                type: type.tipMessage_error,
                msg: _self.isEdit
                  ? "更新类别失败！ 代号：" + err
                  : "添加类别失败！ 代号：" + err
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
      //debugger
      this.currentData = {};
      let dataList = this.getCategories();
      if (dataList && dataList.length > 0) {
        let tempDataList = [...dataList]; 
        let tempData = tempDataList; 
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
            this.postForm.name = this.currentData[0].name;
            this.postForm.slug = this.currentData[0].slug;
            this.postForm.parent = this.currentData[0].parent.toString();
            this.postForm.description = this.currentData[0].description;
          
      }
    },
    //获取编辑ID
    getEditId(){
        //debugger
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
    //获取类别列表
    getCategories(){
        //debugger
        this.currentCategoryList =this.$store.getters.categoryList_state
         if (this.currentCategoryList.length == 0) {
              this.$store.dispatch('getCategoryList').then(res=>{
                 this.currentCategoryList = res
                 return res
             }).catch(err=>{
                 console.error(err)
             })
         }else
         {
             return  this.currentCategoryList
         }
        
    },

  },
  created() {
    //获取编辑ID
   this.getEditId()
   //获取类别列表
   this.getCategories()
  },
  mounted() {
    this.$nextTick(() => {
       this.CategoryList =[...this.currentCategoryList] //所有类别
      if (this.isEdit) {
           this.CategoryList =  this.CategoryList.filter(item=>{
               return item.id!= this.editId
           })
        this.initEditData();
      //  console.log('current postForm.parents is :' +this.postForm.parent)
        
      }
    });
  }
};
</script>

<style lang="less" scoped>
</style>
