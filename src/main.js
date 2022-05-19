import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from '@/components/TypeNav/type-nav.vue'
import store from '@/store/index.js'
import Pagination from '@/components/Pagination/Pagination-vue.vue'
import '@/mock/serve.js'
import * as API from '@/api'
import { Button, MessageBox } from 'element-ui'
// 引入swiper样式
import 'swiper/css/swiper.css'
import VueLazyLoad from 'vue-lazyload'
import myPlugins from '@/plugins/myPlugins'
import '@/plugins/validate.js'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
  loading: '@/assets/logo.png'
})
Vue.use(myPlugins)
new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate () {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  }
}).$mount('#app')
