<template>
  <div class="admin-view-blog-post">
    <p v-if="loading">Loading post...</p>
    <Blogpost :post="post" v-else/>
  </div>
</template>

<script>
  import api from '@/api.js';
  import Blogpost from '@/components/shared/blog/Blogpost.vue';

  export default {
    name: 'ViewPost',
    components: {
      Blogpost
    },
    data() {
        return {
          loading: false,
          post: null
        }
    },
    async created() {
        this.fetchPost(this.$route.params.id);
    },
    async beforeRouteUpdate(to, from, next) {
      this.fetchPost(to.params.id);
      next();
    },
    methods: {
        async fetchPost(id){
          this.loading = true;
          this.post = await api.getPost(id);
          this.loading = false;
        }
    }
  }
</script>

<style scoped>

</style>