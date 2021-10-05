<template>
  <div class="admin-update-blog-post">
    <p v-if="loading">Loading post...</p>
    <div class="admin-grid-container" v-else>
      <div class="admin-menu">
        <h1>Update Post</h1>
        <form id="update-post" @submit.prevent="updatePost">
          <label for="title">Post Title:</label><br>
          <input v-model="blogpost.title" type="text" id="title" name="title" value=""><br>
          <label for="author">Author:</label><br>
          <input v-model="blogpost.author" type="text" id="author" name="author" value=""><br>
          <label for="desc">Description:</label><br>
          <input v-model="blogpost.description" type="text" id="description" name="description" value=""><br>
          <label for="content">Content:</label><br>
          <textarea v-model="blogpost.content" rows="4" cols="50" name="content" form="update-post">
            Enter text here...
          </textarea><br>
          <input type="submit" value="Submit">
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
        this.fetchPost()
    },
    methods: {
        async fetchPost(){
          this.loading = true;
          this.blogpost = await api.getPost(this.$route.params.id);
          this.loading = false;
        },
        async updatePost(){
            await api.updatePost(this.blogpost);
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