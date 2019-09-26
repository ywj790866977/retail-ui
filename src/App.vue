<template>

	<div  id="app" class="page-root">
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
              <router-view></router-view>
            </div>
            <!-- main content end -->
        </div>
		<!-- main end -->
	</div>
</template>

<script>

import layoutMenu from "./components/layout/menu.vue"
import layoutHeader from "./components/layout/header.vue"
import layoutMainHeader from "./components/layout/main-header.vue"
export default {
  name: 'app',
  components: {
    layoutMenu,layoutHeader,layoutMainHeader
  }
}
</script>

<style>
</style>
