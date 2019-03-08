import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home' // 主页
import Login from '../components/Login' // 登录
import Register from '../components/Register' // 注册
import ChangePassword from '../components/ChangePassword' // 更改密码
import URLs from '../components/URLs' // 所有链接
import URLShare from '../components/URLShare' // 链接分享
import Files from '../components/Files' // 所有文件
import FileDetail from '../components/FileDetail' // 文件详情
import FileUpload from '../components/FileUpload' // 文件上传
import MyLikes from '../components/MyLikes' // 我的喜欢
import MyURLs from '../components/MyURLs' // 我的链接
import MyFiles from '../components/MyFiles' // 我的文件
import UserResources from '../components/UserResources' // 他人的资源

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/change-password',
      component: ChangePassword
    },
    {
      path: '/urls',
      component: URLs
    },
    {
      path: '/url/share',
      component: URLShare
    },
    {
      path: '/files',
      component: Files
    },
    {
      path: '/file/detail/:id',
      name: 'FileDetail',
      component: FileDetail
    },
    {
      path: '/file/upload',
      component: FileUpload
    },
    {
      path: '/my/likes',
      component: MyLikes
    },
    {
      path: '/my/urls',
      component: MyURLs
    },
    {
      path: '/my/files',
      component: MyFiles
    },
    {
      path: '/user/:id/resources',
      name: 'UserResources',
      component: UserResources
    }
  ],
  mode: 'history'
})

export default router
