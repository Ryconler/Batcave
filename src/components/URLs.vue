<template>
  <div>
    <div class="page-header">
      <h1>链接资源</h1>
      <router-link to="/url/share">我要分享</router-link>
    </div>
    <ul class="category">
      <li><strong>排序方式：</strong></li>
      <li><a href="javascript: void(0);" style="color:#BE77FF;">分享时间</a></li>
      <li><a href="javascript: void(0);" style="color:#FF2D2D">喜欢数量</a></li>
      <li></li>
    </ul>
    <ul class="posts">
      <li class="post" v-for="url of urls">
        <div class="post-title">
          <a href="javascript: void(0);" v-if="myLikeURLs.indexOf(url.id)!==-1"><img src="../assets/images/liked.png" style="width: 40px;"></a>
          <a href="javascript: void(0);" v-else><img src="../assets/images/like.png" style="width: 40px;"></a>
          <span style="color:#606060">[{{url.type}}]</span>
          <a :href="url.content" target="_blank">{{url.title}}</a></div>
        <div class="post-info">
          <router-link :to="{name: 'UserResources', params: {id: url.owner.id} }">{{url.owner.username}}</router-link>&nbsp;分享于&nbsp;<em>{{url.create_date}}</em>
        </div>
      </li>
    </ul>
    <pagination></pagination>
  </div>
</template>

<script>
  import Pagination from "./reusable/Pagination";
  export default {
    name: "Resource",
    components: {Pagination},
    data(){
      return {
        urls: [],
        myLikeURLs: [1]
      }
    },
    mounted() {
      this.$axios.get('/api/urls/limit?page=1')
        .then(res=>{
          this.urls = res.data.urls
        })
        .catch(err=>{
          console.log(err.response.data.message);
        })
    }
  }
</script>

<style scoped>

</style>
