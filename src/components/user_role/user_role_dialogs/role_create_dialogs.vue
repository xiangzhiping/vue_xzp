<template>
  <el-dialog v-model="isRoleCreateDialogVisible" width="500px">
    <div class="create_dialogs">
      <el-form ref="formRef" :model="userRoleCreateForm" :rules="rules" label-width="120px">
        <div class="create_dialog">
          <el-form-item label="用户角色名称" prop="role_name">
            <el-input v-model="userRoleCreateForm.role_name" size="large" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </div>
        <div class="create_dialog">
          <el-form-item label="用户角色状态" prop="role_level">
            <el-select v-model="userRoleCreateForm.role_level" size="large" placeholder="请选择">
              <el-option
                  v-for="item in userRoleMenu.role_levels"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="接口标签权限">
          <div class="create_checkbox">
            <el-checkbox
                v-for="(item, index) in userRoleMenu.api_tabs"
                :key="index"
                :disabled="userRoleCreateForm.role_level === 1"
                v-model="item.enabled"
                :label="item.key"
                border
            >{{ item.key }}
            </el-checkbox>
          </div>
        </el-form-item>
      </el-form>
      <div class="create_button">
        <el-button
            type="success"
            size="large"
            plain
            @click="userRoleCreateHandel"
        >创 建
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import {reactive, ref} from 'vue';
import {ElMessage} from 'element-plus';
import eventBus from '@/utils/event_bus.js';
import {userRoleCreate} from '@/apis/user_role.js';

const isRoleCreateDialogVisible = ref(false);

const isRoleCreateDialogVisibleHandel = () => {
  const handler = (msg) => {
    isRoleCreateDialogVisible.value = msg;
  };
  eventBus.on('isRoleCreateDialogVisible', handler);
};

isRoleCreateDialogVisibleHandel();

const userRoleMenu = ref({role_levels: [], api_tabs: []});

const userRoleMenuEventBus = () => {
  const handler = (data) => {
    userRoleMenu.value = data;
  };
  eventBus.on('user_role_menu', handler);
};

userRoleMenuEventBus();

const formRef = ref(null);
const userRoleCreateForm = reactive({
  role_name: null,
  role_level: null,
  api_tabs: null
});
const rules = reactive({
  role_name: [{required: true, message: '请输入用户角色名称', trigger: 'blur'}],
  role_level: [{required: true, message: '请选择用户角色状态', trigger: 'change'}],
});


const userRoleCreateHandel = async () => {
  userRoleCreateForm.api_tabs = userRoleMenu.value.api_tabs.filter(item => item.enabled).map(item => item);
  formRef.value.validate(async (valid) => {
    if (valid) {
      console.log(userRoleCreateForm)
      const res = await userRoleCreate(userRoleCreateForm);
      if (res.code === 200) {
        isRoleCreateDialogVisible.value = false;
      }
    }
  });
};
</script>

<style scoped>
.create_dialogs {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.create_dialog {
  height: 40px;
  padding-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-input, .el-select {
  width: 300px;
}

:deep(.el-form-item__label) {
  font-size: 16px;
  line-height: 40px;
}

.create_checkbox {
  padding-top: 5px;
  width: 300px;
  border-radius: 4px;
  border: 1px solid var(--el-border-color);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.el-checkbox {
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
}

.create_button {
  width: 420px;
  margin-top: 15px;
  display: flex;
  justify-content: right;
}

.el-button {
  width: 304px;
}
</style>
