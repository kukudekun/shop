import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home/home-vue.vue'
import Login from '@/views/Login/login-vue.vue'
import Register from '@/views/Register/register-vue.vue'
import Search from '@/views/Search/search-vue.vue'
import Detail from '@/views/Detail/index.vue'
import AddCartSuccess from '@/views/AddCartSuccess'
import Shopcart from '@/views/ShopCart'
import store from '@/store'
import Trade from '@/views/Trade/index.vue'
import Pay from '@/views/Pay/index.vue'
import PaySuccess from '@/views/PaySuccess'
import Center from '@/views/Center/index.vue'
import Myorder from '@/views/Center/myOrder/my-order.vue'
import GroupOrder from '@/views/Center/groupOrder/group-order.vue'

// let originPush = VueRouter.prototype.push
// VueRouter.prototype.push = function(location,resolve,reject){

// }
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    // 将home用懒加载的方式展示
    { path: '/home', component: Home, meta: { show: true } },
    { path: '/login', component: Login, meta: { show: false } },
    { path: '/register', component: Register, meta: { show: false } },
    { path: '/search/:keyword?', name: 'search', component: Search, meta: { show: true } },
    { path: '/detail/:skuid', component: Detail, meta: { show: true } },
    { path: '/addcartsuccess', name: 'addcartsuccess', component: AddCartSuccess, meta: { show: true } },
    { path: '/shopcart', component: Shopcart, meta: { show: true } },
    {
      path: '/trade',
      component: Trade,
      meta: { show: true },
      beforeEnter: (to, from, next) => {
        if (from.path === '/shopcart') {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: '/pay',
      component: Pay,
      meta: { show: true },
      beforeEnter: (to, from, next) => {
        if (from.path === '/trade') {
          next()
        } else {
          next(false)
        }
      }
    },
    { path: '/paysuccess', component: PaySuccess, meta: { show: true } },
    {
      path: '/center',
      component: Center,
      meta: { show: true },
      children: [
        { path: 'myorder', component: Myorder }, { path: 'grouporder', component: GroupOrder }, {
          path: '/center',
          redirect: '/center/myorder'
        }
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { y: 0 }
  }
})
router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  const name = store.state.user.userInfo.name
  if (token) {
    if (to.path === '/login') {
      next('/home')
    } else {
      // 登陆了但去的不是login
      if (name) {
        next()
      } else {
        // 没有用户信息，派发action让仓库存储用户信息再跳转
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // token失效了
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  } else {
    // 如果未登录不能去交易相关，pay，paysuccess，个人中心
    if (to.path.indexOf('/trade') !== -1 || to.path.indexOf('/pay') !== -1 || to.path.indexOf('/center') !== -1) {
      next('/login?redirect=' + to.path)
    } else {
      next()
    }
  }
})
export default router
