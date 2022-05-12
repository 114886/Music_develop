<template>
  <el-main class="elmain" v-if="MusicListCent">
    <el-scrollbar>
      <div class="top-des">
        <div class="imgdes">
          <img :src="MusicListCent.coverImgUrl" />
        </div>

        <div class="right">
          <div class="r-1">
            <div class="titleTag">歌单</div>
            <div class="titleContent">{{ MusicListCent.name }}</div>
          </div>

          <div class="r-2" v-if="MusicListCent.creator">
            <div class="userAvatar">
              <img :src="MusicListCent.creator.avatarUrl" alt="" />
            </div>
            <div class="userName">
              {{ MusicListCent.creator.nickname }}
            </div>
            <div class="createTime">
              {{ showDate(MusicListCent.createTime) }}创建
            </div>
          </div>

          <div class="r-3">
            <el-button type="danger" round @click="allPlay">
              <svg class="icon" aria-hidden="true" ref="icon">
                <use xlink:href="#icon-bofang"></use>
              </svg>
              播放全部
            </el-button>
            <!-- <el-button round @click="Collectsonglists(1, MusicListCent.id)">
              <svg class="icon" aria-hidden="true" ref="icon">
                <use xlink:href="#icon-shoucang"></use>
              </svg>
              收藏
            </el-button>
            <el-button round>
              <svg
                class="icon"
                aria-hidden="true"
                ref="icon"
                style="color: red"
              >
                <use xlink:href="#icon-xihuan3"></use>
              </svg>
              收藏
            </el-button> -->
            <el-button round>
              <svg class="icon" aria-hidden="true" ref="icon">
                <use xlink:href="#icon-fenxiang1"></use>
              </svg>
              分享
            </el-button>
          </div>

          <div class="r-4-1" v-if="MusicListCent.tags">
            标签：
            <div
              class="tagItem"
              v-for="(item, index) in MusicListCent.tags"
              :key="index"
            >
              {{ item }}
            </div>
            <div v-if="MusicListCent.tags.length == 0">暂无标签</div>
          </div>
          <div class="r-4-2">
            <div class="musicNum">
              歌曲 : {{ handleNum(MusicListCent.trackCount) }}
            </div>
            <div class="musicNum">
              播放 : {{ handleNum(MusicListCent.playCount) }}
            </div>
          </div>
          <div class="r-4-3">
            简介 :
            {{
              MusicListCent.description ? MusicListCent.description : "暂无简介"
            }}
          </div>
        </div>
      </div>

      <el-table
        :data="MusicList"
        stripe
        size="small"
        class="music-table"
        highlight-current-row
        v-infinite-scroll="load"
        :infinite-scroll-disabled="controlList"
        :infinite-scroll-distance="1500"
        :infinite-scroll-immediate="false"
        @row-dblclick="clickRow"
        @cell-click="clickCell"
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
      <div class="loadMore" v-if="isMore">登陆后查看更多音乐</div>
    </el-scrollbar>
  </el-main>
</template>

<script setup>
import { useStore } from "vuex";
import { ref } from "vue";
import { getMusic, getMusicList } from "../api/music";
import { CollectOrCancel } from "../api/favorites";
import { handleMusicTime, formatDate, handleNum } from "../plugins/utils";
const store = useStore();

// const Collectsonglists = (t, id) => {
//   let xxx = {
//     t: t,
//     id: id,
//   };
//   CollectOrCancel(xxx).then((res) => {
//     console.log(res);
//   });
// };
const handleIndex = (index) => {
  index += 1;
  if (index < 10) {
    return "0" + index;
  } else {
    return index;
  }
};
const showDate = (value) => {
  // 1、先将时间戳转成Date对象
  const date = new Date(value);
  // 2、将date进行格式化
  return formatDate(date, "yyyy-MM-dd");
};

let par = {
  id: store.state.musicId,
};

let params = {
  ids: "",
};

let controlList = ref(true);
let isMore = ref(true);
const MusicList = ref([]);
const MusicListCent = ref({});
const allMusic = ref([]);
const allMusic2 = ref([]);

getMusicList(par).then((res) => {
  ElMessage({
    showClose: true,
    message: "很抱歉！某些音乐由于权限问题无法播放，请手动切换下一首。",
    type: "warning",
    duration: 3000,
  });
  if (
    store.state.musicId == JSON.parse(sessionStorage.getItem("userLikeId")) &&
    store.state.panduanindex == 1
  ) {
    store.commit("changepanduanindex", 2);
    ElMessageBox.alert(
      "由于接口限制原因，新 收藏/取消收藏 的歌曲需要您重新登录才可以看到。",
      "温馨提示：",
      {
        confirmButtonText: "OK",
        callback: (action) => {
          ElMessage({
            type: "info",
            message: `温馨提示: ${action}`,
          });
        },
      }
    );
  }
  // console.log(res);
  MusicListCent.value = res.playlist;
  MusicList.value = res.playlist.tracks;
  MusicList.value.forEach((item) => {
    item.dt = handleMusicTime(item.dt);
  });
  res.playlist.trackIds.forEach((item) => {
    if (params.ids == "") {
      params.ids = item.id;
    } else {
      params.ids = params.ids + "," + item.id;
    }
  });
  if (store.state.userprofile != undefined && isMore) {
    controlList.value = false;
    isMore.value = false;
  } else {
    controlList.value = true;
    isMore.value = true;
  }
  // 发送准备播放得歌单
  // console.log(...MusicList.value);
  // if (isMore.value) {
  //   store.commit("music/changePlaylist", MusicList.value);
  // }
  // console.log(store.state.music.playlist);
  // ...
  getMusic(params).then((res) => {
    res.songs.forEach((item) => {
      item.dt = handleMusicTime(item.dt);
    });
    // if (!isMore.value) {
    //   store.commit("music/changePlaylist", res.songs);
    // }
    allMusic2.value = res.songs;
    for (let i = 0; i < res.songs.length; i += 10) {
      allMusic.value.push(res.songs.slice(i, i + 10));
    }
    // console.log(allMusic.value);
  });
});

let zhunbei = 1;
const clickRow = (row) => {
  if (zhunbei === 1) {
    zhunbei++;
    // console.log(allMusic2.value);
    if (isMore.value) {
      store.commit("music/changePlaylist", MusicList.value);
    } else {
      store.commit("music/changePlaylist", allMusic2.value);
    }
  }
  store.dispatch("music/changePlayList", row);
};

const allPlay = () => {
  if (isMore.value) {
    store.commit("music/changePlaylist", MusicList.value);
    store.commit("music/setPlayIndex", 0);
  } else {
    store.commit("music/changePlaylist", allMusic2.value);
    store.commit("music/setPlayIndex", 0);
  }
};

let num = 0;
const load = () => {
  if (allMusic.value.length)
    if (allMusic.value.length > num) {
      num++;
      MusicList.value.push(...allMusic.value[num]);
    } else {
      controlList.value = true;
    }
};
</script>

<style lang="scss" scoped>
.top-des {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 25px 15px;
  .imgdes {
    margin-right: 15px;
    img {
      border-radius: 10px;
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
  }

  .right {
    padding-left: 30px;
    padding-right: 50px;
    display: flex;
    flex-direction: column;
    width: calc(100% - 200px);
    .r-1 {
      display: flex;
      align-items: center;
      .titleTag {
        font-size: 12px;
        color: #ec4141;
        border: 1px solid #ec4141;
        padding: 1px 2px;
        border-radius: 2px;
        margin-right: 5px;
        transform: scale(0.8);
      }

      .titleContent {
        font-size: 20px;
        font-weight: 600;
        color: #373737;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 90%;
      }
    }
    .r-2 {
      display: flex;
      align-items: center;
      margin-top: 8px;
      font-size: 12px;
      .userAvatar {
        height: 30px;
        width: 30px;
        margin-right: 8px;
        img {
          width: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      .userName {
        color: #6191c2;
        margin-right: 8px;
      }
      .createTime {
        transform: scale(0.9);
      }
    }
    .r-3 {
      display: flex;
      margin: 8px 0 0 0;
      .icon {
        margin-right: 5px;
      }
    }

    .r-4-1 {
      margin: 8px 0 0 0;
      display: flex;
      font-size: 13px;

      .tagItem {
        font-size: 13px;
        color: #6191c2;
        margin-right: 5px;
      }
    }
    .r-4-2 {
      margin: 5px 0 0 0;
      display: flex;
      font-size: 13px;

      .musicNum {
        font-size: 13px;
        margin-right: 13px;
      }
    }
    .r-4-3 {
      margin: 5px 0 0 0;
      font-size: 13px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.elmain {
  height: calc(100vh - 180px);
}
.music-table {
  margin: 0 auto;
  width: 80vw;
}
.loadMore {
  width: 100%;
  height: 50px;
  font-size: 13px;
  color: #aaa;
  text-align: center;
  line-height: 50px;
  transform: scale(0.9);
}
</style>
