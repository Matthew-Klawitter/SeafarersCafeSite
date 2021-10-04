<template>
  <div id="home">
    <div class="admin-head">
      <h1>Welcome Administrator!</h1>
      <p>Here you'll find some features to write blogs, projects, and upload photos.</p>
      <hr>
    </div>
    <div class="admin-grid-container">
      <div class="admin-menu">
        <ul>
          <li><router-link to="/admin/blog">Manage Blog</router-link></li>
          <li><router-link to="/admin/projects">Manage Projects</router-link></li>
          <li><router-link to="/admin/photos">Manage Photos</router-link></li>
        </ul>
      </div>
      <div class="admin-content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .admin-head {
    text-align: center;
  }
  .admin-grid-container {
    min-height: 100vh;
    display: grid;
    grid-template-areas:
      'menu main main main main main main main main main main'
      'menu main main main main main main main main main main'
      'menu main main main main main main main main main main';
    grid-template-rows: auto 1fr auto;
  }

  .admin-menu {
    grid-area: menu;
    border-right:1px solid rgb(40, 40, 40);
  }
  .admin-content {
    grid-area: main;
  }

  ul {
    list-style: none;
    text-align: center;
    padding: 0;
    margin-bottom: 0;
  }

  li {
    margin: 1em;
  }

  a {
    display: inline-block;
    height: 100%;
    width: 90%;
    padding-top: .5em;
    padding-bottom: .5em;
    padding-left: .5em;
    padding-right: .5em;
    border: 1px solid rgb(40, 40, 40);
    border-radius: 16px;
    background-color: rgb(40, 40, 40);
    color: white
  }

  a:hover {
    background-color: grey;
  }
</style>