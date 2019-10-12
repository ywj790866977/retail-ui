import UserManager  from "@/components/UserManager.vue"
import QueryData from '@/components/QueryData.vue';


import VueRouter from 'vue-router';
// import { format } from "url";

const routes = [
  { path: '/home', component: QueryData  },
  { path: '/user', component: UserManager  },
]

const router = new VueRouter({
  mode: 'history',
  routes:routes
})

export {router,VueRouter};
