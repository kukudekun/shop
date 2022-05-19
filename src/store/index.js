import Vue from 'vue'
import Vuex from 'vuex'

// 引入小仓库
import home from './home'
import search from './search'
import shopcart from './shopcart'
import user from './user'
import detail from './detail'
import trade from './trade'

// 需要使用插件一次
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    home,
    search,
    shopcart,
    user,
    detail,
    trade

  }
})
