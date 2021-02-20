<template>
  <div class="container">
    <h1 class="title">一个帮助爬取页面的小工 by SlybootsLion</h1>
    <div class="txt">快速将掘金、知乎、微信公众号内容转为markdown</div>
    <div class="txt">批量下载半次元高清无水印图片。</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
})
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.title {
  line-height: 2.6;
  font-weight: 700;
  font-size: 18px;
}

.txt {
  font-size: 12px;
  line-height: 2;
}
</style>
