<template>
  <div class="btn-box">
    <el-button @click="copy(title)">复制标题</el-button>
    <el-button @click="copy(content)">复制内容（markdown）</el-button>
  </div>
  <div class="title">
    {{title}}
  </div>
  <div class="content">
    {{content}}
  </div>
</template>

<script>
import { writeText } from 'clipboard-polyfill'
export default {
  name: 'CopyContent',
  props: {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  setup () {
    async function copy (text) {
      try {
        await writeText(text)
      } catch (err) {
        console.log(err)
      }
    }
    return {
      copy,
    }
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.btn-box {
  margin-bottom: 10px;
}
</style>
