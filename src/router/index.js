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
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/change-password',
      component: ChangePassword,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/urls',
      component: URLs
    },
    {
      path: '/url/share',
      component: URLShare,
      meta: {
        requireAuth: true
      }
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
      component: FileUpload,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/my/likes',
      component: MyLikes,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/my/urls',
      component: MyURLs,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/my/files',
      component: MyFiles,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/user/:id/resources',
      name: 'UserResources',
      component: UserResources
    }
  ],
  mode: 'history'
})
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('login')
  if (isLogin === 'yes') { // 之前有存储过从后端传过来的token
    if (['login', 'register'].indexOf(to.name) >= 0) { // 已经登录了耍心机还想去登录
      next('/') // 不允许
    } else {
      next() // 想去哪就去哪
    }
  } else { // 没有token，到login页面登录取token
    if (to.meta.requireAuth) { // 并且要访问的页面需要token验证
      next('/login') // 去login登录获取token
    } else {
      next() // 并不需要token，直接跳转
    }
  }
})
export default router
