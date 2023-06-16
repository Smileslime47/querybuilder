<template>
  <Group :attributes="attributes" :root="true" @spawn="(param1,param2)=>receiveStatement(param1,param2)"/>
  <el-input v-model="sqlStatement" placeholder="SQL语句" />
  <SelectResult :table-data="tableData"/>
</template>

<script>
import Group from "@/components/Group.vue";
import SelectResult from "@/components/SelectResult.vue";
import axios from "axios";
export default{
  components: {SelectResult, Group},
  data(){
    return{
      sqlStatement:'',
      tableData:[],
      attributes:[
        {
          value:'user_name',
          label:'用户名',
        },
        {
          value:'user_id',
          label:'ID',
        },
        {
          value:'user_phone',
          label:'手机号码',
        },
        {
          value:'user_nickname',
          label:'昵称',
        },
        {
          value:'user_sex',
          label:'性别',
        },
        {
          value:'user_age',
          label:'年龄',
        },
      ]
    }
  },
  methods:{
    receiveStatement(statement,result){
      this.sqlStatement=statement;
      this.tableData=result;
    },
  }
}

</script>

<style>
</style>
