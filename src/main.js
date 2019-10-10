import Vue from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import Vuex from "vuex";
import axios from "axios";
import Vueaxios from "vue-axios";
import { router, VueRouter } from "./router.js";
import "ant-design-vue/dist/antd.css"; // ant ui
import "./css/main.css";
import "./css/font-awesome/css/font-awesome.min.css"; // ant ui

// axios.defaults.baseURL = 'http://120.27.243.160:8088/'  // url前缀，配置了代理就不用设置

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Vueaxios, axios); // vue axios
Vue.use(Antd); // ant ui

Vue.config.productionTip = false;

// 过滤器
Vue.filter("dateFormat", function(dateStr, pattern = "") {
  //根据给定的时间字符串，得到特定的时间
  var dt = new Date(dateStr); //yyy---mm-dd
  var y = dt.getFullYear(); //得到年份
  var m = dt.getMonth() + 1; //得到月份
  var d = dt.getDate(); //得到日期 // return y + '-' + m + '-' + d
  if (pattern.toLowerCase() === "yyy-mm-dd") {
    return `${y}-${m}-${d}`;
  } else {
    var hh = dt.getHours(); //得到时
    var mm = dt.getMinutes(); //得到分
    var ss = dt.getSeconds(); //得到秒
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
  }
});

new Vue({
  router: router,
  render: h => h(App)
}).$mount("#app");
