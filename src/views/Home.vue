<template>
  <el-container>
    <Nav></Nav>
    <el-container>
      <el-aside width="200px">
        <Aside></Aside>
      </el-aside>
      <el-container class="elcontainer2">
        <router-view></router-view>
      </el-container>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script setup>
import Nav from "../components/Nav/index.vue";
import Aside from "../components/Aside/index.vue";
</script>

<style lang="scss" scoped>
.elcontainer2 {
  display: flex;
  flex-direction: column;
}
.el-aside {
  height: calc(100vh - 120px);
  border-right: solid 1px #dcdfe6;
}
.el-footer {
  border-top: solid 1px #dcdfe6;
}


</style>
