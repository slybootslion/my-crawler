<template>
  <div class="app-container">
    <div class="nav">
      <el-menu :default-active="defaultActive"
               class="el-menu-vertical"
               :collapse="isCollapse">
        <router-link to="/juejin">
          <el-menu-item index="/juejin">
            <i class="el-icon-brush"></i>
            <template #title>
              掘金
            </template>
          </el-menu-item>
        </router-link>
        <router-link to="/weixin">
          <el-menu-item index="/weixin">
            <i class="el-icon-chat-round"></i>
            <template #title>
              微信
            </template>
          </el-menu-item>
        </router-link>
        <router-link to="/zhihu">
          <el-menu-item index="/zhihu">
            <i class="el-icon-thumb"></i>
            <template #title>
              知乎
            </template>
          </el-menu-item>
        </router-link>
        <router-link to="/bcy">
          <el-menu-item index="/bcy">
          <i class="el-icon-picture-outline"></i>
          <template #title>
            bcy
          </template>
          </el-menu-item>
        </router-link>
      </el-menu>
      <div class="arrow-content" @click="checkType">
        <span :class="isCollapse?'el-icon-right' : 'el-icon-back'"/>
      </div>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup () {
    const isCollapse = ref(true)
    const defaultActive = ref('/juejin')
    const route = useRoute()

    watchEffect(() => {
      defaultActive.value = route.path
    })

    function checkType () {
      isCollapse.value = !isCollapse.value
    }

    return {
      isCollapse,
      defaultActive,
      checkType,
    }
  },
})
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.app-container {
  height: 100%;
  display: flex;
}

.nav {
  height: 100%;
  display: flex;
  flex-direction: column;

  .el-menu-vertical {
    flex: 1;
  }

  .arrow-content {
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    background-color: #ededed;
  }
}

.content {
  flex: 1;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}
</style>
