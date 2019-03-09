<template>
  <div>
    <h1>他分享的链接</h1>
    <ul class="posts">
      <li class="post" v-for="url of urls">
        <div class="post-title">
          <a href="javascript: void(0);" v-if="myLikeURLs.indexOf(url.id)!==-1" @click="unlikeURL(url.id)"><img src="../assets/images/liked.png" style="width: 40px;"></a>
          <a href="javascript: void(0);" v-else @click="likeURL(url.id)"><img src="../assets/images/like.png" style="width: 40px;"></a>
          <span style="color:#606060">[{{url.type}}]</span>
          <a :href="url.content" target="_blank">{{url.title}}</a></div>
        <div class="post-info">
          &nbsp;分享于&nbsp;<em>{{url.create_date}}</em>
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
          <a href="javascript: void(0);" v-if="myLikeFiles.indexOf(file.id)!==-1" @click="unlikeFile(file.id)"><img src="../assets/images/liked.png" style="width: 40px;"></a>
          <a href="javascript: void(0);" v-else @click="likeFile(file.id)"><img src="../assets/images/like.png" style="width: 40px;"></a>
          <span style="color:#606060">[{{file.type}}]</span>
          <router-link :to="{name: 'FileDetail',  params: {id: file.id} }">{{file.title}}</router-link>
        </div>
        <div class="post-info">
          &nbsp;分享于&nbsp;<em>{{file.create_date}}</em>
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
    props:['myLikeURLs','myLikeFiles'],
    data(){
      return{
        id: 0,
        urls: [],
        urlCount: 0,
        urlPage:1,
        files: [],
        fileCount: 0,
        filePage:1
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
          })
      },
      getFileCount() {
        this.$axios.get('/api/files/public/count/' + this.id)
          .then(res => {
            this.fileCount = res.data.count
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
      },
      unlikeURL(rid){
        this.$emit('unlikeURL',rid)
      },
      likeURL(rid){
        this.$emit('likeURL',rid)
      },
      likeFile(fid) {
        this.$emit('likeFile',fid)
      },
      unlikeFile(fid) {
        this.$emit('unlikeFile',fid)
      }
    },

    mounted() {
      this.$emit('selectNone')
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
