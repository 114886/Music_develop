<template>
  <div class="topSongList">
    <img :src="Boutiquesonglist.coverImgUrl" alt="" class="bg" />
    <img
      :src="Boutiquesonglist.coverImgUrl"
      alt=""
      class="cover"
      @click="goMusicList(Boutiquesonglist.id)"
    />
    <div class="top-content">
      <div class="content-top">
        <svg class="icon" aria-hidden="true" ref="icon">
          <use xlink:href="#icon-good"></use>
        </svg>
        <span>精品歌单</span>
      </div>
      <span class="span">{{ Boutiquesonglist.name }}</span>
    </div>
  </div>
  <div class="tags">
    <div
      class="tag"
      :class="{ active: item.name == params.cat }"
      v-for="item in Songlistlabel"
      :key="item.id"
      @click="ChangeHotSong(item.name)"
    >
      {{ item.name }}
    </div>
  </div>
  <div class="list">
    <div
      class="listcard"
      v-for="item in Allsonglists"
      :key="item.id"
      @click="goMusicList(item.id)"
    >
      <img :src="item.coverImgUrl" alt="" />
      <span>{{ item.name }}</span>
    </div>
  </div>
  <el-pagination
    class="qwe"
    :pager-count="11"
    v-model:currentPage="params.offset"
    :page-size="params.limit"
    layout="prev, pager, next"
    background
    :small="small"
    :total="total"
    @current-change="handleCurrentChange"
  />
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import {
  getTopOneSong,
  getHotSongs,
  getHotMusicPag,
} from "../../api/songsList";

const store = useStore();
let params = ref({
  order: "hot",
  cat: "华语",
  limit: 50,
  offset: 1,
});
const total = ref(0);
const Boutiquesonglist = ref([]);
const Songlistlabel = ref([]);
const Allsonglists = ref([]);
getTopOneSong().then((res) => {
  Boutiquesonglist.value = res.playlists[0];
});
getHotMusicPag().then((res) => {
  Songlistlabel.value = res.tags;
});
const GetHotSong = () => {
  getHotSongs(params.value).then((res) => {
    total.value = res.total;
    Allsonglists.value = res.playlists;
  });
};
GetHotSong();
const ChangeHotSong = (name) => {
  params.value.cat = name;
  GetHotSong();
};
const goMusicList = (id) => {
  store.commit("getMusicId", id);
};
const handleCurrentChange = (val) => {
  params.value.offset = val;
  GetHotSong();
};
</script>

<style lang="scss" scoped>
.topSongList {
  position: relative;
  width: 100%;
  height: 180px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: translateY(-80px);
    filter: blur(30px) brightness(70%);
  }
  .cover {
    width: 160px;
    height: 160px;
    margin: 10px;
    object-fit: cover;
    cursor: pointer;
    border-radius: 10px;
  }
  .top-content {
    .span {
      color: white;
      font-size: 20px;
      margin: 10px 0;
    }
    .content-top {
      color: #fcbc68;
      border: 1px solid #fcbc68;
      padding: 5px 10px;
      width: 110px;
      font-size: 20px;
      margin: 20px 10px 15px;
      border-radius: 15px;
      .icon {
        margin-right: 3px;
        width: 20px;
        height: 20px;
      }
    }
  }
}
.tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  text-align: center;
  .tag {
    margin: 10px -2px;
    padding: 6px 10px;
    font-size: 16px;
    /* width: 40px; */
    color: #606060;
    text-align: center;
    box-sizing: content-box;
    transform: scale(0.9, 0.9);
    cursor: pointer;
  }
  .active {
    background-color: #fdf5f5;
    color: #ec4747;
    border-radius: 11px;
  }
}
.list {
  display: flex;
  flex-wrap: wrap;
  .listcard {
    margin: 9px;
    width: 240px;
    overflow: hidden;
    cursor: pointer;
    img {
      width: 100%;
      height: 240px;
      object-fit: cover;
      border-radius: 10px;
    }
    span {
      margin-top: 8px;
      padding: 0 2px;
      font-size: 14px;
      color: black;
      line-height: 17px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
.qwe {
  margin: 20px 10px;
  box-sizing: border-box;
  justify-content: flex-end;
}
</style>
