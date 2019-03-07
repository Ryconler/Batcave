// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'

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
  if (error.response.data.message === 'jwt expired') { // 身份过期错误
    console.log('身份过期，请重新登录')
    router.push('/login')
  } else {
    return Promise.reject(error)
  }
})

Vue.config.productionTip = false
Vue.use(axios)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
