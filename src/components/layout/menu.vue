<template>
  <div class="left-nav scroll-div">
    <ul>
      <li class="#(activeId == 'data' ? 'active':'')">
        <a href="/manage/data">
          <span>导数</span>
        </a>
      </li>
      <li class="#(activeId == 'agent' ? 'active':'')">
        <a href="/manage/agent">
          <span>代理商管理</span>
        </a>
      </li>
      <li class="#(activeId == 'sales' ? 'active':'')">
        <a href="/manage/sales">
          <span>销售员管理</span>
        </a>
      </li>
      <li class="#(activeId == 'upload' ? 'active':'')">
        <a href="/manage/upload">
          <span>上传日志</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'layout-menu',
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
