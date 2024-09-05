<template>
  <a-config-provider :locale="zhCN">
    <div class="main_container">
      <div class="header_box">
        <headerCpt/>
      </div>
      <div class="container_box">
        <div class="aside_box">
          <asideCpt></asideCpt>
        </div>
        <div class="main_box">
          <transition name="el-zoom-in-top">
            <router-view v-slot="{ Component }">
              <keep-alive>
                <component :is="Component"/>
              </keep-alive>
            </router-view>
          </transition>
        </div>
      </div>
    </div>
  </a-config-provider>
</template>

<script setup>
import asideCpt from "@/components/main/main_aside.vue";
import headerCpt from "@/components/main/main_header.vue";
import zhCN from 'ant-design-vue/es/locale/zh_CN';
</script>

<style scoped>
.main_container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
}

.header_box {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid var(--el-border-color);
  box-shadow: var(--el-box-shadow-lighter);
  display: flex;
  justify-content: right;
  z-index: 111;
}

.container_box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
}

.aside_box {
  width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-right: 1px solid var(--el-border-color);
  box-shadow: var(--el-box-shadow-lighter);

}

.main_box {
  height: calc(100% - 6px);
  width: calc(100% - 57px);
  border-radius: 4px;
  margin-top: 5px;
  display: flex;
  justify-content: center;
  border-left: 1px solid var(--el-border-color);
  border-top: 1px solid var(--el-border-color);
  box-shadow: var(--el-box-shadow-lighter);
}
</style>
