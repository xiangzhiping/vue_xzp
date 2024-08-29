<template>
  <div class="user_body_box" ref="userBodyRef">
    <el-table :data="userQueryRes.users"  stripe
              :height="tableHeight"
              :header-cell-style="{background: '#e5eaf1', color: '#8a8b8d'}">
      <el-table-column prop="user_id" label="用户ID" width="185" align="center"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="200" align="center"></el-table-column>
      <el-table-column prop="phone" label="电话号码" width="125" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱地址" width="250" align="center"></el-table-column>
      <el-table-column prop="avatar_key" label="头像Key" width="400" show-overflow-tooltip
                       align="center"></el-table-column>
      <el-table-column prop="login_status" label="登录状态" width="115" align="center">
        <template #default="{ row }">
          <el-icon :size="18" :color="row.login_status === true ? '#67C23A' : '#F56C6C'">
            <SwitchButton/>
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="account_status" label="账号状态" width="120" align="center">
        <template #default="scope">
          <el-switch size="small"
                     v-model="scope.row.account_status"
                     @change="updateAccountStatusHandle(scope.row)"
                     style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="user_status" label="用户状态" width="115" align="center">
        <template #default="{ row }">
          <el-icon :size="18" :color="row.user_status === true ? '#67C23A' : '#F56C6C'">
            <User/>
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="operator" label="操作者ID" width="185" align="center"></el-table-column>
      <el-table-column prop="login_datetime" label="登录日期时间" width="160" align="center"></el-table-column>
      <el-table-column prop="logout_datetime" label="登出日期时间" width="160" align="center"></el-table-column>
      <el-table-column prop="create_datetime" label="创建日期时间" width="160" align="center"></el-table-column>
      <el-table-column prop="update_datetime" label="更新日期时间" width="160" align="center"></el-table-column>
      <el-table-column prop="delete_datetime" label="删除日期时间" width="160" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { User, SwitchButton } from '@element-plus/icons-vue';
import eventBus from '@/utils/event_bus.js';
import { ref, onMounted, computed, watchEffect } from 'vue';
import { userAccountStatusUpdate } from '@/apis/user.js';

const userQueryRes = ref({ total: 0, users: [] });

const userBodyRef = ref(null);
const tableHeight = computed(() => {
  return userBodyRef.value ? userBodyRef.value.clientHeight - 2 : 'auto';
});

const adjustTableHeight = () => {
  if (userBodyRef.value) {
    userBodyRef.value.style.height = `${userBodyRef.value.offsetHeight - 2}px`;
  }
};

const userQueryResHandel = () => {
  const handler = (msg) => {
    userQueryRes.value = msg.data;
    console.log(userQueryRes.value)
  };
  eventBus.on('users', handler);
};

userQueryResHandel();

// 在组件挂载后调用 adjustTableHeight
onMounted(() => {
  adjustTableHeight();
});

// 监听元素大小变化时调用 adjustTableHeight
watchEffect(() => {
  adjustTableHeight();
});

const updateAccountStatusHandle = async (row) => {
  await userAccountStatusUpdate({ user_id: row.user_id, type: row.account_status });
};
</script>


<style scoped>
.user_body_box {
  width: 100%;
  margin-top: 5px;
  display: flex;
  flex-grow: 1;
}
</style>
