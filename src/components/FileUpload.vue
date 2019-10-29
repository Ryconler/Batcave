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
          <option value="document">文档</option>
          <option value="setup">安装包</option>
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
  name: 'Upload',
  data () {
    return {
      title: '',
      type: 'other',
      private: false,
      describe: '',
      file: null,
      info: '服务器太小了，文件大小请不要超过10M，不要恶意上传'
    }
  },
  methods: {
    getFile (event) {
      this.file = event.target.files[0]
    },
    reset () {
      [this.title, this.type, this.private, this.describe, this.file] = ['', 'other', false, '', null]
    },
    submit () {
      if (this.title && this.type && this.file) {
        console.log(this.file.size)
        if (this.title.length > 20) this.$store.commit('addErrMsg', '标题长度不超过20')
        else if (this.describe.length > 100) this.$store.commit('addErrMsg', '文件描述不要超过100个字')
        else if (this.file.size > 10240000) this.$store.commit('addErrMsg', '文件大小不要超过10M')
        else {
          this.info = '上传中...'
          let formData = new FormData()
          formData.append('file', this.file)
          formData.append('title', this.title)
          formData.append('type', this.type)
          formData.append('describe', this.describe)
          formData.append('private', this.private ? '1' : '0')
          this.reset()
          this.$store.dispatch('upload', formData)
            .then(res => {
              this.info = res
              setTimeout(() => {
                this.$router.push('/my/files')
              }, 500)
            })
            .catch(err => {
              this.info = '上传失败，换个文件试试？'
            })
        }
      }
    }
  },
  mounted () {
    this.$store.commit('selectNone')
  }
}
</script>

<style scoped>
  #reset {
    margin-right: 10px;
  }
</style>
