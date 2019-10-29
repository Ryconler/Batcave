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
    <br>
    <h3 style="color:darkorange" id="records">&ordm;&nbsp;留言板&lt;最新&gt;</h3>
    <ul class="posts">
      <li class="post" v-for="r of records" :key="r.id">
        <div class="post-title">
          <span>{{r.content}}</span>
        </div>
        <div class="post-info">
          【{{r.username}}】留言于&nbsp;<em>{{r.create_date}}</em>
        </div>
      </li>
    </ul>
    <br>
    <div class="side-bar">
      <div class="side-item" @click.stop="writeRecord = !writeRecord">
        <canvas class="bat" width="160" height="60" id="write-record-icon">你的浏览器不支持canvas</canvas>
      </div>
    </div>
    <transition name="fade">
      <div class="write-record" v-show="writeRecord">
        <canvas class="bat" width="640" height="240" id="write-record">你的浏览器不支持canvas</canvas>
        <textarea cols="30" rows="3" v-model.trim="record" :placeholder="user?'将以【'+user.username+'】的身份留言':'将以【匿名】的身份留言'"></textarea>
        <a href="#records" @click="postRecord">留言</a>
        <span @click="writeRecord = false">&times;</span>
      </div>
    </transition>

  </div>
</template>

<script>
import Pagination from './reusable/Pagination'

export default {
  name: 'Home',
  components: {Pagination},
  data () {
    return {
      urls: [
        {id: 0, owner: {id: 0}},
        {id: 1, owner: {id: 1}},
        {id: 2, owner: {id: 2}},
        {id: 3, owner: {id: 3}},
        {id: 4, owner: {id: 4}}
      ],
      files: [
        {id: 0, owner: {id: 0}},
        {id: 1, owner: {id: 1}},
        {id: 2, owner: {id: 2}},
        {id: 3, owner: {id: 3}},
        {id: 4, owner: {id: 4}}
      ],
      record: '',
      records: [
        {id: 0},
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4}
      ],
      writeRecord: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    getURLs () {
      this.$store.dispatch('getHomeURLs')
        .then(res => {
          this.urls = res
        })
    },
    getFiles () {
      this.$store.dispatch('getHomeFiles')
        .then(res => {
          this.files = res
        })
    },
    getRecords () {
      this.$store.dispatch('getRecords')
        .then(res => this.records = res)
    },
    postRecord () {
      if (this.record) {
        this.$store.dispatch('postRecord', this.record)
          .then(res => {
            this.record = ''
            this.records.unshift(res.data.record)
            if (this.records.length > 5) {
              this.records.pop()
            }
            this.writeRecord = false
          })
          .catch(err => alert('内部错误'))
      }
    },
    drawBatIcon (canvas, font) {
      let c = canvas.getContext('2d')
      c.beginPath()
      c.strokeStyle = '#333'
      c.lineWidth = 2
      c.moveTo(80, 5)
      c.bezierCurveTo(80, 15, 102, 15, 102, 3)
      c.lineTo(160, 3)
      c.quadraticCurveTo(130, 5, 130, 40)
      c.quadraticCurveTo(80, 40, 80, 60)
      c.moveTo(80, 5)
      c.bezierCurveTo(80, 15, 58, 15, 58, 3)
      c.lineTo(0, 3)
      c.quadraticCurveTo(30, 5, 30, 40)
      c.quadraticCurveTo(80, 40, 80, 60)
      c.fillStyle = '#fff'
      c.fill()
      c.stroke()
      c.fillStyle = '#333'
      c.font = 'normal small-caps 300 14px arial'
      c.textAlign = 'left'
      c.textBaseline = 'middle'
      c.fillText(font, 83, 30)
      c.closePath()
    },
    drawBat (canvas) {
      let c = canvas.getContext('2d')
      c.beginPath()
      c.strokeStyle = '#333'
      c.lineWidth = 8
      c.moveTo(320, 20)
      c.bezierCurveTo(320, 60, 408, 60, 408, 12)
      c.lineTo(640, 12)
      c.quadraticCurveTo(520, 20, 520, 160)
      c.quadraticCurveTo(320, 160, 320, 240)
      c.moveTo(320, 20)
      c.bezierCurveTo(320, 60, 232, 60, 232, 12)
      c.lineTo(0, 12)
      c.quadraticCurveTo(120, 20, 120, 160)
      c.quadraticCurveTo(320, 160, 320, 240)
      c.fillStyle = '#fff'
      c.fill()
      c.stroke()
      c.closePath()
    }
  },
  mounted () {
    this.$store.commit('selectHome')
    this.getURLs()
    this.getFiles()
    this.getRecords()
    this.drawBatIcon(document.getElementById('write-record-icon'), '写留言')
    // this.drawBatIcon(document.getElementById('chat-room-icon'), '聊天室')
    this.drawBat(document.getElementById('write-record'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .side-bar {
    position: fixed;
    top: 50%;
    left: 0;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .side-bar .side-item {
    position: relative;
    height: 60px;
    margin-bottom: 10px;
    opacity: 0.8;
  }

  .side-bar .side-item:hover {
    opacity: 1;
    cursor: pointer;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }

  canvas#write-record-icon, canvas#chat-room-icon {
    width: 160px;
    height: 60px;
    margin-left: -80px;
    display: block;
  }

  .write-record {
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }

  canvas#write-record {
    width: 640px;
    height: 240px;
    display: block;
  }

  .write-record textarea {
    position: absolute;
    display: block;
    width: 320px;
    height: 60px;
    top: 60px;
    left: 160px;
    color: #000;
    border: 4px solid #666;
    border-radius: 6px;
    outline: none;
    resize: none;
  }

  .write-record textarea:focus {
    border-color: #333;
  }

  .write-record a {
    position: absolute;
    display: block;
    text-decoration: none;
    width: 80px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 8px;
    bottom: 75px;
    left: 280px;
    background: #666;
    color: #fff;
  }

  .write-record a:hover {
    background: #333;
  }

  .write-record span{
    position: absolute;
    bottom: 0;
    left: 307px;
    margin-bottom: -10px;
    background: indianred;
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    width: 26px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 50% ;
  }
  .write-record span:hover{
    cursor: pointer;
    background: red;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
    left: 0;
  }

  @media screen and (max-width: 768px){
    canvas#write-record-icon, canvas#chat-room-icon {
      width: 160px;
      height: 60px;
      margin-left: -80px;
    }

    canvas#write-record {
      width: 32rem;
      height: 12rem;
      display: block;
    }

    .write-record textarea {
      width: 16rem;
      height: 3rem;
      top: 3rem;
      left: 8rem;
      border: 0.2rem solid #666;
      border-radius: 0.3rem;
      font-size: 12px;
    }

    .write-record a {
      width: 4rem;
      height: 2rem;
      line-height: 2rem;
      border-radius: 0.4rem;
      bottom: 3.75rem;
      left: 14rem;
      font-size: 12px;
    }

    .write-record span{
      bottom: 0;
      left: 15.35rem;
      margin-bottom: -0.5rem;
      font-size: 16px;
      width: 1.3rem;
      height: 1.3rem;
      line-height: 1.3rem;
      text-align: center;
      border-radius: 50% ;
    }
  }

</style>
