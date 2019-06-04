<template>
  <div class="todolist">
    <el-input type="text" size="mini" style="width:200px" v-model="todo" @keydown.enter.native="addItem"></el-input>
    <el-button type="success" size="mini" @click="addItem">添加</el-button>
    <h3>新增</h3>
    <hr>
    <ul>
      <!-- <li v-for="(item, index) in list" :key="index" v-if="item.state===1"> -->
      <li v-for="(item, index) in filterArray(1)" :key="index" >
        <el-button type="primary" plain size="mini" @click="item.state=2">开始</el-button>
        {{item.title}}
        <el-button type="danger" plain size="mini" @click="removeItem(index)">删除</el-button>
      </li>
    </ul>
    <h3>进行中</h3>
    <hr>
    <ul>
      <!-- <li v-for="(item, index) in list" :key="index" v-if="item.state===2"> -->
      <li v-for="(item, index) in filterArray(2)" :key="index" >
        <el-button type="primary" plain size="mini" @click="item.state=3">完成</el-button>
        {{item.title}}
        <el-button type="danger" plain size="mini" @click="removeItem(index)">删除</el-button>
      </li>
    </ul>
    <h3>已完成</h3>
    <hr>
    <ul>
      <!--<li v-for="(item, index) in list" :key="index" v-if="item.state===3">-->
      <li v-for="(item, index) in filterArray(3)" :key="index" >
        <el-button type="primary" plain size="mini" @click="item.state=1">重做</el-button>
        {{item.title}}
        <el-button type="danger" plain size="mini" @click="removeItem(index)">删除</el-button>
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
      list: []
    };
  },
  methods: {
    addItem() {
      if (this.todo.trim() == "") {
        return false;
      }
      this.list.push({
        title: this.todo,
        state: 1
      });
      this.todo = "";
    },
    removeItem(index) {
      this.list.splice(index, 1);
    }
  },
  computed:{
    filterArray(){
      return function(state){
        return this.list.filter(item=>item.state===state)
      }
    }
  }
};
</script>
<style lang="scss">
.todolist {
  li {
    margin-top: 5px;
  }
}
</style>

