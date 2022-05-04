<template>
  <div class="nav-container">
    <div class="nav-left">
      <img src="/logo.47591c5c.png" />
    </div>
    <div class="nav-center">
      <div class="buttons">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <el-input v-model="search" placeholder="请输入查询内容" />
      </div>
    </div>
    <div class="nav-right">
      <el-avatar :size="40" :src="circleUrl" />
      <span>用户名</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const search = ref("");
</script>

<style lang="scss" scoped>
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
  }
}
</style>
