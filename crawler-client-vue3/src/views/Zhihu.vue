<template>
  <div class="container">
    <UrlBar title="知乎问答" @goCrawler="getZhihu"/>
    <div class="content">
      <CopyContent :title="title" :content="md"/>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import ZhihuApi from '@/api/models/ZhihuApi'
import html2md from '@/views/hook/html2md'
import CopyContent from '@/components/CopyContent'
import UrlBar from '@/components/UrlBar'

export default defineComponent({
  name: 'Zhihu',
  components: { UrlBar, CopyContent },
  setup () {
    const title = ref('')
    const md = ref('')

    async function getZhihu (url) {
      const res = await ZhihuApi.getZhihu(url)
      title.value = res.title
      md.value = html2md(res.content, 'zhihu')
    }

    return {
      title,
      md,
      getZhihu,
    }
  },
})
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
