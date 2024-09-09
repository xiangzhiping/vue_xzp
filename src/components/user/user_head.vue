<template>
  <div class="user_role_head">
    <a-space-compact>
      <div class="icon_box">
        <FieldTimeOutlined/>
      </div>
      <a-range-picker v-model:value="userForm.create_datetime" show-time
                      :placeholder="['创建开始日期时间', '创建结束日期时间']"/>
    </a-space-compact>
    <a-space-compact>
      <div class="icon_box">
        <FieldTimeOutlined/>
      </div>
      <a-range-picker v-model:value="userForm.update_datetime" show-time
                      :placeholder="['更新开始日期时间', '更新结束日期时间']"/>
    </a-space-compact>
    <a-space-compact>
      <div class="icon_box">
        <FieldTimeOutlined/>
      </div>
      <a-range-picker v-model:value="userForm.login_datetime" show-time
                      :placeholder="['登录开始日期时间', '登录结束日期时间']"/>
    </a-space-compact>
    <a-space-compact>
      <div class="icon_box">
        <FieldTimeOutlined/>
      </div>
      <a-range-picker v-model:value="userForm.logout_datetime" show-time
                      :placeholder="['登出开始日期时间', '登出结束日期时间']"/>
    </a-space-compact>
    <a-space-compact>
      <div class="icon_box">
        <CaretDownOutlined/>
      </div>
      <a-select
          :options="userMenu.login_states"
          v-model:value="userForm.login_status"
          placeholder="登录状态" allow-clear>
      </a-select>
    </a-space-compact>
    <a-space-compact>
      <div class="icon_box">
        <CaretDownOutlined/>
      </div>
      <a-select
          :options="userMenu.account_states"
          v-model:value="userForm.account_status"
          placeholder="账号状态" allow-clear>
      </a-select>
    </a-space-compact>
    <a-space-compact>
      <div class="icon_box">
        <PhoneFilled/>
      </div>
      <a-input v-model:value="userForm.phone" placeholder="手机号码（支持起始关键字匹配）" allow-clear/>
    </a-space-compact>
    <a-space-compact>
      <div class="icon_box">
        <MailOutlined/>
      </div>
      <a-input v-model:value="userForm.email" placeholder="邮箱地址（支持起始关键字匹配）" allow-clear/>
    </a-space-compact>
    <a-space-compact>
      <a-button @click="userFormRefreshHandel">
        <ReloadOutlined/>
        重 置
      </a-button>
      <a-button @click="userQueryHandel">
        <SearchOutlined/>
        查 询
      </a-button>
    </a-space-compact>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue'
import {userMenuQuery, userQuery} from '@/apis/user.js';
import event_bus from '@/utils/event_bus.js';
import {
  FieldTimeOutlined,
  ReloadOutlined,
  SearchOutlined,
  CaretDownOutlined,
  PhoneFilled,
  MailOutlined
} from '@ant-design/icons-vue';

const userForm = reactive({
  phone: null,
  email: null,
  account_status: null,
  login_status: null,
  login_datetime: null,
  logout_datetime: null,
  create_datetime: null,
  update_datetime: null,
  number_pages: 1,
  number_pieces: 100,
})
const userMenu = ref({login_states: [], account_states: []})

const userMenuQueryHandel = async () => {
  const res = await userMenuQuery()
  if (res.code === 200) {
    userMenu.value = res.data;
  }
  event_bus.emit('user_menu', res.data);
}

const result = ref({total: 0, roles: []});

const formatDateTimeRange = (datetimeArr) => {
  if (datetimeArr) {
    const formattedDates = datetimeArr.map(date => {
      return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
    });
    return formattedDates.join(', ');
  }
  return null
}
const userFormRefreshHandel = async () => {
  userForm.phone = null;
  userForm.email = null;
  userForm.account_status = null;
  userForm.login_status = null;
  userForm.login_datetime = null;
  userForm.logout_datetime = null;
  userForm.create_datetime = null;
  userForm.update_datetime = null;
  userForm.number_pages = 1;
  userForm.number_pieces = 100;
}

const userQueryHandel = async () => {
  await userMenuQueryHandel()
  userForm.login_datetime = formatDateTimeRange(userForm.login_datetime);
  userForm.logout_datetime = formatDateTimeRange(userForm.logout_datetime);
  userForm.create_datetime = formatDateTimeRange(userForm.create_datetime);
  userForm.update_datetime = formatDateTimeRange(userForm.update_datetime);
  console.log(userForm)
  const res = await userQuery(userForm)
  if (res.code === 200 || res.code === 204) {
    result.value.total = res.data.total;
    event_bus.emit('users', res);
  }
}

userQueryHandel()

const userPaginationHandel = () => {
  const handler = (msg) => {
    userForm.number_pages = msg.pages;
    userForm.number_pieces = msg.pieces;
  };
  event_bus.on('user_pagination', handler);
};
userPaginationHandel();
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

.ant-space-compact:nth-child(5) {
  margin-top: 5px;
  width: 224px;
}

.ant-space-compact:nth-child(6) {
  width: 210px;
}

.ant-space-compact:nth-child(7),
.ant-space-compact:nth-child(8) {
  margin-top: 5px;
  width: 355px;
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
  width: 310px;
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
  width: 180px;
  border-radius: 3px;
}

.ant-space-compact:nth-child(9),
.ant-space-compact:nth-child(10),
.ant-space-compact:nth-child(10) {
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
</style>
