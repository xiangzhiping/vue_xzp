<template>
  <div ref="myDiv" style="width: 300px; height: 200px;">
    <!-- Your content here -->
  </div>
</template>

<script setup>
import {onMounted, onBeforeUnmount, ref} from 'vue';

const myDiv = ref(null);

// 使用 ResizeObserver 监听 div 高度变化
const ro = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    checkHeight(entry.contentRect.height);
  });
});

onMounted(() => {
  ro.observe(myDiv.value);
});

onBeforeUnmount(() => {
  ro.disconnect();
});

const checkHeight = (height) => {
  console.log('Height changed:', height);
  // Do something with the new height
};
</script>
