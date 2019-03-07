<template>
  <div>
    <h1>他分享的链接</h1>
    <ul class="posts">
      <!--{% for post in posts %}-->
      <li class="post">
        <div class="post-title">

          <!--{% if not current_user.is_liking(post) %}-->
          <a href="javascript: void(0);"><img src="../assets/images/like.png" width="40px"></a>
          <!--{% else %}-->
          <a href="javascript: void(0);"><img src="../assets/images/liked.png" width="40px"></a>
          <!--{% endif %}-->

          <span style="color:#606060">[主题]</span>
          <a href="javascript: void(0);" target="_blank">链接123</a></div>
        <div class="post-info">
          <a href="javascript: void(0);">其他人</a>&nbsp;分享于&nbsp;<em>2019-3-7</em>
        </div>
      </li>
      <!--{% endfor %}-->
    </ul>
    <pagination />

    <h1>他上传的文件</h1>
    <ul class="posts">
      <!--{% for post in posts %}-->
      <li class="post">
        <div class="post-title">

          <!--{% if not current_user.is_liking(post) %}-->
          <a href="javascript: void(0);"><img src="../assets/images/like.png" width="40px"></a>
          <!--{% else %}-->
          <a href="javascript: void(0);"><img src="../assets/images/liked.png" width="40px"></a>
          <!--{% endif %}-->

          <span style="color:#606060">[图片]</span>
          <router-link to="/file/detail/123">文件123</router-link>
        </div>
        <div class="post-info">
          <a href="javascript: void(0);">其他人</a>&nbsp;分享于&nbsp;<em>2019-3-7</em>
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
    name: "UserResources",
    components: {Pagination}
  }
</script>

<style scoped>

</style>
