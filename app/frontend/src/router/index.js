import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import HomeAbout from '../views/home/HomeAbout.vue'
import HomeBlog from '../views/home/HomeBlog.vue'
import HomeStudios from '../views/home/HomeStudios.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'blog',
        component: HomeBlog
      },
      {
        path: 'studios',
        component: HomeStudios
      },
      {
        path: 'about',
        component: HomeAbout
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
