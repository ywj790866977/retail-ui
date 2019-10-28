const state = {
  name: '',
  roles: {}
}

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
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
