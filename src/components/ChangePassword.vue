<template>
  <div>
    <div class="page-header">
      <h1>密码更改</h1>
    </div>
    <form>
      <div class="form-group">
        <label for="Password">新密码</label>
        <input type="password" class="form-control" id="Password" placeholder="长度在6-16之间">
      </div>
      <div class="form-group">
        <label for="Password">再次输入密码</label>
        <input type="password" class="form-control" id="RePassword" placeholder="确认两次密码是否一致">
      </div>
      <button type="reset" class="btn btn-default" id="reset">重置</button>
      <button type="submit" class="btn btn-primary" id="submit" @click.prevent="submit()">确定</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: "Register",
    methods: {
      submit() {
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
