import Vue from 'vue'
import VueRouter from 'vue-router'
//留心：以上导入方式不推荐
//原因：会导致网页默认打开（首屏）加载过慢
//因为：如果按照下述方式写，后期打开首页的时候会都加载
//解决：路由懒加载

Vue.use(VueRouter)

  const routes = [
  {path:'/login',component:()=>import('../views/users/Login.vue')},
  {
    path:'/',
    component:()=>import('../views/admin/Index.vue'),
    children:[
      {path:'users',component:()=>import('../views/users/Index.vue')},
      {path:'users/create',component:()=>import('../views/users/Create.vue')},
      {path:'users/sy',component:()=>import('../views/users/Shouye.vue')},
      {path:'goods/type',component:()=>import('../views/goods/type/Index.vue')},
      {path:'goods/type/create',component:()=>import('../views/goods/type/Create.vue')},
      {path:'history',component:()=>import('../views/History.vue')},
      {path:'goods',component:()=>import('../views/goods/Index.vue')},
      {path:'goods/recycle',component:()=>import('../views/goods/Recycle.vue')},
      {path:'goods/cate',component:()=>import('../views/goods/cate/Index.vue')},
      {path:'goods/cate/create',component:()=>import('../views/goods/cate/Create.vue')},
      {path:'goods/create',component:()=>import('../views/goods/Create.vue')},
      {path:'goods/type/attr',component:()=>import('../views/goods/type/Attr.vue')},
      {path:'goods/attr',component:()=>import('../views/goods/attr/Index.vue')},
      {path:'goods/attr/create',component:()=>import('../views/goods/attr/Create.vue')},
      {path:'orders',component:()=>import('../views/orders/Orders.vue')},
      {path:'orders/recycle',component:()=>import('../views/orders/Recycle.vue')},
      {path:'orders/total',component:()=>import('../views/orders/Total.vue')},
      {path:'auths',component:()=>import('../views/auths/Index.vue')},
      {path:'roles',component:()=>import('../views/roles/Index.vue')},
      {path:'roles/create',component:()=>import('../views/roles/Create.vue')},
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   //路由懒加载：只有访问这个页面的时候才会加载这个组件
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
