<template>
  <div class="todolist2">
    <div class="bold"></div>
    <el-input type="text" size="mini" style="width:200px" v-model="todo" @keydown.enter.native="addItem"></el-input>
    <el-button type="success" size="mini" @click="addItem">添加</el-button>
    <h3>新增</h3>
    <hr>
    <ul>
      <!-- <li v-for="(item, index) in list" :key="index" v-if="item.state===1"> 
        不要同时使用v-for和v-if，使用computed替代
      -->
      <li v-for="(item, index) in filterArray(1)" :key="index" >
        <el-button type="primary" plain size="mini" @click="item.state=2;saveChange()">开始</el-button>
        {{item.title}}--{{item.date}}--{{item.flag}}
        <el-button type="danger" plain size="mini" @click="removeItem(item.flag)">删除</el-button>
      </li>
    </ul>
    <h3>进行中</h3>
    <hr>
    <ul>
      <!-- <li v-for="(item, index) in list" :key="index" v-if="item.state===2"> -->
      <li v-for="(item, index) in filterArray(2)" :key="index" >
        <el-button type="primary" plain size="mini" @click="item.state=3;saveChange()">完成</el-button>
        {{item.title}}--{{item.date}}--{{item.flag}}
        <el-button type="danger" plain size="mini" @click="removeItem(item.flag)">删除</el-button>
      </li>
    </ul>
    <h3>已完成</h3>
    <hr>
    <ul>
      <!--<li v-for="(item, index) in list" :key="index" v-if="item.state===3">-->
      <li v-for="(item, index) in filterArray(3)" :key="index" >
        <el-button type="primary" plain size="mini" @click="item.state=1;saveChange()">重做</el-button>
        {{item.title}}--{{item.date}}--{{item.flag}}
        <el-button type="danger" plain size="mini" @click="removeItem(item.flag)">删除</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "todolist",
  data() {
    return {
      todo: "",
      list: [],
      flag:0
    };
  },
  methods: {
    addItem() {
      if (this.todo.trim() == "") {
        return false;
      }
      this.list.push({
        date:new Date().toLocaleDateString(),
        title: this.todo,
        state: 1,
        flag:this.flag
      });
      this.flag++;
      this.todo = "";
      localStorage.setItem('todolist',JSON.stringify(this.list))
    },
    saveChange(){
      localStorage.setItem('todolist',JSON.stringify(this.list))
    },
    removeItem(flag) {
      //用index的话，v-for返回的index不是list的index，而是filter的index，无法准确删除
      //this.list.splice(index, 1); 
      console.log(flag);
      this.list=this.list.filter(item=>item.flag!==flag);
      localStorage.setItem('todolist',JSON.stringify(this.list)) 
    }
  },
  computed:{
    filterArray(){
      return function(state){
        return this.list.filter(item=>item.state===state)
      }
    }
  },
  mounted(){
    this.list=JSON.parse(localStorage.getItem('todolist'))||[]
  }
};
</script>
<style lang="scss">
@import '../assets/sass/test.scss';
.todolist {
  li {
    margin-top: 5px;
  }

}
</style>

