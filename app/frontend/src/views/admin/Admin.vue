<template>
  <div id="home">
    <div class="admin-head">
      <h1>Welcome Administrator!</h1>
      <p>Here you'll find some features to write blogs, projects, and upload photos.</p>
      <hr>
    </div>
    <div class="admin-grid-container">
      <div class="admin-menu">

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
    padding: 1rem;
  }
  .admin-content {
    grid-area: main;
    padding: 1rem;
  }
</style>