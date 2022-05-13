<template>
  <div class="top">
    <h1 @click="GoAllMv(chooseName, '全部', '最新')">最新MV ></h1>
    <div class="tags">
      <div
        class="tag"
        :class="{ active: item.name == chooseName }"
        v-for="item in MvListClassification"
        :key="item.id"
        @click="ChangeMvTagList(item.name)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
  <div class="videoList">
    <div class="v-list" v-for="item in NewMVList" :key="item.id">
      <img :src="item.cover" alt="" @click="goToMvPlay(item.id)" />
      <div class="v-content">
        <span class="top">{{ item.name }}</span>
        <span class="bom">{{ item.artistName }}</span>
      </div>
    </div>
  </div>
  <div class="top top2">
    <h1 @click="GoAllMv('全部', '全部', '最热')">热播MV ></h1>
  </div>
  <div class="videoList">
    <div class="v-list" v-for="item in HotMVList" :key="item.id">
      <img :src="item.picUrl" alt="" @click="goToMvPlay(item.id)" />
      <div class="v-content">
        <span class="top">{{ item.name }}</span>
        <span class="bom">{{ item.artistName }}</span>
      </div>
    </div>
  </div>
  <div class="top top2">
    <h1 @click="GoAllMv('全部', '网易出品', '上升最快')">网易出品 ></h1>
  </div>
  <div class="videoList">
    <div class="v-list" v-for="item in WangYiMVList" :key="item.id">
      <img :src="item.cover" alt="" @click="goToMvPlay(item.id)" />
      <div class="v-content">
        <span class="top">{{ item.name }}</span>
        <span class="bom">{{ item.artistName }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { getNewMv, getWangYiMv, getRecommendMv } from "../../api/mv";

const store = useStore();
const MvListClassification = ref([
  { id: 1, name: "内地" },
  { id: 2, name: "港台" },
  { id: 3, name: "欧美" },
  { id: 4, name: "日本" },
  { id: 5, name: "韩国" },
]);
const chooseName = ref(MvListClassification.value[0].name);
const NewMVList = ref([]);
const HotMVList = ref([]);
const WangYiMVList = ref([]);
const inittuijianmv = () => {
  getNewMv(chooseName.value).then((res) => {
    // console.log(res.data);
    NewMVList.value = res.data;
  });
};
inittuijianmv();
getRecommendMv().then((res) => {
  // console.log(res);
  HotMVList.value = res.result;
});
getWangYiMv().then((res) => {
  // console.log(res.data);
  WangYiMVList.value = res.data;
});
const ChangeMvTagList = (name) => {
  chooseName.value = name;
  inittuijianmv();
};
const goToMvPlay = (mvid) => {
  store.commit("video/getMVid", mvid);
};
const GoAllMv = (area, type, order) => {
  let pam = {
    area,
    type,
    order,
  };
  store.commit("video/getparams", pam);
};
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 20px;
    margin-left: 10px;
    cursor: pointer;
  }
}
.top2 {
  margin-top: 30px;
  margin-bottom: 10px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  margin-right: 30px;
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
