<template>
  <div class="user_body" ref="boxElement">
    <a-table :columns="columns" :data-source="result.users" :pagination="false" :scroll="{ y: tableHeight }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'login_status'">
          <PoweroffOutlined
              :style="{color: record.login_status ? '#13ce66' : '#ff4d4f'}"
          />
        </template>
        <template v-else-if="column.key === 'account_status'">
          <a-switch v-model:checked="record.account_status" size="small" :loading="accountVisible[record.user_id]"
                    @change="userAccountStatusUpdateHandle(record.account_status, record.user_id)">
            <template #checkedChildren>
              <CheckOutlined/>
            </template>
            <template #unCheckedChildren>
              <CloseOutlined/>
            </template>
          </a-switch>
        </template>
      </template>
      <template #footer>
        <a-pagination size="small" :total="result.total" show-size-changer show-quick-jumper
                      v-model:current="userPagination.pages"
                      v-model:page-size="userPagination.pieces"
                      :show-total="total => `共 ${total} 条`"/>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, reactive, ref, watch} from 'vue';
import eventBus from '@/utils/event_bus.js';
import {userAccountStatusUpdate} from '@/apis/user.js';
import {PoweroffOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons-vue';

const windowHeight = ref(window.innerHeight);
const tableHeight = ref(windowHeight.value - 200);

const windowHeightResizeHandle = () => {
  windowHeight.value = window.innerHeight;
  tableHeight.value = windowHeight.value - 200;
};

onMounted(() => {
  window.addEventListener('resize', windowHeightResizeHandle);
  windowHeightResizeHandle();
});

onUnmounted(() => {
  window.removeEventListener('resize', windowHeightResizeHandle);
});

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

const result = ref({total: 0, users: []});
const accountVisible = reactive({});

const userQueryResHandle = () => {
  const handler = (msg) => {
    result.value = msg.data;
  };
  eventBus.on('users', handler);
};
userQueryResHandle();

const userAccountStatusUpdateHandle = async (value, userId) => {
  accountVisible[userId] = true;
  try {
    const res = await userAccountStatusUpdate({user_id: userId, state: value});
    if (res.code === 200) {
      accountVisible[userId] = false;
    }
  } catch (error) {
    accountVisible[userId] = false;
  }
};

const userPagination = reactive({pages: 1, pieces: 100});
watch(userPagination, (newVal, oldVal) => {
  eventBus.emit('user_pagination', newVal)
}, {deep: true});
</script>

<style scoped>
.user_body {
  width: 100%;
  margin-top: 5px;
  display: flex;
  flex-grow: 1;
}

:deep(.ant-table-header) {
  line-height: 20px;
  text-align: center;
  border-radius: 0;
}

:deep(.ant-table-cell) {
  padding: 5px !important;
  text-align: center;
}

:deep(.ant-table-thead > tr > th) {
  text-align: center;
  color: #606266;
  font-family: "微软雅黑 Light", sans-serif;
}

:deep(.ant-table-footer) {
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: right;
}
</style>
