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
  display: flex;
  justify-content: center;
}
</style>
