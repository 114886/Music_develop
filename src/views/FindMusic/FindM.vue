<template>
  <el-header>
    <MainNav></MainNav>
  </el-header>
  <el-main class="elmain">
    <el-scrollbar>
      <router-view></router-view>
    </el-scrollbar>
  </el-main>
</template>

<script setup>
import MainNav from "../../components/MainNav/index.vue";
</script>

<style lang="scss" scoped>
.elmain {
  height: calc(100vh - 180px);
}
</style>
