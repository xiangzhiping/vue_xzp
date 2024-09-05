<template>
  <div class="user_role_head">
    <a-space-compact>
      <div class="icon_box">
        <FieldTimeOutlined/>
      </div>
      <a-range-picker v-model="userRoleForm.create_datetime" show-time
                      :placeholder="['创建开始日期时间', '创建结束日期时间']"/>
    </a-space-compact>
    <a-space-compact>
      <div class="icon_box">
        <FieldTimeOutlined/>
      </div>
      <a-range-picker v-model="userRoleForm.update_datetime" show-time
                      :placeholder="['更新开始日期时间', '更新结束日期时间']"/>
    </a-space-compact>
    <a-space-compact>
      <div class="icon_box">
        <ItalicOutlined/>
      </div>
      <a-input v-model="userRoleForm.role_name" placeholder="角色名称（支持起始关键字匹配）" allow-clear/>
    </a-space-compact>
    <a-space-compact>
      <div class="icon_box">
        <CaretDownOutlined/>
      </div>
      <a-select
          :options="userRoleMenu.role_levels"
          v-model:value="userRoleForm.role_level"
          placeholder="角色级别" allow-clear>
      </a-select>
    </a-space-compact>
    <a-space-compact>
      <a-button @click="userRoleFormRefreshHandel">
        <ReloadOutlined/>
        重 置
      </a-button>
      <a-button @click="userRoleQueryHandel">
        <SearchOutlined/>
        查 询
      </a-button>
      <a-button @click="userRoleCreateDialogHandel">
        <PlusOutlined/>
        新 增
      </a-button>
    </a-space-compact>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue'
import {userRoleQuery, userRoleMenuQuery} from '@/apis/user_role.js';
import event_bus from '@/utils/event_bus.js';
import {
  ItalicOutlined,
  FieldTimeOutlined,
  ReloadOutlined,
  SearchOutlined,
  CaretDownOutlined,
  PlusOutlined
} from '@ant-design/icons-vue';
import RoleCreateDialogs from '@/components/user_role/user_role_dialogs/role_create_dialogs.vue'

const userRoleForm = reactive({
  role_name: null,
  role_level: null,
  operator_id: null,
  create_datetime: null,
  update_datetime: null,
  number_pages: 1,
  number_pieces: 250,
})
const userRoleMenu = ref({role_levels: [], api_tabs: []})

const userRoleMenuQueryHandel = async () => {
  const res = await userRoleMenuQuery()
  if (res.code === 200) {
    userRoleMenu.value = res.data;
  }
  event_bus.emit('user_role_menu', res.data);
}

const result = ref({total: 0, roles: []});

const formatDateTimeRange = (datetimeArr) => {
  if (datetimeArr) {
    const formattedDates = datetimeArr.map(date => {
      return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
    });
    return formattedDates.join(', ');
  }
}
const userRoleFormRefreshHandel = async () => {
  userRoleForm.role_name = null;
  userRoleForm.role_level = null;
  userRoleForm.operator_id = null;
  userRoleForm.role_status = null;
  userRoleForm.create_datetime = null;
  userRoleForm.update_datetime = null;
  userRoleForm.delete_datetime = null;
  userRoleForm.number_pages = 1;
  userRoleForm.number_pieces = 250;
}

const userRoleQueryHandel = async () => {
  await userRoleMenuQueryHandel()
  userRoleForm.create_datetime = formatDateTimeRange(userRoleForm.create_datetime);
  userRoleForm.update_datetime = formatDateTimeRange(userRoleForm.update_datetime);
  console.log(userRoleForm)
  const res = await userRoleQuery(userRoleForm)
  if (res.code === 200 || res.code === 204) {
    result.value.total = res.data.total;
    event_bus.emit('roles', res);
  }
}

userRoleQueryHandel()

const numberPagesChangeHandel = (val) => {
  userRoleForm.number_pages = val;
};

const numberPiecesChangeHandel = (val) => {
  userRoleForm.number_pieces = val;
};

const isRoleCreateDialogVisible = ref(false);


const userRoleCreateDialogHandel = async () => {
  isRoleCreateDialogVisible.value = !isRoleCreateDialogVisible.value;
  event_bus.emit('isRoleCreateDialogVisible', isRoleCreateDialogVisible);
}
</script>

<style scoped>
.user_role_head {
  width: 100%;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}

.ant-space-compact {
  margin-top: 5px;
  width: 355px;
}

.ant-space-compact:nth-child(3) {
  margin-top: 5px;
  width: 285px;
}

.ant-space-compact:nth-child(4) {
  margin-top: 5px;
  width: 195px;
}

.icon_box {
  width: 32px;
  height: 32px;
  border-radius: 3px 0 0 3px;
  border-bottom: 1px solid #d9d9d9;
  border-left: 1px solid #d9d9d9;
  border-top: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #909399;
}

.ant-input-affix-wrapper {
  border-radius: 3px;
  width: 240px;
  padding-left: 5px;
  padding-right: 5px;
}

.ant-picker {
  width: 310px;
  border-radius: 4px;
}

:deep(.ant-picker-suffix) {
  display: none;
}

:deep(.ant-select-single .ant-select-selector) {
  width: 150px;
  border-radius: 3px;
}

.ant-space-compact:nth-child(5),
.ant-space-compact:nth-child(6),
.ant-space-compact:nth-child(7) {
  margin-top: 5px;
  width: 105px;
}

.ant-btn {
  font-size: 16px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #909399;
}

.ant-btn:nth-child(1):hover {
  color: #909399;
  border-color: #909399;
}

.ant-btn:nth-child(2):hover {
  color: #409EFF;
  border-color: #409EFF;
}

.ant-btn:nth-child(3):hover {
  color: #67C23A;
  border-color: #67C23A;
}
</style>
