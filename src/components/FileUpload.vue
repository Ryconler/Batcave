<template>
  <div>
    <div class="page-header">
      <h1>文件上传</h1>
    </div>
    <form>
      <div class="form-group">
        <label for="title">标题</label>
        <input type="text" class="form-control" id="title" placeholder="一个文件">
      </div>
      <div class="form-group">
        <label for="type">类别</label>
        <select class="form-control" id="type">
          <option value="image">图片</option>
          <option value="video">视频</option>
          <option value="document">文档</option>
          <option value="compress">压缩包</option>
          <option value="other">其他</option>
        </select>
      </div>
      <div class="form-group">
        <label for="file">选择文件</label>
        <input type="file" id="file">
        <p class="help-block">文件大小不能超过1M</p>
      </div>
      <button type="reset" class="btn btn-default" id="reset">重置</button>
      <button type="submit" class="btn btn-primary" id="submit" @click.prevent="submit()">提交</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: "Upload",
    methods:{
      submit(){
        alert('x')
      }
    }
  }
</script>

<style scoped>
  #reset {
    margin-right: 10px;
  }
</style>
