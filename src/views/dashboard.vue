<template>
  <div>
    <a-button @click="toggleModal">显示</a-button>
    <div v-if="isModalVisible" class="modal">
      <div class="modal-content">
        <p>这是一个浮动的 div。</p>
        <a-button @click="toggleModal">关闭</a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Button as AButton } from 'ant-design-vue';

// 定义一个变量来控制模态框的显示/隐藏
const isModalVisible = ref(false);

// 定义一个方法来切换模态框的显示状态
function toggleModal() {
  isModalVisible.value = !isModalVisible.value;
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  z-index: 1000; /* 确保模态框在其他元素之上 */
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

</style>
