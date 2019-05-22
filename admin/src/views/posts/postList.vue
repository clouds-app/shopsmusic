<template>
  <div class="container">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Table border :columns="columns" :data="data">
      <!-- <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template> -->
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
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
  name: "postList",
  mixins: [base_mixins],
  data() {
    return {
      spinShow: false,
      columns: [
        {
          title: "id",
          key: "id"
        },
        {
          title: "标题",
          key: "title"
        },
        {
          title: "类型",
          key: "slug"
        },
         {
          title: "时间",
          key: "date"
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
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
         // console.log('this.allPageList:'+JSON.stringify(res))
           this.formatData(res)
          this.spinShow = false;
          _self.showMsg(config);
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
     this.$store.dispatch('getOperationPageById',params).then(res=>{
         _self.data.splice(index, 1);
         _self.spinShow = false;
         let config = {
            type: type.tipMessage_success,
            msg: "删除页面成功！"
          };
          _self.showMsg(config);
      }).catch(err=>{
         _self.spinShow = false;
          let config = {
            type: type.tipMessage_error,
            msg: "删除页面失败！ 代号：" + err
          };
          _self.showMsg(config);
      })
      }
  }
};
</script>

<style lang="less" scoped>
</style>
