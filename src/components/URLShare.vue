<template>
  <div>
    <div class="page-header">
      <h1>资源分享</h1>
    </div>
    <form>
      <div class="form-group">
        <label for="title">标题</label>
        <input type="text" class="form-control" id="title" placeholder="BatCave网站">
      </div>
      <div class="form-group">
        <label for="content">URL地址</label>
        <label for="content">
          <select class="form-control">
            <option value="http">http://</option>
            <option value="https">https://</option>
          </select>
        </label>
        <input type="text" class="form-control" id="content" placeholder="batcave.jessezhu.cn">
      </div>
      <div class="form-group">
        <label for="type">类别</label>
        <select class="form-control" id="type">
          <option value="asset">资源</option>
          <option value="video">视频</option>
          <option value="learn">教程</option>
          <option value="official">官网</option>
          <option value="other">其他</option>
        </select>
      </div>
      <button type="reset" class="btn btn-default" id="reset">重置</button>
      <button type="submit" class="btn btn-primary" id="submit" @click.prevent="submit()">提交</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: "Share",
    methods:{
      submit(){
        alert('xx')
      }
    }
  }
</script>

<style scoped>
  #reset {
    margin-right: 10px;
  }
</style>
