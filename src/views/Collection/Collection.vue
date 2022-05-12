<template>
  <div>ssss</div>
</template>

<script setup>
import { GetFavoriteColumn } from "../../api/favorites";
GetFavoriteColumn().then((res) => {
  console.log(res);
});
</script>

<style lang="scss" scoped></style>
