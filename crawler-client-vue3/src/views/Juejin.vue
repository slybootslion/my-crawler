<template>
  <div class="container">
    <UrlBar title="掘金" @goCrawler="getJuejin"/>
    <div class="content">
      <CopyContent :title="title" :content="md"/>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import JuejinApi from '@/api/models/JuejinApi'
import UrlBar from '@/components/UrlBar'
import CopyContent from '@/components/CopyContent'
import html2md from '@/views/hook/html2md'

export default defineComponent({
  name: 'Juejin',
  components: { CopyContent, UrlBar },
  setup () {
    const title = ref('')
    const md = ref('')

    async function getJuejin (url) {
      const res = await JuejinApi.getJuejin(url)
      title.value = res.title
      md.value = html2md(res.content, 'juejin')
    }

    return {
      getJuejin,
      title,
      md,
    }
  },
})
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
