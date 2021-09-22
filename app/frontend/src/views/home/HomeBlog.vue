<template>
  <div id="home-blog">
    <div class="blog-head">
      <h1>The "Morning Mocha" Blog</h1>
      <p>An aesthetic blog on our assorted caffinated thoughts</p>
      <hr>
    </div>
    <div class="blog-feed">
      <router-view/>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
  .blog-head {
      text-align: center;
    }
</style>