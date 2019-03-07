<template>
  <div>
    <h1>我的资源</h1>
    <ul class="posts">
      <!--{% for post in posts %}-->
      <li class="post">
        <div class="post-title">

          <!--{% if not current_user.is_liking(post) %}-->
          <a href="#"><img src="../assets/images/like.png" width="40px"></a>
          <!--{% else %}-->
          <a href="#"><img src="../assets/images/liked.png" width="40px"></a>
          <!--{% endif %}-->

          <span style="color:#606060">[主题]</span>
          <a href="#" target="_blank">资源123</a></div>
        <div class="post-info"><a href="javascript: void(0);">朱星杰</a> &nbsp;分享于&nbsp;<em>2019-3-7</em>
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
    name: "MyLikes",
    components: {Pagination}
  }
</script>

<style scoped>

</style>
