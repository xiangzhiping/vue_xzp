<template>
  <div class="captcha_login_card">
    <a-form>
      <a-form-item>
        <a-input></a-input>
      </a-form-item>
      <div style="display: flex">
        <div class="saddsa"></div>
        <a-select style="height: 40px;width: 300px">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="disabled" disabled>Disabled</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
      </div>
    </a-form>

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
.saddsa{
  width: 40px;
  height: 40px;
  border-bottom: 1px solid #d9d9d9;
  border-left: 1px solid #d9d9d9;
  border-top: 1px solid #d9d9d9;

}
:deep(.ant-select-single .ant-select-selector){
  border-radius: 0;
  height: 40px;
}
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

.ant-input {
  width: 300px;
  height: 40px;
  border-radius: 4px;
}

:where(.ant-select){
  width: 100%;
  height: 40px;
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
