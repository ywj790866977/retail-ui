const state = {
  name: '',
  role: {}
}

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLES: (state, role) => {
    state.role = role
  }
}

const actions = {
  // user login
  setInfo({ commit }, userInfo) {
      commit('SET_NAME', userInfo.name)
      commit('SET_ROLES', userInfo.role)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
