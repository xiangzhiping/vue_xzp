<template>
  <div class="route_container" v-for="(route, index) in routes">
    <RouterLink :to="route.path" @click="toggleSelected(index)">
      <a-popover placement="right">
        <template #content>{{ route.name }}</template>
        <a-button class="router_button">
          <component :is="route.icon" class="router_icon"/>
        </a-button>
      </a-popover>
    </RouterLink>
  </div>
</template>

<script setup>
import {ref, watch} from 'vue';
import {useRoute} from 'vue-router';
import {DashboardOutlined, UserOutlined, CrownOutlined, SettingOutlined, SearchOutlined} from '@ant-design/icons-vue';

const selectedIndex = ref(-1);
const route = useRoute();

const toggleSelected = (index) => {
  selectedIndex.value = selectedIndex.value === index ? -1 : index;
};

const routes = [
  {name: '仪表盘', path: '/dashboard', icon: DashboardOutlined},
  {name: '用户管理', path: '/user', icon: UserOutlined},
  {name: '用户角色管理', path: '/user/role', icon: CrownOutlined},
  {name: '系统管理', path: '/setting', icon: SettingOutlined},
];
const updateSelectedIndex = () => {
  const path = route.path;
  const foundIndex = routes.findIndex(route => route.path === path);
  if (foundIndex !== -1) {
    selectedIndex.value = foundIndex;
  }
};

updateSelectedIndex();
watch(() => route.path, (newPath) => {
  updateSelectedIndex()
});
</script>

<style scoped>
.route_container {
  width: 50px;
  height: 45px;
  display: flex;
  justify-content: center;
}

.router_button {
  width: 40px;
  height: 40px;
  margin-top: 5px;
  border-radius: 3px;
  color: #8d8d8d;
  display: flex;
  align-items: center;
  justify-content: center;
}

.router_icon {
  font-size: 18px;
}
</style>
