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
          <a href="javascript: void(0);" v-if="myLikeFileIds.indexOf(file.id)!==-1" @click="unlikeFile(file.id)"><img src="../assets/images/liked.png" style="width: 40px;"></a>
          <a href="javascript: void(0);" v-else @click="likeFile(file.id)"><img src="../assets/images/like.png" style="width: 40px;"></a>
          <span style="color:#606060">[{{file.type}}]</span>
          <router-link :to="{name: 'FileDetail', params: {id: file.id} }">{{file.title}}</router-link>
        </div>
        <div class="post-info">
          <router-link :to="{name: 'UserResources', params: {id: file.owner.id} }">{{file.owner.username}}</router-link>&nbsp;分享于&nbsp;<em>{{file.create_date}}</em>
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
import Pagination from './reusable/Pagination'
import { mapState } from 'vuex'
export default {
  name: 'MyFiles',
  components: {Pagination},
  computed: mapState([
    'myLikeFileIds'
  ]),
  data () {
    return {
      files: [
      ],
      fileCount: 0,
      page: 1
    }
  },
  methods: {
    setPage (page) {
      this.page = page
    },
    unlikeFile (fid) {
      this.$store.dispatch('unlikeFile', fid)
    },
    likeFile (fid) {
      this.$store.dispatch('likeFile', fid)
    },
    getFiles () {
      this.$store.dispatch('getFiles', this.page)
        .then(res => this.files = res)
    },
    getCount () {
      this.$store.dispatch('getFilesCount')
        .then(res => this.fileCount = res)
    }
  },
  mounted () {
    this.$store.commit('selectFile')
    this.getFiles()
    this.getCount()
  },
  watch: {
    page () {
      this.getFiles()
    }
  }
}
</script>

<style scoped>

</style>
