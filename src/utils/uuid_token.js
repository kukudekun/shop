import { v4 as uuidv4 } from 'uuid'
// 要随机生成一个字符串，且每次执行不能发生变化，游客身份持久储存
export const getUUID = () => {
  // 先从本地获取uuid
  let uuidToken = localStorage.getItem('UUIDTOKEN')
  // 如果没有
  if (!uuidToken) {
    uuidToken = uuidv4()
    // 本地储存一次
    localStorage.setItem('UUIDTOKEN', uuidToken)
  }
  return uuidToken
}
