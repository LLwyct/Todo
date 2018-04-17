<template>
    <transition name="el-zoom-in-top">
        <div class="todoArea" v-show="isShow">
            <stateSelect></stateSelect>
            <todoList></todoList>
        </div>
    </transition>
</template>

<script>
import stateSelect from "./stateSelect.vue";
import todoList from "./todoList.vue";
import busEvent from "../bus/bus.js"


export default {
    components: {
        stateSelect,
        todoList,
    },
    data: function() {
        return {
            isShow: true,
        }
    },
    mounted: function() {
        busEvent.$on('show-select', () => {
            this.isShow = true;
        })
        busEvent.$on('unshow-select', () => {
            this.isShow = false;
        })
    }
}
</script>

<style>
.todoArea{
    display: flex;
    flex-direction: column;
    width: 100%;
    color: #fff;
}
</style>
