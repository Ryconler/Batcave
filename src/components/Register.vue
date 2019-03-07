<template>
    <div>
      <div class="page-header">
        <h1>用户注册</h1>
      </div>
      <p style="color:#ef1e1e"><strong>极速注册的代价是忘记密码无法找回，所以请牢记你的密码，不要告诉别人哦！^v^</strong></p>

      <div class="col-md-4">
        <!--{{ wtf.quick_form(form) }}-->
        <br>
        <p>已有账号？ <router-link to="/login">点我登录</router-link>。</p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Register"
    }
</script>

<style scoped>

</style>
