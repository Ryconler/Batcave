<template>
  <div>
    <div v-if="file">
      <div class="page-header">
        <h1>文件详情</h1>
      </div>
      <h2 style="color: #2828FF;">{{file.title}}</h2>
      <h4>
        <strong>上传作者：</strong>
        <router-link :to="{name: 'UserResources', params: {id: file.owner.id} }">{{file.owner.username}}</router-link>
      </h4>
      <h4>
        <strong>文件格式：</strong>{{file.type}}
      </h4>
      <h4>
        <strong>上传时间：</strong>{{file.create_date}}
      </h4>
      <h4>
        <strong>文件描述：</strong>{{file.describe}}
      </h4>
      <h4><strong><a href="javascript:void(0);" @click="download">查看或下载</a></strong></h4>
    </div>
    <div v-else>你无权查看此文件</div>
  </div>
</template>

<script>
  import config from '../config'
  export default {
    name: "FileDetail",
    data() {
      return {
        file: null
      }
    },
    methods: {
      getFile() {
        const id = this.$route.params.id
        this.$store.dispatch('getFile',id)
          .then(res=> this.file = res)
          .catch(err=> {})
      },
      download(){
        window.open(config.baseURL + this.file.location)
      }
    },
    mounted() {
      this.$store.commit('selectNone')
      this.getFile()
    }
  }
</script>

<style scoped>

</style>
