<template>
  <div>
    <div class="page-header">
      <h1>我的文件</h1>
      <router-link to="/file/upload">我要上传</router-link>
    </div>
    <h3>所有人可见</h3>
    <ul class="posts">
      <li class="post" v-for="file of publicFiles">
        <div class="post-title">
          <a href="javascript: void(0);" v-if="myLikeFiles.indexOf(file.id)!==-1"><img src="../assets/images/liked.png" style="width: 40px;"></a>
          <a href="javascript: void(0);" v-else><img src="../assets/images/like.png" style="width: 40px;"></a>
          <span style="color:#606060">[{{file.type}}]</span>
          <router-link :to="{name: 'FileDetail', params: {id: file.id} }">{{file.title}}</router-link>
        </div>
        <div class="post-info">
          <a href="javascript: void(0);">{{file.owner.username}}</a>&nbsp;分享于&nbsp;<em>{{file.date}}</em>
        </div>
      </li>
    </ul>
    <pagination />

    <h3>仅自己可见</h3>
    <ul class="posts">
      <li class="post" v-for="file of privateFiles">
        <div class="post-title">
          <a href="javascript: void(0);" v-if="myLikeFiles.indexOf(file.id)!==-1"><img src="../assets/images/liked.png" style="width: 40px;"></a>
          <a href="javascript: void(0);" v-else><img src="../assets/images/like.png" style="width: 40px;"></a>
          <span style="color:#606060">[{{file.type}}]</span>
          <router-link :to="{name: 'FileDetail', params: {id: file.id} }">{{file.title}}</router-link>
        </div>
        <div class="post-info">
          <a href="javascript: void(0);">{{file.owner.username}}</a>&nbsp;分享于&nbsp;<em>{{file.date}}</em>
        </div>
      </li>
    </ul>
    <pagination />
  </div>
</template>

<script>
  import Pagination from "./reusable/Pagination";
  export default {
    name: "MyFiles",
    components: {Pagination},
    data() {
      return {
        publicFiles: [
          {
            id: 1,
            type: '图片',
            title: '高清图片xxx',
            owner: {
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
        privateFiles: [
          {
            id: 3,
            type: '图片',
            title: '高清图片sss',
            owner: {
              id: 111,
              username: '朱星杰'
            },
            date: '2019-03-07 15:06:12'
          },
          {
            id: 4,
            type: '压缩包',
            title: '压缩包111',
            owner: {
              id: 520,
              username: '冯成城'
            },
            date: '2019-03-06 12:01:55'
          }
        ],
        myLikeFiles: [1,4]
      }
    }
  }
</script>

<style scoped>

</style>
