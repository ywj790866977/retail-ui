<template>
  <div id="app" class="page-root">
    <!-- 头部 start -->
    <layout-header></layout-header>
    <!-- 头部 end -->
    <!-- left start -->
    <div class="left-container">
      <layout-menu></layout-menu>
    </div>
    <!-- left end -->
    <!-- main start -->
    <div class="frame-wrap">
      <!-- main header start-->
      <layout-main-header></layout-main-header>
      <!-- main header end -->

      <!-- main content start -->
      <div class="right-content">
        <a-locale-provider :locale="locale">
          <router-view></router-view>
        </a-locale-provider>
      </div>
      <!-- main content end -->
    </div>
    <!-- main end -->
  </div>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

import layoutMenu from "./components/layout/menu.vue";
import layoutHeader from "./components/layout/header.vue";
import layoutMainHeader from "./components/layout/main-header.vue";
export default {
  name: "app",
  data() {
    return {
      locale: zhCN
    };
  },
  components: {
    layoutMenu,
    layoutHeader,
    layoutMainHeader
  }
};
</script>

<style >

</style>
