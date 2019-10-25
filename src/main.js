import Vue from 'vue'
import App from './App.vue';
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "./css/main.css";
import "./css/font-awesome/css/font-awesome.min.css";
// import Button from "ant-design-vue/lib/button";

import { router,VueRouter } from './router.js';
import Vuex from 'vuex';
import store from './store'
import filters from '@/project/utils/filter'


Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(filters)
Vue.use(Antd); // ant ui

// 页面内调用this.$http
import service from '@/project/utils/request'
Vue.prototype.$http = service

// Vue.component(Button.name, Button);

Vue.config.productionTip = false

// console.log(router);

new Vue({
  store,
  router:router,
  render: h => h(App),
}).$mount('#app')
