<script>
import Group from "@/components/Group.vue";
export default{
  props:['tableData'],
  data(){
    return{
    }
  },
}
</script>

<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="userName" label="用户名"/>
    <el-table-column prop="userNickname" label="昵称"/>
    <el-table-column prop="userEmail" label="邮箱" />
    <el-table-column prop="userPhoneNumber" label="手机号" />
    <el-table-column prop="userSex" label="性别" />
    <el-table-column prop="userAge" label="年龄" />
  </el-table>
</template>

<style scoped>


</style>