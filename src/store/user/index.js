import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api/index.js'
import { setToken, getToken, removeToken } from '@/utils/token.js'
const state = {
  code: '',
  token: getToken(),
  userInfo: {}
}

const mutations = {
  GETCODE (state, code) {
    state.code = code
  },
  USERLOGIN (state, token) {
    state.token = token
  },
  GETUSERINFO (state, userInfo) {
    state.userInfo = userInfo
  },
  CLEAR (state) {
    state.token = '',
    state.userInfo = {},
    removeToken()
  }
}

const actions = {
//  获取验证码
  async getCode ({ commit }, phone) {
    const result = await reqGetCode(phone)
    if (result.code === 200) {
      commit('GETCODE', result.data)
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 用户注册
  async userRegister ({ commit }, user) {
    const result = await reqUserRegister(user)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 用户登录
  async userLogin ({ commit }, data) {
    const result = await reqUserLogin(data)
    // 服务器下发token是用户唯一标识，用户带着token向服务器要数据
    if (result.code === 200) {
      commit('USERLOGIN', result.data.token)
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 获取用户信息
  async getUserInfo ({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 200) {
      commit('GETUSERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 退出登录
  async userLogout ({ commit }) {
    const result = await reqLogout()
    if (result.code === 200) {
      commit('CLEAR')
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}
