import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api'
const state = {
  cartList: []
}

const mutations = {
  GETCARTLIST (state, cartlist) {
    state.cartList = cartlist
  }
}

const actions = {
  async getCartList ({ commit }) {
    const result = await reqCartList()
    if (result.code === 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  async deleteCartListBySkuId ({ commit }, skuId) {
    const result = await reqDeleteCartById(skuId)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  async UpdateCheckedById ({ commit }, { skuId, isChecked }) {
    const result = await reqUpdateCheckedById(skuId, isChecked)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  deleteAllCheckedCart ({ dispatch, getters }) {
    // context:小仓库，commit：提交mutations修改state，getters计算属性，dispatch派发
    // 获取购物车中所有的数据是个数组
    const PromiseAll = []
    getters.cartList.cartInfoList.forEach(element => {
      const result = element.isChecked === 1 ? dispatch('deleteCartListBySkuId', element.skuId) : ''
      PromiseAll.push(result)
    })
    return Promise.all(PromiseAll)
  },
  // 修改产品全选状态
  updateAllCartIsChecked ({ dispatch, state }, isChecked) {
    const promiseAll = []
    state.cartList[0].cartInfoList.forEach(item => {
      const promise = dispatch('UpdateCheckedById', { skuId: item.skuId, isChecked })
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  }
}

const getters = {
  cartList (state) {
    return state.cartList[0] || {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
