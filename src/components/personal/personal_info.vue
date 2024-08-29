<template>
  <div class="personal-info">
    <el-descriptions :column="1" border>
      <el-descriptions-item label="个人ID" label-align="center" align="center" width="100px">
        {{ personalInfo.user_id }}
      </el-descriptions-item>
      <el-descriptions-item label="个人昵称" label-align="center" align="center" width="100px">
        {{ personalInfo.nickname }}
      </el-descriptions-item>
      <el-descriptions-item label="电话号码" label-align="center" align="center" width="100px">
        {{ personalInfo.phone }}
      </el-descriptions-item>
      <el-descriptions-item label="邮箱地址" label-align="center" align="center" width="100px">
        {{ personalInfo.email }}
      </el-descriptions-item>
      <el-descriptions-item label="登录状态" label-align="center" align="center" width="100px">
        <el-icon :size="18" :color="personalInfo.login_status === true ? '#67C23A' : '#F56C6C'">
          <SwitchButton/>
        </el-icon>
      </el-descriptions-item>
      <el-descriptions-item label="登录时间" label-align="center" align="center" width="100px">
        {{ personalInfo.login_datetime }}
      </el-descriptions-item>
      <el-descriptions-item label="创建时间" label-align="center" align="center" width="100px">
        {{ personalInfo.create_datetime }}
      </el-descriptions-item>
    </el-descriptions>

  </div>
</template>

<script setup>
import {ref} from 'vue';
import {personalInfoGet} from '@/apis/personal.js';
import {SwitchButton} from '@element-plus/icons-vue';

let personalInfo = ref({
  user_id: null,
  nickname: null,
  phone: null,
  email: null,
  login_status: false,
  login_datetime: null,
  logout_datetime: null,
})


const personalInfoGetHandel = async () => {
  personalInfo.value = (await personalInfoGet()).data
}
personalInfoGetHandel()
</script>

<style scoped>
.personal-info {
  height: 280px;
  border-bottom: 1px solid var(--el-border-color);
  border-left: 1px solid var(--el-border-color);
  box-shadow: var(--el-box-shadow-lighter);
  display: flex;
  flex-grow: 1;
  font-size: 20px;
}


:deep(.el-descriptions__body .el-descriptions__table .el-descriptions__cell) {
  font-size: 16px;
  font-family: 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
</style>
