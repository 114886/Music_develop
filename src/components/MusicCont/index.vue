<template>
  <div class="playMusic">
    <div class="bg"></div>
    <div class="musicContent">
      <div class="cipan">
        <div class="needle" :class="store.state.isPlay ? 'needleRotate' : ''">
          <img src="/MusicDetailCard/needle.png" alt="" />
        </div>
        <div class="disc" :class="store.state.isPlay ? 'rotate' : ''">
          <img src="/MusicDetailCard/disc.png" alt="" />
          <img :src="playDetail.al.picUrl" alt="" class="musicAvatar" />
        </div>
      </div>
      <div class="geci">
        <div class="title">
          <div class="musicName">{{ playDetail.name }}</div>
          <div class="album">{{ playDetail.al.name }}</div>
          <div class="singer">{{ playDetail.ar[0].name }}</div>
        </div>
        <div class="lyrics">
          <p
            class="lyricsItem"
            ref="playLyric"
            :class="{
              active:
                store.state.music.currentTime * 1000 < item.pre &&
                store.state.music.currentTime * 1000 >= item.time,
            }"
            v-for="(item, i) in store.getters['music/MusicLyric']"
            :key="i"
          >
            {{ item.lyric.replace(/]/g, "") }}
          </p>
        </div>
      </div>
    </div>
    <!-- <div class="otherContent">评论区（暂未实现）</div> -->
  </div>
</template>

<script setup>
import { defineProps, getCurrentInstance, ref, watchEffect } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps({
  playDetail: {
    type: Object,
    required: true,
  },
});
// console.log(store.getters["music/MusicLyric"]);
const { proxy } = getCurrentInstance();

// 实现歌词滚动
let placeholderHeight = 0;
const lyricScroll = (currentLyric) => {
  // 获取歌词item
  let lyricsArr = document.querySelectorAll(".lyricsItem");
  // 获取歌词框
  let lyrics = document.querySelector(".lyrics");
  // placeholder的高度
  if (placeholderHeight == 0) {
    placeholderHeight = lyricsArr[0].offsetTop - lyrics.offsetTop;
  }
  //   歌词item在歌词框的高度 = 歌词框的offsetTop - 歌词item的offsetTop
  //   console.log(currentLyric);
  if (lyricsArr[currentLyric - 1]) {
    let distance = lyricsArr[currentLyric - 1].offsetTop - lyrics.offsetTop;
    //   lyricsArr[currentLyric].scrollIntoView();
    lyrics.scrollTo({
      behavior: "smooth",
      top: distance - placeholderHeight,
    });
  }
};
watchEffect(() => {
  const time = store.state.music.currentTime;
  let list = [proxy.$refs.playLyric][0];
  for (let i in list) {
    if (list[i].classList.length === 2) {
      lyricScroll(i);
    }
  }
});
</script>

<style lang="scss" scoped>
// :style="{ backgroundImage: `url(${props.playDetail.al.picUrl})` }"
// *::-webkit-scrollbar-thumb {
//   border-radius: 10px;
//   background-color: #ccc;
// }
// *::-webkit-scrollbar {
//   width: 8px;
//   height: 8px;
// }
.needleRotate {
  transform-origin: 5.3px 5.3px;
  transform: rotate(22deg);
}
.playMusic {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: calc(100vh - 70px);
  background-color: rgb(236, 235, 236);
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: calc(100vh - 70px);
    min-width: 1000px;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    filter: blur(30px);
    z-index: -1;
  }
  .musicContent {
    display: flex;
    justify-content: center;
    .cipan {
      margin-top: 60px;
      width: 500px;
      position: relative;
      .needle {
        position: relative;
        left: 34%;
        width: 120px;
        height: 72px;
        transition: all 1s;
        transform-origin: 5.3px 5.3px;
        z-index: 1;
        img {
          width: 100%;
        }
      }
      .rotate {
        animation: rotate 10s linear infinite;
      }
      .disc {
        width: 300px;
        height: 300px;
        position: relative;
        top: -12px;
        img {
          width: 100%;
        }
        .musicAvatar {
          position: absolute;
          top: 48px;
          left: 45px;
          width: 210px;
          z-index: -1;
        }
      }
    }
    .geci {
      width: 350px;
      .title {
        width: 100%;
        text-align: center;
        font-size: 12px;
        margin: 30px 0 15px;
        color: #919191;
        .musicName {
          font-size: 23px;
          color: #161616;
          margin: 7px 0;
        }
        .album,
        .singer {
          margin: 7px 0;
        }
      }
      .lyrics {
        width: 100%;
        height: 410px;
        font-size: 12px;
        text-align: center;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
        .lyricsItem {
          font-size: 16px;
          height: 20px;
          margin: 25px 20px;
          transition: all 0.5s;
          line-height: 20px;
          font-weight: 200;
        }
        .active {
          font-weight: 600;
          font-size: 18px;
          color: black;
        }
      }
    }
  }
  .otherContent {
    margin: 0 auto;
  }
  @keyframes rotate {
    0% {
      -webkit-transform: rotate(0deg);
    }
    25% {
      -webkit-transform: rotate(90deg);
    }
    50% {
      -webkit-transform: rotate(180deg);
    }
    75% {
      -webkit-transform: rotate(270deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
}
</style>
