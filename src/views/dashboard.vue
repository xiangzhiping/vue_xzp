<template>
  <div class="el-card" :style="{boxShadow: `var(--el-box-shadow-lighter)` }">
    <div class="card_head">XIANGZHIPING</div>
    <div class="card_body">
      <transition :name="animationDirection">
        <keep-alive>
          <component :is="currentComponent" class="card_tab" :key="currentTab"></component>
        </keep-alive>
      </transition>
    </div>
    <div class="card_tail">
      <el-tooltip content="账号密码登录" placement="bottom" effect="light">
        <div @click="switchTab('accountPasswordLoginTab')" :class="{ active: currentTab === 'accountPasswordLoginTab'}">
          <AccountPasswordLoginIcon/>
        </div>
      </el-tooltip>
      <el-tooltip content="验证码登录" placement="bottom" effect="light">
        <div @click="switchTab('captchaLoginTab')" :class="{ active: currentTab === 'captchaLoginTab'}">
          <CaptchaLoginIcon/>
        </div>
      </el-tooltip>
      <el-tooltip content="忘记密码" placement="bottom" effect="light">
        <div @click="switchTab('forgetPasswordTab')" :class="{ active: currentTab === 'forgetPasswordTab'}">
          <ForgetPasswordIcon/>
        </div>
      </el-tooltip>
      <el-tooltip content="注册账号" placement="bottom" effect="light">
        <div @click="switchTab('registerAccountTab')" :class="{ active: currentTab === 'registerAccountTab'}">
          <RegisterAccountIcon/>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {
  AccountPasswordLoginIcon,
  CaptchaLoginIcon,
  ForgetPasswordIcon,
  RegisterAccountIcon
} from "@/components/icons/index.js";
import AccountPasswordLogin from '@/components/login/account_password_login.vue';
import CaptchaLogin from '@/components/login/captcha_login.vue';
import ForgetPassword from "@/components/login/forget_password.vue";
import Register from "@/components/login/register_account.vue";

const currentTab = ref('accountPasswordLoginTab');
const currentComponent = ref(AccountPasswordLogin);
const animationDirection = ref('slide-fade-right');
const isAccountPasswordActive = ref(true);
const isAccountPasswordActiveTitle = ref('账号密码登录');
const isInactive = ref(false);
const isActiveIcon = ref(false); // 新增变量用于跟踪激活状态

const tabs = ref([
  {name: 'accountPasswordLoginTab', component: AccountPasswordLogin},
  {name: 'captchaLoginTab', component: CaptchaLogin},
  {name: 'forgetPasswordTab', component: ForgetPassword},
  {name: 'registerAccountTab', component: Register},
]);


const switchTab = (newTabName) => {
  const tab = tabs.value.find(tab => tab.name === newTabName);
  if (!tab) return;
  animationDirection.value = animationDirectionGet(currentTab.value, newTabName);
  currentTab.value = newTabName;
  currentComponent.value = tab.component;
  isInactive.value = true;
  isActiveIcon.value = true; // 当点击时设为激活状态
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
.el-card {
  width: 500px;
  height: 400px;
  background: #ffffff;
  color: #909399;
  font-family: 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  display: flex;
  flex-direction: column;
}

.card_head {
  width: 100%;
  height: 50px;
  font-weight: bold;
  font-size: 30px;
  color: #495b70;
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  background: #fff1f1 linear-gradient(to right, #f50a0a, #f56c0a, #fae609, #34fd2d, #0cf6db, #8907ff, #214bfd);
}

.card_body {
  width: 100%;
  flex-grow: 1;
  position: relative; /* Make it relative for the transition group */
}

.card_tab {
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

.card_tail {
  width: 100%;
  height: 50px;
  font-size: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.card_tail div {
  width: 40px;
  height: 40px;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #909399;
  border-radius: 50%;
}

.card_tail div.active {
  background: #ebedf0;
  border-radius: 50%;
}
</style>
