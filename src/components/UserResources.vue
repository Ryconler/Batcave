<template>
  <div>
    <h1>他分享的链接</h1>
    <ul class="posts">
      <li class="post" v-for="url of urls">
        <div class="post-title">
          <a href="javascript: void(0);" v-if="myLikeURLs.indexOf(url.id)!==-1"><img src="../assets/images/liked.png" style="width: 40px;"></a>
          <a href="javascript: void(0);" v-else><img src="../assets/images/like.png" style="width: 40px;"></a>
          <span style="color:#606060">[{{url.type}}]</span>
          <a :href="url.content" target="_blank">{{url.title}}</a></div>
        <div class="post-info">
          <a href="javascript: void(0);">{{url.owner.username}}</a>&nbsp;分享于&nbsp;<em>{{url.date}}</em>
        </div>
      </li>
    </ul>
    <pagination
      limit="5"
      :count="urlCount"
      @setPage="setURLPage"
    />

    <h1>他上传的文件</h1>
    <ul class="posts">
      <li class="post" v-for="file of files">
        <div class="post-title">
          <a href="javascript: void(0);" v-if="myLikeFiles.indexOf(file.id)!==-1"><img src="../assets/images/liked.png" style="width: 40px;"></a>
          <a href="javascript: void(0);" v-else><img src="../assets/images/like.png" style="width: 40px;"></a>
          <span style="color:#606060">[{{file.type}}]</span>
          <router-link :to="{name: 'FileDetail',  params: {id: file.id} }">{{file.title}}</router-link>
        </div>
        <div class="post-info">
          <a href="javascript: void(0);">{{file.owner.username}}</a>&nbsp;分享于&nbsp;<em>{{file.date}}</em>
        </div>
      </li>
    </ul>
    <pagination
      limit="5"
      :count="fileCount"
      @setPage="setFilePage"
    />
  </div>
</template>

<script>
  import Pagination from "./reusable/Pagination";
  export default {
    name: "UserResources",
    components: {Pagination},
    data(){
      return{
        id: 0,
        urls: [],
        urlCount: 0,
        urlPage:1,
        files: [],
        fileCount: 0,
        filePage:1,
        myLikeURLs: [1],
        myLikeFiles: [1]
      }
    },
    methods:{
      setURLPage(page) {
        this.urlPage = page
      },
      setFilePage(page) {
        this.filePage = page
      },
      getURLCount() {
        this.$axios.get('/api/urls/count/' + this.id)
          .then(res => {
            this.urlCount = res.data.count
            console.log(this.urlCount);

          })
          .catch(err => {
            console.log(err.response.data.message);
          })
      },
      getFileCount() {
        this.$axios.get('/api/files/public/count/' + this.id)
          .then(res => {
            this.fileCount = res.data.count
            console.log(this.fileCount);

          })
          .catch(err => {
            console.log(err.response.data.message);
          })
      },
      getURLs() {
        this.$axios.get('/api/urls/limit5/' + this.id + '?page='+this.urlPage)
          .then(res => {
            this.urls = res.data.urls
          })
      },
      getFiles() {
        this.$axios.get('/api/files/public/limit/' + this.id + '?page='+this.filePage)
          .then(res => {
            this.files = res.data.files
          })
      }
    },

    mounted() {
      this.id = this.$route.params.id
      this.getURLs()
      this.getFiles()
      this.getFileCount()
      this.getURLCount()
    },
    watch:{
      urlPage(){
        this.getURLs()
      },
      filePage(){
        this.getFiles()
      }
    }
  }
</script>

<style scoped>

</style>
