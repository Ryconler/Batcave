<template>
  <div>
    <div class="page-header">
      <h1>用户登录</h1>
    </div>
    <form>
      <div class="form-group">
        <label for="username">用户名</label>
        <input v-model="username" type="text" class="form-control" id="username">
      </div>
      <div class="form-group">
        <label for="Password">密码</label>
        <input v-model="password" type="password" class="form-control" id="Password">
      </div>
      <button type="reset" class="btn btn-default" id="reset" @click.prevent="reset()">重置</button>
      <button type="submit" class="btn btn-primary" id="submit" @click.prevent="submit()" :disabled="!(this.username&&this.password)">登录</button>
    </form>
    <br>
    <p>忘记密码？
      <a href="javascript: void(0);" @click="sendTmpPsw" v-if="!hasSent">点我找回</a>
      <span v-else style="color: #606060">{{sendCD}}</span>
      <span style="color: darkred;">{{info}}</span>
    </p>
    <p>还没有账号？
      <router-link to="/register">点我注册</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      hasSent: false,
      sendCD: 60,
      info: ''
    }
  },
  methods: {
    reset () {
      [this.username, this.password] = ['', '']
    },
    submit () {
      if (this.username && this.password) {
        const loginInfo = {
          username: this.username,
          password: this.password
        }
        this.$store.dispatch('login', loginInfo)
      }
    },
    sendTmpPsw () {
      if (this.username && !this.hasSent) {
        this.$store.dispatch('sendTmpPsw', this.username)
        this.info = '我们向您的邮箱发送了一份邮件，请注意查收。'
        this.hasSent = true
        let t = setInterval(() => {
          this.sendCD = this.sendCD - 1
          if (this.sendCD === 0) {
            clearInterval(t)
            this.hasSent = false
            this.sendCD = 60
            this.info = ''
          }
        }, 1000)
      } else {
        this.info = '请输入用户名'
      }
    }
  },
  created () {
    console.log('created')
  },
  mounted () {
    console.log('mount')

    this.$store.commit('selecLogin')
  }
}
</script>

<style scoped>
  #reset {
    margin-right: 10px;
  }
</style>
