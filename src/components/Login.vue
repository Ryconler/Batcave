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
    <p>还没有账号？
      <router-link to="/register">点我注册</router-link>
      。
    </p>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data(){
      return{
        username: '',
        password: ''
      }
    },
    methods:{
      reset(){
        [this.username,this.password] = ['','']
      },
      submit() {
        if (this.username && this.password) {
          const loginInfo = {
            username: this.username,
            password: this.password
          }
          this.$axios.post('/api/login',loginInfo)
            .then(res=> {
              this.$emit('setUser',res.data.user)
              this.$emit('setCookie','username',loginInfo.username)  // 存储cookie
              this.$emit('setCookie','password',loginInfo.password)
              this.$emit('clearErrMsg')
              this.$router.go(-1)
            })
            .catch(err=>{
              this.$emit('addErrMsg',err.response.data.message)
            })
        }
      }
    },
    beforeCreate() {
      this.$emit('selectNone')
    }
  }
</script>

<style scoped>
  #reset {
    margin-right: 10px;
  }
</style>
