<template>
  <footer>
    <br>
    <br>
    <p>{{ copyright }}</p>
    <br>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      copyright: 'Seafarers Cafe © 2021'
    }
  }
}
</script>

<style scoped>
  /* Pushing footer to the bottom of the page */
  footer {
    text-align: center;
    background-color: rgb(40, 40, 40);
  }

  footer p {
    color: lightgrey;
  }
</style>