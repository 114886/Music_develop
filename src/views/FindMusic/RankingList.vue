<template>
  <span class="span2">官方榜</span>
  <div class="office">
    <div class="officeItem" v-for="item in officialList" :key="item.id">
      <div class="listCover">
        <img :src="item.coverImgUrl" alt="" @click="goMusicList(item.id)" />
      </div>
      <div class="listCent">
        <el-table
          :data="item.xxxx"
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
          <el-table-column type="index" label="" width="60" :index="index" />
          <el-table-column prop="name" width="400" />
          <el-table-column prop="ar[0].name" width="300" />
        </el-table>
        <div class="checkAll" @click="goMusicList(item.id)">查看全部 ></div>
      </div>
    </div>
  </div>
  <span class="span2">全球榜</span>
  <div class="list">
    <div
      class="listcard"
      v-for="item in globalList"
      :key="item.id"
      @click="goMusicList(item.id)"
    >
      <img :src="item.coverImgUrl" alt="" />
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { getAlltoplist } from "../../api/rankinglist";
import { getMusicList } from "../../api/music";
import { handleMusicTime } from "../../plugins/utils";

const store = useStore();
const officialList = ref([]);
const globalList = ref([]);
getAlltoplist().then((res) => {
  officialList.value = res.list.slice(0, 4);
  globalList.value = res.list.slice(4);
  // console.log(officialList.value);
  officialList.value.forEach((item) => {
    let pp = {
      id: item.id,
    };
    getMusicList(pp).then((res) => {
      item.xxxx = res.playlist.tracks.slice(0, 5);
      item.xxxx.forEach((x) => {
        x.dt = handleMusicTime(x.dt);
      });
    });
  });
});
const goMusicList = (id) => {
  if (store.state.userprofile == undefined) {
    ElMessage({
      showClose: true,
      message: "登录之后方可查看全部音乐！",
      type: "warning",
      duration: 5000,
    });
  } else {
    store.commit("getMusicId", id);
  }
};
const clickRow = (row) => {
  // console.log(row);
  store.dispatch("music/changePlayList", row);
  // // console.log(store.state.music.playlist.length);
  store.commit("music/setPlayIndex", store.state.music.playlist.length - 1);
};
</script>

<style lang="scss" scoped>
.span2 {
  font-size: 22px;
  margin: 10px;
  color: rgb(87, 87, 87);
  display: block;
}
.office {
  .officeItem {
    display: flex;
    margin: 20px 0 50px 10px;
    .listCover {
      width: 240px;
      height: 240px;
      margin-right: 20px;
      cursor: pointer;
      img {
        width: 100%;
        border-radius: 10px;
      }
    }
    .listCent {
      width: calc(100% - 200px);
      .checkAll {
        color: rgb(134, 134, 134);
        font-size: 14px;
        transform: scale(0.9) translateX(-5%);
        width: 100px;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
      }
    }
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
</style>
