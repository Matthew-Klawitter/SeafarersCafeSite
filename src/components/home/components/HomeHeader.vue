<template>
  <div id="home-header">
    <div id="home-header-title">
      <h1> {{ title }} </h1>
    </div>
    <div id="home-header-navbar">
      <ul>
        <li>Blog</li>
        <li><a href="https://podcast.seafarers.cafe/">Podcast</li>
        <li>Studios</li>
        <li>About</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',
  props: {
    title: String
  }
}
</script>

<style scoped>
#home-header-navbar {
  box-shadow: 0 4px 4px -2px lightgray;
  width: 100%;
}

ul {
  list-style-type: none;
  text-align: center;
  padding: 0;
}

li {
  display: inline;
  padding-left: .5em;
  padding-right: .5em;
}

#home-header-navbar ul li {
  border-right: 2px solid black;
}

#home-header-navbar ul li:last-of-type {
  border-right: none;
}
</style>