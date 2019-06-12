<template>
  <div class="todolist">
    <div class="bold"></div>
    <!--     <el-input
      type="text"
      size="mini"
      style="width:200px"
      v-model="todo.title"
      placeholder="请输入标题"
      @keydown.enter.native="addItem"
    ></el-input>-->
    <el-button type="success" size="mini" @click="dialogFormVisible = true">添加</el-button>
    <el-dialog title="添加新项目" :visible.sync="dialogFormVisible">
      <el-form :model="todo">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="todo.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input type="textarea" rows="5" v-model="todo.content" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false;addItem()">保 存</el-button>
      </div>
    </el-dialog>

    <el-collapse v-model="activeNames" style="width:600px;margin:0 auto">
      <el-collapse-item v-for="(item, index) in configList" :key="index" :name="item[0]">
        <template slot="title">
          <h2>{{item[1]}}</h2>
          <i :class="item[4]"></i>
        </template>
        <template>
          <el-table :data="filterArray(item[0])" style="width: 100%">
            <el-table-column label="日期" width="180">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column label="标题" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="scope.row.state=item[3];saveChange()">{{item[2]}}</el-button>
                <el-button size="mini" @click="scope.row.dialogContentVisible = true">查看</el-button>
                <el-button size="mini" type="danger" @click="removeItem(scope.row.flag)">删除</el-button>
                <el-dialog
                  title="内容"
                  :visible.sync="scope.row.dialogContentVisible"
                  width="50%"
                  :modal=false
                  @close="saveChange()"
                >
                  <el-input type="textarea" rows="5" v-model="scope.row.content" ></el-input>
<!--                   <span slot="footer" class="dialog-footer">
                    <el-button @click="scope.row.dialogContentVisible = false">取 消</el-button>
                    <el-button type="primary" @click="scope.row.dialogContentVisible = false">确 定</el-button>
                  </span> -->
                </el-dialog>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "todolist",
  data() {
    return {
      todo: {
        title: "",
        content: ""
      },
      list: [],
      activeNames: ["1"],
      configList: [
        [1, "新建", "开始", 2, "el-icon-s-opportunity"],
        [2, "进行中", "完成", 3, "el-icon-loading"],
        [3, "已完成", "重做", 1, "el-icon-finished"]
      ],
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },
  methods: {
    addItem() {
      if (this.todo.title.trim() == "") {
        this.$message.error("请输入标题");
        return false;
      }
      this.list.push({
        date: new Date().toLocaleDateString(),
        title: this.todo.title,
        content: this.todo.content,
        dialogContentVisible: false,
        state: 1,
        flag: new Date().getTime()
      });
      this.todo = {};
      localStorage.setItem("todolist", JSON.stringify(this.list));
    },
    removeItem(flag) {
      //用index的话，v-for返回的index不是list的index，而是filter的index，无法准确删除
      //this.list.splice(index, 1);
      console.log(flag);
      this.list = this.list.filter(item => item.flag !== flag);
      localStorage.setItem("todolist", JSON.stringify(this.list));
    },
    saveChange() {
      localStorage.setItem("todolist", JSON.stringify(this.list));
    }
  },
  computed: {
    filterArray() {
      return function(state) {
        return this.list.filter(item => item.state === state);
      };
    }
  },
  mounted() {
    this.list = JSON.parse(localStorage.getItem("todolist")) || [];
  }
};
</script>
<style lang="scss">
@import "../assets/sass/test.scss";
.todolist {
  .el-collapse-item {
    .el-collapse-item__header {
      i {
        font-size: 20px;
      }
    }
  }
}
</style>

