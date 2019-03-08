<template>
  <div>
    <div class="page-header">
      <h1>文件资源</h1>
      <router-link to="/file/upload">我要上传</router-link>
    </div>
    <ul class="category">
      <li><strong>排序方式：</strong></li>
      <li><a href="javascript: void(0);" style="color:#BE77FF;">上传时间</a></li>
      <li><a href="javascript: void(0);" style="color:#FF2D2D">喜欢数量</a></li>
      <li></li>
    </ul>
    <ul class="posts">
      <li class="post" v-for="file of files">
        <div class="post-title">
          <a href="javascript: void(0);" v-if="myLikeFiles.indexOf(file.id)!==-1"><img src="../assets/images/liked.png" style="width: 40px;"></a>
          <a href="javascript: void(0);" v-else><img src="../assets/images/like.png" style="width: 40px;"></a>
          <span style="color:#606060">[{{file.type}}]</span>
          <router-link :to="{name: 'FileDetail', params: {id: file.id} }">{{file.title}}</router-link>
        </div>
        <div class="post-info">
          <router-link :to="{name: 'UserResources', params: {id: file.owner.id} }">{{file.owner.username}}</router-link>&nbsp;分享于&nbsp;<em>{{file.date}}</em>
        </div>
      </li>
    </ul>
    <pagination></pagination>
  </div>
</template>

<script>
  import Pagination from "./reusable/Pagination";

  export default {
    name: "MyFiles",
    components: {Pagination},
    data() {
      return {
        files: [],
        myLikeFiles: [1]
      }
    },
    mounted() {
      this.$axios.get('/api/files/limit?page=1')
        .then(res=>{
          this.files = res.data.files
        })
        .catch(err=>{
          console.log(err.response.data.message);
        })
    }
  }
</script>

<style scoped>

</style>
