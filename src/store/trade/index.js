import { reqAddressInfo, reqOrderInfo, reqSubmitOrder } from '@/api/index.js'
const state = {
  address: [],
  orderInfo: {},
  orderId: ''
}

const mutations = {
  GETUSERADDRESS (state, address) {
    state.address = address
  },
  GETORDERINFO (state, orderInfo) {
    state.orderInfo = orderInfo
  },
  GETSUBMITORDER (state, orderId) {
    state.orderId = orderId
  }
}

const actions = {
  async getUserAddress ({ commit }) {
    const result = await reqAddressInfo()
    if (result.code === 200) {
      commit('GETUSERADDRESS', result.data)
    }
  },
  async getOrderInfo ({ commit }) {
    const result = await reqOrderInfo()
    if (result.code === 200) {
      commit('GETORDERINFO', result.data)
    }
  },
  async getSubmitOrder ({ commit }, { tradeNo, data }) {
    const result = await reqSubmitOrder(tradeNo, data)
    if (result.code === 200) {
      commit('GETSUBMITORDER', result.data)
    }
  }
}
// getters为简化数据而生
const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}
