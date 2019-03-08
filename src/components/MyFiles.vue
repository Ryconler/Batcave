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
    <pagination
      limit="5"
      :count="pubFileCount"
      @setPage="setPubPage"
    />

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
    <pagination
      limit="5"
      :count="priFileCount"
      @setPage="setPriPage"
    />
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
        pubFileCount: 0,
        pubPage: 1,
        privateFiles: [],
        priFileCount: 0,
        priPage: 1,

        myLikeFiles: [1]
      }
    },
    methods: {
      setPubPage(page) {
        this.pubPage = page
      },
      setPriPage(page) {
        this.priPage = page
      },
      getPublicFiles() {
        const id = this.user ? this.user.id : undefined
        this.$axios.get('/api/files/public/limit/' + id + '?page=' + this.pubPage)
          .then(res => {
            this.publicFiles = res.data.files
          })
      },
      getPrivateFiles() {
        const id = this.user ? this.user.id : undefined
        this.$axios.get('/api/files/private/limit/' + id + '?page=' + this.priPage)
          .then(res => {
            this.privateFiles = res.data.files
          })
      },
      getPubCount() {
        const id = this.user ? this.user.id : undefined
        this.$axios.get('/api/files/public/count/' + id)
          .then(res => {
            this.pubFileCount = res.data.count
          })
          .catch(err => {
            console.log(err.response.data.message);
          })
      },
      getPriCount() {
        const id = this.user ? this.user.id : undefined
        this.$axios.get('/api/files/private/count/' + id)
          .then(res => {
            this.priFileCount = res.data.count
          })
          .catch(err => {
            console.log(err.response.data.message);
          })
      }
    },
    mounted() {
      this.getPrivateFiles()
      this.getPrivateFiles()
      this.getPubCount()
      this.getPriCount()
    },
    watch: {
      user() {
        this.getPublicFiles()
        this.getPrivateFiles()
        this.getPubCount()
        this.getPriCount()
      },
      pubPage(){
        this.getPublicFiles()
      },
      priPage(){
        this.getPrivateFiles()
      }
    }
  }
</script>

<style scoped>

</style>
