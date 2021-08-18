<template>
  <header>
    <div id="home-header-title">
      <h1> {{ title }} </h1>
    </div>
    <div id="home-header-navbar">
      <ul>
        <li><router-link to="/admin/adminblog">Blog Posts</router-link></li>
        <li><router-link to="/admin/photos">Photos</router-link></li>
        <li><router-link to="/admin/projects">Projects</router-link></li>
        <li><router-link to="/admin/tags">Tags</router-link></li>
        <li><router-link to="/admin/accounts">Accounts</router-link></li>
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
    text-align: left;
    width: 20%;
  }

  ul {
    list-style-type: none;
    text-align: left;
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