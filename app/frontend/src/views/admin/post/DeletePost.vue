<template>
  <div class="admin-delete-blog-post">
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
        this.refreshProjects()
    },
    methods: {
        async refreshProjects(){
        this.loading = true;
        this.post = await api.getPost(this.$route.params.id);
        this.loading = false;
        }
    }
  }
</script>

<style scoped>

</style>