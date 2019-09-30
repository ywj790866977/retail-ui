import Vue from 'vue'
import Button from "ant-design-vue/lib/button";
import "ant-design-vue/dist/antd.css";
import "./css/main.css";
import "./css/font-awesome/css/font-awesome.min.css";
import App from './App.vue';

import { router,VueRouter } from './router.js';
import Vuex from 'vuex';
import store from './store'

Vue.use(VueRouter);
Vue.use(Vuex);

// 页面内调用this.$http
import service from '@/utils/request'
Vue.prototype.$http = service

Vue.component(Button.name, Button);
Vue.config.productionTip = false

console.log(router);

new Vue({
  store,
  router:router,
  render: h => h(App),
}).$mount('#app')
