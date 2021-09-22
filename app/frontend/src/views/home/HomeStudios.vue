<template>
  <div id="home-studios">
    <div class="studios-head">
      <h1>Seafarer Cafe Studios</h1>
      <p>A list of projects our team have worked on</p>
      <hr>
    </div>
    <p v-if="loading">Loading projects...</p>
    <div class="studios-project-list" v-else>
      <div v-for="p in projects" :key="p.id">
        <HomeStudioCard :project="p"/>
        <br>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api.js';
import HomeStudioCard from '@/components/shared/studios/StudioCard.vue';

export default {
  name: 'HomeStudios',
  components: {
    HomeStudioCard
  },
  data() {
    return {
      loading: false,
      projects: null
    }
  },
  async created() {
    this.refreshProjects()
  },
  methods: {
    async refreshProjects(){
      this.loading = true;
      this.projects = await api.getProjects();
      this.loading = false;
    }
  }
}
</script>

<style scoped>
  .studios-head {
    text-align: center;
  }
</style>