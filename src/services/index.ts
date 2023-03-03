import axios from 'axios'
import store from '@/store/store'
// 创建实例
const instance = axios.create({
  baseURL: 'http://apis.imooc.com/api/'
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    store.commit('setLoading', true)
    config.params = { ...config.params, icode: '5BDA8D85C39B561C' }
    const token = localStorage.getItem('token')
    // console.info('token', token)
    if (token && config.headers) {
      config.headers.Authorization = 'Bearer ' + token
    }
    store.commit('setError', { status: false, message: '' })

    if (config.data instanceof FormData) {
      config.data.append('icode', '5BDA8D85C39B561C')
    } else {
      // 普通的 body 对象，添加到 data 中
      config.data = { ...config.data, icode: '5BDA8D85C39B561C' }
    }

    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    store.commit('setLoading', false)
    return response
  },
  function (e) {
    // 对响应错误做点什么
    // console.info('error', error)
    // console.info('error', error.response.data.error)
    const { error } = e.response.data
    store.commit('setError', { status: true, message: error })
    store.commit('setLoading', false)
    return Promise.reject(e)
  }
)

export default instance
