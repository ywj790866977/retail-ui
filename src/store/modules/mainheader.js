const state = {
  breadcrumb: [],
  btns: []
}

const mutations = {
  SET_BREADCRUMB: (state, list) => {
    state.breadcrumb = list
  },
  SET_BTNS: (state, list) => {
    state.btns = list
  }
}

const actions = {
  setMainheader({ commit }, info) {
      commit('SET_BREADCRUMB', info.breadcrumb || []);
      commit('SET_BTNS', info.btns || []);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
