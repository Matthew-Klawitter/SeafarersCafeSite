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
    clear: both;
    position: relative;
    height: 200px;
    width: 100%;
    background-color: lightblue;
    text-align: center;
  }
</style>