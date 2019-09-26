<template>
  <div class="header">
      <h1 class="header-title">神码分销库存后台管理</h1>
      <div class="header-btn">
          <a href=""><i class=" icon-user"></i>#(session.admin.username)</a>
          <a href="/manage/logout"><i class="icon-signout"></i>注销</a>
      </div>
  </div>
</template>

<script>
export default {
  name: 'layout-header',
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
