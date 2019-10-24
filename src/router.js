import HelloWorld from "@/components/HelloWorld";
import VueRouter from 'vue-router';
import store from './store'
import service from '@/project/utils/request'

const routes = [
  { path: '/home', component: HelloWorld  },
  { path: '/query', component: ()=> import('@/components/queryData/QueryData.vue')  },
  { path: '/user', component: ()=> import('@/components/user/UserManager.vue')  },
  { path: '/goods', component: ()=> import('@/components/goods/GoodsApply.vue')  },
  { path: '/dump', component: ()=> import('@/components/dump/DumpApply.vue')  },
  { path: '/release', component: ()=> import('@/components/release/ReleaseApply.vue')  },
]

const router = new VueRouter({
  mode: 'history',
  routes:routes
})
router.beforeEach((to, from, next) => {

/*部署后走一期路径，开发按下路径单独处理
*/
  if(to.fullPath == "/manage/login"){
    next();
    return;
  }
  /*有name属性 表示已经获取过登陆人
  */
  if(store.getters.name){
    next();
  }else{
    service.get("/user/info").then(data => {
      store.dispatch("user/setInfo",data.item);
      next();
    });
  }
})

export {router,VueRouter};
