// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'

axios.defaults.withCredentials = true

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:5000'
} else {
  axios.defaults.baseURL = 'http://batcave.server.jessezhu.cn'
}
// axios请求拦截器，每次请求前都带上token
axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// axios响应拦截器
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response && error.response.status === 401) { // 身份认证错误
    console.log('请登录')
    router.push('/login')
  } else {
    return Promise.reject(error)
  }
})

Vue.config.productionTip = false
Vue.prototype.$axios = axios
// 新建一个axios实例专门用来传multipart/form-data类型的数据
Vue.prototype.$axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'http://batcave.server.jessezhu.cn',
  headers: {'Content-Type': 'multipart/form-data'}
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
