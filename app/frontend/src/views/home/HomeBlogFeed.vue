<template>
  <div id="home-blog-feed">
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
  import HomeBlogCard from '@/components/shared/blog/BlogCard.vue';

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