<template>
  <div class="hentai-container">
    <UrlBar title="bcy"
            @goCrawler="Asmhentai"/>
  </div>
</template>

<script>
import UrlBar from '@/components/UrlBar'

export default {
  name: 'Asmhentai',
  components: { UrlBar },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.hentai-container {
  padding: 20px;

}
</style>
