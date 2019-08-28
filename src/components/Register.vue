<template>
  <div>
    <div class="page-header">
      <h1>用户注册</h1>
    </div>
    <form>
      <div class="form-group has-feedback" :class="{'has-success': usrRight, 'has-error': usrWrong}">
        <label for="username">用户名</label>
        <input v-model.trim="username" type="text" class="form-control" id="username" placeholder="长度在3-10之间">
        <span v-if="usrRight" class="glyphicon glyphicon-ok form-control-feedback"></span>
        <span v-if="usrWrong" class="glyphicon glyphicon-remove form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback" :class="{'has-success': emlRight, 'has-error': emlWrong}">
        <label for="email">邮箱</label>
        <input v-model.trim="email" type="text" class="form-control" id="email" placeholder="这是你以后找回密码的关键">
        <span v-if="emlRight" class="glyphicon glyphicon-ok form-control-feedback"></span>
        <span v-if="emlWrong" class="glyphicon glyphicon-remove form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback" :class="{'has-success': pswRight, 'has-error': pswWrong}">
        <label for="Password">密码</label>
        <input v-model="password" type="password" class="form-control" id="Password" placeholder="长度在6-16之间">
        <span v-if="pswRight" class="glyphicon glyphicon-ok form-control-feedback"></span>
        <span v-if="pswWrong" class="glyphicon glyphicon-remove form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback" :class="{'has-success': repRight, 'has-error': repWrong}">
        <label for="Password">再次输入密码</label>
        <input v-model="rePassword" type="password" class="form-control" id="RePassword" placeholder="确认两次密码是否一致">
        <span v-if="repRight" class="glyphicon glyphicon-ok form-control-feedback"></span>
        <span v-if="repWrong" class="glyphicon glyphicon-remove form-control-feedback"></span>
      </div>
      <div class="checkbox">
        <label>
          <input v-model="isAgree" type="checkbox"><a href="https://ssl.zc.qq.com/chs/agreement1_chs.html"
                                                      target="_blank">我已阅读并同意相关服务条款</a>
        </label>
      </div>
      <button type="reset" class="btn btn-default" id="reset" @click.prevent="reset()">重置</button>
      <button type="submit" class="btn btn-primary" id="submit" @click.prevent="submit()" :disabled="!isAgree">注册</button>
    </form>
    <br>
    <p>已有账号？
      <router-link to="/login">点我登录</router-link>
      。
    </p>
  </div>
</template>

<script>
  export default {
    name: "Register",
    data() {
      return {
        username: '',
        usrRight: false,
        usrWrong: false,
        email: '',
        emlRight: false,
        emlWrong: false,
        password: '',
        pswRight: false,
        pswWrong: false,
        rePassword: '',
        repRight: false,
        repWrong: false,
        isAgree: false,
      }
    },
    methods: {
      validateUsr(val) {
        if (val.length < 3 || val.length > 10) {
          this.usrRight = false
          this.usrWrong = true
          return false
        } else if (val.indexOf(' ') >= 0) {
          this.usrRight = false
          this.usrWrong = true
          return false
        } else {
          this.usrRight = true
          this.usrWrong = false
          return true
        }
      },
      validateEml(val) {
        // 邮箱格式
        const reg = new RegExp('^[a-zA-Z0-9][\\w\\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\\w\\.-]*[a-zA-Z0-9]\\.[a-zA-Z][a-zA-Z\\.]*[a-zA-Z]$')
        if (val.length === 0) {
          this.emlRight = false
          this.emlWrong = true
          return false
        } else if (!reg.test(val)) {
          this.emlRight = false
          this.emlWrong = true
          return false
        } else {
          this.emlRight = true
          this.emlWrong = false
          return true
        }
      },
      validatePsw(val) {
        const reg = /^[\x20-\x7E]*$/ // 包含所有ASCII字符（含空格）
        if (val.length < 6 || val.length > 16) {
          this.pswRight = false
          this.pswWrong = true
          return false
        } else if (!reg.test(val)) {
          this.pswRight = false
          this.pswWrong = true
          return false
        } else {
          this.pswRight = true
          this.pswWrong = false
          return true
        }
      },
      validateRep(val) {
        if (val === this.password) {
          this.repRight = true
          this.repWrong = false
          return true
        } else {
          this.repRight = false
          this.repWrong = true
          return false
        }
      },
      reset(){
        [this.username,this.email,this.password,this.rePassword] = ['','','','','']
      },
      submit() {
        let a = this.validateUsr(this.username)
        let b = this.validateEml(this.email)
        let c = this.validatePsw(this.password)
        let d = this.validateRep(this.rePassword)
        if (a && b && c && d && this.isAgree) {
          const registerInfo = {
            username: this.username,
            email: this.email,
            password: this.password,
          }
          this.$store.dispatch('register',registerInfo)
        }
      }
    },
    mounted(){
      this.$store.commit('selecRegister')
    },
    watch: { // 字段trim后发生改变了并触发了blur事件（lazy），进行一次验证
      username(val) {
        this.validateUsr(val)
      },
      email(val) {
        this.validateEml(val)
      },
      password(val) {
        this.validatePsw(val)
        this.validateRep(this.rePassword)
      },
      rePassword(val) {
        this.validateRep(val)
      }
    }
  }
</script>

<style scoped>
  #reset {
    margin-right: 10px;
  }
</style>
