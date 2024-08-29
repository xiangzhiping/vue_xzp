<template>
  <div class="login_container">
    <div class="login_container_header"><div class="linear_gradient">XIANGZHIPING</div></div>
    <div class="login_container_pane">
      <transition :name="transitionName">
        <keep-alive>
          <component :is="currentComponent"></component>
        </keep-alive>
      </transition>
    </div>
    <div class="login_container_footer">
      <div
          v-for="(tab, index) in tabs"
          class="login_container_tab"
          :class="{ active: index === currentIndex }"
      >
        <el-tooltip :content="tab.name"  effect="light">
          <div class="login_container_icon" @click="changeTab(index)">
            <el-icon :size="22">
              <component :is="tab.icon" class="route_icon"/>
            </el-icon>
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed} from "vue";
import {User, Unlock, UserFilled, ChatLineSquare} from '@element-plus/icons-vue'
import AccountPasswordLogin from '@/components/login/account_password_login.vue';
import CaptchaLogin from '@/components/login/captcha_login.vue';
import ForgetPassword from "@/components/login/forget_password.vue";
import Register from "@/components/login/register_account.vue";

const currentComponent = ref(AccountPasswordLogin);
const tabs = [
  {name: '账号密码登录', icon: User},
  {name: '验证码登录', icon: ChatLineSquare},
  {name: '忘记密码', icon: Unlock},
  {name: '注册账号', icon: UserFilled}
];
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
      currentComponent.value = AccountPasswordLogin;
      break
    case 1:
      currentComponent.value = CaptchaLogin;
      break
    case 2:
      currentComponent.value = ForgetPassword;
      break
    case 3:
      currentComponent.value = Register;
  }
}
</script>

<style scoped>
.login_container {
  width: 450px;
  height: 400px;
  border-radius: 7px;
  box-shadow: var(--el-box-shadow-dark);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  backdrop-filter: blur(3px);
}

.login_container_header {
  width: 100%;
  height: 50px;
  font-size: 25px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to left, #67C23A, #409EFF, #F56C6C);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 211px 100%;
}

.login_container_footer {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login_container_icon {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login_container_tab {
  width: 125px;
  height: 50px;
  cursor: pointer;
  display: flex;
  color: #bbbbbb;
  justify-content: center;
  align-items: center;
}

.login_container_tab.active {
  color: #67C23A;
}

.login_container_pane {
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
