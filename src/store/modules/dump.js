const state = {
    goodsData:[],
}

const mutations = {
    SET_GOODSDATAS: (state, newValue) => {
        state.goodsData = newValue
    },
}

const getters = {

}

export default {
    namespaced: true,
    state,
    mutations,
    getters
}
  