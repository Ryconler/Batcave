<template>
  <div>
    <h1>我的链接</h1>
    <ul class="posts">
      <li class="post" v-for="url of urls">
        <div class="post-title">
          <a href="javascript: void(0);" v-if="myLikeURLs.indexOf(url.id)!==-1"><img src="../assets/images/liked.png"
                                                                                     style="width: 40px;"></a>
          <a href="javascript: void(0);" v-else><img src="../assets/images/like.png" style="width: 40px;"></a>
          <span style="color:#606060">[{{url.type}}]</span>
          <a :href="url.content" target="_blank">{{url.title}}</a></div>
        <div class="post-info">
          <a href="javascript:void(0);">{{url.owner.username}}</a>&nbsp;分享于&nbsp;<em>{{url.create_date}}</em>
        </div>
      </li>
    </ul>

    <pagination/>
  </div>
</template>

<script>
  import Pagination from "./reusable/Pagination";

  export default {
    name: "MyLikes",
    components: {Pagination},
    props: ['user'],  // 父组件的参数
    data() {
      return {
        urls: [],
        myLikeURLs: [1]
      }
    },
    methods: {
      getURLs() {
        const id = this.user ? this.user.id : undefined
        this.$axios.get('/api/urls/limit/' + id + '?page=1')
          .then(res => {
            this.urls = res.data.urls
          })
      }
    },
    mounted() {
      this.getURLs()
    },
    watch: {
      user() {
        this.getURLs()
      }
    }
  }
</script>

<style scoped>

</style>
