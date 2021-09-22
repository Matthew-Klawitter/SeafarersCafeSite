import Vue from 'vue'
import VueRouter from 'vue-router'
// Home routes
import Home from '../views/home/Home.vue'
import HomeAbout from '../views/home/HomeAbout.vue'
import HomeBlog from '../views/home/HomeBlog.vue'
import HomeStudios from '../views/home/HomeStudios.vue'
import HomeBlogpost from '../views/home/HomeBlogpost.vue'
import HomeBlogFeed from '../views/home/HomeBlogFeed.vue'
// Admin routes
import Admin from '../views/admin/Admin.vue'
import AdminAccounts from '../views/admin/AdminAccounts.vue'
import AdminPhotos from '../views/admin/AdminPhotos.vue'
import AdminBlog from '../views/admin/AdminBlog.vue'
import AdminProjects from '../views/admin/AdminProjects.vue'
import AdminTags from '../views/admin/AdminTags.vue'
// import AdminAuthorized from '../views/admin/AdminAuthorized.vue'
// import AdminLogin from '../views/admin/AdminLogin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blog',
    name: 'Blog',
    component: HomeBlog,
    children: [
      {
        path: '/blog/feed',
        component: HomeBlogFeed
      },
      {
        path: '/blog/:id',
        component: HomeBlogpost
      }
    ]
  },
  {
    path: '/studios',
    name: 'Studios',
    component: HomeStudios
  },
  {
    path: '/about',
    name: 'About',
    component: HomeAbout
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: 'adminblog',
        component: AdminBlog
      },
      {
        path: 'photos',
        component: AdminPhotos
      },
      {
        path: 'projects',
        component: AdminProjects
      },
      {
        path: 'tags',
        component: AdminTags
      },
      {
        path: 'accounts',
        component: AdminAccounts
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
