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
  #home-header-title h1{
    text-align: center;
  }

  header {
    background-color: lightblue;
    left: 0;
    bottom: 0;
    display: grid;
    text-align: left;
  }

  ul {
    list-style-type: none;
    text-align: center;
    padding: 0;
  }

  li {
    padding-left: .5em;
    padding-right: .5em;
  }

  #home-header-navbar ul li {
    border-bottom: 2px solid black;
  }
</style>