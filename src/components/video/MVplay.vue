<template>
  <el-main class="elmain">
    <el-scrollbar>
      <div class="container">
        <div class="left">
          <h1>MV详情</h1>
          <video class="video" :src="MVPlayAdd" controls></video>
          <div class="ar-content">
            <div class="ar-top">
              <img
                v-if="MVDetail.artists"
                :src="MVDetail.artists[0].img1v1Url"
              />
              <span>{{ MVDetail.artistName }}</span>
            </div>
            <div class="ar-bom">
              <h1>
                {{ MVDetail.name }}
              </h1>
              <div class="jianjie">
                <span>发布：{{ MVDetail.publishTime }}</span>
                <span>播放：{{ MVDetail.playCount }}</span>
              </div>
              <p class="des">
                {{ MVDetail.desc }}
              </p>
            </div>
          </div>
        </div>
        <div class="right">
          <h1>相关推荐</h1>
          <div class="item" v-for="item in MVVideo" :key="item.vid">
            <img :src="item.coverUrl" alt="" @click="goToVideo(item.vid)" />
            <div class="content">
              <span class="c-1">{{ item.title }}</span>
              <span class="c-2">by {{ item.creator[0].userName }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </el-main>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { RelatedVideo } from "../../api/video";
import { getMvDetail, getMvAddress } from "../../api/mv";
import dayjs from "dayjs";

const store = useStore();
const MVPlayAdd = ref(""); // 播放地址
const MVDetail = ref({}); // 视频详情
const MVVideo = ref([]); // 相关视频
getMvDetail(store.state.video.mvid).then((res) => {
  MVDetail.value = res.data;
});

getMvAddress(store.state.video.mvid).then((res) => {
  MVPlayAdd.value = res.data.url;
});

RelatedVideo(store.state.video.mvid).then((res) => {
  MVVideo.value = res.data;
});

const goToVideo = (vid) => {
  store.commit("video/getVid", vid);
};
</script>

<style lang="scss" scoped>
.elmain {
  height: calc(100vh - 180px);
}
.container {
  width: 100%;
  display: flex;
  align-items: flex-start;
  .left {
    h1 {
      font-size: 20px;
      margin: 5px;
    }
  }
}
.video {
  height: auto;
  width: 50vw;
  object-fit: cover;
  min-width: 600px;
}
.ar-content {
  display: flex;
  width: 50vw;
  min-width: 600px;
  flex-direction: column;
  .ar-top {
    display: flex;
    align-items: center;
    margin: 15px;
    img {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 50%;
    }
    span {
      display: block;
      font-weight: 400;
      margin-left: 10px;
    }
  }
  .ar-bom {
    display: flex;
    flex-direction: column;
    h1 {
      font-size: 24px;
      margin: 10px 3px;
      width: 100%;
      word-wrap: break-word;
    }
    .jianjie {
      display: flex;
      align-items: center;
      span {
        font-size: 13px;
        display: block;
        margin: 0 10px;
        color: rgb(207, 207, 207);
      }
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      width: 100%;
      text-align: center;
      .tag {
        margin: 10px 2px;
        padding: 6px 10px;
        font-size: 16px;
        /* width: 40px; */
        color: #606060;
        text-align: center;
        box-sizing: content-box;
        transform: scale(0.9, 0.9);
        background-color: #ececec;
        border-radius: 10px;
      }
    }
    .des {
      font-size: 13px;
      margin: 15px 3px;
      width: 100%;
      word-wrap: break-word;
    }
  }
}
.right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  h1 {
    font-size: 18px;
    margin-left: 15px;
    margin-top: 10px;
  }
  .item {
    display: flex;
    align-items: center;
    margin: 10px;
    img {
      width: 185px;
      height: 100px;
      object-fit: cover;
      border-radius: 10px;
      cursor: pointer;
    }
    .content {
      width: 200px;
      display: flex;
      flex-direction: column;
      span {
        display: block;
        margin: 5px;
      }
      .c-1 {
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        font-size: 13px;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .c-2 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        color: #656565bb;
        margin: 5px;
      }
    }
  }
}
</style>
