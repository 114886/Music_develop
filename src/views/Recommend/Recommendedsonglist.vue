<template>
  <el-main class="elmain">
    <el-scrollbar>
      <div class="container">
        <svg class="icon" aria-hidden="true" ref="icon">
          <use xlink:href="#icon-tuijiangedan"></use>
        </svg>
        <div class="content">
          <h1>每日歌曲推荐</h1>
          <span>根据你的口味生成，每天6:00更新</span>
        </div>
      </div>
      <el-table
        :data="dailySongs"
        stripe
        size="small"
        class="music-table"
        highlight-current-row
        @row-dblclick="clickRow"
        lazy
        :row-key="
          (row) => {
            return row.id;
          }
        "
      >
        <el-table-column
          type="index"
          label=""
          width="60"
          :index="handleIndex"
        />
        <el-table-column prop="name" label="音乐标题" width="400" />
        <el-table-column prop="ar[0].name" label="歌手" width="300" />
        <el-table-column prop="al.name" label="专辑" width="300" />
        <el-table-column prop="dt" label="时长" />
      </el-table>
    </el-scrollbar>
  </el-main>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { getRecommend } from "../../api/recommend";
import { handleMusicTime } from "../../plugins/utils";
const store = useStore();

const dailySongs = ref([]);
if (store.state.userprofile != undefined) {
  getRecommend().then((res) => {
    dailySongs.value = res.data.dailySongs;
    dailySongs.value.forEach((x) => {
      x.dt = handleMusicTime(x.dt);
    });
  });
}
const clickRow = (row) => {
  // console.log(row);
  store.dispatch("music/changePlayList", row);
  // // console.log(store.state.music.playlist.length);
  store.commit("music/setPlayIndex", store.state.music.playlist.length - 1);
};
</script>

<style lang="scss" scoped>
.elmain {
  height: calc(100vh - 180px);
}
.music-table {
  margin: 0 auto;
  width: 80vw;
}
.container {
  display: flex;
  .icon {
    width: 80px;
    height: 80px;
    margin: 30px;
  }
  .content {
    margin: 30px;
    h1 {
      font-size: 24px;
    }
    span{
      margin-top: 5px;
      display: block;
      color: rgb(143, 143, 143);
    }
  }
}
</style>
