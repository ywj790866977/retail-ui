import VueRouter from 'vue-router';
// import { format } from "url";

const routes = [
  { path: '/home', component: ()=> import('@/components/queryData/QueryData.vue')  },
  { path: '/query', component: ()=> import('@/components/queryData/QueryData.vue')  },
  { path: '/user', component: ()=> import('@/components/user/UserManager.vue')  },
  { path: '/goods', component: ()=> import('@/components/goods/GoodsApply.vue')  },
]

const router = new VueRouter({
  mode: 'history',
  routes:routes
})

export {router,VueRouter};
