<template>
  <Table border :columns="columns" :data="data6">
    <template slot-scope="{ row }" slot="name">
      <Input class="table_input"   @keyup.native="showKey($event,row,1)" v-model="row.name" placeholder="Enter something..." style="width: 300px" />
    </template>
    <template slot-scope="{ row }" slot="age">
      <Radio class="table_input" @keyup.native="showKey($event,row,2)" v-model="row.age">Radio</Radio>
    </template>
    <template slot-scope="{ row }" slot="address">
        <Checkbox class="table_input" @keyup.native="showKey($event,row,3)" v-model="row.address">Checkbox</Checkbox>
    </template>
    <template slot-scope="{ row }" slot="date">
       <Select class="table_input"   @keyup.native="showKey($event,row,4)" v-model="row.date" style="width:200px">
         <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </template>
     <template slot-scope="{ row }" slot="type">
      <Input class="table_input"   @keyup.native="showKey($event,row,5)" v-model="row.type" placeholder="Enter something..." style="width: 300px" />
    </template>
    <template slot-scope="{ row }" slot="switch">
         <i-switch class="table_input"  @keyup.native="showKey($event,row,6)" v-model="row.switch">
          <span slot="open">开</span>
          <span slot="close">关</span>
        </i-switch>
    </template>
  </Table>
</template>
<script>
export default {
  data() {
    return {
       cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
      columns: [
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
          title: "date",
          slot: "date"
        },
         {
          title: "type",
          slot: "type"
        },
        // {
        //     title: 'type',
        //                 width: 100,
        //                 key: 'type',
        //                 align: 'center',
        //                 render:(h,params) => {
        //                    let _self=this; //重定向
        //               return h('Input',
        //                       {
        //                       props: {
        //                             value:  _self.data6[params.index].type,//意思为V-MODEL，data6 数据源
        //                            },
        //                       on: {
        //                               'on-keyup':(e)=>{
        //                                       _self.showKey(e,params.row,5) //对应列数
        //                                   },
                                    
        //                           }, 
        //                       class: 'table_input', //添加样式
        //                       },
                            
        //                     )
        //                 }
        //             },
       {
          title: "switch",
          slot: "switch"
        },
                   
      ],
      data6: [ // 数据源
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          type :'234234',
          switch:true,
          date :'true',
        },
        {
          name: "Jim Green",
          age: 24,
           date :'true',
            type :'234234',
             switch:true,
          address: "asdfasdfasdfadf"
        },
        {
          name: "Joe Black",
          age: 30,
           date :'true',
            type :'',
             switch:false,
          address: "Sydney No. 1 Lake Park"
        },
        {
          name: "Jon Snow",
          age: 26,
          date :'false',
          type :'',
          switch:true,
          address: ""
        }
      ]
    };
  },
  methods: {
    //键盘触发事件
    showKey(ev, row,col) {
      debugger
      
      let totalColumns = Object.keys(this.data6[0]).length //总列数, data6 数据总列，配置项

      col =Number(col)
      let index = row._index //当前行数

      let newIndex;

      //通过ev 获取 当前input 名称 用于判断属于哪列，暂时无用
      //let clssName = ev.target.offsetParent.className;

      //每一列
      if (col == 1) {
        this.data = index;
        this.didata = index * totalColumns;
        newIndex = index * totalColumns;
      } else {
        this.data = index;
        this.didata = index * totalColumns + (col-1);
        newIndex = index * totalColumns + (col-1);
      } 

      //获取所有input
      //debugger
      let inputAll = document.querySelectorAll(".table_input input[type='text'],.table_input input[type='radio'], .ivu-checkbox-input,.ivu-select-selection,.ivu-switch,.table_input_custer");

      this.iddata = inputAll;
      
      //console.warn('inputAll[newIndex] :'+inputAll[newIndex])
      //向上 =38
      if (ev.keyCode == 38 && inputAll[newIndex]==HTMLInputElement  && inputAll[newIndex].value.length==0) {
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
     // debugger
      if (ev.keyCode == 40 && inputAll[newIndex]==HTMLInputElement &&  inputAll[newIndex].value.length==0) {
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
      if (ev.keyCode == 37 && inputAll[newIndex]==HTMLInputElement  && inputAll[newIndex].value.length==0) {
        newIndex -= 1;

        if (inputAll[newIndex]) {
          inputAll[newIndex].focus();
             
        }
      }
      //右 = 39
      if (ev.keyCode == 39 && inputAll[newIndex]==HTMLInputElement && inputAll[newIndex].value.length==0) {
        newIndex = newIndex + 1;

        if (inputAll[newIndex]) {
          inputAll[newIndex].focus();
        
        }
      }
       //点击回车切换 下一个元素
       debugger
       if (ev.keyCode == 13) {
         newIndex = newIndex + 1;
        if (inputAll[newIndex]) {
           console.warn('newIndex :' + newIndex)
          console.warn('inputAll[newIndex].value :' + inputAll[newIndex])
          inputAll[newIndex].focus();
        
        }
      }
    }
  }
};
</script>


