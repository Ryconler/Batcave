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
          <a href="javascript: void(0);" v-if="myLikeFileIds.indexOf(file.id)!==-1" @click="unlikeFile(file.id)"><img src="../assets/images/liked.png"
                                                                                       style="width: 40px;"></a>
          <a href="javascript: void(0);" v-else @click="likeFile(file.id)"><img src="../assets/images/like.png" style="width: 40px;"></a>
          <span style="color:#606060">[{{file.type}}]</span>
          <router-link :to="{name: 'FileDetail', params: {id: file.id} }">{{file.title}}</router-link>
        </div>
        <div class="post-info">
          &nbsp;上传于&nbsp;<em>{{file.create_date}}</em>&nbsp;<a href="javascript:void(0);" @click="deleteFile(file.id)">删除</a>
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
          <a href="javascript: void(0);" v-if="myLikeFileIds.indexOf(file.id)!==-1" @click="unlikeFile(file.id)"><img src="../assets/images/liked.png"
                                                                                       style="width: 40px;"></a>
          <a href="javascript: void(0);" v-else  @click="likeFile(file.id)"><img src="../assets/images/like.png" style="width: 40px;"></a>
          <span style="color:#606060">[{{file.type}}]</span>
          <router-link :to="{name: 'FileDetail', params: {id: file.id} }">{{file.title}}</router-link>
        </div>
        <div class="post-info">
          &nbsp;上传于&nbsp;<em>{{file.create_date}}</em>&nbsp;<a href="javascript:void(0);" @click="deleteFile(file.id)">删除</a>
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
  import { mapState } from 'vuex'
  export default {
    name: "MyFiles",
    components: {Pagination},
    computed: mapState([
      'myLikeFileIds',
    ]),
    data() {
      return {
        publicFiles: [],
        pubFileCount: 0,
        pubPage: 1,
        privateFiles: [],
        priFileCount: 0,
        priPage: 1,
      }
    },
    methods: {
      unlikeFile(fid) {
        this.$store.dispatch('unlikeFile', fid)
      },
      likeFile(fid) {
        this.$store.dispatch('likeFile', fid)
      },
      deleteFile(fid){
        let con = window.confirm('确认删除吗？')
        if(con){
          this.$store.dispatch('deleteFile', fid)
            .then(res=>{
              let pub =0
              let pri =0
              for(let file of this.publicFiles){
                if(file.id === fid){
                  this.publicFiles.splice(pub,1)
                }
                pub++
              }
              for(let file of this.privateFiles){
                if(file.id === fid){
                  this.privateFiles.splice(pri,1)
                }
                pri++
              }
            })
        }
      },
      setPubPage(page) {
        this.pubPage = page
      },
      setPriPage(page) {
        this.priPage = page
      },
      getPublicFiles() {
        this.$store.dispatch('getMyPublicFiles',this.pubPage)
          .then(res=>this.publicFiles = res)
      },
      getPrivateFiles() {
        this.$store.dispatch('getMyPrivateFiles',this.priPage)
          .then(res=>this.privateFiles = res)
      },
      getPubCount() {
        this.$store.dispatch('getMyPublicFilesCount')
          .then(res=>this.pubFileCount = res)
      },
      getPriCount() {
        this.$store.dispatch('getMyPrivateFilesCount')
          .then(res=>this.priFileCount = res)
      }
    },
    mounted() {
      this.$store.commit('selectMyFile')
      this.getPublicFiles()
      this.getPrivateFiles()
      this.getPubCount()
      this.getPriCount()

    },
    watch: {
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
