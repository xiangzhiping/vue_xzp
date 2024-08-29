<template>
  <div class="user_role_body_box" ref="userRoleBodyRef">
    <el-table :data="userRoleQueryRes.roles" stripe border
              :height="tableHeight"
              :header-cell-style="{background: '#e5eaf1', color: '#8a8b8d'}">
      <el-table-column prop="role_id" label="角色ID" width="100" align="center"></el-table-column>
      <el-table-column prop="role_name" label="角色名称" width="400" align="center"></el-table-column>
      <el-table-column prop="role_level" label="角色级别" width="270" align="center">
        <template #default="scope">
          <el-tag effect="light" :type="getRoleInfo(scope.row.role_level).color">
            {{ getRoleInfo(scope.row.role_level).text }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="paths" label="接口ID列表" width="300" align="center"></el-table-column>
      <el-table-column prop="role_status" label="角色状态" width="120" align="center">
        <template #default="scope">
          <el-switch size="small"
                     v-model="scope.row.role_status"
                     @change="updateUserRoleStatusHandle(scope.row)"
                     style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="operator_id" label="操作者ID" width="185" align="center"></el-table-column>
      <el-table-column prop="create_datetime" label="创建日期时间" width="160" align="center"></el-table-column>
      <el-table-column prop="update_datetime" label="更新日期时间" width="160" align="center"></el-table-column>
      <el-table-column prop="delete_datetime" label="删除日期时间" width="160" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import eventBus from '@/utils/event_bus.js';
import {ref, computed, watchEffect} from 'vue';
import {userRoleStatusUpdate} from '@/apis/user_role.js';

const userRoleQueryRes = ref({total: 0, roles: []});

const userRoleBodyRef = ref(null);
const tableHeight = computed(() => {
  return userRoleBodyRef.value ? userRoleBodyRef.value.clientHeight - 2 : 'auto';
});

const adjustTableHeight = () => {
  if (userRoleBodyRef.value) {
    userRoleBodyRef.value.style.height = `${userRoleBodyRef.value.offsetHeight - 2}px`;
  }
};

const getRoleInfo = computed(() => (level) => {
  let color, text;
  if (level === 1) {
    color = 'success';
    text = '超级管理员';
  } else if (level === 0) {
    color = 'danger';
    text = '普通用户';
  } else {
    color = 'warning';
    text = '专业管理员';
  }
  return {color, text};
});

const userRoleQueryResHandel = () => {
  const handler = (msg) => {
    userRoleQueryRes.value = msg.data
  };
  eventBus.on('roles', handler);
};

userRoleQueryResHandel();
adjustTableHeight();
watchEffect(() => {
  adjustTableHeight()
})

const updateUserRoleStatusHandle = async (row) => {
  await userRoleStatusUpdate({role_id: row.role_id, type: row.role_status});
};
</script>


<style scoped>
.user_role_body_box {
  width: 100%;
  margin-top: 5px;
  display: flex;
  flex-grow: 1;
}
</style>
