<template>
  <div class="left-nav scroll-div">
    <ul>
      <li class="#(activeId == 'data' ? 'active':'')">
        <a href="/manage/data">
          <span>导数</span>
        </a>
      </li>
      <li class="#(activeId == 'data' ? 'active':'')">
        <a href="/manage/agent">
          <span>代理商管理</span>
        </a>
      </li>
      <li class="#(activeId == 'data' ? 'active':'')">
        <a href="/manage/sales">
          <span>销售员管理</span>
        </a>
      </li>
      <li class="#(activeId == 'data' ? 'active':'')">
        <a href="/manage/upload">
          <span>上传日志</span>
        </a>
      </li>
      <li>
        <router-link to="/query">
          <span>数据查询</span>
        </router-link>
      </li>
      <li v-if="flag">
        <router-link to="/adminConfirm">
          <span>管理员确认</span>
        </router-link>
      </li>
      <li v-if="!flag">
            <router-link to="/myApplication">
              <span>我的申请</span>
            </router-link>
      </li>
      <li v-if="flag">
        <router-link to="/user">
          <span>账户管理</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "layout-menu",
  data() {
    return {
      ...mapState({
        roles: state => {
          return state.user.roles;
        }
      }),
      flag: false
    };
  },
  created() {
    this.flag = this.roles === "管理员";
  },
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
