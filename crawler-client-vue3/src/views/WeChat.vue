<template>
  <div class="container">
    <UrlBar title="微信" @goCrawler="getWeChat"/>
    <div class="content">
      <CopyContent :title="title" :content="md"/>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import UrlBar from '@/components/UrlBar'
import weChatApi from '@/api/models/WeChat'
import CopyContent from '@/components/CopyContent'
import html2md from '@/views/hook/html2md'

export default defineComponent({
  name: 'WeChat',
  components: { CopyContent, UrlBar },
  setup () {
    const md = ref('')
    const title = ref('')

    async function getWeChat (url) {
      const res = await weChatApi.getWeChat(url)
      title.value = res.title
      md.value = html2md(res.content)
    }

    return {
      title,
      md,
      getWeChat,
    }
  },
})
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
