<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>
<template>
  <!-- App.vue只需要留一个出口router-view即可 -->
  <div>
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<style scoped></style>
