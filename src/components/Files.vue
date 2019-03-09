<template>
  <div>
    <div class="page-header">
      <h1>文件资源</h1>
      <router-link to="/file/upload">我要上传</router-link>
    </div>
    <!--<ul class="category">-->
      <!--<li><strong>排序方式：</strong></li>-->
      <!--<li><a href="javascript: void(0);" style="color:#BE77FF;">上传时间</a></li>-->
      <!--<li><a href="javascript: void(0);" style="color:#FF2D2D">喜欢数量</a></li>-->
      <!--<li></li>-->
    <!--</ul>-->
    <ul class="posts">
      <li class="post" v-for="file of files">
        <div class="post-title">
          <a href="javascript: void(0);" v-if="myLikeFiles.indexOf(file.id)!==-1" @click="unlikeFile(file.id)"><img src="../assets/images/liked.png" style="width: 40px;"></a>
          <a href="javascript: void(0);" v-else @click="likeFile(file.id)"><img src="../assets/images/like.png" style="width: 40px;"></a>
          <span style="color:#606060">[{{file.type}}]</span>
          <router-link :to="{name: 'FileDetail', params: {id: file.id} }">{{file.title}}</router-link>
        </div>
        <div class="post-info">
          <router-link :to="{name: 'UserResources', params: {id: file.owner.id} }">{{file.owner.username}}</router-link>&nbsp;分享于&nbsp;<em>{{file.date}}</em>
        </div>
      </li>
    </ul>
    <pagination
      limit="10"
      :count="fileCount"
      @setPage="setPage"
    />
  </div>
</template>

<script>
  import Pagination from "./reusable/Pagination";

  export default {
    name: "MyFiles",
    components: {Pagination},
    props: ['myLikeFiles'],
    data() {
      return {
        files: [
          {id:0,owner: {id:0}},
          {id:1,owner: {id:1}},
          {id:2,owner: {id:2}},
          {id:3,owner: {id:3}},
          {id:4,owner: {id:4}},
          {id:5,owner: {id:5}},
          {id:6,owner: {id:6}},
          {id:7,owner: {id:7}},
          {id:8,owner: {id:8}},
          {id:9,owner: {id:9}},
        ],
        fileCount: 0,
        page: 1
      }
    },
    methods:{
      setPage(page){
        this.page = page
      },
      getFiles(){
        this.$axios.get('/api/files/limit?page='+this.page)
          .then(res=>{
            this.files = res.data.files
          })
          .catch(err=>{
            console.log(err.response.data.message);
          })
      },
      getCount(){
        this.$axios.get('/api/files/count')
          .then(res=>{
            this.fileCount = res.data.count
          })
          .catch(err=>{
            console.log(err.response.data.message);
          })
      },
      likeFile(fid) {
        this.$emit('likeFile',fid)
      },
      unlikeFile(fid) {
        this.$emit('unlikeFile',fid)
      }
    },
    mounted() {
      this.$emit('selectFile')
      this.getFiles()
      this.getCount()
    },
    watch:{
      page(){
        this.getFiles()
      }
    }
  }
</script>

<style scoped>

</style>
