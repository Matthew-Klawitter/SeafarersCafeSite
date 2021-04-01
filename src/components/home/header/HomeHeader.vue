<template>
  <header>
    <div id="home-header-title">
      <h1> {{ title }} </h1>
    </div>
    <div id="home-header-navbar">
      <ul>
        <li><router-link to="/blog">Blog</router-link></li>
        <li><a href="https://podcast.seafarers.cafe/" target="_blank">Podcast</a></li>
        <li><router-link to="/studios">Studios</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style scoped>
  header {
    background-color: lightblue;
    display: grid;
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