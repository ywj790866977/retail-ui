<template>
  <div class="left-nav scroll-div">
    <ul>
      <li class="#(activeId == 'data' ? 'active':'')">
        <a href="/query">
          <span>数据查询</span>
        </a>
      </li>
      <li class="#(activeId == 'agent' ? 'active':'')">
        <a href="/goods">
          <span>留货-销售员</span>
        </a>
      </li>
      <li class="#(activeId == 'sales' ? 'active':'')">
        <a href="/goods">
          <span>留货-销售员</span>
        </a>
      </li>
      <li class="#(activeId == 'upload' ? 'active':'')">
        <a href="/dump">
          <span>转储-销售员</span>
        </a>
      </li>
      <li class="#(activeId == 'upload' ? 'active':'')">
        <a href="/dump">
          <span>转储-管理员</span>
        </a>
      </li>
      <li class="#(activeId == 'upload' ? 'active':'')">
        <a href="/release">
          <span>释放-销售员</span>
        </a>
      </li>
      <li class="#(activeId == 'upload' ? 'active':'')">
        <a href="/release">
          <span>释放-管理员</span>
        </a>
      </li>
      <li class="#(activeId == 'upload' ? 'active':'')">
        <a href="/lock">
          <span>锁定-销售员</span>
        </a>
      </li>
      <li class="#(activeId == 'upload' ? 'active':'')">
        <a href="/unlock">
          <span>取消锁定-销售员</span>
        </a>
      </li>
      <li class="#(activeId == 'upload' ? 'active':'')">
        <a href="/unlock">
          <span>取消锁定-管理员</span>
        </a>
      </li>
      <li class="#(activeId == 'upload' ? 'active':'')">
        <a href="/unlock">
          <span>管理员确认</span>
        </a>
      </li>
      <li class="#(activeId == 'upload' ? 'active':'')">
        <a href="/unlock">
          <span>我的申请</span>
        </a>
      </li>
      <li class="#(activeId == 'upload' ? 'active':'')">
        <a href="/user">
          <span>账户管理</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "layout-menu",
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
