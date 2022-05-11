<template>
  <div class="nav-container">
    <div class="nav-left">
      <img src="/logo.47591c5c.png" />
    </div>
    <div class="nav-center">
      <div class="buttons">
        <svg class="icon" aria-hidden="true" @click="searchMusic">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <el-popover :width="400" trigger="click" placement="bottom">
          <h1 class="h1">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-resou1"></use>
            </svg>
            <svg class="icon icon2" aria-hidden="true">
              <use xlink:href="#icon-resou"></use>
            </svg>
          </h1>
          <el-row>
            <el-col
              class="searchList"
              v-for="(item, i) in searchHotList"
              :key="i"
              @click="changeSearch(item)"
            >
              <span v-if="changeIcon(i)">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="`#${NumIcon}`"></use>
                </svg>
              </span>
              <span v-else class="last">{{ i + 1 }}</span>
              <span
                :class="{ active: i == 0, active2: i == 1, active3: i == 2 }"
                >{{ item }}</span
              >
            </el-col>
          </el-row>
          <template #reference>
            <el-input
              v-model="search"
              placeholder="请输入查询内容"
              @keydown.enter="searchMusic"
            />
          </template>
        </el-popover>
      </div>
    </div>
    <div class="nav-right">
      <el-popover placement="bottom" :width="50" trigger="click">
        <template #reference>
          <el-avatar :size="40" :src="user.avatarUrl" />
        </template>
        <div class="elpop-button">
          <el-button
            color="#626aef"
            :dark="isDark"
            plain
            @click="dialogFormVisible = true"
            :disabled="user.disable"
            >立即登录
          </el-button>
          <el-button
            color="#626aef"
            :dark="isDark"
            plain
            @click="$store.dispatch('logout')"
            >退出登录
          </el-button>
        </div>
      </el-popover>
      <span>{{ user.nickname }}</span>
    </div>
    <el-dialog
      v-model="dialogFormVisible"
      title="欢迎~请用真实网易云账号登录哦~"
      center
    >
      <el-form
        ref="ruleFormRef"
        :model="form"
        class="login-form"
        status-icon
        :rules="rules"
      >
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" placeholder="Please input phone" />
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input
            v-model="form.password"
            type="password"
            show-password
            placeholder="Please input password"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false" round>取消</el-button>
          <!-- <el-tooltip
            class="box-item"
            effect="dark"
            content="点击如果未注册,则自动注册"
            placement="top-start"
          > -->
          <el-button type="success" round @click="handleLogin(ruleFormRef)">
            登录
          </el-button>
          <!-- </el-tooltip> -->
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, watchEffect } from "vue";
import { useStore } from "vuex";
import { searchHot } from "../../api/search";

const store = useStore();
const dialogFormVisible = ref(false);
const formLabelWidth = "100px";

let user = ref({
  avatarUrl: "",
  nickname: "",
  disable: false,
});

watchEffect(() => {
  if (store.state.userprofile != undefined) {
    user.value.avatarUrl = store.state.userprofile.avatarUrl;
    user.value.nickname = store.state.userprofile.nickname;
    user.value.disable = true;
  } else {
    user.value.avatarUrl = "circleUrl";
    user.value.nickname = "未登录";
    user.value.disable = false;
  }
});
const form = ref({
  phone: "",
  password: "",
});

const rules = reactive({
  phone: [
    { required: true, message: "Please input phone", trigger: "blur" },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: "手机号格式不正确",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "Please input password", trigger: "blur" },
  ],
});
const ruleFormRef = ref();
const handleLogin = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      store.dispatch("login", form.value);
      dialogFormVisible.value = false;
    } else {
      console.log("error submit!", fields);
    }
  });
};

const search = ref("");
const searchHotList = ref([]);
const NumIcon = ref("");
const changeIcon = (index) => {
  if (index == 0) {
    NumIcon.value = "icon-NO";
  } else if (index == 1) {
    NumIcon.value = "icon-NO1";
  } else if (index == 2) {
    NumIcon.value = "icon-NO2";
  } else {
    return false;
  }
  return true;
};
const searchMusic = () => {
  if (search.value != "") {
    store.commit("search/getKeywords", search.value);
  } else {
    ElMessage({
      showClose: true,
      message: "!不要试图搜索'空'!",
      type: "warning",
      duration: 5000,
    });
  }
};
searchHot().then((res) => {
  res.result.hots.forEach((item) => {
    searchHotList.value.push(item.first);
  });
});
const changeSearch = (val) => {
  search.value = val;
  searchMusic();
};
</script>

<style lang="scss" scoped>
.h1 {
  display: flex;
  align-items: center;
  .icon{
    width: 45px;
    height: 45px;
    margin: 3px;
  }
  .icon2{
    width: 25px;
    height: 25px;
    margin: 3px;
  }
}
.searchList {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: rgb(178, 178, 255);
  }
  .icon {
    width: 20px;
    height: 20px;
  }
  .last {
    margin-left: 8px;
    margin-right: 12px;
  }
  .active {
    font-size: 20px;
    font-weight: 800;
    padding-bottom: 3px;
  }
  .active2 {
    font-size: 18px;
    font-weight: 600;
    padding-bottom: 3px;
  }
  .active3 {
    font-size: 16px;
    font-weight: 600;
    padding-bottom: 3px;
  }
  span {
    margin: 5px;
  }
}
.elpop-button {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .el-button {
    width: 100%;
    margin: 5px 0;
  }
}
.nav-container {
  min-width: 1000px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  background-color: #ec4141;
  align-items: center;
  text-align: center;
  height: 60px !important;
  .nav-left {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 0 50px 0 10px;
    width: 150px;
    img {
      width: 100%;
    }
  }
  .nav-center {
    margin-left: -450px;
    .buttons {
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      padding: 0 20px;
      border-radius: 20px;
      // box-shadow: 0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset;
      background: #00000011;
      ::v-deep .el-input__wrapper {
        background: transparent;
        box-shadow: none;
      }
      ::v-deep .el-input__inner {
        color: white;
      }
      .icon {
        cursor: pointer;
        height: 20px;
        width: 20px;
        color: rgb(255, 255, 255);
        margin-top: 1px;
      }
    }
  }
  .nav-right {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 110px;
    margin-right: 20px;
    .el-avatar {
      cursor: pointer;
    }
  }
}
</style>
