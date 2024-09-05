<template>
  <div class="user_role_body_box" ref="userRoleBodyRef">
    <a-table :columns="columns" :data-source="userRoles.roles" bordered :pagination="false" :scroll="{ y: 1000 }">
<!--      <template #bodyCell="{ column, record }">-->
<!--        <template v-if="column.key === 'role_level'">-->
<!--          <a-tag :color="getRoleInfo(record.role_level).color">-->
<!--            {{ getRoleInfo(record.role_level).text }}-->
<!--          </a-tag>-->
<!--        </template>-->
<!--        <template v-else-if="column.key === 'api_tabs'">-->
<!--        <span>-->
<!--          <a-tag v-for="tab in JSON.parse(record.api_tabs)" :color="getRoleInfo(record.role_level).color">-->
<!--            {{ tab.key }}-->
<!--          </a-tag>-->
<!--        </span>-->
<!--        </template>-->
<!--      </template>-->
<!--      <template #footer>-->
<!--        <a-pagination size="small" :total="userRoles.total" show-size-changer show-quick-jumper/>-->
<!--      </template>-->
    </a-table>
  </div>
</template>

<script setup>
import eventBus from '@/utils/event_bus.js';
import {ref, computed, onMounted, watchEffect} from 'vue';
import {userRoleDelete} from '@/apis/user_role.js';

const columns = [
  {title: '角色ID', dataIndex: 'role_id', key: 'role_id', width: 50},
  {title: '角色名称', dataIndex: 'role_name', key: 'role_name', width: 200},
  {title: '角色级别', dataIndex: 'role_level', key: 'role_level', width: 100},
  {title: '接口标签', dataIndex: 'api_tabs', key: 'api_tabs', width: 400},
  {title: '操作者ID', dataIndex: 'operator_id', key: 'operator_id', width: 50},
  {title: '创建日期时间', dataIndex: 'create_datetime', key: 'create_datetime', width: 100},
  {title: '更新日期时间', dataIndex: 'update_datetime', key: 'update_datetime', width: 100}
];
const userRoles = ref({total: 0, roles: []});
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
  switch (level) {
    case 1:
      color = '#67C23A';
      text = '超级管理员';
      break;
    case 0:
      color = '#F56C6C';
      text = '普通用户';
      break;
    default:
      color = '#E6A23C';
      text = '专业管理员';
      break;
  }
  return {color, text};
});
const userRoleQueryResHandel = () => {
  const handler = (msg) => {
    userRoles.value = msg.data;
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

const height = ref(200); // 初始高度

const dynamicStyles = {
  '--element-height': `${height.value}px`,
};
</script>

<style scoped>
.user_role_body_box {
  width: 100%;
  border-top: 1px solid var(--el-border-color);
  display: flex;
  flex-grow: 1;
  background: #13ce66;
}



:deep(.ant-table-header) {
  line-height: 30px;
  text-align: center;
}

:deep(.ant-table-thead) {
  height: 30px;
  text-align: center;
}

:deep(.ant-table-cell) {
  padding: 5px !important;
  text-align: center;
}

:deep(.ant-table-thead >tr>th) {
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
