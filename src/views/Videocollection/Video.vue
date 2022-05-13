<template>
  <el-main class="elmain">
    <el-scrollbar>
      <el-tabs v-model="activeName">
        <el-tab-pane label="视频" name="first">
          <Videolist></Videolist>
        </el-tab-pane>
        <el-tab-pane label="MV" name="second">
          <MVList></MVList>
        </el-tab-pane>
      </el-tabs>
    </el-scrollbar>
  </el-main>
</template>

<script setup>
import { ref } from "vue";
import MVList from "../../components/video/MVList.vue";
import Videolist from "../../components/video/Videolist.vue";

const activeName = ref("first");
</script>

<style lang="scss" scoped>
.elmain {
  height: calc(100vh - 180px);
}
</style>
