<template>
    <div>
       <Input class="table_input one_columns"  @keyup.native="showKey2($event,row._index)" v-model="row.name" placeholder="Enter something..." style="width: 300px" /> 
    </div>
</template>
<script>
export default {
    
}
</script>