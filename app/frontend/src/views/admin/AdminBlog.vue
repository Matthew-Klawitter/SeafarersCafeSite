<template>
  <div class="admin-blog-head">
    <div class="admin-grid-container">
      <div class="admin-menu">
        <h1>Blog List</h1>
        <router-link to="/admin/blog/create">Create a new blog post</router-link>
        <p v-if="loading">Loading blog...</p>
        <div class="blog-post-list" v-else>
          <div v-for="p in posts" :key="p.id">
            <BlogAdminCRUD :post="p"/>
            <hr>
          </div>
        </div>
      </div>
      <div class="admin-content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api.js'
import BlogAdminCRUD from '@/components/shared/blog/BlogAdminCRUD.vue'

export default {
  name: 'AdminBlog',
  components: {
    BlogAdminCRUD
  },
  data() {
    return {
      loading: false,
      posts: null
    }
  },
  async created() {
    this.refresh();
  },
  methods: {
    async refresh(){
      this.loading = true;
      this.posts = await api.getPosts();
      this.loading = false;
    }
  }
}
</script>

<style scoped>
  .admin-grid-container {
    min-height: 100vh;
    display: grid;
    grid-template-areas:
      'menu main main main main main main main main main main'
      'menu main main main main main main main main main main'
      'menu main main main main main main main main main main';
    grid-template-rows: auto 1fr auto;
  }

  .admin-menu {
    text-align: left;
    grid-area: menu;
    padding: 1rem;
    border-right:1px solid rgb(40, 40, 40);
  }
  .admin-content {
    grid-area: main;
    padding: 1rem;
  }
</style>