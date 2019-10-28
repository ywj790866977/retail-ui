<template>
  <div class="right-top">
    <ul class="breadcrumb pull-left">
    <!--
        <li>
            <a href="/manage/home">神码分销库存后台管理</a>
        </li>
        <li class="active">首页</li> -->
    </ul>
    <div class="pull-right">
      <!--
      <a class="btn btn-sm btn-green" href="javascript;" data-toggle="modal" data-target=".pop-service-type-add">
        <span>+</span>新增代理商
      </a>-->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'layout-main-header',
  computed : {
    ...mapState({
      mainheader:state=>{
        return state.mainheader;
      }
    })
  },
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
