<template>
  <div class="container">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Table  border :columns="columns" :data="data">
       <template slot-scope="{ row }" slot="title">
        <strong>{{ row.title }}</strong>
      </template>
      <template slot-scope="{ row }" slot="status">
        <span>{{ formatStatus(row.status) }}</span>
      </template>
       <template slot-scope="{ row }" slot="telephoneno">
        <strong>{{ getTelephone(row)}}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
         <Button type="success" size="small" style="margin-right: 5px" @click="edit(row.id)">修改</Button>
        <Button type="error" size="small" @click="remove(index,row)">删除</Button>
      </template>
    
      <template slot="footer">
        <span>i am footer    <Button type="error" size="small" @click="removeCash()">删除缓存</Button></span>
      </template>
    </Table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import * as type from "@/enums";
import base_mixins from "@/views/mixins";
export default {
  name: "postList",
  mixins: [base_mixins],
  data() {
    return {
      spinShow: false,
      columns: [
        {
          title: "id",
          width: 80,
          align: "center",
          fixed: 'left',
          key: "id"
        },
        {
          title: "标题",
          key: "title",
          minWidth: 180,
          slot:"title",
        },
        {
          title: "手机",
          minWidth: 180,
          slot:"telephoneno",
        },
        {
          title: "状态",
            width: 100,
             align: "center",
          slot:"status",
          //key: "status"
        },
        // {
        //   title: "类型",
        //   key: "slug"
        // },
         {
          title: "时间",
           align: "center",
          key: "date",
          width: 180,
        },
        {
          title: "操作",
          slot: "action",
          fixed: 'right',
          width: 200,
          align: "center"
        }
      ],
      data: [],
    };
  },
  computed: {
    // ...mapState({
    //   viewsCount: "views"
    // }),

//     ...mapGetters({
//       allPageList: "pageList" // pageList 不是字符串，对应的是getter里面的一个方法名字 然后将这个方法名字重新取一个别名 allPageList
      
//    })
  },
  created() {
    // alert(1)
    this.initData();
     
  },
  mounted(){
      
  },
  methods: {
    ...mapActions(["getPostsList"]), //导出getPageList方法，并合并到当前methods中
    removeCash(){
      this.$route.meta.keepAlive = false;
    },
     getTelephone(row){
        //debugger
        if(row && row.acf && row.acf.telephoneno!=null)
        {
            return row.acf.telephoneno
        }
    },
    //初始化页面列表数据
    initData() {
      this.spinShow = true;
      let _self = this;
      let params = {
          //page:2,
        // per_page:10,
        //  slug,
        //  status
      };
      this.getPostsList(params)
        .then(res => {
          let config = {
            type: type.tipMessage_success,
            msg: "获取文章列表成功！"
          };
          console.log('this.获取文章列表成功！:'+JSON.stringify(res))
           this.formatData(res)
          this.spinShow = false;
          _self.showMsg(config);
          this.$route.meta.keepAlive = true; //开始缓存
        })
        .catch(err => {
          this.spinShow = false;
          let config = {
            type: type.tipMessage_error,
            msg: "获取文章列表失败！ 代号：" + err
          };
          _self.showMsg(config);
        });
    },
    formatData(dataSource){
        dataSource.forEach(item=>{
            let tempItem  = Object.assign({},item)
                  tempItem.title = item.title.rendered
                   tempItem.excerpt = item.excerpt.rendered
                    this.data.push(tempItem)
                  tempItem={}

        })
    },
   formatStatus(status)
        {
            return type.formatStatus(status)
        },
    //页面详细
    show(index) {
      this.$Modal.info({
        title: "页面详细",
        content: `标题：${this.data[index].title}
          <br>时间 ：${this.data[index].date
        }<br>简要内容：${this.data[index].excerpt}`
      });
    },
    //删除数据
    remove(index,row) {
      
      this.handleDeletePage(index,row);
    },
    //修改文章
    edit(id){
       this.$router.push({
              path:'/home/postsEdit',
              query:{
                id,
                type:'edit'
              }
            })
    },
      //删除页面
    handleDeletePage(index,row){
       // debugger
     let _self = this;
     this.spinShow = true;
      let params={
        id:row.id,
        force:false,
        type:'delete'
      }
     this.$store.dispatch('DeletePostById',params).then(res=>{
         _self.data.splice(index, 1);
         _self.spinShow = false;
         let config = {
            type: type.tipMessage_success,
            msg: "删除文章成功！"
          };
          _self.showMsg(config);
      }).catch(err=>{
         _self.spinShow = false;
          let config = {
            type: type.tipMessage_error,
            msg: "删除文章失败！ 代号：" + err
          };
          _self.showMsg(config);
      })
      }
  }
};
</script>

<style lang="less" scoped>
.ivu-table-footer{
  text-align: center;
}
</style>
