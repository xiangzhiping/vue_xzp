<template>
  <div class="captcha_login_card">
    <div class="captcha_login_body">
      <transition :name="animationDirection">
        <keep-alive>
          <component :is="currentComponent" class="email_captcha_tab" :key="currentTab"/>
        </keep-alive>
      </transition>
    </div>
    <div class="captcha_login_tail">
      <el-tooltip content="邮箱验证码重置密码" placement="bottom" effect="light">
        <div @click="switchTab('emailTab')" :class="{ active: currentTab === 'emailTab'}">
          <EmailLoginIcon :iconColor="currentTab === 'emailTab' ? '#495b70' : '#007bff'"/>
        </div>
      </el-tooltip>
      <el-tooltip content="手机验证码重置密码" placement="bottom" effect="light">
        <div @click="switchTab('phoneTab')" :class="{ active: currentTab === 'phoneTab'}">
          <PhoneLoginIcon :iconColor="currentTab === 'phoneTab' ? '#495b70' : '#007bff'"/>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import EmailCaptchaResetPassword from './forget_password/email_captcha_reset_password.vue';
import PhoneCaptchaResetPassword from './forget_password/phone_captcha_reset_password.vue';
import {EmailLoginIcon, PhoneLoginIcon} from "@/components/icons/index.js";

const currentTab = ref('emailTab');
const currentComponent = ref(EmailCaptchaResetPassword);
const animationDirection = ref('slide-fade-right');

const tabs = ref([
  {name: 'emailTab', component: EmailCaptchaResetPassword},
  {name: 'phoneTab', component: PhoneCaptchaResetPassword},
]);

const switchTab = (newTabName) => {
  const tab = tabs.value.find(tab => tab.name === newTabName);
  if (!tab) return;
  animationDirection.value = animationDirectionGet(currentTab.value, newTabName);
  currentTab.value = newTabName;
  currentComponent.value = tab.component;
};

const animationDirectionGet = (currentTabName, newTabName) => {
  const newIndex = tabs.value.findIndex(tab => tab.name === newTabName);
  if (tabs.value.findIndex(tab => tab.name === currentTabName) > newIndex) {
    return 'slide-fade-left';
  } else {
    return 'slide-fade-right';
  }
};
</script>

<style scoped>
.captcha_login_card {
  width: 100%;
  height: 100%;
  color: #909399;
  font-family: 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  display: flex;
  flex-direction: column;
}

.captcha_login_body {
  width: 100%;
  flex-grow: 1;
  position: relative;
}

.captcha_login_tail {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
}

.email_captcha_tab {
  width: 100%;
  height: 100%;
  position: absolute;
}

.slide-fade-right-enter-active,
.slide-fade-right-leave-active,
.slide-fade-left-enter-active,
.slide-fade-left-leave-active {
  transition: all 0.7s ease;
}

.slide-fade-right-enter-from {
  transform: translate3d(100%, 0, 0);
}

.slide-fade-right-leave-to {
  transform: translate3d(-100%, 0, 0);
}

.slide-fade-left-enter-from {
  transform: translate3d(-100%, 0, 0);
}

.slide-fade-left-leave-to {
  transform: translate3d(100%, 0, 0);
}

.captcha_login_tail div {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.captcha_login_tail div.active {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ebedf0;
  border-radius: 50%;
}

/* 添加图标容器的样式 */
.tab_icon {
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ebedf0;
  border-radius: 50%;
}
</style>
