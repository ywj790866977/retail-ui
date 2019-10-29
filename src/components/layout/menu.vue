<template>
<div class="left-nav scroll-div">
  <ul>
    <li>
      <a href="/manage/data">
        <span>导数</span>
      </a>
    </li>
    <li>
      <a href="/manage/agent">
        <span>代理商管理</span>
      </a>
    </li>
    <li>
      <a href="/manage/sales">
        <span>销售员管理</span>
      </a>
    </li>
    <li>
      <a href="/manage/upload">
        <span>上传日志</span>
      </a>
    </li>
    <template v-for="(item,itemIndex) in routerList">
      <!--任意角色可见 或 限制角色可见的判断-->
      <template v-if="!item.role || item.role.indexOf(role) > -1 ">
        <router-link  :to="item.to"  v-slot="{ href, route, navigate, isActive }" :key="itemIndex">
          <li :class="[isActive && 'active']">
            <a :href="href" @click="navigate"><span>{{item.label}}</span></a>
          </li>
        </router-link>
      </template>
    </template>
  </ul>
</div>
</template>

<script>
import {
  mapState
} from "vuex";
export default {
  name: "layout-menu",
  computed: {
    ...mapState({
      role: state => {
        return state.user.role;
      }
    }),
    isAdmin() {
      return this.role === "管理员";
    }
  },
  data() {
    return {
      //角色为空表示任意角色都可见
      routerList: [{
          "to": "/query",
          "role": "",
          "label": "数据查询"
        },
        {
          "to": "/adminConfirm",
          "role": "管理员",
          "label": "管理员确认"
        },
        {
          "to": "/myApplication",
          "role": "销售员",
          "label": "我的申请"
        },
        {
          "to": "/user",
          "role": "管理员",
          "label": "账户管理"
        }
      ]
    };
  },
  created() {},
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
