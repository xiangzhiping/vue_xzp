<script setup>
import UserRoleHead from "@/components/user_role/user_role_head.vue";
import UserRoleBody from "@/components/user_role/user_role_body.vue";
</script>

<template>
  <div class="user_role">
    <UserRoleHead></UserRoleHead>
    <UserRoleBody></UserRoleBody>
  </div>
</template>

<style scoped>
.user_role{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
