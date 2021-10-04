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

import AdminBlog from '../views/admin/AdminBlog.vue'
import CreatePost from '../views/admin/post/CreatePost.vue'
import DeletePost from '../views/admin/post/DeletePost.vue'
import UpdatePost from '../views/admin/post/UpdatePost.vue'
import ViewPost from '../views/admin/post/ViewPost.vue'

import AdminProjects from '../views/admin/AdminProjects.vue'
import CreateProject from '../views/admin/projects/CreateProject.vue'
import DeleteProject from '../views/admin/projects/DeleteProject.vue'
import UpdateProject from '../views/admin/projects/UpdateProject.vue'
import ViewProject from '../views/admin/projects/ViewProject.vue'

import AdminPhotos from '../views/admin/AdminPhotos.vue'
import CreatePhoto from '../views/admin/photos/CreatePhoto.vue'
import DeletePhoto from '../views/admin/photos/DeletePhoto.vue'
import ViewPhoto from '../views/admin/photos/ViewPhoto.vue'

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
        path: '/admin/blog',
        component: AdminBlog,
        children: [
          {
            path: '/admin/blog/create',
            component: CreatePost
          },
          {
            path: '/admin/blog/delete/:id',
            component: DeletePost
          },
          {
            path: '/admin/blog/update/:id',
            component: UpdatePost
          },
          {
            path: '/admin/blog/view/:id',
            component: ViewPost
          }
        ]
      },
      {
        path: '/admin/projects',
        component: AdminProjects,
        children: [
          {
            path: '/admin/projects/create',
            component: CreateProject
          },
          {
            path: '/admin/projects/delete/:id',
            component: DeleteProject
          },
          {
            path: '/admin/projects/update/:id',
            component: UpdateProject
          },
          {
            path: 'admin/projects/view/:id',
            component: ViewProject
          }
        ]
      },
      {
        path: '/admin/photos',
        component: AdminPhotos,
        children: [
          {
            path: '/admin/photos/create',
            component: CreatePhoto
          },
          {
            path: '/admin/photos/delete/:id',
            component: DeletePhoto
          },
          {
            path: 'admin/photos/view/:id',
            component: ViewPhoto
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
