<template>
  <el-menu :default-active="defaultActive" router>
    <el-menu-item
      v-for="item in msg"
      :key="item.id"
      :index="item.path"
      @click="savePath2(item.path)"
    >
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="item.icon"></use>
      </svg>
      <span>{{ item.name }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { addLikeList, getUserLike } from "../../api/Likesonglist";
import { getMusicList } from "../../api/music";

const store = useStore();
const msg = reactive([
  {
    name: "发现音乐",
    icon: "#icon-a-yinlebofangliebiaoyinle",
    path: "/home/findmusic",
    id: 1,
  },
  { name: "视频", icon: "#icon-shipin", path: "/video", id: 2 },
  // { name: "收藏", icon: "#icon-shoucang", path: "/shoucang", id: 3 },
  { name: "每日推荐", icon: "#icon-dianzan", path: "/recommend", id: 4 },
  { name: "喜欢的音乐", icon: "#icon-yinle1", path: "/like", id: 5 },
]);

const userLikeId = ref(0);
userLikeId.value = sessionStorage.getItem("userLikeId") || 0;
const savePath2 = (path) => {
  sessionStorage.setItem("path2", `${path}`);
  if (path == "/like") {
    if (store.state.userprofile != undefined) {
      goMusicList(userLikeId.value);
    }
  }
};
if (store.state.userprofile == undefined) savePath2("/home/findmusic");
const defaultActive = ref(sessionStorage.getItem("path2") || "/home/findmusic");

if (store.state.userprofile != undefined && userLikeId.value == 0) {
  let userId = store.state.userprofile.userId;
  let ppp = {
    uid: userId,
  };
  getUserLike(ppp).then((res) => {
    // console.log(res);
    res.playlist.forEach((item) => {
      if (item.name == `${store.state.userprofile.nickname}-喜欢的音乐`) {
        userLikeId.value = item.id;
      }
    });
    if (userLikeId.value != 0) {
      sessionStorage.setItem("userLikeId", userLikeId.value);
      let par = {
        id: userLikeId.value,
      };
      // console.log(userLikeId.value);
      getMusicList(par).then((res) => {
        // console.log(res.playlist);
        sessionStorage.setItem("ComparisonList", JSON.stringify(res.playlist));
        store.commit("changeComparisonList", res.playlist);
      });
    } else {
      let pam = {
        name: store.state.userprofile.nickname + "-喜欢的音乐",
      };
      addLikeList(pam)
        .then((res) => {
          userLikeId.value = res.id;
          sessionStorage.setItem("userLikeId", res.id);
          // console.log(res.id);
          let par = {
            id: userLikeId.value,
          };
          getMusicList(par)
            .then((res) => {
              // console.log(res.playlist);
              sessionStorage.setItem(
                "ComparisonList",
                JSON.stringify(res.playlist)
              );
              store.commit("changeComparisonList", res.playlist);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
}
const goMusicList = (id) => {
  store.commit("getMusicId", id);
  if (window.location.href.toString().indexOf("musiclist") >= 0) {
    window.location.reload();
  }
};
</script>

<style lang="scss" scoped>
.el-menu {
  border: none;
  .el-menu-item {
    display: flex;
    justify-content: start;
    align-items: center;
    text-align: center;
    font-weight: 600;
    .icon {
      height: 20px;
      width: 20px;
      padding-right: 5px;
    }
  }
}
</style>
