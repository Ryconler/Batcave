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
          <router-link :to="{name: 'UserResources', params:{id: url.owner.id} }">{{url.owner.username}}</router-link>&nbsp;分享于&nbsp;<em>{{url.date}}</em>
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
          <router-link :to="{name: 'UserResources', params:{id: file.owner.id} }">{{file.owner.username}}</router-link>&nbsp;分享于&nbsp;<em>{{file.date}}</em>
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
      urls: [
        {
          id: 1,
          type: '教学',
          title: '百度xxxx',
          content: 'https://wwwibaidu.com',
          owner: {
            id: 111,
            username: '朱星杰'
          },
          date: '2019-03-07 15:06:12'
        },
        {
          id: 2,
          type: '科普',
          title: '百度sssss',
          content: 'https://wwwibaidu.com',
          owner: {
            id: 520,
            username: '冯成城'
          },
          date: '2019-03-06 12:01:55'
        }
      ],
      files: [
        {
          id: 1,
          type: '图片',
          title: '高清图片xxx',
          owner:{
            id: 111,
            username: '朱星杰'
          },
          date: '2019-03-07 15:06:12'
        },
        {
          id: 2,
          type: '压缩包',
          title: '压缩包666',
          owner: {
            id: 520,
            username: '冯成城'
          },
          date: '2019-03-06 12:01:55'
        }
      ],
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
