<template>
  <el-menu default-active="0">
    <el-menu-item v-for="(item, i) in msg" :key="i" :index="i">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="item.icon"></use>
      </svg>
      <span>{{ item.name }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { reactive, ref } from "vue";

const msg = reactive([
  { name: "发现音乐", icon: "#icon-a-yinlebofangliebiaoyinle" },
  { name: "视频", icon: "#icon-shipin" },
  { name: "收藏", icon: "#icon-shoucang" },
  { name: "每日推荐", icon: "#icon-dianzan" },
  { name: "喜欢的音乐", icon: "#icon-yinle1" },
]);
</script>

<style lang="scss" scoped>
.el-menu {
  border: none;
  .el-menu-item {
    display: flex;
    justify-content: start;
    align-items: center;
    text-align: center;
    font-weight: 600;
    .icon {
      height: 20px;
      width: 20px;
      padding-right: 5px;
    }
  }
}
</style>
