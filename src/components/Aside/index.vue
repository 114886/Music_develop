<template>
  <el-menu :default-active="defaultActive" router>
    <el-menu-item v-for="item in msg" :key="item.id" :index="item.path" @click="savePath2(item.path)">
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
  {
    name: "发现音乐",
    icon: "#icon-a-yinlebofangliebiaoyinle",
    path: "/home/findmusic",
    id: 1,
  },
  { name: "视频", icon: "#icon-shipin", path: "/", id: 2 },
  { name: "收藏", icon: "#icon-shoucang", path: "/", id: 3 },
  { name: "每日推荐", icon: "#icon-dianzan", path: "/", id: 4 },
  { name: "喜欢的音乐", icon: "#icon-yinle1", path: "/", id: 5 },
]);

const defaultActive = ref(sessionStorage.getItem('path2') || '/home/findmusic')
const savePath2 = (path) => {
  sessionStorage.setItem('path2', `${path}`)
}

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
