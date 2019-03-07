<template>
  <div>
    <div class="page-header">
      <h1>我的文件</h1>
      <router-link to="/file/upload">我要上传</router-link>
    </div>
    <h3>所有人可见</h3>
    <ul class="posts">
      <li class="post">
        <div class="post-title">
          <span style="color:#606060"><router-link to="/file/detail/123">文件123</router-link></span>
        </div>
        <div class="post-info"><a href="javascript: void(0);">朱星杰</a> &nbsp;上传于&nbsp;<em>2019-3-7</em></div>
      </li>
    </ul>
    <!--{% if pagination0 %}-->
    <div class="pagination">
      <!--{{ // macros.pagination_widget(pagination0, '.myfiles') }}-->
    </div>
    <!--{% endif %}-->
    <h3>仅自己可见</h3>
    <ul class="posts">
      <!--{% for file in files1 %}-->
      <li class="post">
        <div class="post-title">
          <router-link to="/file/detail/123">文件234</router-link>
        </div>
        <div class="post-info"><a href="javascript: void(0);">朱星杰</a> &nbsp;上传于&nbsp;<em>2019-3-7</em>
        </div>
      </li>
      <!--{% endfor %}-->
    </ul>
    <pagination />
  </div>
</template>

<script>
  import Pagination from "./reusable/Pagination";
  export default {
    name: "MyFiles",
    components: {Pagination}
  }
</script>

<style scoped>

</style>
