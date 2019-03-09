<template>
  <div>
    <div class="page-header">
      <h1>文件上传</h1>
    </div>
    <form>
      <div class="form-group">
        <label for="title">标题</label>
        <input v-model.trim="title" type="text" class="form-control" id="title" placeholder="一个文件">
      </div>
      <div class="form-group">
        <label for="type">类别</label>
        <select v-model="type" class="form-control" id="type">
          <option value="image">图片</option>
          <option value="video">视频</option>
          <option value="document">文档</option>
          <option value="compress">压缩包</option>
          <option value="other">其他</option>
        </select>
      </div>
      <div class="form-group">
        <label for="title">描述</label>
        <textarea v-model="describe" class="form-control" id="describe" placeholder="对文件的描述"
                  style="resize:none"></textarea>
      </div>
      <div class="form-group">
        <label for="file">选择文件</label>
        <input  @change="getFile($event)" type="file" id="file">
        <p class="help-block">{{info}}</p>
      </div>
      <div class="checkbox">
        <label>
          <input v-model="private" type="checkbox">仅自己可见
        </label>
      </div>
      <button type="reset" class="btn btn-default" id="reset" @click.prevent="reset()">重置</button>
      <button type="submit" class="btn btn-primary" id="submit" @click.prevent="submit()"
              :disabled="!(title&&type&&file)">提交
      </button>
    </form>
  </div>
</template>

<script>
  export default {
    name: "Upload",
    data() {
      return {
        title: '',
        type: 'other',
        private: false,
        describe: '',
        file: null,
        info:''
      }
    },
    methods: {
      getFile(event) {
        this.file = event.target.files[0];
      },
      reset() {
        [this.title, this.type, this.private, this.describe, this.file] = ['', 'other', false, '', null]
      },
      submit() {
        this.info = '上传中...'
        let formData = new FormData();
        formData.append('file', this.file);
        formData.append('title', this.title)
        formData.append('type', this.type)
        formData.append('describe', this.describe)
        formData.append('private', this.private ? '1' : '0')
        this.reset()
        this.$axiosInstance.post('/api/files/file', formData)
          .then(res => {
            this.info = res.data.message
            setTimeout(()=> {
              this.$router.push('/my/files')
            },500)
          })
          .catch(err => {
            this.info = '上传失败'
            console.log(err.response.data.message);
          })
      }
    },
    mounted() {
      this.$emit('selectNone')
      this.$axios.get('/api/logstatus')
        .then(res => {
          if(!res.data.user){
            this.$router.replace('/login')
          }
          if (res.data.message) {
            this.$emit('delCookie','username')
            this.$emit('delCookie','password')
          }
        })
    }
  }
</script>

<style scoped>
  #reset {
    margin-right: 10px;
  }
</style>
