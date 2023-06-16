<template>
  <div class="container">
    <div class="content-container">
    <el-row justify="space-between">
      <el-col :span="10">
        <el-row>
          <el-checkbox-group v-model="formData.is_not" size="default" >
            <el-checkbox-button v-model="formData.is_not" size="default" label="NOT"/>
          </el-checkbox-group>
          <el-radio-group v-model="formData.action" size="default">
            <el-radio-button label="AND" />
            <el-radio-button label="OR" />
          </el-radio-group>
        </el-row>
      </el-col>
      <el-button-group size="small">
        <el-button type="success" :icon="Plus" @click="addRule">Add Rule</el-button>
        <el-button type="success" :icon="CirclePlus" @click="addGroup">Add Group</el-button>
        <el-button v-if="this.root" type="primary"  @click="sendQuery">Get Group Statement</el-button>
      </el-button-group>
    </el-row>
    </div>


    <div class="content-container">
    <li v-for="(rule,index) in formData.rules">
      <el-row justify="space-between">
        <el-col :span="23" v-if="rule.is_rule">
          <el-row class="row-bg">
            <el-col :span="3">
              <el-select v-model="rule.left" placeholder="Select">
                <el-option
                    v-for="item in attributes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-select v-model="rule.condition" placeholder="Select">
                <el-option
                    v-for="item in conditions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-input v-model="rule.right" placeholder="比较值" />
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="23" v-if="!rule.is_rule">
        <Group :index="index" :root="false" :attributes="this.attributes" @input="(param1,param2)=>receiveFormData(param1,param2)"></Group>
        </el-col>

        <el-button size="small" type="danger" @click="deleteRule(index)">Delete</el-button>
      </el-row>
    </li>
    </div>
  </div>
</template>

<script>
import {CirclePlus, Plus} from "@element-plus/icons-vue";
import axios from "axios";

export default {
  name:'Group',
  computed: {
    CirclePlus() {
      return CirclePlus
    },
    Plus() {
      return Plus
    }
  },
  props:['index','root','attributes'],
  watch: {
    formData:{
      handler(newVal, oldVal){
        console.log("change catched!!!!");
        // console.log(newVal);
        // console.log(this.index);
        this.$emit('input' , this.index , newVal);
      },
      deep:true
    }
  },
  // created() {
  //   console.log(this.index);
  // },
  data(){
    return {
      formData:{
        is_rule:false,
        is_not:false,
        action: '',
        rules:[],
      },
      conditions:[
        {
          value:'leq',
          label:'leq',
        },
        {
          value:'eq',
          label:'eq',
        },
        {
          value:'geq',
          label:'geq',
        },
        {
          value:'lt',
          label:'lt',
        },
        {
          value:'gt',
          label:'gt',
        }
      ]
    };
  },
  methods:{
    addGroup(){
      this.formData.rules.push({
        is_rule:false,
        is_not:false,
        action: '',
        rules:[],
      });
    },
    addRule(){
      this.formData.rules.push({
        is_rule:true,
        condition:'',
        left:'',
        right:'',
      });
    },
    deleteRule(index){
      this.formData.rules.splice(index,1);
    },
    receiveFormData(arg1,arg2) {
      // 在这里处理接收到的子组件数据
      // 将数据添加到父组件的rules数组中
      const index = arg1;
      const data = arg2;
      console.log("index is");
      console.log(index);
      console.log("and data is");
      console.log(data);
      this.formData.rules[index]= data;
    },
    async sendQuery(){
      console.log(this);
      let result;
      let statement;
      await axios.post('http://localhost:8080/statement/post',this.formData ).then((response)=>{
        result=response.data;
      })
      await axios.get('http://localhost:8080/statement/get').then((response)=>{
        statement=response.data;
      })
      this.$emit('spawn',statement,result)
    },
  }
}
</script>

<style scoped>
.container{
  border:solid 1px;
  border-radius: 4px;
  padding:10px;
  margin:5px;
}
.content-container{
  padding-left:5px;
  margin:10px;
}
el-checkbox-group{
  flex-grow: 1;
}
el-radio-group{
  flex-grow: 1;
}
</style>
