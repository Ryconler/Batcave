<template>
  <div>
    <div class="page-header">
      <h1>我的链接</h1>
      <router-link to="/url/share">我要分享</router-link>
    </div>
    <ul class="posts">
      <li class="post" v-for="url of urls">
        <div class="post-title">
          <a href="javascript: void(0);" v-if="myLikeURLIds.indexOf(url.id)!==-1" @click="unlikeURL(url.id)"><img src="../assets/images/liked.png"
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
  import { mapState } from 'vuex'
  export default {
    name: "MyLikes",
    components: {Pagination},
    computed: mapState([
      'myLikeURLIds',
    ]),
    data() {
      return {
        urls: [],
        urlCount: 0,
        page: 1
      }
    },
    methods: {
      unlikeURL(rid) {
        this.$store.dispatch('unlikeURL', rid)
      },
      likeURL(rid) {
        this.$store.dispatch('likeURL', rid)
      },
      setPage(page) {
        this.page = page
      },

      getURLs() {
        this.$store.dispatch('getMyURLs',this.page)
          .then(res=>this.urls = res)
      },
      getCount() {
        this.$store.dispatch('getMyURLsCount')
          .then(res=>this.urlCount = res)
      },
    },
    mounted() {
      this.$store.commit('selectNone')
      this.getURLs()
      this.getCount()
    },
    watch: {
      page() {
        this.getURLs()
      }
    }
  }
</script>

<style scoped>

</style>
