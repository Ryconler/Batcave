<template>
  <div id="app">
    <div class="navbar navbar-inverse" role="navigation" style="border-radius: 0">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link to="/"><img src="./assets/images/logo1.png" class="navbar-brand" style="width: 85px;">
          </router-link>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li :class="{select: homeSelect}">
              <router-link to="/">首页</router-link>
            </li>
            <li :class="{select: urlSelect}">
              <router-link to="/urls">链接资源</router-link>
            </li>
            <li :class="{select: fileSelect}">
              <router-link to="/files">文件资源</router-link>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown" v-if="user"
                :class="{select: myLikeSelect||myURLSelect||myFileSelect||changePswSelect}">
              <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown">
                <img src="./assets/images/head_portrait.png" style="width: 20px;height: 20px; margin-right: 10px">{{
                user.username }}<b class="caret"></b>
              </a>
              <ul class="dropdown-menu">
                <li :class="{select: myLikeSelect}">
                  <router-link to="/my/likes">我的喜欢<img src="./assets/images/liked.png" style="width: 30px;">
                  </router-link>
                </li>
                <li :class="{select: myURLSelect}">
                  <router-link to="/my/urls">我的链接<img src="./assets/images/url.png"
                                                      style="margin-left:5px; width: 20px;">
                  </router-link>
                </li>
                <li :class="{select: myFileSelect}">
                  <router-link to="/my/files">我的文件<img src="./assets/images/file.png"
                                                       style="margin-left:5px; width: 20px;">
                  </router-link>
                </li>
                <li :class="{select: changePswSelect}">
                  <router-link to="/change-password">修改密码&nbsp;<img src="./assets/images/lock.png"
                                                                    style="margin-left:4px; width: 15px;">
                  </router-link>
                </li>
                <li><a href="javascript:void(0);" @click="logout()">注销</a></li>
              </ul>
            </li>
            <li v-if="!user" :class="{select: login}">
              <router-link to="/login">登录</router-link>
            </li>
            <li v-if="!user" :class="{select: register}">
              <router-link to="/register">注册</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="alert alert-warning" v-for="msg of errorMessages" v-if="errorMessages.length">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        {{ msg }}
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      html: `<p style="color:red;">123</p>`
    }
  },
  computed: mapState([
    'user',
    'errorMessages',
    'homeSelect',
    'urlSelect',
    'fileSelect',
    'myLikeSelect',
    'myURLSelect',
    'myFileSelect',
    'changePswSelect',
    'login',
    'register'
  ]),
  methods: {
    checkLog () {
      this.$store.dispatch('checkLog')
    },
    logout () {
      this.$store.dispatch('logout')
    }
  },
  mounted () {
    this.checkLog()
  }
}
</script>

<style>
  body {
    background-image: url("./assets/images/bg.png");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed
  }

  .navbar {
    border: none;
  }

  .navbar li a {
    color: #9d9d9d;
  }

  .navbar li a:hover {
    color: aliceblue;
  }

  .select {
    border-bottom: 4px solid aliceblue;
    color: aliceblue !important;
  }

  .select > a {
    color: aliceblue !important;
    font-weight: bold;
  }

  .dropdown-menu {
    background: #222;
  }

  .dropdown-menu li:hover a {
    background: transparent;
  }

  b.caret {
    margin-left: 10px;
  }

  /* 子组件中的公共样式 */
  div.page-header {
    border-bottom: none;
  }

  div.page-header h1 {
    display: inline;
  }

  div.page-header a {
    float: right;
    margin-top: 21px;
    font-weight: bold;
    color: #ff5809;
  }

  ul.category li {
    display: inline;
    padding: 10px;

  }

  ul.category li a:visited {
    text-decoration: underline;
  }

  ul.category li.as a:hover {
    text-decoration: none;
  }

  ul.posts {
    list-style-type: none;
    padding: 0;
    margin: 16px 0 0 0;
    border-top: 1px solid #e0e0e0;
  }

  ul.posts li.post {
    padding: 8px;
    border-bottom: 1px solid #e0e0e0;
  }

  ul.posts li.post:hover {
    background-color: #f0f0f0;
  }

  div.post-title {
    float: left;
    font-weight: bold;
  }

  div.post-title a {
    color: black;
  }

  div.post-title a:hover {
    color: red;
  }

  div.post-info {
    text-align: right;
    font-weight: bold;
  }

  div.pagination {
    width: 100%;
    text-align: right;
    padding: 0px;
    margin: 0px;
  }
</style>
