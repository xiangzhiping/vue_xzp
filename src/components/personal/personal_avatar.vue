<template>
  <div class="avatar">
    <div class="avatar_image">
      <img v-if="personalAvatarUrl" :src="personalAvatarUrl" alt="头像"/>
      <el-icon v-else size="25" color="#959696">
        <Avatar/>
      </el-icon>
    </div>
    <div class="avatar_button">
      <input type="file" id="avatar_upload" accept="image/png,image/jpeg" @change="personalAvatarUploadHandle">
      <el-button type="success" plain @click="personalAvatarUploadClickHandel">
        <el-icon size="20">
          <Upload/>
        </el-icon>
        <span>上传头像</span>
      </el-button>
      <el-button type="danger" plain @click="personalAvatarDeleteHandel">
        <el-icon size="20">
          <Delete/>
        </el-icon>
        <span>删除头像</span>
      </el-button>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {ElMessage} from 'element-plus';
import {
  personalAvatarLinkGet,
  personalAvatarDownload,
  personalAvatarUpload,
  personalAvatarDelete
} from '@/apis/personal.js';
import {Upload, Delete, Avatar} from '@element-plus/icons-vue';

const personalAvatarUrl = ref('');

const personalAvatarUploadClickHandel = () => {
  document.getElementById('avatar_upload').click();
};

const personalAvatarUploadHandle = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
    ElMessage.error('上传头像格式为 PNG 或 JPEG');
    return;
  }
  if (file.size / 1024 / 1024 > 2) {
    ElMessage.error('上传头像大小需小于 2MB');
    return;
  }

  const formData = new FormData();
  formData.append('avatar', file);
  const res = await personalAvatarUpload(formData);
  if (res.code === 200) {
    await personalAvatarLinkGetHandel();
  }
};

const personalAvatarLinkGetHandel = async () => {
  const url = (await personalAvatarLinkGet()).data;
  const img = await personalAvatarDownload(url);
  personalAvatarUrl.value = URL.createObjectURL(img);
};

const personalAvatarDeleteHandel = async () => {
  personalAvatarUrl.value = '';
  await personalAvatarDelete()
};

personalAvatarLinkGetHandel()
</script>

<style scoped>
.avatar {
  width: 240px;
  height: 280px;
  border-radius: 4px;
  display: flex;
  justify-content: left;
  flex-direction: column;
}

.avatar_image {
  width: 230px;
  height: 230px;
  cursor: pointer;
  border-radius: 4px;
  border-bottom: 1px solid var(--el-border-color);
  border-right: 1px solid var(--el-border-color);
  box-shadow: var(--el-box-shadow-light);
  display: flex;
  justify-content: center;
  align-items: center;
}

#avatar_upload {
  display: none
}

.avatar_button {
  width: 230px;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: end;
}

.el-button {
  height: 40px;
  width: 100px;
}
</style>
