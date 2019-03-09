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
            <li class="dropdown" v-if="user">
              <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown">
                <img src="./assets/images/head_portrait.png" style="width: 20px;height: 20px; margin-right: 10px">{{
                user.username }}<b class="caret"></b>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <router-link to="/my/likes">我的喜欢<img src="./assets/images/liked.png" style="width: 30px;">
                  </router-link>
                </li>
                <li>
                  <router-link to="/my/urls">我的链接<img src="./assets/images/url.png" style="margin-left:5px; width: 20px;">
                  </router-link>
                </li>
                <li>
                  <router-link to="/my/files">我的文件<img src="./assets/images/file.png" style="margin-left:5px; width: 20px;">
                  </router-link>
                </li>
                <li>
                  <router-link to="/change-password">修改密码&nbsp;<img src="./assets/images/lock.png"
                                                                    style="margin-left:4px; width: 15px;">
                  </router-link>
                </li>
                <li><a href="javascript:void(0);" @click="logout()">注销</a></li>
              </ul>
            </li>
            <li v-if="!user">
              <router-link to="/login">登录</router-link>
            </li>
            <li v-if="!user">
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
      <router-view
        :user="user"
        :myLikeURLs="myLikeURLs"
        :myLikeFiles="myLikeFiles"
        @setUser="setUser"
        @addErrMsg="addErrMsg"
        @clearErrMsg="clearErrMsg"
        @setCookie="setCookie"
        @getCookie="getCookie"
        @delCookie="delCookie"
        @likeURL="likeURL"
        @unlikeURL="unlikeURL"
        @likeFile="likeFile"
        @unlikeFile="unlikeFile"
        @logout="logout"
        @selectHome="selectHome"
        @selectURL="selectURL"
        @selectFile="selectFile"
        @selectNone="selectNone"
      ></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        user: null,
        errorMessages: [],
        myLikeURLs: [],
        myLikeFiles: [],
        homeSelect: true,
        urlSelect: false,
        fileSelect: false,
      }
    },
    methods: {
      selectNone() {
        this.homeSelect = false
        this.urlSelect = false
        this.fileSelect = false
      },
      selectHome() {
        this.homeSelect = true
        this.urlSelect = false
        this.fileSelect = false
      },
      selectURL() {
        this.urlSelect = true
        this.homeSelect = false
        this.fileSelect = false
      },
      selectFile() {
        this.fileSelect = true
        this.homeSelect = false
        this.urlSelect = false
      },
      getLogStatus() {
        this.$axios.get('/api/logstatus')
          .then(res => {
            this.user = res.data.user
            if (res.data.message) {
              this.delCookie('username')
              this.delCookie('password')
            }
          })
      },
      setCookie(key, value) {
        let date = new Date(); //获取当前时间
        date.setTime(date.getTime() + 7 * 24 * 3600 * 1000); //格式化为cookie识别的时间
        document.cookie = key + "=" + encodeURI(value) + ";expires=" + date.toUTCString();  //设置cookie
      },
      getCookie(key) {
        let cookies = document.cookie.split(';')
        for (let cookie of cookies) {
          let c = cookie.trim()
          if (c.indexOf(key + '=') !== -1) {
            return c.slice(key.length + 1, c.length)
          }
        }
      },
      delCookie(key) {
        let date = new Date(); //获取当前时间
        date.setTime(date.getTime() - 10000); //将date设置为过去的时间
        document.cookie = key + "=v; expires =" + date.toUTCString();//设置cookie
      },
      setUser(user) {
        this.user = user
      },
      logout() {
        this.user = null
        this.delCookie('username')
        this.delCookie('password')
        this.$axios.get('/api/logout')
          .then(res => {
            this.$router.push('/login')
          })
      },
      addErrMsg(msg) {
        this.errorMessages.push(msg)
      },
      clearErrMsg() {
        this.errorMessages = []
      },
      getMyLikeURLs() {
        if (this.user) {
          this.$axios.get('/api/likes/urls/id')
            .then(res => {
              this.myLikeURLs = res.data.likes
            })
            .catch(err => {
              console.log(err.response.data.message);
            })
        }
      },
      getMyLikeFiles() {
        if (this.user) {
          this.$axios.get('/api/likes/files/id')
            .then(res => {
              this.myLikeFiles = res.data.likes
            })
            .catch(err => {
              console.log(err.response.data.message);
            })
        }
      },
      likeURL(rid) {
        this.$axios.post('/api/likes/like', {rid: rid})
          .then(res => {
            this.myLikeURLs.push(rid)
          })
          .catch(err => {
            console.log(err.response.data.message);
          })
      },
      unlikeURL(rid) {
        this.$axios.delete('/api/likes/unlike/url/' + rid)
          .then(res => {
            let myLikeURLs = this.myLikeURLs
            do {
              myLikeURLs.splice(myLikeURLs.indexOf(rid), 1)
            }
            while (myLikeURLs.indexOf(rid) !== -1)
            this.myLikeURLs = myLikeURLs
          })
          .catch(err => {
            console.log(err.response.data.message);
          })
      },
      likeFile(fid) {
        this.$axios.post('/api/likes/like', {fid: fid})
          .then(res => {
            this.myLikeFiles.push(fid)
          })
          .catch(err => {
            console.log(err.response.data.message);
          })
      },
      unlikeFile(fid) {
        this.$axios.delete('/api/likes/unlike/file/' + fid)
          .then(res => {
            let myLikeFiles = this.myLikeFiles
            do {
              myLikeFiles.splice(myLikeFiles.indexOf(fid), 1)
            }
            while (myLikeFiles.indexOf(fid) !== -1)
            this.myLikeFiles = myLikeFiles
          })
          .catch(err => {
            console.log(err.response.data.message);
          })
      }
    },
    mounted() {
      this.getLogStatus()
      this.getMyLikeURLs()
      this.getMyLikeFiles()
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

  li.select {
    background: aliceblue !important;
  }

  li.select a {
    color: #101010 !important;
  }

  li.select a:hover {
    color: #101010 !important;
  }

  li.select a:visited {
    color: #101010 !important;
  }

  .profile-thumbnail {
    position: absolute;
  }

  .profile-header {
    min-height: 260px;
    margin-left: 280px;
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

  div.post-tabs {
    margin-top: 16px;
  }

  ul.category {
    list-style-type: none;
    padding: 0px;

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

  li .form {
    float: right;
  }

  ul.posts {
    list-style-type: none;
    padding: 0px;
    margin: 16px 0px 0px 0px;
    border-top: 1px solid #e0e0e0;
  }

  div.post-tabs ul.posts {
    margin: 0px;
    border-top: none;
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

  div.post-thumbnail {
    position: absolute;
  }

  div.post-footer {
    text-align: right;
  }

  ul.comments {
    list-style-type: none;
    padding: 0px;
    margin: 16px 0px 0px 0px;
  }

  ul.comments li.comment {
    margin-left: 32px;
    padding: 8px;
    border-bottom: 1px solid #e0e0e0;
  }

  ul.comments li.comment:nth-child(1) {
    border-top: 1px solid #e0e0e0;
  }

  ul.comments li.comment:hover {
    background-color: #f0f0f0;
  }

  div.comment-date {
    float: right;
  }

  div.comment-author {
    font-weight: bold;
  }

  div.comment-thumbnail {
    position: absolute;
  }

  div.comment-content {
    margin-left: 48px;
    min-height: 48px;
  }

  div.comment-form {
    margin: 16px 0px 16px 32px;
  }

  div.pagination {
    width: 100%;
    text-align: right;
    padding: 0px;
    margin: 0px;
  }

  div.flask-pagedown-preview {
    margin: 10px 0px 10px 0px;
    border: 1px solid #e0e0e0;
    padding: 4px;
  }

  div.flask-pagedown-preview h1 {
    font-size: 140%;
  }

  div.flask-pagedown-preview h2 {
    font-size: 130%;
  }

  div.flask-pagedown-preview h3 {
    font-size: 120%;
  }

  .post-body h1 {
    font-size: 140%;
  }

  .post-body h2 {
    font-size: 130%;
  }

  .post-body h3 {
    font-size: 120%;
  }

  .table.followers tr {
    border-bottom: 1px solid #e0e0e0;
  }

</style>
