<template>
  <div>
    <h1>我喜欢的资源</h1>
    <ul class="posts">
      <li class="post" v-for="url of urls">
        <div class="post-title">
          <a href="javascript: void(0);" v-if="myLikeURLs.indexOf(url.rid)!==-1" @click="unlikeURL(url.rid)"><img
            src="../assets/images/liked.png" style="width: 40px;"></a>
          <a href="javascript: void(0);" v-else @click="likeURL(url.rid)"><img src="../assets/images/like.png"
                                                                              style="width: 40px;"></a>
          <span style="color:#606060">[{{url.type}}]</span>
          <a :href="url.content" target="_blank">{{url.title}}</a>
        </div>
        <div class="post-info">
          &nbsp;喜欢与&nbsp;<em>{{url.like_date}}</em>
        </div>
      </li>
    </ul>
    <pagination
      limit="5"
      :count="urlCount"
      @setPage="setURLPage"
    />

    <h1>我喜欢的文件</h1>
    <ul class="posts">
      <li class="post" v-for="file of files">
        <div class="post-title">
          <a href="javascript: void(0);" v-if="myLikeFiles.indexOf(file.fid)!==-1" @click="unlikeFile(file.fid)"><img
            src="../assets/images/liked.png" style="width: 40px;"></a>
          <a href="javascript: void(0);" v-else @click="likeFile(file.fid)"><img src="../assets/images/like.png"
                                                                                style="width: 40px;"></a>
          <span style="color:#606060">[{{file.type}}]</span>
          <router-link :to="{name: 'FileDetail', params: {id: file.fid} }">{{file.title}}</router-link>
        </div>
        <div class="post-info">
          &nbsp;喜欢于&nbsp;<em>{{file.like_date}}</em>
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
    name: "MyLikes",
    components: {Pagination},
    props: ['myLikeURLs', 'myLikeFiles'],
    data() {
      return {
        urls: [],
        urlPage: 1,
        urlCount: 0,
        files: [],
        filePage: 1,
        fileCount: 0,
      }
    },
    methods: {
      setURLPage(page) {
        this.urlPage = page
      },
      getURLCount() {
        this.$axios.get('/api/likes/urls/id')
          .then(res => {
            this.urlCount = res.data.likes.length
          })
          .catch(err => {
            console.log(err.response.data.message);
          })
      },
      getURLs() {
        this.$axios.get('/api/likes/urls/limit?page=' + this.urlPage)
          .then(res=>{
            this.urls = res.data.likes
          })
          .catch(err=>{
            console.log(err.response.data.message);
          })
      },
      setFilePage(page) {
        this.filePage = page
      },
      getFileCount() {
        this.$axios.get('/api/likes/files/id')
          .then(res => {
            this.fileCount = res.data.likes.length
          })
          .catch(err=>{
            console.log(err.response.data.message);
          })
      },
      getFiles() {
        this.$axios.get('/api/likes/files/limit?page=' + this.filePage)
          .then(res=>{
            this.files = res.data.likes
          })
          .catch(err=>{
            console.log(err.response.data.message);
          })
      },
      unlikeURL(rid) {
        this.$emit('unlikeURL', rid)
      },
      likeURL(rid) {
        this.$emit('likeURL', rid)
      },
      likeFile(fid) {
        this.$emit('likeFile', fid)
      },
      unlikeFile(fid) {
        this.$emit('unlikeFile', fid)
      }
    },
    mounted() {
      this.$emit('selectNone')
      this.$axios.get('/api/logstatus')
        .then(res => {
          if(!res.data.user){
            this.$router.replace('/login')
          }
          if (res.data.message) {
            this.$emit('delCookie','username')
            this.$emit('delCookie','password')
          }
        })
      this.getURLs()
      this.getFiles()
      this.getURLCount()
      this.getFileCount()
    },
    watch:{
      urlPage(){
        this.getURLs()
        this.getURLCount()
      },
      filePage(){
        this.getFiles()
        this.getFileCount()
      }
    }
  }
</script>

<style scoped>

</style>
