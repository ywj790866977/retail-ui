
const state = {
  goodsData:[],
  test:"傻逼"
}

const mutations = {
  SET_GOODSDATAS: (state, newValue) => {
    state.goodsData = newValue
  },
  SET_TEST: (state, newValue) => {
    state.test = newValue
  },
}

const getters = {
  goodsDatas: state => state.goodsData,
  test1:state => state.test
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}

