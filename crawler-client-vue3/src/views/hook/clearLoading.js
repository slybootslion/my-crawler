import { createStore } from 'vuex'

const store = createStore()

function clearLoading () {
  store.commit('changeLoading', false)
}

export { clearLoading }
