// 对axios进行二次封装
import store from '@/store'
import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 1 利用axios对象方法create去创建一个axios实例
// 2 request就是axios只不过简单封装一下
const requests = axios.create({
  baseURL: '/api',
  timeout: 5000
})
// 请求拦截器:再发请求之前可以在请求发出去之前做一些事
requests.interceptors.request.use((config) => {
  // config:配置对象，对象里面有个属性很重要，header请求头
  if (store.state.detail.uuidToken) {
    config.headers.userTempId = store.state.detail.uuidToken
  }
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  nprogress.start()
  return config
})
// 响应拦截器
requests.interceptors.response.use((res) => {
  nprogress.done()
  return res.data
})
// , (error) => {
//   return Promise.reject(new Error('faile'))
// })
export default requests
