<template>
  <div class="user_container">
    <div class="user_container_tabs">
      <div
          v-for="(tab, index) in tabs"
          :key="index"
          class="user_container_tab"
          :class="{ active: index === currentIndex }"
          @click="changeTab(index)"
      >{{ tab }}
      </div>
    </div>
    <div class="user_container_pane">
      <transition :name="transitionName">
        <keep-alive>
          <component :is="currentComponent"></component>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script setup>
import {ref, computed} from "vue";
import User from "@/components/user/user.vue";
import UserPermission from "@/components/user_permission/user_permission.vue";
import UserRole from "@/components/user_role/user_role.vue";

const currentComponent = ref(User);
const tabs = ['用户管理', '用户权限管理', '用户角色管理'];
const currentIndex = ref(0);
const previousIndex = ref(currentIndex.value);
const transitionName = computed(() => {
  return currentIndex.value < previousIndex.value ? 'slide-fade-right' : 'slide-fade-left';
});


const changeTab = async (index) => {
  previousIndex.value = currentIndex.value;
  currentIndex.value = index;
  switch (index) {
    case 0:
      currentComponent.value = User;
      break
    case 1:
      currentComponent.value = UserPermission;
      break
    case 2:
      currentComponent.value = UserRole;
  }
}
</script>

<style scoped>
.user_container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.user_container_tabs {
  width: 100%;
  height: 30px;
  border-bottom: 1px solid var(--el-border-color);
  display: flex;
  justify-content: center;
  align-items: center;
}

.user_container_tab {
  width: 120px;
  height: 30px;
  padding-right: 20px;
  padding-left: 20px;
  cursor: pointer;
  display: flex;
  color: #909399;
  justify-content: center;
  align-items: center;
}

.user_container_tab.active {
  background: #cadef3;
  color: #409EFF;
}

.user_container_pane {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.slide-fade-left-enter-active,
.slide-fade-left-leave-active,
.slide-fade-right-enter-active,
.slide-fade-right-leave-active {
  transition: all 0.5s ease;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.slide-fade-left-enter-from {
  transform: translateX(-100%);
}

.slide-fade-left-enter-to {
  transform: translateX(0);
}

.slide-fade-left-leave-from {
  transform: translateX(0);
}

.slide-fade-left-leave-to {
  transform: translateX(100%);
}

.slide-fade-right-enter-from {
  transform: translateX(100%);
}

.slide-fade-right-enter-to {
  transform: translateX(0);
}

.slide-fade-right-leave-from {
  transform: translateX(0);
}

.slide-fade-right-leave-to {
  transform: translateX(-100%);
}

</style>
