<template>
  <div id="home-blog">
    <div class="blog-head">
      <h1>The "Morning Mocha" Blog</h1>
      <p>An aesthetic blog on our assorted caffinated thoughts</p>
      <hr>
    </div>
    <p v-if="loading">Loading blog...</p>
    <div class="blog-post-list" v-else>
      <div v-for="p in posts" :key="p.id">
        <HomeBlogCard :post="p"/>
        <br>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api.js';
import HomeBlogCard from '@/components/shared/blog/HomeBlogCard.vue';

export default {
  name: 'HomeBlog',
  components: {
    HomeBlogCard
  },
  data() {
    return {
      loading: false,
      posts: null
    }
  },
  async created() {
    this.refreshProjects()
  },
  methods: {
    async refreshProjects(){
      this.loading = true;
      this.posts = await api.getPosts();
      this.loading = false;
    }
  }
}
</script>

<style scoped>
  .blog-head {
      text-align: center;
    }
</style>