<template>
</template>

<script setup>
import { reactive } from 'vue'

const apiTabs = reactive([
  {
    key: '用户管理',
    enabled: true,
    value: []
  },
  {
    key: '用户角色管理',
    enabled: true,
    value: []
  },
  {
    key: '用户权限管理',
    enabled: true,
    value: []
  },
  {
    key: '系统管理',
    enabled: true,
    value: []
  },
  {
    key: '系统接口管理',
    enabled: true,
    value: []
  }
])
</script>

<style scoped>
.el-checkbox{
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
