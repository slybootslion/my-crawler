<template>
  <div class="btn-box">
    <el-button @click="copy(title)">复制标题</el-button>
    <el-button @click="copy(content)">复制内容（markdown）</el-button>
    <el-button @click="download">下载markdown</el-button>
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
  setup (props) {
    async function copy (text) {
      try {
        await writeText(text)
      } catch (err) {
        console.log(err)
      }
    }

    function download () {
      const { title, content } = props
      const blob = new Blob([title + '\n\t\n\t' + content])
      const link = document.createElement('a')
      link.download = title + '.md'
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    return {
      copy,
      download,
    }
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.btn-box {
  margin-bottom: 10px;
}
</style>
