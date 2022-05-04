<template>
  <el-menu default-active="0" mode="horizontal">
    <el-menu-item
      v-for="(item, i) in msg"
      :key="i"
      :index="i"
      @click="goOtherPage(item.path)"
    >
      <span>{{ item.name }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { reactive, ref } from "vue";

const msg = reactive([
  { name: "个性推荐", path: "/h" },
  { name: "歌单", path: "/h" },
  { name: "排行榜", path: "/h" },
  { name: "歌手", path: "/h" },
]);

const goOtherPage=(oath)=>{
  
}
</script>

<style lang="scss" scoped>
.el-menu {
  border-bottom: none;
}
</style>
