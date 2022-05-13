<template>
  <div class="tags">
    <div
      class="tag"
      :class="{ active: item.id == params.id }"
      v-for="item in VideoListClassification"
      :key="item.id"
      @click="ChangeVideoList(item.id)"
      v-show="item.name != 'MV'"
    >
      {{ item.name }}
    </div>
  </div>
  <div
    class="videoList"
    v-infinite-scroll="load"
    :infinite-scroll-disabled="disabled"
    :infinite-scroll-distance="500"
    :infinite-scroll-immediate="false"
  >
    <div class="v-list" v-for="item in VideoList" :key="item.data.vid">
      <img :src="item.data.coverUrl" alt="" @click="goToVideo(item.data.vid)" />
      <div class="v-content">
        <span class="top">{{ item.data.title }}</span>
        <span class="bom" v-if="item.data.creator"
          >by {{ item.data.creator.nickname }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { getVideoClassification, getVideoUnderCategory } from "../../api/video";

const store = useStore();

const VideoListClassification = ref([]);
const VideoList = ref([]);
const params = ref({
  id: 0,
  offset: 0,
});
const GetVideo = () => {
  getVideoUnderCategory(params.value).then((res) => {
    // console.log(res.datas);
    VideoList.value.push(...res.datas);
    // console.log("我push了");
  });
};
getVideoClassification().then((res) => {
  VideoListClassification.value = res.data;
  params.value.id = res.data[0].id;
  GetVideo();
});
const ChangeVideoList = (id) => {
  params.value.id = id;
  getVideoUnderCategory(params.value).then((res) => {
    // console.log(res);
    VideoList.value = res.datas;
  });
};
const disabled = ref(false);
const load = () => {
  // console.log("load执行了");
  disabled.value = true;
  params.value.offset += 1;
  GetVideo();
};
watch(
  VideoList,
  () => {
    // console.log("监听到了！！！！！！");
    disabled.value = false;
  },
  { deep: true }
);
const goToVideo = (vid) => {
  store.commit("video/getVid", vid);
};
</script>

<style lang="scss" scoped>
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
.videoList {
  display: flex;
  flex-wrap: wrap;
  .v-list {
    display: flex;
    flex-direction: column;
    width: 23%;
    margin: 10px;
    img {
      width: 100%;
      height: 180px;
      border-radius: 10px;
      object-fit: cover;
      cursor: pointer;
    }
    .v-content {
      display: flex;
      flex-direction: column;
      .top {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 13px;
        margin: 2px;
      }
      .bom {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        color: #656565bb;
        margin: 2px;
      }
    }
  }
}
</style>
