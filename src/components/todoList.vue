<template>
<div class="todoList">
    <transition name="el-fade-in-linear">
    <el-card class="box-card">
        <div v-for="(todo, index) in todos" :key="todo" id="fuck">
            <todoItem :text="todo.content" :index="index" :state="todo.isFinished" v-show="(show_label==1)||(show_label==2&&todo.isFinished==false)||(show_label==3&&todo.isFinished==true)"></todoItem>
        </div>
    </el-card>
    </transition>
</div>
</template>

<script>
import todoItem from "./todoItem.vue";
import busEvent from "../bus/bus.js";

export default {
  components: {
    todoItem
  },
  data: function() {
    return {
      todos: [],
      item_num: 0,
      left_num: 0,
      show_label: 1
    };
  },
  created: function() {
    let localstorage = JSON.parse(localStorage.getItem("TODOS"));
    if (localstorage == null) {
      this.todos = [];
      busEvent.$emit("unshow-select");
    } else {
      this.todos = localstorage;
      busEvent.$emit("show-select");
    }
    let _this = this;
    this.todos.forEach(e => {
      if (e.isFinished == false) {
        _this.left_num++;
      }
      _this.item_num++;
    });
    busEvent.$emit("leftnum-changed", this.left_num);
  },
  watch: {
    // 如果 `left_num` 发生改变，这个函数就会运行
    left_num: function(n, o) {
      busEvent.$emit("leftnum-changed", this.left_num);
    },
    todos: {
      handler: function(n, o) {
        if (this.todos.length != 0) {
          busEvent.$emit("show-select");
        } else {
          busEvent.$emit("unshow-select");
        }
        localStorage.setItem("TODOS", JSON.stringify(this.todos));
      },
      deep: true
    }
  },
  mounted: function() {
    // 添加新的项目
    busEvent.$on("add-newTodo", e => {
      this.todos.push({
        content: e,
        isFinished: false
      });
      this.item_num++;
      this.left_num++;
    });
    // 删除一个项目
    busEvent.$on("delete-todo", e => {
      this.todos.splice(e.index, 1);
      this.item_num--;
      // 如果删除的是一个未完成的项目
      if (!e.isFinished) {
        this.left_num--;
      }
    });
    // 完成一个项目
    busEvent.$on("finish-one", (e) => {
      this.left_num--;
      this.todos[e].isFinished = true;
    });
    // 恢复一个项目
    busEvent.$on("revive-one", (e) => {
      this.left_num++;
      this.todos[e].isFinished = false;
    });
    busEvent.$on("selector-changed", (label) => {
      this.show_label = label;
    });
  }
};
</script>