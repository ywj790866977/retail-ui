const state = {
  name: '',
  avatar: '',
  roles: {}
}

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  setInfo({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
        commit('SET_NAME', userInfo.name)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

