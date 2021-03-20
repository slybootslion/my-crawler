<template>
  <div class="container">
    <h1 class="title">一个帮助爬取页面的小工具 by SlybootsLion</h1>
    <div class="txt">快速将掘金、知乎、微信公众号内容转为markdown</div>
    <div class="txt">批量下载半次元高清无水印图片。</div>
    <div class="block"></div>
    <h1 class="title">使用必读：</h1>
    <p class="txt fs16">可能用的人也是为了下bcy的图，还是要强调一下，<strong class="st">不要滥用！不要滥用！不要滥用！</strong> 如果bcy更改了大图地址，大家都用不了。</p>

    <strong class="st txt">吐槽：早知道要布到线上，我就应该用python写。</strong>
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
  font-size: 22px;
}

.txt {
  font-size: 12px;
  line-height: 2;

  &.fs16 {
    font-size: 18px;
  }
}

.block{
  height: 60px;
}

.st {
  font-weight: 700;
}
</style>
