<template>
<transition name="el-fade-in-linear">
<div class="todoItem">
    <el-switch active-color="#67C23A" inactive-color="#E6A23C" v-model="isFinished" @change="muggle"></el-switch>
    <div class="end">
        <p :class="{ finished: isFinished }">{{ this.text }}</p>
        <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="deleteIt"></el-button>
    </div>
</div>
</transition>
</template>

<script>
import busEvent from '../bus/bus.js'
import index from 'vue';


export default {
    props: ['text', 'index', 'state'],
    data: function() {
        return {
            isFinished: this.state,
        }
    },
    methods: {
        deleteIt: function() {
            busEvent.$emit('delete-todo', {
                index: this.index,
                isFinished: this.isFinished,
            });
        },
        muggle: function() {
            if(this.isFinished) {
                busEvent.$emit('finish-one', this.index);
            }
            else{
                busEvent.$emit('revive-one', this.index);
            }
        }
    }
}
</script>


<style lang="less" scoped>
p{
    font-size: 16px;
    color: #303133;
}
.finished{
    color: #909399;
}
.todoItem{
    display: flex;
    align-items: center;
    padding: 0 5px 0 5px;
}
.end{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-left: 5px;
}
</style>
