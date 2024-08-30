<template>
  <RouterLink v-for="(route, index) in routes" :to="route.path" @click="toggleSelected(index)">
    <el-tooltip class="box-item" effect="light" :content="route.name" placement="right">
      <div :class="['icon_container', {'selected': selectedIndex === index}]">
        <el-icon :size="22">
          <component :is="route.icon" class="route_icon"/>
        </el-icon>
      </div>
    </el-tooltip>
  </RouterLink>
</template>

<script setup>
import {ref} from 'vue';
import {Odometer, User, Lock, Key, Setting} from '@element-plus/icons-vue';

const selectedIndex = ref(-1);

const toggleSelected = (index) => {
  selectedIndex.value = selectedIndex.value === index ? -1 : index;
};


const routes = [
  {name: '仪表盘', path: '/dashboard', icon: Odometer},
  {name: '用户管理', path: '/user', icon: User},
  {name: '系统管理', path: '/setting', icon: Setting},
];


</script>

<style scoped>
.icon_container {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  z-index: 111;
}


.selected {
  background-color: #c5ddfa;
}


.selected .route_icon {
  color: #409EFF;
}


.submenu_icon:active .route_icon {
  color: #409EFF;
}

.route_icon {
  color: #2f3846;
}
</style>
