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
          &nbsp;分享于&nbsp;<em>{{url.create_date}}</em>&nbsp;<a href="javascript:void(0);" @click="deleteURL(url.id)">删除</a>
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
import Pagination from './reusable/Pagination'
import { mapState } from 'vuex'
export default {
  name: 'MyLikes',
  components: {Pagination},
  computed: mapState([
    'myLikeURLIds'
  ]),
  data () {
    return {
      urls: [],
      urlCount: 0,
      page: 1
    }
  },
  methods: {
    unlikeURL (rid) {
      this.$store.dispatch('unlikeURL', rid)
    },
    likeURL (rid) {
      this.$store.dispatch('likeURL', rid)
    },
    deleteURL (rid) {
      let con = window.confirm('确认删除吗？')
      if (con) {
        this.$store.dispatch('deleteURL', rid)
          .then(res => {
            let i = 0
            for (let url of this.urls) {
              if (url.id === rid) {
                this.urls.splice(i, 1)
              }
              i++
            }
          })
      }
    },
    setPage (page) {
      this.page = page
    },

    getURLs () {
      this.$store.dispatch('getMyURLs', this.page)
        .then(res => this.urls = res)
    },
    getCount () {
      this.$store.dispatch('getMyURLsCount')
        .then(res => this.urlCount = res)
    }
  },
  mounted () {
    this.$store.commit('selectMyURL')
    this.getURLs()
    this.getCount()
  },
  watch: {
    page () {
      this.getURLs()
    }
  }
}
</script>

<style scoped>

</style>
