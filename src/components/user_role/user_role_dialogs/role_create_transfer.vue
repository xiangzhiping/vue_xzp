<template>
  <el-transfer v-model="rightValue" filterable :titles="['Source', 'Target']"
      :data="data"
      @change="handleChange"
  >
    <template #default="{ option }">
      <span>{{ option.key }} - {{ option.label }}</span>
    </template>
  </el-transfer>
</template>

<script setup>
import {reactive, ref} from 'vue';


const state = reactive({
  data: generateData(),
  rightValue: [1],
  leftValue: [1],
});

// 生成数据
function generateData() {
  const data = [];
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `Option ${i}`,
    });
  }
  return data;
}

// 渲染函数
const renderContent = (h, option) => {
  return h('span', null, option.label);
};

// 处理改变
const handleChange = (value, direction, movedKeys) => {
  console.log(value, direction, movedKeys);
};

const data = ref([
  {
    key: 'sds',
    value: 1,
  },
])
const rightValue = ref([1])
const leftValue = ref([1])
</script>

<style scoped>

</style>
