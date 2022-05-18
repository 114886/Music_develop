<template>
  <el-carousel
    :interval="4000"
    type="card"
    height="180px"
    v-if="bannerImage[0]"
  >
    <el-carousel-item v-for="item in bannerImage" :key="item.name">
      <img :src="item.imageUrl" alt="" loading="lazy" />
    </el-carousel-item>
  </el-carousel>
  <el-carousel :interval="4000" type="card" height="180px" v-else>
    <el-carousel-item v-for="item in 6" :key="item">
      <h3>{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
  <div class="biaoti">
    <span>推荐歌单</span>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-fanjutuijian"></use>
    </svg>
  </div>
  <div class="ListCard">
    <el-card
      shadow="hover"
      v-for="item in preList"
      :key="item.id"
      @click="goMusicList(item.id)"
    >
      <img :src="item.picUrl" class="image" />
      <div style="padding-top: 15px">
        <span>{{ item.name }}</span>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref } from "vue";
import { getBanner, getPersonalized } from "../../api/index";

const store = useStore();
const params = {
  type: 0,
};
const params2 = {
  limit: 10,
};

getPersonalized(params2).then((res) => {
  preList.value = res.result;
});

getBanner(params).then((res) => {
  bannerImage.value = res.banners;
});

const bannerImage = ref([]);
const preList = ref([]);

const goMusicList = (id) => {
  store.commit("getMusicId", id);
};
</script>

<style lang="scss" scoped>
.biaoti {
  padding: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  span {
    padding-top: 3px;
    font-size: 20px;
  }
  .icon {
    width: 30px;
    height: 30px;
  }
}
.ListCard {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  .el-card {
    width: 245px;
    margin: 5px;
  }
  .image {
    width: 100%;
    display: block;
  }
}
.el-carousel {
  margin: auto;
  width: 800px;
}

.el-carousel__item {
  border-radius: 10px;
}

.el-carousel__item img {
  height: 100%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
