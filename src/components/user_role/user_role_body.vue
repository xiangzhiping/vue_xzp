<template>
  <div class="user_role_body" ref="userRoleBodyRef">
    <a-table :columns="columns" :data-source="userRoles.roles" bordered :pagination="false"
             :scroll="{ y: 1000 }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'role_level'">
          <a-tag :color="getRoleInfo(record.role_level).color">
            {{ getRoleInfo(record.role_level).text }}
          </a-tag>
        </template>
        <template v-else-if="column.key === 'api_tabs'">
        <span>
          <a-tag v-for="tab in JSON.parse(record.api_tabs)" :color="getRoleInfo(record.role_level).color">
            {{ tab.key }}
          </a-tag>
        </span>
        </template>
      </template>
      <template #footer>
        <a-pagination size="small" v-model:current="userRolePagination.pages"
                      v-model:page-size="userRolePagination.pieces" :total="userRoles.total"
                      show-size-changer show-quick-jumper :show-total="total => `共 ${total} 条`"/>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import eventBus from '@/utils/event_bus.js';
import {ref, computed, onMounted, reactive, onUnmounted, watch} from 'vue';
import {userRoleDelete} from '@/apis/user_role.js';
import event_bus from "@/utils/event_bus.js";

const windowHeight = ref(window.innerHeight);
const tableHeight = ref(windowHeight.value - 98);

const windowHeightResizeHandle = () => {
  windowHeight.value = window.innerHeight;
  tableHeight.value = windowHeight.value - 98;
  console.log(`${windowHeight.value}px, ${tableHeight.value}`);
};

onMounted(() => {
  window.addEventListener('resize', windowHeightResizeHandle);
  windowHeightResizeHandle();
});

onUnmounted(() => {
  window.removeEventListener('resize', windowHeightResizeHandle);
});

const columns = [
  {title: '角色ID', dataIndex: 'role_id', key: 'role_id', width: 50},
  {title: '角色名称', dataIndex: 'role_name', key: 'role_name', width: 200},
  {title: '角色级别', dataIndex: 'role_level', key: 'role_level', width: 100},
  {title: '接口标签', dataIndex: 'api_tabs', key: 'api_tabs', width: 400},
  {title: '操作者ID', dataIndex: 'operator_id', key: 'operator_id', width: 100},
  {title: '创建日期时间', dataIndex: 'create_datetime', key: 'create_datetime', width: 100},
  {title: '更新日期时间', dataIndex: 'update_datetime', key: 'update_datetime', width: 100}
];
const userRoles = ref({total: 0, roles: []});
const userRoleBodyRef = ref(null);
const userRoleDeleteLoadings = ref([]);


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
userRoleQueryResHandel();


const userRoleDeleteHandel = async (index, row) => {
  userRoleDeleteLoadings.value[index] = true;
  const res = await userRoleDelete({role_id: row.role_id});
  if (res.code === 200) {
    userRoleQueryRes.value.roles.splice(index, 1);
    userRoleDeleteLoadings.value[index] = false;
  }
  userRoleDeleteLoadings.value[index] = false;
};

const userRolePagination = reactive({pages: 1, pieces: 100});
watch(userRolePagination, (newVal, oldVal) => {
  eventBus.emit('user_role_pagination', newVal)
}, {deep: true});
</script>

<style scoped>
.user_role_body {
  width: 100%;
  margin-top: 5px;
  display: flex;
  flex-grow: 1;
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
