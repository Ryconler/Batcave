<template>
  <div>
    <div class="page-header">
      <h1>密码更改</h1>
    </div>
    <form>
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
      <button type="reset" class="btn btn-default" id="reset" @click.prevent="reset()">重置</button>
      <button type="submit" class="btn btn-primary" id="submit" @click.prevent="submit()">更改</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: "Register",
    data(){
      return{
        password: '',
        pswRight: false,
        pswWrong: false,
        rePassword: '',
        repRight: false,
        repWrong: false,
      }
    },
    methods: {
      validatePsw(val) {
        const reg = /^[\x20-\x7E]*$/ // 包含所有ASCII字符（含空格）
        if (val.length < 6 || val.length > 16) {
          // this.addErrMsg('密码长度在6-16之间')
          this.pswRight = false
          this.pswWrong = true
          return false
        } else if (!reg.test(val)) {
          // this.addErrMsg('密码不能特殊字符')
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
        [this.password,this.rePassword] = ['','']
      },
      submit() {
        let c = this.validatePsw(this.password)
        let d = this.validateRep(this.rePassword)
        if(c && d){
          this.$store.dispatch('changePassword',this.password)
        }
      }
    },
    mounted(){
      this.$store.commit('selectChangePsw')
    },
    watch:{
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
