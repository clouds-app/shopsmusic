<template>
  <div class="container">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Table border :columns="columns" :data="data">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row }" slot="email">
        <strong>{{ getUserEmail(row)}}</strong>
      </template>
      <template slot-scope="{ row }" slot="wechat">
        <strong>{{ getUserWechat(row)}}</strong>
      </template>
      <template slot-scope="{ row }" slot="avatar_urls">
        <img style="-webkit-user-select: none;" :src="row.avatar_urls[24]">
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
        <Button type="success" size="small" style="margin-right: 5px" @click="edit(row.id)">修改</Button>
        <Button type="error" size="small" @click="remove(index,row)">删除</Button>
      </template>

      <!-- <template slot="footer">
        <span>
          i am footer
          <Button type="error" size="small" @click="removeCash()">删除缓存</Button>
        </span>
      </template> -->
    </Table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import * as type from "@/enums";
import base_mixins from "@/views/mixins";
export default {
  name: "userList",
  mixins: [base_mixins],
  data() {
    return {
      spinShow: false,
      columns: [
        {
          title: "id",
          width: 80,
          align: "center",
          fixed: "left",
          key: "id"
        },
         {
          title: "头像",
          minWidth: 60,
          slot: "avatar_urls"
        },
        {
          title: "名称",
          minWidth: 180,
          slot: "name"
        },
        {
          title: "邮箱",
          minWidth: 100,
          slot: "email"
        },
          {
          title: "微信",
          minWidth: 100,
          slot: "wechat"
        },
        {
          title: "伪URL",
          minWidth: 100,
          key: "slug"
        },
        {
          title: "描述",
          align: "center",
          key: "description",
          width: 180
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
    ...mapActions(["getUserList"]), //导出getUserList方法，并合并到当前methods中
    getUserEmail(user){
        //debugger
        if(user && user.acf && user.acf.email!=null)
        {
            return user.acf.email
        }
    },
    getUserWechat(user){
        //debugger
        if(user && user.acf && user.acf._wechat!=null)
        {
            return user.acf._wechat
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
      this.getUserList(params)
        .then(res => {
          let config = {
            type: type.tipMessage_success,
            msg: "获取用户列表成功！"
          };
           console.log('this.getUserList:'+JSON.stringify(res))
          this.formatData(res);
          this.spinShow = false;
          _self.showMsg(config);
          this.$route.meta.keepAlive = true; //开始缓存
        })
        .catch(err => {
          this.spinShow = false;
          let config = {
            type: type.tipMessage_error,
            msg: "获取用户列表失败！ 代号：" + err
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
        title: "用户详细",
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
        path: "/home/userEdit",
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
        force: false,
        type: "delete"
      };
      this.$store
        .dispatch("DeleteUserById", params)
        .then(res => {
          _self.data.splice(index, 1);
          _self.spinShow = false;
          let config = {
            type: type.tipMessage_success,
            msg: "删除用户成功！"
          };
          _self.showMsg(config);
        })
        .catch(err => {
          _self.spinShow = false;
          let config = {
            type: type.tipMessage_error,
            msg: "删除用户失败！ 代号：" + err
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
