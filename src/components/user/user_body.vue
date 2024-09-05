<template>
  <div class="user_role_body_box" ref="boxElement">
    <a-table :columns="columns" :data-source="userQueryRes.users" bordered :pagination="false" :scroll="{ y: refsd }">
      <template #footer>
        <a-pagination size="small" :total="userQueryRes.total" show-size-changer show-quick-jumper/>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref, watchEffect} from 'vue';
import eventBus from '@/utils/event_bus.js';

const columns = [
  {title: '用户ID', dataIndex: 'user_id', key: 'user_id', width: 110},
  {title: '用户昵称', dataIndex: 'nickname', key: 'nickname', width: 100},
  {title: '电话号码', dataIndex: 'phone', key: 'phone', width: 80},
  {title: '邮箱地址', dataIndex: 'email', key: 'email', width: 110},
  {title: '个人头像Key', dataIndex: 'avatar_key', key: 'avatar_key', width: 230},
  {title: '登陆状态', dataIndex: 'login_status', key: 'login_status', width: 50},
  {title: '账号状态', dataIndex: 'account_status', key: 'account_status', width: 50},
  {title: '操作者ID', dataIndex: 'operator_id', key: 'operator_id', width: 110},
  {title: '登录日期时间', dataIndex: 'login_datetime', key: 'login_datetime', width: 100},
  {title: '登出日期时间', dataIndex: 'logout_datetime', key: 'logout_datetime', width: 100},
  {title: '创建日期时间', dataIndex: 'create_datetime', key: 'create_datetime', width: 100},
  {title: '更新日期时间', dataIndex: 'update_datetime', key: 'update_datetime', width: 100}
];

const userQueryRes = ref({total: 0, users: []});

const userQueryResHandle = () => {
  const handler = (msg) => {
    userQueryRes.value = msg.data;
  };
  eventBus.on('users', handler);
};
userQueryResHandle();

// 初始化窗口高度
const windowHeight = ref(window.innerHeight);

// 计算table滚动区域的高度
const refsd = ref(windowHeight.value - 210); // 初始值

// 监听窗口高度变化
const handleResize = () => {
  windowHeight.value = window.innerHeight;
  refsd.value = windowHeight.value - 210; // 更新table滚动区域的高度
  console.log(`${windowHeight.value}px, ${refsd.value}`);
};

// 在组件挂载后开始监听
onMounted(() => {
  window.addEventListener('resize', handleResize);
  // 立即执行一次，确保初始值正确
  handleResize();
});

// 组件卸载前停止监听
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.user_role_body_box {
  width: 100%;
  margin-top: 5px;
  display: flex;
  flex-grow: 1;
}

:deep(.ant-table-header) {
  line-height: 30px;
  text-align: center;
  border-radius: 0;
}

:deep(.ant-table-thead) {
  height: 30px;
  text-align: center;
  border-radius: 0;
}

:deep(.ant-table-cell) {
  padding: 5px !important;
  text-align: center;
}

:deep(.ant-table-thead > tr > th) {
  text-align: center;
  color: #909399;
  font-family: "微软雅黑 Light", sans-serif;
}

:deep(.ant-table-footer) {
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: right;
}
</style>
