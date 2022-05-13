<template>
  <el-main class="elmain">
    <el-scrollbar>
      <div>
        <div class="tags">
          <div
            class="tag"
            v-for="item in MvListClassification"
            :class="{ active: item.name == pam.area }"
            :key="item.id"
            @click="Changearea(item.name)"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="tags">
          <div
            class="tag"
            v-for="item in MvListClassification2"
            :class="{ active: item.name == pam.type }"
            :key="item.id"
            @click="Changetype(item.name)"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="tags">
          <div
            class="tag"
            v-for="item in MvListClassification3"
            :class="{ active: item.name == pam.order }"
            :key="item.id"
            @click="Changeorder(item.name)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div
        class="videoList"
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabled"
        :infinite-scroll-distance="500"
        :infinite-scroll-immediate="false"
      >
        <div class="v-list" v-for="item in NewMVList" :key="item.id">
          <img :src="item.cover" alt="" @click="goToMvPlay(item.id)" />
          <div class="v-content"> 
            <span class="top">{{ item.name }}</span>
            <span class="bom">{{ item.artistName }}</span>
          </div>
        </div>
      </div>
      <div v-if="!NewMVList" class="err">暂无数据！</div>
    </el-scrollbar>
  </el-main>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { getAllMv } from "../../api/mv";

const store = useStore();
const NewMVList = ref([]);
const pam = ref({
  area: store.state.video.params.area,
  order: store.state.video.params.order,
  type: store.state.video.params.type,
});
const MvListClassification = ref([
  { id: 0, name: "全部" },
  { id: 1, name: "内地" },
  { id: 2, name: "港台" },
  { id: 3, name: "欧美" },
  { id: 4, name: "日本" },
  { id: 5, name: "韩国" },
]);
const MvListClassification2 = ref([
  { id: 0, name: "全部" },
  { id: 1, name: "官方版" },
  { id: 2, name: "原生" },
  { id: 3, name: "现场版" },
  { id: 4, name: "网易出品" },
]);
const MvListClassification3 = ref([
  { id: 0, name: "上升最快" },
  { id: 1, name: "最热" },
  { id: 2, name: "最新" },
]);

let index = 1;
const initAllMV = (offset) => {
  let pp = {
    area: pam.value.area,
    type: pam.value.type,
    order: pam.value.order,
    limit: 40,
    offset: (offset - 1) * 40,
  };
  index = 1;
  getAllMv(pp).then((res) => {
    NewMVList.value = res.data;
  });
};
initAllMV(1);

const getall = () => {
  index++;
  // console.log(index, "我push了");
  let xx = {
    area: pam.value.area,
    type: pam.value.type,
    order: pam.value.order,
    limit: 40,
    offset: (index - 1) * 40,
  };
  getAllMv(xx).then((res) => {
    // console.log(res);
    NewMVList.value.push(...res.data);
  });
};
const Changearea = (area) => {
  pam.value.area = area;
  initAllMV(1);
};
const Changetype = (type) => {
  pam.value.type = type;
  initAllMV(1);
};
const Changeorder = (order) => {
  pam.value.order = order;
  initAllMV(1);
};

const disabled = ref(false);
const load = () => {
  // console.log("load执行了");
  disabled.value = true;
  getall();
};
watch(
  NewMVList,
  () => {
    // console.log("监听到了！！！！！！");
    disabled.value = false;
  },
  { deep: true }
);

const goToMvPlay = (mvid) => {
  store.commit("video/getMVid", mvid);
};
</script>

<style lang="scss" scoped>
.err {
  font-size: 50px;
  color: #909090;
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
.elmain {
  height: calc(100vh - 180px);
}
.tags {
  display: flex;
  flex-wrap: wrap;
  margin-left: 30px;
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
