<template>
  <div class="admin-delete-blog-post">
    <p v-if="loading">Loading post...</p>
    <div class="admin-grid-container" v-else>
      <div class="admin-menu">
        <h1>Delete Post</h1>
        <form id="delete-post" @submit.prevent="deletePost">
          <p>Are you sure you want to delete this post?</p><br>
          <input type="submit" value="Delete">
        </form>
      </div>
      <div class="admin-content">
        <h3>Post Preview</h3>
        <hr>
        <h2>{{blogpost.title}}</h2>
        <p><pre>  by {{blogpost.author}}</pre></p>
        <hr>
        {{blogpost.description}}
        <hr>
        <div v-html="markdownToHtml"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api.js';
  import marked from 'marked';

  export default {
    name: 'ViewPost',
    data() {
      return {
          loading: false,
          blogpost: null
      }
    },
    async created() {
        this.fetchPost(this.$route.params.id)
    },
    async beforeRouteUpdate(to, from, next) {
      this.fetchPost(to.params.id);
      next();
    },
    methods: {
        async fetchPost(id){
          this.loading = true;
          this.blogpost = await api.getPost(id);
          this.loading = false;
        },
        async deletePost(){
            await api.deletePost(this.blogpost);
            this.$router.push({path: '/admin/blog'});
        }
    },
    computed: {
      markdownToHtml(){
        return marked(this.blogpost.content);
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
    grid-area: menu;
  }
  .admin-content {
    grid-area: main;
    text-align: center;
  }
</style>