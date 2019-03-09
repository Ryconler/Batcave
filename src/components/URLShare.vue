<template>
  <div>
    <div class="page-header">
      <h1>资源分享</h1>
    </div>
    <form>
      <div class="form-group">
        <label for="title">标题</label>
        <input v-model.trim="title" type="text" class="form-control" id="title" placeholder="BatCave网站">
      </div>
      <div class="form-group">
        <label for="content">URL地址</label>
        <label for="content">
          <select v-model="http" class="form-control">
            <option value="http">http://</option>
            <option value="https">https://</option>
          </select>
        </label>
        <input v-model="content" type="text" class="form-control" id="content" placeholder="batcave.jessezhu.cn">
      </div>
      <div class="form-group">
        <label for="type">类别</label>
        <select v-model="type" class="form-control" id="type">
          <option value="asset">资源</option>
          <option value="video">视频</option>
          <option value="learn">教程</option>
          <option value="official">官网</option>
          <option value="other">其他</option>
        </select>
      </div>
      <button type="reset" class="btn btn-default" id="reset" @click.prevent="reset()">重置</button>
      <button type="submit" class="btn btn-primary" id="submit" @click.prevent="submit()"
              :disabled="!(title&&content&&http&&type)">提交
      </button>
    </form>
  </div>
</template>

<script>
  export default {
    name: "Share",
    data() {
      return {
        title: '',
        http: 'http',
        content: '',
        type: 'asset'
      }
    },
    methods: {
      reset(){
        [this.title,this.http,this.content,this.type] = ['','http','','asset']
      },
      submit() {
        const cntReg = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/;  //网址正则
        if (this.title && this.http && this.content && this.type) {
          if (this.title.length > 20) this.$emit('addErrMsg', '标题长度不超过20')
          else if (!cntReg.test(this.http + '://' + this.content)) this.$emit('addErrMsg', 'URL地址格式不正确')
          else {
            const url = {
              title:this.title,
              content: this.http + '://' + this.content,
              type:this.type
            }
            this.$store.dispatch('share',url)
          }
        }
      }
    },
    mounted() {
      this.$store.commit('selectNone')
    }

  }
</script>

<style scoped>
  #reset {
    margin-right: 10px;
  }
</style>
