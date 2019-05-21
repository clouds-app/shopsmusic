<template>
  <div class="home">
    
    <TableSelectByKey />
  </div>
</template>

<script>
// @ is an alias to /src
import TableSelectByKey from '@/components/TableSelectByKey.vue'

export default {
  name: 'home',
  components: {
    TableSelectByKey
  }
}
</script>
