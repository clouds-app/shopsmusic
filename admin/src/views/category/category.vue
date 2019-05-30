<template>
  <div class="container">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Table border :columns="columns" :data="data">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
       <template slot-scope="{ row }" slot="parent">
        <strong>{{ getParenName(row)}}</strong>
      </template>
  
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
        <Button type="success" size="small" style="margin-right: 5px" @click="edit(row.id)">修改</Button>
        <Button type="error" size="small" @click="remove(index,row)">删除</Button>
      </template>
    </Table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import * as type from "@/enums";
import base_mixins from "@/views/mixins";
export default {
  name: "categoryList",
  mixins: [base_mixins],
  data() {
    return {
      spinShow: false,
      columns: [
        {
          title: "id",
          width: 60,
          align: "center",
          fixed: "left",
          key: "id"
        },
        {
          title: "名称",
          minWidth: 180,
          slot: "name"
        },
        {
          title: "别名",
          minWidth: 100,
          key: "slug"
        },
          {
          title: "父级",
          minWidth: 100,
          slot: "parent"
        },
        // {
        //   title: "taxonomy",
        //   minWidth: 100,
        //   key: "taxonomy"
        // },
        {
          title: "描述",
          align: "center",
          key: "description",
          width: 180
        },
        {
          title: "文章",
          align: "center",
          key: "count",
          width: 100
        },
        {
          title: "操作",
          slot: "action",
          fixed: "right",
          width: 200,
          align: "center"
        }
      ],
      data: []
    };
  },
  computed: {},
  created() {
    // alert(1)
    this.initData();
  },
  mounted() {},
  methods: {
    ...mapActions(["getCategoryList"]), //导出getUserList方法，并合并到当前methods中
     getParenName(row){
        //debugger
       // console.log('hellollllll'+JSON.stringify(currentData))
        if(row && row.parent!=0)
        {
            let currentData =this.data.filter(item => item.id==row.parent )
            return currentData[0].name
        }
        else{
            return '-'
        }
    },
    removeCash() {
      this.$route.meta.keepAlive = false;
    },
    //初始化列表数据
    initData() {
      this.spinShow = true;
      let _self = this;
      let params = {
        //page:2,
        // per_page:10,
        //  slug,
        //  status
      };
      this.getCategoryList(params)
        .then(res => {
          let config = {
            type: type.tipMessage_success,
            msg: "获取类别列表成功！"
          };
           //console.log('this.getCategoryList:'+JSON.stringify(res))
          this.formatData(res);
          this.spinShow = false;
          _self.showMsg(config);
          //this.$route.meta.keepAlive = true; //开始缓存
        })
        .catch(err => {
          this.spinShow = false;
          let config = {
            type: type.tipMessage_error,
            msg: "获取类别列表失败！ 代号：" + err
          };
          _self.showMsg(config);
        });
    },
    formatData(dataSource) {
      dataSource.forEach(item => {
        let tempItem = Object.assign({}, item);
        this.data.push(tempItem);
        tempItem = {};
      });
    },
    formatStatus(status) {
      return type.formatStatus(status);
    },
    //页面详细
    show(index) {
      this.$Modal.info({
        title: "类别详细",
        content: `标题：${this.data[index].name}
          <br>时间 ：${this.data[index].slug}
          <br>简要内容：${this.data[index].description
        }`
      });
    },
    //删除数据
    remove(index, row) {
      this.handleDeletePage(index, row);
    },
    //修改文章
    edit(id) {
      this.$router.push({
        path: "/home/addOrEditCategory",
        query: {
          id,
          type: "edit"
        }
      });
    },
    //删除页面
    handleDeletePage(index, row) {
      // debugger
      let _self = this;
      this.spinShow = true;
      let params = {
        id: row.id,
      };
      this.$store
        .dispatch("deleteCategoryById", params)
        .then(res => {
          _self.data.splice(index, 1);
          _self.spinShow = false;
          let config = {
            type: type.tipMessage_success,
            msg: "删除类别成功！"
          };
          _self.showMsg(config);
        })
        .catch(err => {
          _self.spinShow = false;
          let config = {
            type: type.tipMessage_error,
            msg: "删除类别失败！ 代号：" + err
          };
          _self.showMsg(config);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.ivu-table-footer {
  text-align: center;
}
</style>
