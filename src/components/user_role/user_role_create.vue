<template>
  <div v-if="visible" class="modal">
    <div class="modal_content">
      <div class="modal_body">
        <a-form :model="userRoleCreateForm" ref="formRef" :rules="rules">
          <a-form-item label="角色名称" name="role_name" :rules="rules.role_name">
            <a-input v-model:value="userRoleCreateForm.role_name" placeholder="请输入角色名称" allow-clear/>
          </a-form-item>
          <a-form-item label="角色级别" name="role_level" :rules="rules.role_level">
            <a-select
                :options="props.userRoleMenu.role_levels"
                v-model:value="userRoleCreateForm.role_level"
                placeholder="请输入角色级别" allow-clear>
            </a-select>
          </a-form-item>
          <a-form-item label="管理分组" name="manager_group" class="form_item3">
            <div class="manager_group">
              <a-checkbox v-for="(item) in props.userRoleMenu.api_tabs" v-model:checked="item.enabled">
                {{ item.key }}
              </a-checkbox>
            </div>
          </a-form-item>
        </a-form>
      </div>
      <div class="modal_footer">
        <a-button block @click="$emit('close')">取 消</a-button>
        <a-button block :loading="userRoleCreateLoading" @click="userRoleCreateHandel">确 定</a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, reactive, ref} from 'vue';
import {userRoleCreate} from "@/apis/user_role.js";

const props = defineProps({
  visible: {type: Boolean, default: false},
  userRoleMenu: {type: Object, default: {role_levels: [], api_tabs: []}}
});

const userRoleCreateForm = reactive({
  role_name: null,
  role_level: null,
  manager_group: null,
});
const formRef = ref();
const rules = {
  role_name: [{required: true, message: '请输入用户角色名称', trigger: 'blur'}],
  role_level: [{required: true, message: '请选择用户角色级别', trigger: 'change'}]
}
const userRoleCreateLoading = ref(false)

const userRoleCreateHandel = async () => {
  userRoleCreateLoading.value = true
  userRoleCreateForm.api_tabs = props.userRoleMenu.api_tabs.filter(item => item.enabled).map(item => item);
  formRef.value.validate().then(async () => {
    const res = await userRoleCreate(userRoleCreateForm);
    if (res.code === 200) {
      userRoleCreateLoading.value = false
      $emit('close')
    } else {
      console.log(res)
      userRoleCreateLoading.value = false
    }
  }).catch(error => {
  });
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal_content {
  width: 550px;
  padding-top: 50px;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

.modal_body {
  display: flex;
  justify-content: center;
  flex: 1;
}

.ant-input-affix-wrapper {
  width: 370px;
  border-radius: 3px;
}

:deep(.ant-select-single .ant-select-selector) {
  width: 370px !important;
  border-radius: 3px;
}

.manager_group {
  width: 370px;
  border-radius: 3px;
  border: 1px solid #DCDFE6FF;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 5px;
  padding-right: 5px;
  padding-left: 5px;
}

.ant-checkbox-wrapper {
  padding: 3px;
  border-radius: 3px;
  margin-bottom: 5px;
  border: 1px solid #DCDFE6FF;
}

.ant-checkbox-wrapper:hover {
  color: #1677ff;
  border-color: #1677ff;
}

.form_item3 {
  margin-left: 10px;
}


.modal_footer {
  width: 100%;
  height: 50px;
  border-top: 1px solid #DCDFE6FF;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.ant-btn {
  width: 100px;
  border-radius: 3px;
}

.ant-btn:nth-child(1):hover {
  color: #ff4d4f;
  border-color: #ff4d4f;
}

.ant-btn:nth-child(2):hover {
  color: #13ce66;
  border-color: #13ce66;
}
</style>
