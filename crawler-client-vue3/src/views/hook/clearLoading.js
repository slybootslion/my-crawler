import { createStore } from 'vuex'

const store = createStore()

function clearLoading () {
  store.commit('changeLoading', false)
}

function createLoadin () {
  store.commit('changeLoading', true)
}

export { clearLoading, createLoadin }
