<template>
    <div id="app">
        <h1 class="todoTitle">todos</h1>
        <el-input size="large" v-model.trim="newTodo" auto-complete="off" placeholder="今天想做些什么" @keyup.enter.native="addNewTodo"></el-input>
        <todoArea></todoArea>
    </div>
</template>

<script>
import todoArea from './components/todoArea.vue';
import busEvent from './bus/bus.js'

export default {
    components: {
        todoArea,
    },
    data: function() {
        return {
            newTodo: '',
        }
    },
    methods: {
        addNewTodo: function() {
            if(this.newTodo.length != 0) {
                busEvent.$emit('add-newTodo', this.newTodo);
                this.newTodo = '';
            }
        }
    }
}
</script>


<style lang="less">
    html, body {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    body{
        display: flex;
        justify-content: space-around;
        background-color: #f5f5f5;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
    #app{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50%;
        @media (max-width: 700px) {
            width: 90%;
        }
    }
    .todoTitle{
        font-size: 100px;
        color: #bda5a5;
    }
    h1{
        margin-bottom: 35px;
    }
    // input{
    //     width: 300px;
    // }
</style>
