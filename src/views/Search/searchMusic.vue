<template>
  <el-main class="elmain">
    <el-scrollbar>
      <h1>找到{{ total }}首单曲</h1>
      <el-table
        :data="MusicList"
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
      <el-pagination
        v-model:currentPage="pam.offset"
        v-model:page-size="pam.limit"
        :small="pam.limit"
        :page-sizes="[30, 40, 50]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-scrollbar>
  </el-main>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { searchMusic } from "../../api/search";
import { handleMusicTime } from "../../plugins/utils";

const store = useStore();
const MusicList = ref([]);
const total = ref(0);
const pam = ref({
  keywords: store.state.search.keywords,
  limit: 30,
  offset: 1,
});

const initSearchMusic = () => {
  searchMusic(pam.value).then((res) => {
    // console.log(res);
    total.value = res.result.songCount;
    MusicList.value = res.result.songs;
    MusicList.value.forEach((item) => {
      item.dt = handleMusicTime(item.dt);
    });
  });
};
initSearchMusic();

const handleSizeChange = (val) => {
  pam.value.offset = 1;
  pam.value.limit = val;
  initSearchMusic();
};
const handleCurrentChange = (val) => {
  pam.value.offset = val;
  initSearchMusic();
};

const clickRow = (row) => {
  let x = store.state.music.playlist.length;
  store.dispatch("music/changePlayList", row);
  if (x != store.state.music.playlist.length) {
    store.commit("music/setPlayIndex", store.state.music.playlist.length - 1);
  }
};

const handleIndex = (index) => {
  index += 1 + (pam.value.offset - 1) * pam.value.limit;
  if (index < 10) {
    return "0" + index;
  } else {
    return index;
  }
};

watchEffect(() => {
  if (store.state.search.keywords != pam.value.keywords) {
    pam.value.keywords = store.state.search.keywords;
    pam.value.offset = 1;
    pam.value.limit = 30;
    initSearchMusic();
  }
});
</script>

<style lang="scss" scoped>
.elmain {
  height: calc(100vh - 180px);
}
.music-table {
  margin: 0 auto;
  width: 80vw;
}
h1 {
  font-size: 22px;
  margin: 10px;
  margin-bottom: 30px;
}
::v-deep .el-pagination {
  margin-top: 25px;
  box-sizing: border-box;
  justify-content: flex-end;
}
</style>
