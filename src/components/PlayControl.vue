<template>
  <div class="container">
    <div class="left">
      <img
        v-if="playlist[0]"
        :src="playlist[playCurrentIndex].al.picUrl"
        @click="MusicCenter = !MusicCenter"
      />
      <img v-show="!playlist[0]" src="/test.jpg" />
      <div class="content">
        <div class="user-content" v-if="playlist[0]">
          <span>{{ playlist[playCurrentIndex].name }}</span>
          <span>{{ playlist[playCurrentIndex].ar[0].name }}</span>
        </div>
        <div class="download" v-show="playlist[0]">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiazai3"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="c-top">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-suiji1"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shangyishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="playMusic">
          <use :xlink:href="palyButton"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xihuan"></use>
        </svg>
      </div>
      <div class="c-bom">
        <audio
          ref="audio"
          autoplay
          :src="
            playlist[0]
              ? `https://music.163.com/song/media/outer/url?id=${playlist[playCurrentIndex].id}.mp3`
              : ''
          "
        ></audio>
      </div>
    </div>
    <div class="right">
      <div class="volume">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-24gf-volumeMiddle"></use>
        </svg>
      </div>
      <svg class="icon" aria-hidden="true" @click="musicTable = true">
        <use xlink:href="#icon-yinleliebiao"></use>
      </svg>
    </div>
    <el-drawer
      v-model="musicTable"
      :title="`播放历史列表，总${playlist.length}首`"
      direction="rtl"
      size="30%"
    >
      <el-table :data="playlist" size="small" @row-dblclick="qwe">
        <el-table-column property="name" width="200" />
        <el-table-column property="ar[0].name" width="100" />
        <el-table-column property="dt" />
      </el-table>
    </el-drawer>
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <MusicCont
        v-if="MusicCenter"
        :playDetail="playlist[playCurrentIndex]"
      ></MusicCont>
    </transition>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import MusicCont from "./MusicCont/index.vue";

const MusicCenter = ref(false);

const store = useStore();
const playlist = computed(() => store.state.music.playlist);
// console.log(playlist);
const playCurrentIndex = computed(() => store.state.music.playCurrentIndex);
const { proxy } = getCurrentInstance();
const palyButton = ref("#icon-bofang1");

const qwe = (row) => {
  let index = playlist.value.findIndex((item) => item.id == row.id);
  store.commit("music/setPlayIndex", index);
  palyButton.value = "#icon-zanting";
};

const musicTable = ref(false);

let m = 1;
watch(
  playlist,
  () => {
    // console.log("执行了");
    if (m === 1) {
      playMusic();
    }
    store.commit("music/setPlayIndex", playlist.value.length - 1);
    palyButton.value = "#icon-zanting";
    m = 0;
  },
  { deep: true }
);

const playMusic = () => {
  // console.log([proxy.$refs.audio]);
  if (proxy.$refs.audio.paused) {
    proxy.$refs.audio.play();
    palyButton.value = "#icon-zanting";
  } else {
    proxy.$refs.audio.pause();
    palyButton.value = "#icon-bofang1";
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-drawer__header {
  margin-bottom: 0;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  .left {
    display: flex;
    align-items: center;
    width: 150px;
    img {
      width: 55px;
      height: 55px;
      border-radius: 10px;
    }
    .content {
      padding-left: 10px;
      display: flex;
      align-items: flex-end;
      .user-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
          width: 180px;
          padding: 2px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        :last-child {
          font-size: 14px;
        }
      }
      .download {
        padding-left: 15px;
        .icon {
          width: 25px;
          height: 25px;
          color: #27d0d8;
        }
      }
    }
  }
  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
    .c-top {
      .icon {
        width: 70px;
        height: 25px;
        color: #27d0d8;
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    .volume {
      width: 70px;
    }
    .icon {
      width: 25px;
      height: 25px;
      color: #27d0d8;
    }
  }
}
</style>
