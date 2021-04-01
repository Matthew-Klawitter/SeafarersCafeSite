<template>
  <footer>
    <p>{{ copyright }}</p>
    <p>{{ creator }}</p>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      copyright: 'Seafarers Cafe © 2020',
      creator: 'Created by Matthew Klawitter'
    }
  }
}
</script>

<style scoped>
footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: lightblue;
}
</style>