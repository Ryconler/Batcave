<template>
  <div>
    <div class="page-header">
      <h1>我的链接</h1>
      <router-link to="/url/share">我要分享</router-link>
    </div>
    <ul class="posts">
      <li class="post" v-for="url of urls">
        <div class="post-title">
          <a href="javascript: void(0);" v-if="myLikeURLs.indexOf(url.id)!==-1" @click="unlikeURL(url.id)"><img src="../assets/images/liked.png"
                                                                                     style="width: 40px;"></a>
          <a href="javascript: void(0);" v-else @click="likeURL(url.id)"><img src="../assets/images/like.png" style="width: 40px;"></a>
          <span style="color:#606060">[{{url.type}}]</span>
          <a :href="url.content" target="_blank">{{url.title}}</a></div>
        <div class="post-info">
          &nbsp;分享于&nbsp;<em>{{url.create_date}}</em>
        </div>
      </li>
    </ul>
    <pagination
      limit="10"
      :count="urlCount"
      @setPage="setPage"
    />
  </div>
</template>

<script>
  import Pagination from "./reusable/Pagination";

  export default {
    name: "MyLikes",
    components: {Pagination},
    props: ['user','myLikeURLs'],  // 父组件的参数
    data() {
      return {
        urls: [],
        urlCount: 0,
        page: 1
      }
    },
    methods: {
      setPage(page) {
        this.page = page
      },
      getURLs() {
        const id = this.user ? this.user.id : undefined
        this.$axios.get('/api/urls/limit/' + id + '?page='+this.page)
          .then(res => {
            this.urls = res.data.urls
          })
      },
      getCount() {
        const id = this.user ? this.user.id : undefined
        this.$axios.get('/api/urls/count/' + id)
          .then(res => {
            this.urlCount = res.data.count
          })
          .catch(err => {
            console.log(err.response.data.message);
          })
      },
      unlikeURL(rid){
        this.$emit('unlikeURL',rid)
      },
      likeURL(rid){
        this.$emit('likeURL',rid)
      }
    },
    mounted() {
      this.$emit('selectNone')
      this.getURLs()
      this.getCount()
    },
    watch: {
      user() {
        this.getURLs()
        this.getCount()
      },
      page() {
        this.getURLs()
      }
    }
  }
</script>

<style scoped>

</style>
