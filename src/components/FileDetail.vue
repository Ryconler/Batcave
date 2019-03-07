<template>
  <div>
    <div class="page-header">
      <h1>文件详情</h1>
    </div>
    <h2 style="color: #2828FF;">{{file.title}}</h2>
    <h4>
      <strong>上传作者：</strong><router-link :to="{name: 'UserResources', params: {id: file.owner.id} }">{{file.owner.username}}</router-link>
    </h4>
    <h4>
      <strong>文件格式：</strong>{{file.type}}
    </h4>
    <h4>
      <strong>上传时间：</strong>{{file.date}}
    </h4>
    <h4>
      <strong>文件描述：</strong>{{file.describe}}
    </h4>
    <h4><strong><a href="../../static/favicon.ico" target="_blank">下载</a></strong></h4>
  </div>
</template>

<script>
  export default {
    name: "FileDetail",
    data() {
      return {
        file: {
          id: 1,
          type: '图片',
          title: '高清图片xxx',
          owner: {
            id: 111,
            username: '朱星杰'
          },
          date: '2019-03-07 15:06:12',
          describe: '这是一张图片'
        }
      }
    },
    mounted() {
      console.log(this.$route.params);
    }
  }
</script>

<style scoped>

</style>
