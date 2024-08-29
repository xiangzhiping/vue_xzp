<template>
  <div class="user_container">
    <div class="user_container_tabs">
      <div
          v-for="(tab, index) in tabs"
          :key="index"
          class="user_container_tabs"
          @click="changeTab(index)"
      >{{ tab }}</div>
    </div>
    <div class="user_container_pane">
      <transition :name="transitionName" >
        <keep-alive>
          <component :is="currentComponent"></component>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import A from "@/components/settings/a.vue";
import B from "@/components/settings/b.vue";
import C from "@/components/settings/c.vue";

const currentComponent = ref(A);
const tabs = ['aaaa', 'bbbb', 'cccc'];
const currentIndex = ref(0);

// 计算属性用于决定过渡动画的方向
const transitionName = computed(() => {
  return currentIndex.value < previousIndex.value ? 'slide-fade-right' : 'slide-fade-left';
});

const previousIndex = ref(currentIndex.value);

function changeTab(index) {
  previousIndex.value = currentIndex.value;
  currentIndex.value = index;
  switch (index) {
    case 0:
      currentComponent.value = A;
      break
    case 1:
      currentComponent.value = B;
      break
    case 2:
      currentComponent.value = C;
  }
}
</script>

<style scoped>
.user_container{
  width: 100%;
  display: flex;
  flex-direction: column;
}
.user_container_tabs{
  width: 100%;
  height: 50px;
  border: 1px solid #5900f8;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.user_container_tabs{
  width: 100px;
  height: 50px;
  background: #c2c2c4;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user_container_pane{
  width: 100%;
  height: 100%;
  border: 1px solid #2ed91b;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden; /* 新增 */
}
.slide-fade-left-enter-active,
.slide-fade-left-leave-active,
.slide-fade-right-enter-active,
.slide-fade-right-leave-active {
  transition: all 0.7s ease;
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
