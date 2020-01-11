import Vue from 'vue'
import VueRouter from 'vue-router'
import GoodsList from '../components/goods/List.vue'
import Detail from '../components/goods/Detail.vue'
import Desc from '../components/goods/Desc.vue'
import Comment from '../components/goods/Comment.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/goods/list',
    component:GoodsList
  },{
    path: '/goods/detail/:id',
    component:Detail
  },{
    path: '/goodsdesc/:id',
    name:'/goodsdesc/',
    component:Desc
  },
  {
    path: '/goodscomments/:id',
    name:'/goodscomments/',
    component:Comment
  }
]

const router = new VueRouter({
  routes
})

export default router
