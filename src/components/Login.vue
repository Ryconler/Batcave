<template>
    <div>
      <div class="page-header">
        <h1>用户登录</h1>
      </div>
      <div class="col-md-4">
        <!--{{ wtf.quick_form(form) }}-->
        <br>
        <p>新用户？ <router-link to="/register">点我注册</router-link>。</p>
        <p style="color:#ef1e1e">
          <strong>·</strong>如果你实在想不起来密码，那就重新注册一个吧...&nbsp;&nbsp;-_- ||
          <strong>·</strong>如果这个账号对你很重要，请<a href="#">联系管理员</a>来帮你找回。
        </p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Login"
    }
</script>

<style scoped>

</style>
