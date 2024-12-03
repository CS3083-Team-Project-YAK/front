<!-- src/App.vue -->
<template>
  <div id="app">
    <Sidebar />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/AppSidebar.vue';

export default {
  name: 'App',
  components: {
    Sidebar
  }
};
</script>

<style>
/* 全局样式 */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  background-color: #f4f4f4;
}
.main-content {
  margin-left: 270px; /* 与侧边栏宽度对应 */
  padding: 20px;
}
</style>

