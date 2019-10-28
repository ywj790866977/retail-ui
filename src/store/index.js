import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import goods from './modules/goods'
import dump from './modules/dump'
import release from './modules/release'
import mainheader from './modules/mainheader'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    goods,
    dump,
    release,
    mainheader
  },
  getters
})

export default store
