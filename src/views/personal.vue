<template>
  <div class="personal">
    <PersonalAvatar></PersonalAvatar>
    <PersonalInfo></PersonalInfo>
  </div>
</template>

<script setup>
import PersonalAvatar from '@/components/personal/personal_avatar.vue'
import PersonalInfo from '@/components/personal/personal_info.vue'
</script>

<style scoped>
.personal {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}
</style>
