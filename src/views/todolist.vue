<template>
  <div class="todolist">
    <div class="bold"></div>
    <el-input
      type="text"
      size="mini"
      style="width:200px"
      v-model="todo"
      @keydown.enter.native="addItem"
    ></el-input>
    <el-button type="success" size="mini" @click="addItem">添加</el-button>
    <el-collapse v-model="activeNames" style="width:600px;margin:0 auto">
      <el-collapse-item v-for="(item, index) in configList" :key="index" :title=item[1] :name=item[0]>
        <template>
          <el-table :data="filterArray(item[0])" style="width: 100%">
            <el-table-column label="日期" width="180">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column label="内容" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="scope.row.state=item[3]">{{item[2]}}</el-button>
                <el-button size="mini" type="danger" @click="removeItem(scope.row.flag)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-collapse-item>
      <!-- <el-collapse-item title="新建" name="1">
        <template>
          <el-table :data="filterArray(1)" style="width: 100%">
            <el-table-column label="日期" width="180">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column label="内容" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="scope.row.state=2">开始</el-button>
                <el-button size="mini" type="danger" @click="removeItem(scope.row.flag)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-collapse-item>
      <el-collapse-item title="进行中" name="2">
        <template>
          <el-table :data="filterArray(2)" style="width: 100%">
            <el-table-column label="日期" width="180">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column label="内容" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="scope.row.state=3">完成</el-button>
                <el-button size="mini" type="danger" @click="removeItem(scope.row.flag)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-collapse-item>
      <el-collapse-item title="已完成" name="3">
        <template>
          <el-table :data="filterArray(3)" style="width: 100%">
            <el-table-column label="日期" width="180">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column label="内容" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="scope.row.state=1">重做</el-button>
                <el-button size="mini" type="danger" @click="removeItem(scope.row.flag)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-collapse-item> -->
    </el-collapse>
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
      activeNames: ['1'],
      configList:[[1,'新建','开始',2],[2,'进行中','完成',3],[3,'已完成','重做',1]]
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
        flag:new Date().getTime()
      });
      this.todo = "";
    },
    removeItem(flag) {
      //用index的话，v-for返回的index不是list的index，而是filter的index，无法准确删除
      //this.list.splice(index, 1); 
      console.log(flag);
      this.list=this.list.filter(item=>item.flag!==flag)
    }
  },
  computed: {
    filterArray() {
      return function(state) {
        return this.list.filter(item => item.state === state);
      };
    }
  }
};
</script>
<style lang="scss">
@import "../assets/sass/test.scss";
.todolist {
  li {
    margin-top: 5px;
  }
}
</style>

