<template>
  <div id="admin-tags">
    <h1>Admin Tags</h1>
    <p v-if="loading">Loading...</p>
    <div v-else>
      <ul>
        <li v-for="t in tags" :key="t">
            {{ t.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '@/api.js'
//import axios from "axios";

export default {
  name: 'AdminTags',
  data() {
    return {
      loading: false,
      tags: null
    }
  },
  async created() {
    this.refreshTags()
  },
  methods: {
    async refreshTags(){
      this.loading = true
      this.tags = await api.getTags()
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>