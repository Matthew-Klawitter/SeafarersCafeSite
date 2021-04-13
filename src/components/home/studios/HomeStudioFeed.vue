<template>
  <div class="studio-feed">
    <ul>
      <li v-for="p in projects" :key="p">
          {{ p }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
      return {
        projects: [0, 1]
      }
  }
}
</script>

<style scoped>

</style>