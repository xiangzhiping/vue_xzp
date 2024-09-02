<template>
  <div class="captcha_login_card">
    <el-form :model="loginForm" :rules="rules" ref="formRef">
      <el-form-item prop="account" class="item_form">
        <div class="login_ele">
          <div class="account_password_login_icon">
            <div>
              <el-icon :size="22" style="color: #979798">
                <User></User>
              </el-icon>
            </div>
          </div>
          <div class="account_input">
            <el-input v-model="loginForm.account" placeholder="请输入账号名（邮箱地址 \ 手机号码）"></el-input>
          </div>
        </div>
      </el-form-item>
      <el-form-item prop="password" class="item_form">
        <div class="login_ele">
          <div class="account_password_login_icon">
            <div>
              <el-icon :size="22" style="color: #979798">
                <Lock></Lock>
              </el-icon>
            </div>
          </div>
          <div class="password_input">
            <el-input v-model="loginForm.password" placeholder="请输入密码"></el-input>
          </div>
        </div>
      </el-form-item>
      <el-form-item prop="captcha" class="item_form_captcha">
        <div class="login_ele">
          <div class="image_captcha_div">
            <div class="account_password_login_icon">
              <div>
                <el-icon :size="22" style="color: #979798">
                  <ChatDotSquare></ChatDotSquare>
                </el-icon>
              </div>
            </div>
            <div class="image_captcha_input">
              <el-input v-model="loginForm.captcha" placeholder="请输入图像验证码"></el-input>
            </div>
          </div>
          <div class="image_captcha" @click="imageCaptchaGetHandel">
            <el-image :src="imageCaptchaUrl" fit="cover">
              <template #error>
                <el-icon size="20">
                  <Picture/>
                </el-icon>
              </template>
            </el-image>
          </div>
        </div>
      </el-form-item>
      <div class="login_ele">
        <el-button type="success" plain class="login_button" @click="userAccountPasswordLoginHandel">登 录</el-button>
      </div>
    </el-form>
  </div>
</template>
<script setup>
import {ref, reactive} from 'vue'
import {ChatDotSquare, Lock, Picture, User} from '@element-plus/icons-vue'
import router from "@/router.js";
import {imageCaptchaIdGet, imageCaptchaImageGet, userAccountPasswordLogin} from '@/apis/login';

const imageCaptchaUrl = ref('')
const imageCaptchaGetHandel = async () => {
  const captchaId = (await imageCaptchaIdGet()).data
  const image = await imageCaptchaImageGet(captchaId)
  imageCaptchaUrl.value = URL.createObjectURL(image);
  loginForm.captcha_id = captchaId;
}
imageCaptchaGetHandel()

const formRef = ref(null)
const loginForm = reactive({
  account: null,
  password: null,
  captcha_id: null,
  captcha: null
})


const userAccountPasswordLoginHandel = async () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      const res = await userAccountPasswordLogin(loginForm)
      if (res.code === 200) {
        await router.push('/dashboard')
        localStorage.setItem("Authorization", res.data)
      }
    } else {
      return valid
    }
  })
}

const rules = reactive({
  account: [
    {required: true, message: '请输入账号名', trigger: 'blur'},
    {validator: accountValidator, trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
  ],
  captcha: [
    {required: true, message: '请输入图片验证码', trigger: 'blur'},
  ],
})

function accountValidator(rule, value, callback) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^1[3-9]\d{9}$/;
  if (emailRegex.test(value) || phoneRegex.test(value)) {
    return callback();
  } else {
    return callback('请输入有效的手机号或邮箱');
  }
}
</script>
<style scoped>
.login_ele {
  width: 330px;
  height: 40px;
  display: flex;
  justify-content: space-between;
}

.captcha_login_card {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.image_captcha {
  width: 100px;
  height: 38px;
  background: #ffffff;
  border: 1px solid var(--el-border-color);
  display: flex;
  justify-content: center;
  justify-items: center;
  border-radius: 3px;
  cursor: pointer;
}

.account_password_login_icon {
  width: 40px;
  background: white;
  border-top: 1px solid var(--el-border-color);
  border-bottom: 1px solid var(--el-border-color);
  border-left: 1px solid var(--el-border-color);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px 0 0 4px;
}

.el-input {
  --el-input-border-radius: 0 4px 4px 0;
  --el-input-focus-border-color: #67C23A
}

.captcha_input {
  display: flex;
  width: 250px;
}

.password_input, .account_input {
  width: 290px;
  height: 40px;
}

.image_captcha_div {
  display: flex;
}

.password_input .el-input, .account_input .el-input {
  width: 100%;
  height: 40px;
}

.image_captcha_input .el-input {
  width: 180px;
  height: 40px;
}

.email_captcha_input .el-input {
  width: 180px;
  height: 40px;
}


.el-icon {
  margin-top: 10px;
  color: #c2c2c4;
}

::v-deep .el-image__inner {
  border-radius: 2px;
  cursor: pointer;
}


.login_captcha {
  width: 220px;
}

.login_button {
  width: 100%;
  height: 40px;
}

.el-button{
  font-size: 20px;
}

.item_form .el-input-group--prepend {
  height: 40px;
  width: 330px;
}

.item_form_captcha .el-input-group--prepend {
  height: 40px;
  width: 220px;
  display: flex;
}

::v-deep .el-form-item__error {
  width: 100%;
  display: flex;
  margin-left: 42px;
}
</style>
