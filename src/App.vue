<script setup>
// 在 vue3 CompositionAPI中
// 1. 获取路由对象 router useRouter
//    const router = useRouter()
// 2. 获取路由参数 route useRoute
//    const route = useRoute()
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from './stores'

const router = useRouter()
const route = useRoute()

const goList = () => {
  router.push('/list')
  console.log(router, route)
}

const userStore = useUserStore()
</script>

<template>
  <div>
    <hr />
    <router-view></router-view>
    <hr />
    <hr />
    <hr />
    <hr />

    我是app
    <test-demo></test-demo>
    <el-button @click="$router.push('/home')">跳首页</el-button>

    <el-button type="primary">Primary</el-button>
    <el-button @click="goList">跳列表页</el-button>

    <p>{{ userStore.token }}</p>
    <el-button @click="userStore.setToken('sjhcfdkjfhjkdhfjkdhkj')"> 登录 </el-button>
    <el-button @click="userStore.removeToken()">退出</el-button>
  </div>
</template>

<style scoped></style>
