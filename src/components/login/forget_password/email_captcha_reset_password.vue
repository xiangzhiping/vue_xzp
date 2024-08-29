<template>
  <div class="captcha_login_card">
    <el-form :model="passwordResetForm" :rules="rules" ref="formRef">
      <el-form-item prop="account" class="item_form">
        <div class="login_ele">
          <div class="email_captcha_login_icon">
            <EmailIcon></EmailIcon>
          </div>
          <div class="email_input">
            <el-input v-model="passwordResetForm.account" placeholder="请输入邮箱号"></el-input>
          </div>
        </div>
      </el-form-item>
      <el-form-item prop="account" class="item_form">
        <div class="login_ele">
          <div class="email_captcha_login_icon">
            <PasswordIcon></PasswordIcon>
          </div>
          <div class="email_input">
            <el-input v-model="passwordResetForm.password" placeholder="请输入新的密码"></el-input>
          </div>
        </div>
      </el-form-item>
      <el-form-item prop="captcha" class="item_form_captcha">
        <div class="login_ele">
          <div class="captcha_input">
            <div class="email_captcha_login_icon">
              <EmailCaptchaIcon></EmailCaptchaIcon>
            </div>
            <div class="email_captcha_input">
              <el-input v-model="passwordResetForm.captcha" placeholder="请输入邮箱验证码"></el-input>
            </div>
          </div>
          <el-button :icon="Promotion" type="info" class="captcha_button" :disabled="isCountingDown"
                     @click="emailCaptchaSendHandel">{{ buttonText }}
          </el-button>
        </div>
      </el-form-item>
      <div class="login_ele">
        <el-button type="primary" class="login_button" @click="userPasswordResetHandel">重 置 密 码</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import {ref, reactive, watch} from 'vue';
import {Promotion} from '@element-plus/icons-vue';
import {userPasswordReset, identityCaptchaSend} from '@/apis/login.js';
import {EmailIcon, EmailCaptchaIcon, PasswordIcon} from "@/components/icons/index.js";

const formRef = ref(null);
const passwordResetForm = reactive({
  account: null,
  new_password:null,
  captcha: null,
  type: 'email'
});

const captchaSendForm = reactive({
  account: passwordResetForm.account,
  scene: 'login',
  type: passwordResetForm.type
});

watch(
    () => passwordResetForm.account,
    (newValue) => {
      captchaSendForm.account = newValue;
    }
);

const emailCaptchaSendHandel = async () => {
  formRef.value.validateField('account', async (valid) => {
    if (valid) {
      await startCountdown();
      const res = await identityCaptchaSend(captchaSendForm);
      console.log(res);
      if (res.code !== 200 || res.data !== true) {
        await stopCountdown();
      }
    }
  });
}

let countdownInterval;

const startCountdown = async () => {
  isCountingDown.value = true;
  let remainingTime = 60;
  countdownInterval = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      buttonText.value = `${remainingTime} 秒后重发`;
    } else {
      clearInterval(countdownInterval);
      isCountingDown.value = false;
      buttonText.value = '发送验证码';
    }
  }, 1000);
};

const stopCountdown = async () => {
  isCountingDown.value = false;
  buttonText.value = '发送验证码';
  clearInterval(countdownInterval);
};

const isCountingDown = ref(false);
const buttonText = ref('发送验证码');

const userPasswordResetHandel = async () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      const res = await userPasswordReset(passwordResetForm)
      console.log(res)
      if (res.code !== 200) {
        await stopCountdown();
      }
    } else {
      console.log(valid);
      return valid
    }
  })
}

const rules = reactive({
  account: [
    {required: true, message: '请输入邮箱号', trigger: 'blur'},
    {validator: emailValidator, trigger: 'blur'},
  ],
  new_password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
  ],
  captcha: [
    {required: true, message: '请输入邮箱验证码', trigger: 'blur'},
  ],
});

function emailValidator(rule, value, callback) {
  if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
    return callback();
  } else {
    return callback('请输入有效的邮箱号');
  }
}
</script>

<style scoped>
.login_ele {
  width: 330px;
  height: 40px;
  display: flex;
  justify-content: left;
}

.captcha_login_card {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.captcha_button {
  width: 150px; /* 固定宽度 */
  height: 40px; /* 固定高度 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0; /* 清除内边距 */
  margin: 0; /* 清除外边距 */
}

.login_button {
  width: 100%;
  height: 40px;
}

.email_captcha_login_icon {
  color: white;
  width: 40px;
  border-top: 1px solid var(--el-border-color);
  border-bottom: 1px solid var(--el-border-color);
  border-left: 1px solid var(--el-border-color);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px 0 0 4px;
  background: #f1f1f1;
}

.el-input {
  --el-input-border-radius: 0 4px 4px 0;
}

.captcha_input {
  display: flex;
  width: 240px;
}

.email_input {
  width: 290px;
  height: 40px;
}

.email_input .el-input {
  width: 100%;
  height: 40px;
}

.email_captcha_input .el-input {
  width: 150px;
  height: 40px;
}

::v-deep .el-form-item__error {
  width: 100%;
  display: flex;
  margin-left: 43px;
}
</style>
