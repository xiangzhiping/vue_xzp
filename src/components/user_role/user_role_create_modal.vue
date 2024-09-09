<template>
  <a-modal v-model:open="isUserRoleCreateModalVisible" title="用户角色新增">
    <div class="create_modal">
      <a-form :model="userRoleCreateForm">
        <a-form-item label="角色名称" name="role_name" :rules="rules.role_name">
          <a-input v-model:value="userRoleCreateForm.role_name" placeholder="请输入角色名称" allow-clear style="border-radius: 3px"/>
        </a-form-item>
        <a-form-item label="角色级别" name="role_name" :rules="rules.role_level">
          <a-select
              :options="userRoleMenu.role_levels"
              v-model:value="userRoleCreateForm.role_level"
              placeholder="角色级别" allow-clear style="border-radius: 3px">
          </a-select>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script setup>
import {reactive, ref} from 'vue';
import {ElMessage} from 'element-plus';
import eventBus from '@/utils/event_bus.js';
import {userRoleCreate} from '@/apis/user_role.js';

const isUserRoleCreateModalVisible = ref(false);

const isUserRoleCreateModalVisibleHandel = () => {
  const handler = (msg) => {
    isUserRoleCreateModalVisible.value = msg;
  };
  eventBus.on('is_user_role_create_modal_visible', handler);
};

isUserRoleCreateModalVisibleHandel();

const userRoleMenu = ref({role_levels: [], api_tabs: []});

const userRoleMenuEventBus = () => {
  const handler = (data) => {
    userRoleMenu.value = data;
  };
  eventBus.on('user_role_menu', handler);
};

userRoleMenuEventBus();

const userRoleCreateForm = reactive({
  role_name: null,
  role_level: null,
  remember: true,
});
const rules = {
  role_name: {required: true, message: '请输入用户角色名称', trigger: 'blur'},
  role_level: {required: true, message: '请选择用户角色级别', trigger: 'blur'}
}
const userRoleCreateHandel = async () => {
  userRoleCreateForm.api_tabs = userRoleMenu.value.api_tabs.filter(item => item.enabled).map(item => item);
  formRef.value.validate(async (valid) => {
    if (valid) {
      console.log(userRoleCreateForm)
      const res = await userRoleCreate(userRoleCreateForm);
      if (res.code === 200) {
        isUserRoleCreateModalVisible.value = false;
      }
    }
  });
};
</script>

<style scoped>
.create_modal {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}



</style>
