<template>
  <div class="container">
    <div class="left">
      <img
        src="https://img0.baidu.com/it/u=2862534777,914942650&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"
      />
      <div class="content">
        <div class="user-content">
          <span>歌名</span>
          <span>作者</span>
        </div>
        <div class="download">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiazai3"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="c-top">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-suiji1"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shangyishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xihuan"></use>
        </svg>
      </div>
      <div class="c-bom">进度条</div>
    </div>
    <div class="right">
      <div class="volume">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-24gf-volumeMiddle"></use>
        </svg>
      </div>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinleliebiao"></use>
      </svg>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  .left {
    display: flex;
    align-items: center;
    img {
      width: 55px;
      height: 55px;
      border-radius: 10px;
    }
    .content {
      padding-left: 10px;
      display: flex;
      align-items: flex-end;
      .user-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
          padding: 2px;
        }
        :last-child {
          font-size: 14px;
        }
      }
      .download {
        padding-left: 15px;
        .icon {
          width: 25px;
          height: 25px;
          color: #27d0d8;
        }
      }
    }
  }
  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
    .c-top {
      .icon {
        width: 70px;
        height: 25px;
        color: #27d0d8;
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    .volume{
      width: 70px;
    }
    .icon {
      width: 25px;
      height: 25px;
      color: #27d0d8;
    }
  }
}
</style>
