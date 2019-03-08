<template>
  <div>
    <div class="page-header">
      <h1>欢迎来到BatCave</h1>
    </div>
    <h4><em>蝙蝠洞里都有些什么？资源...</em></h4>
    <h3 style="color:blue">&ordm;&nbsp;链接资源&lt;最新&gt;</h3>
    <ul class="posts">
      <li class="post" v-for="url of urls" :key="url.id">
        <div class="post-title">
          <span style="color:#606060">[{{url.type}}]</span>
          <a :href="url.content" target="_blank">{{url.title}}</a>
        </div>
        <div class="post-info">
          <router-link :to="{name: 'UserResources', params:{id: url.owner.id} }">{{url.owner.username}}</router-link>&nbsp;分享于&nbsp;<em>{{url.create_date}}</em>
        </div>
      </li>
    </ul>
    <router-link to="/urls" style="float:right;margin:7px 0;"><strong>更多&gt;&gt;</strong></router-link>
    <br>
    <h3 style="color:red">&ordm;&nbsp;文件资源&lt;最新&gt;</h3>
    <ul class="posts">
      <li class="post" v-for="file of files" :key="file.id">
        <div class="post-title">
          <span style="color:#606060">[{{file.type}}]</span>
          <router-link :to="{name: 'FileDetail', params:{id: file.id} }">{{file.title}}</router-link>
        </div>
        <div class="post-info">
          <router-link :to="{name: 'UserResources', params:{id: file.owner.id} }">{{file.owner.username}}</router-link>&nbsp;分享于&nbsp;<em>{{file.create_date}}</em>
        </div>
      </li>
    </ul>
    <router-link to="/files" style="float:right;margin:7px 0;"><strong>更多&gt;&gt;</strong></router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      urls: [],
      files: [],
    }
  },
  mounted() {
    this.$axios.get('/api/urls/home')
      .then(res => {
        this.urls = res.data.urls
      })
      .catch(err => {
        console.log(err.response.message);
      })
    this.$axios.get('/api/files/home')
      .then(res => {
        this.files = res.data.files
      })
      .catch(err => {
        console.log(err.response.message);
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
