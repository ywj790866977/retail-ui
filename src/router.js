import HelloWorld from "./components/HelloWorld";
import Vue from 'vue';
import VueRouter from 'vue-router';

const routes = [
  { path: '/home', component: HelloWorld  }
]

const router = new VueRouter({
  mode: 'history',
  routes:routes
})

export {router,VueRouter};
