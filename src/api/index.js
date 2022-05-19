// 对api进行统一管理
import requests from './request'
import mockRequests from './mockAjax'

// 三级联动接口/api/product/getBaseCategoryList 发起get无参数

export const reqCategoryList = () => {
  return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}
// 获取banner 轮播图
export const reqGetBannerList = () => mockRequests.get('/banner')

// 获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')
// 获取产品详细信息
export const reqGoodsInfo = (skuId) => {
  return requests({
    url: `/item/${skuId}`,
    method: 'get'
  })
}
// 产品添加到购物车页面和购物车更改产品数量的请求
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
  })
}
// 获取搜索模块数据 地址：api/list 请求方式post
export const reqGetSearchInfo = (params) =>
  requests({
    url: '/list',
    method: 'post',
    data: {
      params
    }
  })
// 获取购物车列表
export const reqCartList = () =>
  requests({
    url: '/cart/cartList',
    method: 'get'
  })
// 删除购物车的接口
export const reqDeleteCartById = (skuId) =>
  requests({
    url: `cart/deleteCart/${skuId}`,
    method: 'delete'
  })
// 修改购物车商品状态的接口
export const reqUpdateCheckedById = (skuId, isChecked) =>
  requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
  })
// 注册页面获取手机验证码
export const reqGetCode = (phone) =>
  requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
  })
// 注册成果接口
export const reqUserRegister = (data) =>
  requests({
    url: '/user/passport/register',
    method: 'post',
    data
  })
// 登陆接口,当传递多个数据时候可以用data来传递而形参处用{}传递所要的数据
export const reqUserLogin = (data) =>
  requests({
    url: '/user/passport/login',
    method: 'post',
    data
  })
// 获取用户信息用于首页展示，一定要带用户的token
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })
// 退出登录
export const reqLogout = () =>
  requests({
    url: '/user/passport/logout',
    method: 'get'
  })
// 获取用户地址信息
export const reqAddressInfo = () =>
  requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get'
  })
// 获取订单页商品清单
export const reqOrderInfo = () =>
  requests({
    url: '/order/auth/trade',
    method: 'get'
  })
// 提交用户的商品订单，准备结算,练习使用不用vuex进行发请求捞数据
export const reqSubmitOrder = (tradeNo, data) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: 'post',
    data
  })
// 获取支付信息
export const reqPayInfo = (orderId) =>
  requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
  })
// 获取支付订单状态
export const reqPayStatus = (orderId) =>
  requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
  })
// 获取个人中心的数据
export const reqMyOrderList = (page, limit) =>
  requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'get'
  })
