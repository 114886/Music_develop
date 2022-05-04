<template>
  <el-menu :default-active="defaultActive" mode="horizontal" router>
    <el-menu-item
      v-for="item in msg"
      :key="item.id"
      :index="item.path"
      @click="savePath(item.path)"
    >
      <span>{{ item.name }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { reactive, ref } from "vue";

const msg = reactive([
  { name: "个性推荐", path: "/home/findmusic/find", id: 1 },
  { name: "歌单", path: "/home/findmusic/musicList", id: 2 },
  { name: "排行榜", path: "/h2", id: 3 },
  { name: "歌手", path: "/h3", id: 4 },
]);

const defaultActive = ref(sessionStorage.getItem('path') || '/home/findmusic/find')
const savePath = (path) => {
  sessionStorage.setItem('path', `${path}`)
}
</script>

<style lang="scss" scoped>
.el-menu {
  border-bottom: none;
}
</style>
