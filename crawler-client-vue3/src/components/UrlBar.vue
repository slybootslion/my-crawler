<template>
  <h1 class="page-title">{{ title }}</h1>
  <el-input placeholder="输入网址" v-model="url">
    <template #prepend>Http://</template>
    <template #append>
      <el-button icon="el-icon-attract" @click="goCrawler"></el-button>
    </template>
  </el-input>
</template>

<script>
import { defineComponent, ref } from 'vue'
import checkUrl from '@/components/hook/checkUrl'

export default defineComponent({
  name: 'UrlBar',
  props: {
    title: {
      type: String,
      default: '标题',
    },
  },
  emits: ['goCrawler'],
  setup (props, { emit }) {
    const url = ref('')

    function goCrawler () {
      if (!checkUrl(url.value)) return false
      emit('goCrawler', url.value)
    }

    return {
      url,
      goCrawler,
    }
  },
})
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.page-title {
  margin-bottom: 20px;
  font-size: 28px;
}
</style>
