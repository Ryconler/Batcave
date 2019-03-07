<template>
  <div>
    <div class="page-header">
      <h1>用户登录</h1>
    </div>
    <form>
      <div class="form-group">
        <label for="username">用户名或邮箱</label>
        <input type="text" class="form-control" id="username">
      </div>
      <div class="form-group">
        <label for="Password">密码</label>
        <input type="password" class="form-control" id="Password">
      </div>
      <button type="reset" class="btn btn-default" id="reset">重置</button>
      <button type="submit" class="btn btn-primary" id="submit" @click.prevent="submit()">登录</button>
    </form>
    <br>
    <p>还没有账号？
      <router-link to="/register">点我注册</router-link>
      。
    </p>
  </div>
</template>

<script>
  export default {
    name: "Login",
    methods:{
      submit(){
        console.log('xx');
      }
    }
  }
</script>

<style scoped>
  #reset {
    margin-right: 10px;
  }
</style>
