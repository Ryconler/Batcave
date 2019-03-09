<template>
  <div>
    <h1>他分享的链接</h1>
    <ul class="posts">
      <li class="post" v-for="url of urls">
        <div class="post-title">
          <a href="javascript: void(0);" v-if="myLikeURLIds.indexOf(url.id)!==-1" @click="unlikeURL(url.id)"><img
            src="../assets/images/liked.png" style="width: 40px;"></a>
          <a href="javascript: void(0);" v-else @click="likeURL(url.id)"><img src="../assets/images/like.png"
                                                                              style="width: 40px;"></a>
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
          <a href="javascript: void(0);" v-if="myLikeFileIds.indexOf(file.id)!==-1" @click="unlikeFile(file.id)"><img
            src="../assets/images/liked.png" style="width: 40px;"></a>
          <a href="javascript: void(0);" v-else @click="likeFile(file.id)"><img src="../assets/images/like.png"
                                                                                style="width: 40px;"></a>
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
  import {mapState} from 'vuex'

  export default {
    name: "UserResources",
    components: {Pagination},
    computed: mapState([
      'myLikeURLIds',
      'myLikeFileIds'
    ]),
    data() {
      return {
        id: 0,
        urls: [],
        urlCount: 0,
        urlPage: 1,
        files: [],
        fileCount: 0,
        filePage: 1
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
      setFilePage(page) {
        this.filePage = page
      },
      getURLCount() {
        this.$store.dispatch('getOtherURLsCount', this.id)
          .then(res => this.urlCount = res)
      },
      getFileCount() {
        this.$store.dispatch('getOtherPublicFilesCount', this.id)
          .then(res => this.fileCount = res)
      },
      getURLs() {
        this.$store.dispatch('getOtherURLs', {uid: this.id, page: this.urlPage})
          .then(res => this.urls = res)
      },
      getFiles() {
        this.$store.dispatch('getOtherPublicFiles', {uid: this.id, page: this.filePage})
          .then(res => this.files = res)
      }
    },
    mounted() {
      this.id = this.$route.params.id
      this.$store.commit('selectNone')
      this.getURLs()
      this.getFiles()
      this.getFileCount()
      this.getURLCount()
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
