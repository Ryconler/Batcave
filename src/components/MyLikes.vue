<template>
  <div>
    <h1>我喜欢的资源</h1>
    <ul class="posts">
      <li class="post" v-for="url of urls">
        <div class="post-title">
          <a href="javascript: void(0);" v-if="myLikeURLIds.indexOf(url.rid)!==-1" @click="unlikeURL(url.rid)"><img
            src="../assets/images/liked.png" style="width: 40px;"></a>
          <a href="javascript: void(0);" v-else @click="likeURL(url.rid)"><img src="../assets/images/like.png"
                                                                               style="width: 40px;"></a>
          <span style="color:#606060">[{{url.type}}]</span>
          <a :href="url.content" target="_blank">{{url.title}}</a>
        </div>
        <div class="post-info">
          &nbsp;喜欢于&nbsp;<em>{{url.like_date}}</em>
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
          <a href="javascript: void(0);" v-if="myLikeFileIds.indexOf(file.fid)!==-1" @click="unlikeFile(file.fid)"><img
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
  import {mapState} from 'vuex'

  export default {
    name: "MyLikes",
    components: {Pagination},
    computed: mapState([
      'myLikeURLIds',
      'myLikeFileIds'
    ]),
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
      unlikeURL(rid) {
        this.$store.dispatch('unlikeURL', rid)
      },
      likeURL(rid) {
        this.$store.dispatch('likeURL', rid)
      },
      unlikeFile(fid) {
        this.$store.dispatch('unlikeFile', fid)
      },
      likeFile(fid) {
        this.$store.dispatch('likeFile', fid)
      },
      setURLPage(page) {
        this.urlPage = page
      },
      getURLCount() {
        this.urlCount = this.$store.state.myLikeURLIds.length
      },
      getURLs() {
        this.$store.dispatch('getMyLikeURLs', this.urlPage)
          .then(res => this.urls = res)
      },
      setFilePage(page) {
        this.filePage = page
      },
      getFileCount() {
        this.fileCount = this.$store.state.myLikeFileIds.length
      },
      getFiles() {
        this.$store.dispatch('getMyLikeFiles', this.filePage)
          .then(res => this.files = res)
      },
    },
    mounted() {
      this.$store.commit('selectNone')
      this.getURLs()
      this.getFiles()
      this.getURLCount()
      this.getFileCount()
    },
    watch: {
      urlPage() {
        this.getURLs()
      },
      filePage() {
        this.getFiles()
      }
    }
  }
</script>

<style scoped>

</style>
