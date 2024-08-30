<template>
  <el-dialog v-model="isRoleCreateDialogVisible" width="400px">
    <div class="create_dialogs">
      <div class="create_dialog">
        <div class="create_dialog_icon">
          <div style="width: 30px; height: 30px;background: #13ce66">
<!--            <el-icon :size="20">-->
<!--              <User></User>-->
<!--            </el-icon>-->
          </div>
        </div>
        <div class="account_input">
          <el-input v-model="userRoleCreateForm.role_name"  placeholder="用户角色名称"></el-input>
        </div>
      </div>
      <div class="create_dialog">
        <div class="create_dialog_icon">
          <div>
            <el-icon :size="22" style="color: #979798">
              <Lock></Lock>
            </el-icon>
          </div>
        </div>
        <div class="password_input">
          <el-input v-model="userRoleCreateForm.password" placeholder="请输入密码"></el-input>
        </div>
      </div>
      <div class="create_dialog">
        <el-button type="success" plain class="login_button" @click="userAccountPasswordLoginHandel">登 录</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import {reactive, ref} from 'vue';
import eventBus from "@/utils/event_bus.js";
import {ChatDotSquare, Lock, Picture, User} from "@element-plus/icons-vue";
import {userAccountPasswordLogin} from "@/apis/login.js";
import router from "@/router.js";

const isRoleCreateDialogVisible = ref(false);
const isRoleCreateDialogVisibleHandel = () => {
  const handler = (msg) => {
    isRoleCreateDialogVisible.value = msg
  };
  eventBus.on('isRoleCreateDialogVisible', handler);
};

isRoleCreateDialogVisibleHandel();

const userRoleCreateForm = reactive({
  role_name: null,
  role_level: null,
  paths: null,
})


const userAccountPasswordLoginHandel = async () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      const res = await userAccountPasswordLogin(userRoleCreateForm)
      console.log(res)
      if (res.code === 200) {
        await router.push('/dashboard')
        localStorage.setItem("Authorization", res.data)
      }
    } else {
      console.log(valid);
      return valid
    }
  })
}
</script>

<style scoped>
.create_dialogs {
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column; /* 垂直排列子元素 */
  align-items: center;
  justify-content: space-between; /* 水平方向均匀分布 */
  flex-wrap: wrap;
}

.create_dialog {
  width: 330px;
  height: 32px;
  display: flex;
  justify-content: center;
}

.captcha_login_card {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.create_dialog_icon {
  width: 40px;
  background: #c54242;
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

.el-button {
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
