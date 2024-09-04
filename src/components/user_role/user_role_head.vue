<template>
  <div class="user_role_head">
    <a-space-compact style="width: 300px">
      <div class="icon_box">
        <ItalicOutlined/>
      </div>
      <a-input v-model="userRoleQueryForm.role_name"/>
    </a-space-compact>
    <a-space-compact>
      <div class="icon_box">
        <FieldTimeOutlined/>
      </div>
      <a-range-picker v-model="userRoleQueryForm.create_datetime" show-time :placeholder="['sadasd', 'asdfs']"/>
    </a-space-compact>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue'
import {userRoleQuery, userRoleMenuQuery} from '@/apis/user_role.js';
import eventBus from '@/utils/event_bus.js';
import {ItalicOutlined, FieldTimeOutlined, CrownOutlined, SettingOutlined} from '@ant-design/icons-vue';
import RoleCreateDialogs from '@/components/user_role/user_role_dialogs/role_create_dialogs.vue'

const userRoleQueryForm = reactive({
  role_name: null,
  role_level: null,
  operator_id: null,
  role_status: null,
  create_datetime: null,
  update_datetime: null,
  delete_datetime: null,
  number_pages: 1,
  number_pieces: 250,
})
const roleOptions = ref({role_levels: [], role_states: []})

const userRoleMenuQueryHandel = async () => {
  const res = await userRoleMenuQuery()
  if (res.code === 200) {
    roleOptions.value = res.data;
  }
  eventBus.emit('user_role_menu', res.data);
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
const userRoleQueryFormRefreshHandel = async () => {
  userRoleQueryForm.role_name = null;
  userRoleQueryForm.role_level = null;
  userRoleQueryForm.operator_id = null;
  userRoleQueryForm.role_status = null;
  userRoleQueryForm.create_datetime = null;
  userRoleQueryForm.update_datetime = null;
  userRoleQueryForm.delete_datetime = null;
  userRoleQueryForm.number_pages = 1;
  userRoleQueryForm.number_pieces = 250;
}

const userRoleQueryHandel = async () => {
  await userRoleMenuQueryHandel()
  userRoleQueryForm.create_datetime = formatDateTimeRange(userRoleQueryForm.create_datetime);
  userRoleQueryForm.update_datetime = formatDateTimeRange(userRoleQueryForm.update_datetime);
  userRoleQueryForm.delete_datetime = formatDateTimeRange(userRoleQueryForm.delete_datetime);
  const res = await userRoleQuery(userRoleQueryForm)
  if (res.code === 200 || res.code === 204) {
    result.value.total = res.data.total;
    eventBus.emit('roles', res);
  }
}

userRoleQueryHandel()

const numberPagesChangeHandel = (val) => {
  userRoleQueryForm.number_pages = val;
};

const numberPiecesChangeHandel = (val) => {
  userRoleQueryForm.number_pieces = val;
};

const isRoleCreateDialogVisible = ref(false);


const userRoleCreateDialogHandel = async () => {
  isRoleCreateDialogVisible.value = !isRoleCreateDialogVisible.value;
  eventBus.emit('isRoleCreateDialogVisible', isRoleCreateDialogVisible);
}
</script>

<style scoped>
.user_role_head {
  width: 100%;
  display: flex;
}

.icon_box {
  width: 32px;
  height: 32px;
  border-radius: 4px 0 0 4px;
  border-bottom: 1px solid #d9d9d9;
  border-left: 1px solid #d9d9d9;
  border-top: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #54667c;
}

.ant-input {
  border-radius: 3px;
}

.ant-picker {
  width: 310px;
  border-radius: 4px;
}

:deep(.ant-picker-suffix) {
  display: none;
}
</style>
