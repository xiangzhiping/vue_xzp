<template>
  <div class="right_header">
    <el-tooltip content="退出登录" effect="light">
      <div class="personal_logout" @click="userLogoutHandel">
        <el-icon  size="18"><SwitchButton/></el-icon>
      </div>
    </el-tooltip>
    <el-tooltip content="个人信息" effect="light">
      <div class="personal_info" @click="navigateToPersonalHandel">
        <el-icon  size="18"><User/></el-icon>
      </div>
    </el-tooltip>
    <el-tooltip content="个人头像" effect="light">
      <div class="personal_avatar">
        <el-avatar v-if="personalAvatarUrl" shape="square" fit="cover" :size="25" :src="personalAvatarUrl"/>
        <el-icon v-else size="18" ><Avatar/></el-icon>
      </div>
    </el-tooltip>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import router from "@/router";
import {Avatar, SwitchButton, User} from '@element-plus/icons-vue'
import {userLogout} from '@/apis/user.js';
import {personalAvatarLinkGet, personalAvatarDownload} from '@/apis/personal.js';

const userLogoutHandel = async () => {
  const res = await userLogout();
  if (res.code === 200){
    localStorage.removeItem("Authorization")
    await router.push('/login')
  }
};

const personalAvatarUrl = ref('');

const personalAvatarGetHandle = async () => {
  const url = (await personalAvatarLinkGet()).data;
  const image = await personalAvatarDownload(url);
  personalAvatarUrl.value = URL.createObjectURL(image);
};
personalAvatarGetHandle();

const navigateToPersonalHandel = async () => {
  await router.push('/personal')
};
</script>

<style scoped>
.right_header{
  height: 50px;
  display: flex;
  align-items: center;
}
.personal_avatar, .personal_logout, .personal_info{
  width: 40px;
  height: 40px;
  margin-right: 5px;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.personal_avatar{
  color: #E6A23C;
}

.personal_logout{
  color: #F56C6C;
}

.personal_info{
  color: #409EFF;
}

.personal_logout:hover, .personal_info:hover, .personal_avatar:hover{
  background: #ededee;
}
.el-avatar {
  width: 100%;
  height: 41px;
  background: transparent;
  color: #a1a2a2;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
