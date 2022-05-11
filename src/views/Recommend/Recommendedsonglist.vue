<template>
  <div>ssss</div>
</template>

<script setup>
import { getRecommend } from "../../api/recommend";

getRecommend().then((res) => {
  console.log(res);
});
</script>

<style lang="scss" scoped></style>
