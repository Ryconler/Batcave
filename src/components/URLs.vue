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
    <pagination
    limit="10"
    :count="urlCount"
    @setPage="setPage"
    />
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
        urlCount: 0,
        page: 1,
        myLikeURLs: [1]
      }
    },
    methods:{
      setPage(page){
        this.page = page
      },
      getURLs(){
        this.$axios.get('/api/urls/limit?page='+this.page)
          .then(res=>{
            this.urls = res.data.urls
          })
          .catch(err=>{
            console.log(err.response.data.message);
          })
      },
      getCount(){
        this.$axios.get('/api/urls/count')
          .then(res=>{
            this.urlCount = res.data.count
          })
          .catch(err=>{
            console.log(err.response.data.message);
          })
      }
    },
    mounted() {
      this.getURLs()
      this.getCount()
    },
    watch:{
      page(){
        this.getURLs()
      }
    }
  }
</script>

<style scoped>

</style>
