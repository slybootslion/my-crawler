<template>
  <h1 class="page-title">{{ title }}</h1>
  <el-input placeholder="输入网址" v-model="url">
    <template #prepend>Http://</template>
    <template #append>
      <el-button icon="el-icon-attract"
                 @click="goCrawler"
                 v-loading.fullscreen.lock="fullscreenLoading"/>
    </template>
  </el-input>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import checkUrl from '@/components/hook/checkUrl'
import { createLoadin } from '@/views/hook/clearLoading'

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
    const store = useStore()
    const fullscreenLoading = computed(() => store.state.fullscreenLoading)

    function goCrawler () {
      if (!checkUrl(url.value)) return false
      createLoadin()
      emit('goCrawler', url.value)
    }

    return {
      url,
      goCrawler,
      store,
      fullscreenLoading,
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
