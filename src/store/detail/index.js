import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
import { getUUID } from '@/utils/uuid_token.js'
const state = {
  goodInfo: {},
  // 游客临时身份
  uuidToken: getUUID()
}

const mutations = {
  GETGOODINFO (state, goodInfo) {
    state.goodInfo = goodInfo
  }
}

const actions = {
  async getGoodInfo ({ commit }, skuId) {
    const result = await reqGoodsInfo(skuId)
    if (result.code === 200) {
      commit('GETGOODINFO', result.data)
    }
  },
  async addOrUpdateShopCart ({ commit }, { skuId, skuNum }) {
    const result = await reqAddOrUpdateShopCart(skuId, skuNum)
    if (result.code === 200) {
      // 因为是向服务器存储数据所以没有其余返回数值，不需要三连环存储
      return '200'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
// getters为简化数据而生
const getters = {
  // 路径导航简化
  categoryView (state) {
    // 比如：state.goodinfo初始对象为空对象，空对象的categoryView属性值undifined
    return state.goodInfo.categoryView || {}
  },
  // 简化产品信息
  skuInfo (state) {
    return state.goodInfo.skuInfo || {}
  },
  // 产品售卖属性简化
  spuSaleAttrList (state) {
    return state.goodInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
