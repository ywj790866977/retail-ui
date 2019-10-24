import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import goods from './modules/goods'
import dump from './modules/dump'
import release from './modules/release'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    goods,
    dump,
    release
  },
  getters
})

export default store
