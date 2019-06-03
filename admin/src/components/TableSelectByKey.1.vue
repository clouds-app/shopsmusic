<template>
  <Table border :columns="columns12" :data="data6">
    <template slot-scope="{ row }" slot="name">
       <Input class="table_input one_columns"   @keyup.native="showKey($event,row,1)" v-model="row.name" placeholder="Enter something..." style="width: 300px" />
    </template>
    <template slot-scope="{ row }" slot="age">
      <Input class="table_input two_columns"    @keyup.native="showKey($event,row,2)" v-model="row.age" placeholder="Enter something..." style="width: 300px" />
    </template>
    <template slot-scope="{ row }" slot="address">
      <Input class="table_input three_columns"   @keyup.native="showKey($event,row,3)" v-model="row.address" placeholder="Enter something..." style="width: 300px" />
    </template>
    <template slot-scope="{ row, index }" slot="action">
      <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
    </template>
  </Table>
</template>
<script>
export default {
  data() {
    return {
       isEdit: false, //当前input 是否为编辑模式
      columns12: [
        {
          title: "Name",
          slot: "name"
        },
        {
          title: "Age",
          key: "age",
          slot: "age"
        },
        {
          title: "Address",
          key: "address",
          slot: "address"
        },
        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      data6: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park"
        }
      ]
    };
  },
  methods: {
    //键盘触发事件
    showKey(ev, row,col) {
      let index = row._index
        console.warn('current row :'+ JSON.stringify(row));
         console.warn('current ev :'+ JSON.stringify(ev.target));
     //debugger
      let newIndex;

      //通过ev 获取 当前input 名称 用于判断属于哪列

      let clssName = ev.target.offsetParent.className;

      //每一列
      let totalColumns = 3 //总列数
      if (clssName.indexOf("one_columns") != -1) {
        this.data = index;

        this.didata = index * totalColumns;

        newIndex = index * totalColumns;
      } else if (clssName.indexOf("two_columns") != -1) {
        this.data = index;

        this.didata = index * totalColumns + 1;

        newIndex = index * totalColumns + 1;
      } else if (clssName.indexOf("three_columns") != -1) {
        this.data = index;

        this.didata = index * totalColumns + 2;

        newIndex = index * totalColumns + 2;
      }

      //获取所有input

      let inputAll = document.querySelectorAll(".table_input input");

      this.iddata = inputAll;
      
    
      //向上 =38

      if (ev.keyCode == 38 && !this.isEdit) {
        //当焦点在第一行的时候 按向上的时候焦点要聚焦到前一列的最后一个

        if (newIndex >= 1 && newIndex <= 2) {
          newIndex = newIndex + 8;
        } else {
          newIndex -= totalColumns;
        }

        if (inputAll[newIndex]) {

         inputAll[newIndex].focus();

        }
      }

      //下 = 40

      if (ev.keyCode == 40 && !this.isEdit) {
        //当newIndex 在最后一行的时候 焦点要聚焦到 下一列的第一个

        if (newIndex >= 9 && newIndex < 11) {
          newIndex = newIndex % 8;
        } else {
          newIndex += totalColumns;
        }

        if (inputAll[newIndex]) {
          inputAll[newIndex].focus();

        }
      }

      //左 = 37
      if (ev.keyCode == 37 && !this.isEdit) {
        newIndex -= 1;

        if (inputAll[newIndex]) {
          inputAll[newIndex].focus();
             
        }
      }
      //右 = 39
      if (ev.keyCode == 39 && !this.isEdit) {
        newIndex = newIndex + 1;

        if (inputAll[newIndex]) {
          inputAll[newIndex].focus();
        
        }
      }
       //点击回车切换为编辑/选择模式
       if (ev.keyCode == 13) {
         //debugger
        if (inputAll[newIndex]) {
            this.isEdit=!this.isEdit
        }
      }
    }
  }
};
</script>


