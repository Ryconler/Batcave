<template>
  <div class="pagination">
    <ul class="pagination">
      <li :class="{disabled: curPage===1}"><a href="javascript: void(0);" @click="pageMinus">&laquo;</a></li>
      <li v-for="page of pages" :class="{active: page===curPage}" @click="pageTo(page)">
        <a href="javascript: void(0);">{{page}}</a>
      </li>

      <!--<li class="disabled"><a href="javascript: void(0);">&hellip;</a></li>-->

      <li :class="{disabled: curPage===pages.length}">
        <a href="javascript: void(0);" @click="pagePlus">&raquo;</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props: ['limit', 'count'],
    data() {
      return {
        pages: [1],
        curPage: 1
      }
    },
    computed: {},
    methods:{
      pagePlus(){
        if(this.curPage!==this.pages.length){
          this.$emit('setPage',++this.curPage)
        }
      },
      pageMinus(){
        if(this.curPage!==1)
        this.$emit('setPage',--this.curPage)
      },
      pageTo(page){
        this.curPage = page
        this.$emit('setPage',page)
      }
    },
    mounted() {

    },
    watch:{
      count(){
        let pages = [1]
        for (let i = 1; i < Math.floor((parseInt(this.count) - 1) / parseInt(this.limit)) + 1;) {
          pages.push(++i)
        }
        this.pages = pages
      }
    }
  }
</script>

<style scoped>

</style>
