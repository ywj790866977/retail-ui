
const state = {
  goodsData:[],
  test:"傻逼",
  goodsTime:''
}

const mutations = {
  SET_GOODSDATAS: (state, newValue) => {
    state.goodsData = newValue
  },
  SET_TEST: (state, newValue) => {
    state.test = newValue
  },
  SET_GOODSTIEM:(state,newValue)=>{
    state.goodsTime = newValue
  }
}

const getters = {
  goodsDatas: state => state.goodsData,
  test1:state => state.test,
  getGoodsTime: state => state.goodsTime 
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}

