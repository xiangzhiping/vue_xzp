<template>
  <div class="user_role_body_box" ref="userRoleBodyRef">
    <el-table :data="userRoleQueryRes.roles" stripe
              :height="tableHeight"
              :header-cell-style="{background: '#f5f7fa', color: '#707070'}" style="font-family: '微软雅黑 Light',serif">
      <el-table-column prop="role_id" label="角色ID" width="100" align="center"></el-table-column>
      <el-table-column prop="role_name" label="角色名称" width="400" align="center"></el-table-column>
      <el-table-column prop="role_level" label="角色级别" width="270" align="center">
        <template #default="scope">
          <el-tag effect="plain" size="small" :type="getRoleInfo(scope.row.role_level).color">
            {{ getRoleInfo(scope.row.role_level).text }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="paths" label="接口标签列表" width="700" align="center">
        <template #default="scope">
          <el-tag
              v-for="(path, index) in JSON.parse(scope.row.paths)"
              :key="index"
              effect="plain"
              type="warning"
              size="small"
              class="api_tabs"
          >{{ path.key }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operator_id" label="操作者ID" width="185" align="center"></el-table-column>
      <el-table-column prop="create_datetime" label="创建日期时间" width="160" align="center"></el-table-column>
      <el-table-column prop="update_datetime" label="更新日期时间" width="160" align="center"></el-table-column>
      <el-table-column prop="delete_datetime" label="删除日期时间" width="160" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button size="small" plain type="danger"
                     @click="userRoleDeleteHandel(scope.$index, scope.row)"
                     :loading="userRoleDeleteLoadings[scope.$index]">
            <el-icon size="16">
              <Delete/>
            </el-icon>
            <span>删 除</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import eventBus from '@/utils/event_bus.js';
import {ref, computed, onMounted, watchEffect} from 'vue';
import {userRoleDelete} from '@/apis/user_role.js';
import {Delete} from "@element-plus/icons-vue";

const userRoleQueryRes = ref({total: 0, roles: []});
const userRoleBodyRef = ref(null);
const tableHeight = computed(() => userRoleBodyRef.value ? userRoleBodyRef.value.clientHeight - 2 : 'auto');
const userRoleDeleteLoadings = ref([]);

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
    userRoleQueryRes.value = msg.data;
  };
  eventBus.on('roles', handler);
};

onMounted(() => {
  userRoleQueryResHandel();
  adjustTableHeight();
});

watchEffect(() => {
  adjustTableHeight()
});

const userRoleDeleteHandel = async (index, row) => {
  userRoleDeleteLoadings.value[index] = true;
  const res = await userRoleDelete({role_id: row.role_id});
  console.log(res)
  if (res.code === 200) {
    userRoleQueryRes.value.roles.splice(index, 1);
    userRoleDeleteLoadings.value[index] = false;
  }
  userRoleDeleteLoadings.value[index] = false;
};
</script>

<style scoped>
.user_role_body_box {
  width: 100%;
  border-top: 1px solid var(--el-border-color);
  margin-top: 5px;
  display: flex;
  flex-grow: 1;
}

.api_tabs {
  margin-bottom: 5px;
  margin-right: 5px;
}

.el-button span {
  font-size: 15px;
}
</style>
