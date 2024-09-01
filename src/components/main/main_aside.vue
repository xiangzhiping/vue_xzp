<template>
  <RouterLink v-for="(route, index) in routes" :to="route.path" @click="toggleSelected(index)">
    <el-tooltip class="box-item" effect="light" :content="route.name" placement="right">
      <div :class="['icon_container', { selected: selectedIndex === index }]">
        <el-icon :size="22">
          <component :is="route.icon"/>
        </el-icon>
      </div>
    </el-tooltip>
  </RouterLink>
</template>

<script setup>
import {ref, onMounted, watch} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import {RouterLink} from 'vue-router';
import {ElIcon, ElTooltip} from 'element-plus';
import {Odometer, User, Lock, Key, Setting} from '@element-plus/icons-vue';

const selectedIndex = ref(-1);
const router = useRouter();
const route = useRoute();

const toggleSelected = (index) => {
  selectedIndex.value = selectedIndex.value === index ? -1 : index;
};

const routes = [
  {name: '仪表盘', path: '/dashboard', icon: Odometer},
  {name: '用户管理', path: '/user', icon: User},
  {name: '系统管理', path: '/setting', icon: Setting},
];

const updateSelectedIndex = () => {
  const path = route.path;
  const foundIndex = routes.findIndex(route => route.path === path);
  if (foundIndex !== -1) {
    selectedIndex.value = foundIndex;
  }
};

// 初始化当前选中的路由
onMounted(() => {
  updateSelectedIndex();

  // 监听路由变化
  watch(() => route.path, (newPath) => {
    updateSelectedIndex();
  });
});
</script>

<style scoped>
.icon_container {
  width: 40px;
  height: 40px;
  margin-top: 5px;
  border-radius: 4px;
  color: #a8a7a7;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--el-border-color);
}

.icon_container:hover {
  background: #ededee;
}

.selected:hover {
  background-color: #e2f0ff;
  color: #409EFF;
}

.selected {
  background-color: #e2f0ff;
  color: #409EFF;
}
</style>
