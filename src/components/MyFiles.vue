<template>
  <div>
    <div class="page-header">
      <h1>我的文件</h1>
      <router-link to="/file/upload">我要上传</router-link>
    </div>
    <h3>所有人可见</h3>
    <ul class="posts">
      <li class="post" v-for="file of publicFiles">
        <div class="post-title">
          <a href="javascript: void(0);" v-if="myLikeFiles.indexOf(file.id)!==-1"><img src="../assets/images/liked.png"
                                                                                       style="width: 40px;"></a>
          <a href="javascript: void(0);" v-else><img src="../assets/images/like.png" style="width: 40px;"></a>
          <span style="color:#606060">[{{file.type}}]</span>
          <router-link :to="{name: 'FileDetail', params: {id: file.id} }">{{file.title}}</router-link>
        </div>
        <div class="post-info">
          <a href="javascript: void(0);">{{file.owner.username}}</a>&nbsp;分享于&nbsp;<em>{{file.create_date}}</em>
        </div>
      </li>
    </ul>
    <pagination/>

    <h3>仅自己可见</h3>
    <ul class="posts">
      <li class="post" v-for="file of privateFiles">
        <div class="post-title">
          <a href="javascript: void(0);" v-if="myLikeFiles.indexOf(file.id)!==-1"><img src="../assets/images/liked.png"
                                                                                       style="width: 40px;"></a>
          <a href="javascript: void(0);" v-else><img src="../assets/images/like.png" style="width: 40px;"></a>
          <span style="color:#606060">[{{file.type}}]</span>
          <router-link :to="{name: 'FileDetail', params: {id: file.id} }">{{file.title}}</router-link>
        </div>
        <div class="post-info">
          <a href="javascript: void(0);">{{file.owner.username}}</a>&nbsp;分享于&nbsp;<em>{{file.create_date}}</em>
        </div>
      </li>
    </ul>
    <pagination/>
  </div>
</template>

<script>
  import Pagination from "./reusable/Pagination";

  export default {
    name: "MyFiles",
    components: {Pagination},
    props: ['user'],  // 父组件的参数
    data() {
      return {
        publicFiles: [],
        privateFiles: [],
        myLikeFiles: [1]
      }
    },
    methods: {
      getFiles() {
        const id = this.user ? this.user.id : undefined
        this.$axios.get('/api/files/limit/' + id + '?page=1')
          .then(res => {
            let publicFiles = []
            let privateFiles = []
            for (let file of res.data.files) {
              file.private === '0' ? publicFiles.push(file) : privateFiles.push(file)
            }
            this.publicFiles = publicFiles
            this.privateFiles = privateFiles
          })
      }
    },
    mounted() {
      this.getFiles()
    },
    watch: {
      user() {
        this.getFiles()
      }
    }
  }
</script>

<style scoped>

</style>
