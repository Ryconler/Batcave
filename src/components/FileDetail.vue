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
      <h4><strong><a :href="location" target="_blank">下载</a></strong></h4>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FileDetail",
    data() {
      return {
        file: null
      }
    },
    computed: {
      location() {
        if (process.env.NODE_ENV === 'development') {
          return 'http://localhost:5000/' + this.file.location
        }else {
          return 'http://batcave.server.jessezhu.cn/' + this.file.location
        }
      }
    },
    methods: {
      getFile() {
        const id = this.$route.params.id
        this.$axios.get('/api/files/file/' + id)
          .then(res => {
            this.file = res.data.file
          })
          .catch(err => {
            console.log(err.response.data.message);
          })
      }
    },
    mounted() {
      this.getFile()
      this.$emit('selectNone')
    }
  }
</script>

<style scoped>

</style>
