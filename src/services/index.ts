import axios from 'axios'

// 创建实例
const instance = axios.create({
  baseURL: 'http://apis.imooc.com/api/'
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    config.params = { ...config.params, icode: '5BDA8D85C39B561C' }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

export default instance
