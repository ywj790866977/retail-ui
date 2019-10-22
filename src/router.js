import HelloWorld from "@/components/HelloWorld";
import VueRouter from 'vue-router';
// import store from './store'

const routes = [
  { path: '/home', component: HelloWorld  },
  { path: '/query', component: ()=> import('@/components/queryData/QueryData.vue')  },
  { path: '/user', component: ()=> import('@/components/user/UserManager.vue')  },
  { path: '/goods', component: ()=> import('@/components/goods/GoodsApply.vue')  },
]

const router = new VueRouter({
  mode: 'history',
  routes:routes
})
router.beforeEach((to, from, next) => {

  // console.log(store)
  // store.dispatch("user/setInfo",{name:"1"});
  // request({
  //     url: '/user',
  //     method: 'GET',
  //     params, // params: {}
  // })
  // ...
  next();
})

export {router,VueRouter};
