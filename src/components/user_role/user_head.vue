<template>
  <el-form>
    <div class="user_head">
      <div class="date_picker_form1">
        <div class="input_query">
          <el-form-item>
            <div class="form_head">
              <el-icon color="#707070" size="20">
                <User/>
              </el-icon>
            </div>
            <el-input v-model="userRoleQueryForm.role_name" placeholder="角色名称（支持开头关键字匹配）" clearable/>
          </el-form-item>
        </div>
        <div class="date_picker_query">
          <el-form-item>
            <div class="form_head">
              <el-icon color="#707070" size="20">
                <Clock/>
              </el-icon>
            </div>
            <el-date-picker v-model="userRoleQueryForm.create_datetime" type="datetimerange" range-separator="-"
                            start-placeholder="创建开始日期时间" end-placeholder="创建结束日期时间" class=""/>
          </el-form-item>
        </div>
      </div>
      <div class="date_picker_input_form">
        <div class="input_query">
          <el-form-item>
            <div class="form_head">
              <el-icon color="#707070" size="20">
                <Coordinate/>
              </el-icon>
            </div>
            <el-input v-model="userRoleQueryForm.operator_id" placeholder="操作者用户唯一ID" clearable/>
          </el-form-item>
        </div>
        <div class="date_picker_query">
          <el-form-item>
            <div class="form_head">
              <el-icon color="#707070" size="20">
                <Clock/>
              </el-icon>
            </div>
            <el-date-picker v-model="userRoleQueryForm.update_datetime" type="datetimerange" range-separator="-"
                            start-placeholder="更新开始日期时间" end-placeholder="更新结束日期时间"/>
          </el-form-item>
        </div>

      </div>
      <div class="input_select_form">
        <div class="select_query">
          <el-form-item>
            <div class="form_head">
              <el-icon color="#707070" size="20">
                <CaretTop/>
              </el-icon>
            </div>
            <el-select v-model="userRoleQueryForm.role_level" placeholder="角色级别">
              <el-option
                  v-for="item in roleOptions.role_levels"
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
            <el-select v-model="userRoleQueryForm.role_status" placeholder="角色状态">
              <el-option
                  v-for="item in roleOptions.role_states"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
        <div class="date_picker_query">
          <el-form-item>
            <div class="form_head">
              <el-icon color="#707070" size="20">
                <Clock/>
              </el-icon>
            </div>
            <el-date-picker v-model="userRoleQueryForm.delete_datetime" type="datetimerange" range-separator="-"
                            start-placeholder="删除开始日期时间" end-placeholder="删除结束日期时间" class=""/>
          </el-form-item>
        </div>
      </div>
      <div class="pagination_select_button_form">
        <div class="pagination_query">
          <el-form-item>
            <el-pagination
                v-model:page-size="userRoleQueryForm.number_pieces"
                :page-sizes="[500, 750, 1000]"
                size="default"
                :disabled="false"
                :background="true"
                layout="total, sizes, prev, pager, next, jumper"
                :total="result.total"
                @size-change="numberPiecesChangeHandel"
                @current-change="numberPagesChangeHandel"
            />
          </el-form-item>
        </div>
        <div class="button_query">
          <el-form-item>
            <el-button plain type="info" @click="userRoleQueryFormRefreshHandel" title="重置查询条件">
              <el-icon size="20">
                <Refresh/>
              </el-icon>
              <span>重 置</span>
            </el-button>
          </el-form-item>
          <el-form-item class="button_item">
            <el-button plain type="primary" @click="userRoleQueryHandel">
              <el-icon size="20">
                <Search/>
              </el-icon>
              <span>查 询</span>
            </el-button>
          </el-form-item>
          <el-form-item class="button_item">
            <el-button plain type="success" @click="userRoleQueryHandel">
              <el-icon size="20">
                <Plus/>
              </el-icon>
              <span>新 增</span>
            </el-button>
          </el-form-item>
          <el-form-item class="button_item">
            <el-button plain type="warning" @click="userRoleQueryHandel">
              <el-icon size="20">
                <EditPen/>
              </el-icon>
              <span>修 改</span>
            </el-button>
          </el-form-item>
          <el-form-item class="button_item">
            <el-button plain type="danger" @click="userRoleQueryHandel">
              <el-icon size="20">
                <Delete/>
              </el-icon>
              <span>删 除</span>
            </el-button>
          </el-form-item>
        </div>
      </div>
    </div>
  </el-form>
</template>

<script setup>
import {reactive, ref} from 'vue'
import {
  Refresh,
  Open,
  User,
  Search,
  Clock,
  Coordinate, Plus, EditPen, Delete, CaretTop
} from "@element-plus/icons-vue";
import {userRoleQuery, userRoleMenuQuery} from '@/apis/user_role.js';
import eventBus from '@/utils/event_bus.js';

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
const roleOptions = reactive({role_levels: [], role_states: []})

const userRoleMenuQueryHandel = async () => {
  const res = await userRoleMenuQuery()
  if (res.code === 200) {
    roleOptions.role_levels = res.data.role_levels;
    roleOptions.role_states = res.data.role_states;
  }
}

const result = ref({total: 0, roles: []});


const userRoleQueryHandel = async () => {
  await userRoleMenuQueryHandel()
  const res = await userRoleQuery(userRoleQueryForm)
  if (res.code === 200 || res.code === 204) {
    result.value.total = res.data.total;
    eventBus.emit('roles', res);
  }
}

userRoleQueryHandel()
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

const numberPagesChangeHandel = (val) => {
  userRoleQueryForm.number_pages = val;
};

const numberPiecesChangeHandel = (val) => {
  userRoleQueryForm.number_pieces = val;
};
</script>

<style scoped>
.user_head {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}

.button_query span {
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

:deep(.el-pagination>.is-first) {
  height: 30px;
  padding-right: 5px;
  padding-left: 5px;
  margin-top: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px 0 0 4px;
  border: 1px solid var(--el-border-color);
}

:deep(.el-pagination__goto) {
  height: 30px;
  padding-right: 5px;
  padding-left: 5px;
  border: 1px solid var(--el-border-color);
  border-radius: 4px 0 0 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.el-pagination__classifier) {
  height: 30px;
  padding-right: 5px;
  padding-left: 5px;
  border: 1px solid var(--el-border-color);
  border-radius: 0 4px 4px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.el-pagination__editor>.is-in-pagination) {
  border-radius: 0 4px 4px 0;
}

:deep(.el-input ) {
  border: none;
}

:deep( .el-select--default) {
  border-radius: 4px;
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


:deep(.el-input__wrapper ) {
  border-radius: 0 4px 4px 0;
}

:deep(.el-select__wrapper, .el-input) {
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

.button_query {
  height: 32px;
  border-radius: 4px;
  margin-top: 7px;
  display: flex;
  justify-content: left;
  align-items: center;
}

.button_item {
  margin-left: 10px;
}

</style>
