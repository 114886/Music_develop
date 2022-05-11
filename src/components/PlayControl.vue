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
        <!-- <div class="download" v-show="playlist[0]">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiazai3"></use>
          </svg>
        </div> -->
      </div>
    </div>
    <div class="center">
      <div class="c-top">
        <svg class="icon icon1" aria-hidden="true" @click="changeListIcon">
          <use :xlink:href="`#${ListIcon}`"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="lastMusic">
          <use xlink:href="#icon-shangyishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="playMusic">
          <use :xlink:href="palyButton"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="nextMusic">
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
          @timeupdate="timeupdate"
        ></audio>
        <div class="slider">
          <span>{{ handleMusicTime(lastSecond) }}</span>
          <el-slider
            class="progressSlider"
            v-model="timeProgress"
            :show-tooltip="false"
            @change="changeProgress"
            :disabled="playlist.length == 0"
          />
          <span>{{ handleMusicTime(store.state.durationNum) }}</span>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="volume">
        <svg class="icon" aria-hidden="true" ref="icon">
          <use xlink:href="#icon-24gf-volumeMiddle"></use>
        </svg>
        <el-slider
          class="progressSlider"
          v-model="volume"
          @input="changeVolume"
          :show-tooltip="false"
        />
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
import { computed, getCurrentInstance, ref, watch } from "vue";
import { useStore } from "vuex";
import MusicCont from "./MusicCont/index.vue";
import { returnSecond, handleMusicTime } from "../plugins/utils";

const MusicCenter = ref(false);

const store = useStore();
const playlist = computed(() => store.state.music.playlist);

const playCurrentIndex = computed(() => store.state.music.playCurrentIndex);
const { proxy } = getCurrentInstance();
const palyButton = ref("#icon-bofang1");

const qwe = (row) => {
  let index = playlist.value.findIndex((item) => item.id == row.id);
  store.commit("music/setPlayIndex", index);
  palyButton.value = "#icon-zanting";
};

const lastMusic = () => {
  if (playCurrentIndex.value == 0) {
    ElMessage({
      message: "当前已是第一首！",
      type: "warning",
    });
  } else {
    store.commit("music/setPlayIndex", playCurrentIndex.value - 1);
  }
};

const nextMusic = () => {
  if (playlist.value.length == 1) {
    proxy.$refs.audio.currentTime = 0;
  } else {
    if (playlist.value.length - 1 == playCurrentIndex.value) {
      store.commit("music/setPlayIndex", 0);
    } else {
      store.commit("music/setPlayIndex", playCurrentIndex.value + 1);
    }
  }
};

// 进度条
const lastSecond = ref(0);
const timeProgress = ref(0); // 进度条的位置
const currentTime = ref(0);
const ListIcon = ref("icon-24gl-repeat2");
let a = 2;
const changeListIcon = () => {
  if (a === 1) {
    ListIcon.value = "icon-24gl-repeat2";
    a++;
  } else if (a === 2) {
    ListIcon.value = "icon-24gl-repeatOnce2";
    a++;
  } else {
    ListIcon.value = "icon-24gl-shuffle";
    a = 1;
  }
};
const changeProgress = (e) => {
  const durationNum = store.state.durationNum;
  // console.log(e);
  // 修改当前播放时间
  currentTime.value = Math.floor((e / 100) * durationNum);
  // 改变audio的实际当前播放时间
  proxy.$refs.audio.currentTime = currentTime.value;
};
const timeupdate = () => {
  const durationNum = store.state.durationNum;
  // console.log(durationNum);
  let time = proxy.$refs.audio.currentTime;
  // console.log(time + "  " + 2);
  // 将当前播放时间保存到vuex  如果保存到vuex这步节流,会导致歌词不精准,误差最大有1s
  // this.$store.commit("updateCurrentTime", time);
  // console.log(lastSecond.value);

  time = Math.floor(time);
  updateCurrentTime(time); // 歌词部分需求
  if (time !== lastSecond.value) {
    // console.log(time + "   " + 3);
    lastSecond.value = time;
    currentTime.value = time;
    // 计算进度条的位置
    timeProgress.value = Math.floor((time / durationNum) * 100);
    // console.log(durationNum);
    // console.log(timeProgress.value);
  }
  if (time == durationNum) {
    // console.log(playlist.value.length);
    if (ListIcon.value == "icon-24gl-repeat2") {
      if (playlist.value.length == 1) {
        proxy.$refs.audio.currentTime = 0;
      } else {
        if (playlist.value.length - 1 == playCurrentIndex.value) {
          store.commit("music/setPlayIndex", 0);
        } else {
          store.commit("music/setPlayIndex", playCurrentIndex.value + 1);
        }
      }
    } else if (ListIcon.value == "icon-24gl-repeatOnce2") {
      proxy.$refs.audio.currentTime = 0;
    } else {
      let x = Math.floor(Math.random() * playlist.value.length);
      store.commit("music/setPlayIndex", x);
    }
  }
};

// 歌词......
const updateCurrentTime = (value) => {
  store.commit("music/setCurrentTime", value);
};
//....

// 音量
const volume = ref(30);

// 拖动音量条的回调
const changeVolume = (e) => {
  // 改变audio的音量
  // input事件 实时触发
  let icon = "";
  proxy.$refs.audio.volume = e / 100;
  // console.log(e);
  if (e < 20) {
    if (e == 0) {
      icon = "icon-24gf-volumeDisable";
    } else {
      icon = "icon-24gf-volumeLow";
    }
  } else if (e >= 20 && e < 60) {
    icon = "icon-24gf-volumeMiddle";
  } else {
    icon = "icon-24gf-volumeHigh";
  }
  proxy.$refs.icon.innerHTML = `<use xlink:href="#${icon}" data-v-e8cefdee=""></use>`;
};

//...
const musicTable = ref(false);
watch(
  playCurrentIndex,
  () => {
    const qqqq = {
      id: playlist.value[playCurrentIndex.value].id,
    };
    store.commit(
      "getDurationNum",
      returnSecond(playlist.value[playCurrentIndex.value].dt)
    );
    store.dispatch("music/getMusicLyric", qqqq);
  },
  { deep: true }
);
let m = 1;
watch(
  playlist,
  () => {
    // console.log(playlist.value[playCurrentIndex.value]);
    store.commit(
      "getDurationNum",
      returnSecond(playlist.value[playCurrentIndex.value].dt)
    );
    // console.log(lastSecond);
    if (m === 1) {
      const qqqq = {
        id: playlist.value[playCurrentIndex.value].id,
      };
      playMusic();
      store.dispatch("music/getMusicLyric", qqqq);
    }
    // store.commit("music/setPlayIndex", playlist.value.length - 1);
    palyButton.value = "#icon-zanting";
    m = 0;
  },
  { deep: true }
);

const playMusic = () => {
  // console.log([proxy.$refs.audio]);
  if (proxy.$refs.audio.paused) {
    store.commit("changeIsPlay", true);
    proxy.$refs.audio.play();
    palyButton.value = "#icon-zanting";
  } else {
    store.commit("changeIsPlay", false);
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
      cursor: pointer;
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
          cursor: pointer;
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
      margin-top: 6px;
      .icon {
        cursor: pointer;
        width: 70px;
        height: 20px;
        color: #27d0d8;
      }
    }
    .c-bom {
      .slider {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 380px;
        .progressSlider {
          width: 70%;
        }
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    width: 150px;
    justify-content: space-between;
    .volume {
      width: 110px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .progressSlider {
        width: 60%;
      }
    }
    .icon {
      width: 25px;
      height: 25px;
      color: #27d0d8;
    }
  }
}
</style>
