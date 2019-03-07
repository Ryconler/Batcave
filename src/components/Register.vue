<template>
  <div>
    <div class="page-header">
      <h1>用户注册</h1>
    </div>
    <form>
      <div class="form-group">
        <label for="username">用户名</label>
        <input type="text" class="form-control" id="username" placeholder="长度在4-10之间">
      </div>
      <div class="form-group">
        <label for="email">邮箱</label>
        <input type="email" class="form-control" id="email" placeholder="这是你以后找回密码的关键">
      </div>
      <div class="form-group">
        <label for="Password">密码</label>
        <input type="password" class="form-control" id="Password" placeholder="长度在6-16之间">
      </div>
      <div class="form-group">
        <label for="Password">再次输入密码</label>
        <input type="password" class="form-control" id="RePassword" placeholder="确认两次密码是否一致">
      </div>
      <div class="checkbox">
        <label>
          <input type="checkbox"><a href="https://ssl.zc.qq.com/chs/agreement1_chs.html"
                                    target="_blank">我已阅读并同意相关服务条款</a>
        </label>
      </div>
      <button type="reset" class="btn btn-default" id="reset">重置</button>
      <button type="submit" class="btn btn-primary" id="submit" @click.prevent="submit()">注册</button>
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
    data(){
      return{
        count: 1
      }
    },
    methods: {
      submit() {
        this.$emit('addErrMsg',this.count++)
      }
    }
  }
</script>

<style scoped>
  #reset {
    margin-right: 10px;
  }
</style>
