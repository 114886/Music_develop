<template>
  <div class="playMusic">
    <div class="bg"></div>
    <div class="musicContent">
      <div class="cipan">
        <div class="needle" :class="store.state.isPlay ? 'needleRotate' : ''">
          <img src="/MusicDetailCard/needle.png" alt="" />
        </div>
        <div class="disc">
          <img src="/MusicDetailCard/disc.png" alt="" />
          <img :src="playDetail.al.picUrl" alt="" class="musicAvatar" />
        </div>
      </div>
      <div class="geci">歌词轮播位置</div>
    </div>
    <div class="otherContent">评论区（暂未实现）</div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps({
  playDetail: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
// :style="{ backgroundImage: `url(${props.playDetail.al.picUrl})` }"
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
      width: 220px;
      position: relative;
      .needle {
        position: relative;
        left: 50%;
        width: 88px;
        height: 72px;
        transition: all 1s;
        transform-origin: 5.3px 5.3px;
        z-index: 1;
        img {
          width: 100%;
        }
      }
      .disc {
        width: 220px;
        height: 220px;
        position: relative;
        top: -12px;
        img {
          width: 100%;
        }
        .musicAvatar {
          position: absolute;
          top: 35px;
          left: 35px;
          width: 150px;
          z-index: -1;
        }
      }
    }
  }
  .otherContent {
    margin: 0 auto;
  }
}
</style>
