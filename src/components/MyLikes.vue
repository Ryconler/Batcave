<template>
  <div>
    <h1>我喜欢的资源</h1>
    <ul class="posts">
      <li class="post" v-for="url of urls">
        <div class="post-title">
          <a href="javascript: void(0);" v-if="myLikeURLs.indexOf(url.id)!==-1"><img src="../assets/images/liked.png" style="width: 40px;"></a>
          <a href="javascript: void(0);" v-else><img src="../assets/images/like.png" style="width: 40px;"></a>
          <span style="color:#606060">[{{url.type}}]</span>
          <a :href="url.content" target="_blank">{{url.title}}</a>
        </div>
        <div class="post-info">
          <router-link :to="{name: 'UserResources', params: {id: url.owner.id} }">{{url.owner.username}}</router-link>&nbsp;分享于&nbsp;<em>{{url.date}}</em>
        </div>
      </li>
    </ul>
    <pagination />

    <h1>我喜欢的文件</h1>
    <ul class="posts">
      <li class="post" v-for="file of files">
        <div class="post-title">
          <a href="javascript: void(0);" v-if="myLikeFiles.indexOf(file.id)!==-1"><img src="../assets/images/liked.png" style="width: 40px;"></a>
          <a href="javascript: void(0);" v-else><img src="../assets/images/like.png" style="width: 40px;"></a>
          <span style="color:#606060">[{{file.type}}]</span>
          <router-link :to="{name: 'FileDetail', params: {id: file.id} }">{{file.title}}</router-link>
        </div>
        <div class="post-info">
          <router-link :to="{name: 'UserResources', params: {id: file.owner.id} }">{{file.owner.username}}</router-link>&nbsp;分享于&nbsp;<em>{{file.date}}</em>
        </div>
      </li>
    </ul>
    <pagination />
  </div>
</template>

<script>
  import Pagination from "./reusable/Pagination";
  export default {
    name: "MyLikes",
    components: {Pagination},
    data(){
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
        myLikeURLs: [1,2],
        myLikeFiles: [1,2]
      }
    }
  }
</script>

<style scoped>

</style>
