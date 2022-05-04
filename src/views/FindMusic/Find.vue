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
  <el-table :data="tableData">
    <el-table-column prop="date" label="Date" width="140" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>

<script setup>
import { ref } from "vue";
import { getBanner } from "../../api/index";

const params = {
  type: 0,
};

getBanner(params).then((res) => {
  bannerImage.value = res.banners;
});

const bannerImage = ref([]);
const item = {
  date: "2016-05-02",
  name: "Tom",
  address: "No. 189, Grove St, Los Angeles",
};
const tableData = ref(Array.from({ length: 20 }).fill(item));
</script>

<style lang="scss" scoped>
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
