<template>
  <el-form>
    <div class="user_head">
      <div class="date_picker_form1">
        <div class="date_picker_query">
          <el-form-item>
            <div class="form_head">
              <el-icon color="#707070" size="20">
                <Clock/>
              </el-icon>
            </div>
            <el-date-picker v-model="userQueryForm.login_datetime" type="datetimerange"
                            start-placeholder="登录开始日期时间" end-placeholder="登录结束日期时间" class="zcsdsda"/>
          </el-form-item>
        </div>
        <div class="date_picker_query">
          <el-form-item>
            <div class="form_head">
              <el-icon color="#707070" size="20">
                <Clock/>
              </el-icon>
            </div>
            <el-date-picker v-model="userQueryForm.logout_datetime" type="datetimerange" range-separator="-"
                            start-placeholder="登出开始日期时间" end-placeholder="登出结束日期时间"/>
          </el-form-item>
        </div>
      </div>
      <div class="date_picker_form1">
        <div class="date_picker_query">
          <el-form-item>
            <div class="form_head">
              <el-icon color="#707070" size="20">
                <Clock/>
              </el-icon>
            </div>
            <el-date-picker v-model="userQueryForm.create_datetime" type="datetimerange" range-separator="-"
                            start-placeholder="创建开始日期时间" end-placeholder="创建结束日期时间" class=""/>
          </el-form-item>
        </div>
        <div class="date_picker_query">
          <el-form-item>
            <div class="form_head">
              <el-icon color="#707070" size="20">
                <Clock/>
              </el-icon>
            </div>
            <el-date-picker v-model="userQueryForm.update_datetime" type="datetimerange" range-separator="-"
                            start-placeholder="更新开始日期时间" end-placeholder="更新结束日期时间"/>
          </el-form-item>
        </div>
      </div>
      <div class="date_picker_input_form">
        <div class="date_picker_query">
          <el-form-item>
            <div class="form_head">
              <el-icon color="#707070" size="20">
                <Clock/>
              </el-icon>
            </div>
            <el-date-picker v-model="userQueryForm.delete_datetime" type="datetimerange" range-separator="-"
                            start-placeholder="删除开始日期时间" end-placeholder="删除结束日期时间" class=""/>
          </el-form-item>
        </div>
        <div class="input_query">
          <el-form-item>
            <div class="form_head">
              <el-icon color="#707070" size="20">
                <Phone/>
              </el-icon>
            </div>
            <el-input v-model="userQueryForm.phone" placeholder="手机号码（支持手机号起始位关键字匹配）" clearable/>
          </el-form-item>
        </div>
      </div>
      <div class="input_select_form">
        <div class="input_query">
          <el-form-item>
            <div class="form_head">
              <el-icon color="#707070" size="20">
                <Message/>
              </el-icon>
            </div>
            <el-input v-model="userQueryForm.email" placeholder="邮箱地址（支持邮箱号起始位关键字匹配）" clearable/>
          </el-form-item>
        </div>
        <div class="select_query">
          <el-form-item>
            <div class="form_head">
              <el-icon color="#707070" size="20">
                <SwitchButton/>
              </el-icon>
            </div>
            <el-select v-model="userQueryForm.login_status" placeholder="登录状态">
              <el-option
                  v-for="item in loginStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <div class="form_head">
              <el-icon color="#707070" size="20">
                <Open/>
              </el-icon>
            </div>
            <el-select v-model="userQueryForm.account_status" placeholder="账号状态">
              <el-option
                  v-for="item in accountStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="pagination_select_button_form">
        <div class="pagination_query">
          <el-form-item>
            <el-pagination
                v-model:page-size="userQueryForm.number_pieces"
                :page-sizes="[500, 750, 1000]"
                size="default"
                :disabled="false"
                :background="true"
                layout="total, sizes, prev, pager, next, jumper"
                :total="userRes.total"
                @size-change="numberPiecesChangeHandel"
                @current-change="numberPagesChangeHandel"
            />
          </el-form-item>
        </div>
        <div class="select_button_query" style="display: flex; margin-top: 7px">
          <el-form-item>
            <div class="form_head">
              <el-icon color="#707070" size="20">
                <User/>
              </el-icon>
            </div>
            <el-select v-model="userQueryForm.user_status" placeholder="用户状态">
              <el-option
                  v-for="item in userStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left: 10px">
            <el-button plain type="info" @click="userQueryFormRefreshHandel">
              <el-icon size="20">
                <Refresh/>
              </el-icon>
              <span>重 置</span>
            </el-button>
          </el-form-item>
          <el-form-item style="margin-left: 10px">
            <el-button plain type="primary" @click="userQueryHandel">
              <el-icon size="20">
                <Search/>
              </el-icon>
              <span>查 询</span>
            </el-button>
          </el-form-item>
        </div>
      </div>
    </div>
  </el-form>
</template>

<script setup>
import {reactive, ref} from 'vue'
import {Refresh, Open, User, SwitchButton, Phone, Message, Search, Clock} from "@element-plus/icons-vue";
import {userQuery} from '@/apis/user.js';
import eventBus from '@/utils/event_bus.js';

const userQueryForm = reactive({
  phone: null,
  email: null,
  login_status: null,
  account_status: null,
  user_status: null,
  login_datetime: null,
  logout_datetime: null,
  create_datetime: null,
  update_datetime: null,
  delete_datetime: null,
  number_pages: 1,
  number_pieces: 500,
})

const userRes = ref({total: 0, users: []});


const userQueryHandel = async () => {
  const res = await userQuery(userQueryForm)
  userRes.value.total = res.data.total;
  eventBus.emit('users', res);
}

userQueryHandel()
const userQueryFormRefreshHandel = async () => {
  userQueryForm.phone = null;
  userQueryForm.email = null;
  userQueryForm.login_status = null;
  userQueryForm.account_status = null;
  userQueryForm.user_status = null;
  userQueryForm.login_datetime = null;
  userQueryForm.logout_datetime = null;
  userQueryForm.create_datetime = null;
  userQueryForm.update_datetime = null;
  userQueryForm.delete_datetime = null;
  userQueryForm.number_pages = 1;
  userQueryForm.number_pieces = 500;
}

const numberPagesChangeHandel = (val) => {
  userQueryForm.number_pages = val;
};

const numberPiecesChangeHandel = (val) => {
  userQueryForm.number_pieces = val;
};

const loginStatusOptions = reactive([
  {
    value: null,
    label: '全部',
  },
  {
    value: true,
    label: '在线',
  },
  {
    value: false,
    label: '离线',
  }
])
const accountStatusOptions = reactive([
  {
    value: null,
    label: '全部',
  },
  {
    value: true,
    label: '启用',
  },
  {
    value: false,
    label: '禁用',
  }
])
const userStatusOptions = reactive([
  {
    value: null,
    label: '全部',
  },
  {
    value: true,
    label: '有效',
  },
  {
    value: false,
    label: '无效',
  }
])
</script>

<style scoped>
.user_head {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}

.select_button_query span {
  font-size: 18px;
}

.date_picker_form1, .date_picker_input_form, .input_select_form {
  width: 320px;
  margin-top: 5px;
}

.pagination_select_button_form {
  margin-top: 5px;
  width: 550px;
}

.date_picker_query {
  width: 310px;
}


.date_picker_query:nth-child(2) {
  margin-top: 5px;
}

.input_query:nth-child(2) {
  margin-top: 5px;
}

.el-input {
  width: 279px;
}

.el-button {
  height: 32px;
  margin-top: -1px;
}

.select_query {
  margin-top: 5px;
  width: 310px;
  display: flex;
  justify-content: space-between;
}

.el-select {
  width: 120px;
}

.el-form-item {
  margin-bottom: 0;
  display: flex;
  justify-content: left;
}

:deep(.el-pagination) {
  height: 30px;
}

:deep(.el-range-separator) {
  display: none;
}

:deep(.el-date-editor) {
  --el-date-editor-datetimerange-width: 110px;
  display: flex;
  justify-content: left;
}

:deep(.el-date-editor .el-range__close-icon) {
  display: none;
}


:deep(.el-date-editor .el-range-input) {
  margin: 20px 20px 20px -7px;
  width: 130px;
}


:deep(.el-date-editor .el-input__icon.el-range__icon) {
  display: none;
}


::v-deep .el-input__wrapper {
  border-radius: 0 4px 4px 0;
}

::v-deep .el-select__wrapper, ::v-deep .el-input {
  border-radius: 0 4px 4px 0;
}


.form_head {
  width: 30px;
  height: 30px;
  border-top: 1px solid var(--el-border-color);
  border-left: 1px solid var(--el-border-color);
  border-bottom: 1px solid var(--el-border-color);
  border-right: 0;
  background: #f5f7fa;
  border-radius: 4px 0 0 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>
