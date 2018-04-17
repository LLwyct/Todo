<template>
<div class="stateSelect">
    <p v-if="leftItem_num > 0">还有{{ leftItem_num }}项哦~</p>
    <p v-else>全部完成啦</p>
    <el-radio-group v-model="radio" size="mini" @change="change">
        <el-radio-button label="1">全部</el-radio-button>
        <el-radio-button label="2">未完成</el-radio-button>
        <el-radio-button label="3">已完成</el-radio-button>
    </el-radio-group>
</div>
</template>

<script>
import busEvent from '../bus/bus.js';
import bus from '../bus/bus.js';


export default {
    data: function() {
        return {
            leftItem_num: null,
            radio: '1'
        }
    },
    methods: {
        change: function(label) {
            busEvent.$emit('selector-changed', label);
        }
    },
    watch: {
        leftItem_num: function(n, o) {
            if(this.leftItem_num != 0){
                busEvent.$emit('show');
            }
        }
    },
    mounted: function() {
        busEvent.$on('leftnum-changed', (e) => {
            this.leftItem_num = e;
        })
    }
}
</script>

<style scoped>
.stateSelect{
    display: flex;
    align-items: center;
    justify-content: space-around;
}
p{
    font-size: 13px;
    color: #909399;
}
</style>
