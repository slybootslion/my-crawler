import { createStore } from 'vuex'

export default createStore({
  state: {
    fullscreenLoading: false,
  },
  mutations: {
    changeLoading (state, value) {
      state.fullscreenLoading = value
    },
  },
  actions: {},
  modules: {},
})
