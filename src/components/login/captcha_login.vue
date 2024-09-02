<template>
  <div class="captcha_login_container">
    <div class="captcha_login_container_pane">
      <transition :name="transitionName">
        <keep-alive>
          <component :is="currentComponent"></component>
        </keep-alive>
      </transition>
    </div>
    <div class="captcha_login_container_footer">
      <div v-for="(tab, index) in tabs" class="captcha_login_container_tab" :class="{ active: index === currentIndex }">
        <el-tooltip :content="tab.name" effect="light">
          <div class="captcha_login_container_icon" @click="changeTab(index)">
            <el-icon :size="22">
              <component :is="tab.icon"/>
            </el-icon>
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed} from "vue";
import {Phone, Message} from '@element-plus/icons-vue'
import EmailCaptchaLogin from '@/components/login/captcha_login/email_captcha_login.vue';
import PhoneCaptchaLogin from '@/components/login/captcha_login/phone_captcha_login.vue';

const currentComponent = ref(EmailCaptchaLogin);
const tabs = [
  {name: '邮箱验证码登录', icon: Message},
  {name: '短信验证码登录', icon: Phone},
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
      currentComponent.value = EmailCaptchaLogin;
      break
    case 1:
      currentComponent.value = PhoneCaptchaLogin;
  }
}
</script>

<style scoped>
.captcha_login_container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.captcha_login_container_pane {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  position: relative;
}


.captcha_login_container_footer {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.captcha_login_container_icon {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.captcha_login_container_tab {
  width: 125px;
  height: 50px;
  cursor: pointer;
  display: flex;
  color: #bbbbbb;
  justify-content: center;
  align-items: center;
}

.captcha_login_container_tab.active {
  color: #67C23A;
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
