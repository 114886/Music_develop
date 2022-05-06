import axios from 'axios'
import store from '../store'
import { diffTokenTime } from './auth'

export function request(config) {
  // 创建axios的实例
  const instance = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 5000
  })
  // 请求拦截器配置
  instance.interceptors.request.use(config => {
    if (localStorage.getItem('token')) {
      if (diffTokenTime()) {
        store.dispatch('logout')
        return Promise.reject(new Error('token 失效了'))
      }
    }
    // config.headers.Authorization = localStorage.getItem('token')
    return config
  }, error => {
    return Promise.error(error)
  }
  )
  // 响应拦截器配置
  instance.interceptors.response.use(response => {
    return response.data
  }, error => {
    // switch (error.response.data.code) {
    //   case 400:
    //     console.log("无权访问")
    //     router.push({path: '/login'})
    //     break
    //   case 404:
    //     console.log("404啦")
    //     router.push({path: '/404'})
    //     break
    //   default:
    //     return Promise.reject(error)
    // }
    return Promise.reject(error)
  })
  // 发送真正的网络请求
  return instance(config);
}
export default request;
