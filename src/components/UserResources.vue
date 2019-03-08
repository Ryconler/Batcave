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
    <pagination />

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
    <pagination />
  </div>
</template>

<script>
  import Pagination from "./reusable/Pagination";
  export default {
    name: "UserResources",
    components: {Pagination},
    data(){
      return{
        urls: [],
        files: [],
        myLikeURLs: [1],
        myLikeFiles: [1]
      }
    },
    methods:{
      getURLs() {
        const id = this.$route.params.id
        this.$axios.get('/api/urls/limit/' + id + '?page=1')
          .then(res => {
            this.urls = res.data.urls
          })
      },
      getFiles() {
        const id = this.$route.params.id
        this.$axios.get('/api/files/limit/' + id + '?page=1')
          .then(res => {
            let files = []
            for (let file of res.data.files) {
              if(file.private === '0') files.push(file)
            }
            this.files = files
          })
      }
    },

    mounted() {
      this.getURLs()
      this.getFiles()
    }
  }
</script>

<style scoped>

</style>
