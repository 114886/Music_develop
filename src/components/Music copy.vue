<template>
  <el-main class="elmain" v-if="MusicListCent">
    <el-scrollbar>
      <div class="top-des">
        <div class="imgdes">
          <img :src="MusicListCent.coverImgUrl" alt="稍等一下" />
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
            <button>1</button>
            <button>2</button>
            <button>3</button>
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
        :infinite-scroll-distance="1000"
        :infinite-scroll-immediate="false"
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
import { handleMusicTime, formatDate, handleNum } from "../plugins/utils";
const store = useStore();
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
  ...par,
  limit: 10,
  offset: 1,
};

let controlList = ref(true);
let isMore = ref(true);
const MusicList = ref([]);
const MusicListCent = ref({});

getMusicList(par).then((res) => {
  console.log(res);
  MusicListCent.value = res.playlist;
});

const initMusic = () => {
  getMusic(params).then((res) => {
    let x = res.songs;
    x.forEach((item) => {
      item.dt = handleMusicTime(item.dt);
    });
    MusicList.value.push(...x);
  });
  if (store.state.userprofile != undefined && isMore) {
    controlList.value = false;
    isMore.value = false;
  } else {
    controlList.value = true;
    isMore.value = true;
  }
};
initMusic();

const load = () => {
  if (MusicList.value.length < 110) {
    params.offset += 1;
    initMusic();
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
