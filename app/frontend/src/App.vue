<template>
  <div id="app">
    <div class="grid-container">
      <div class="home-menu">
        <Sidebar title="" :routes="routes" :links="links"/>
      </div>
      <div class="home-content">
        <router-view/>
      </div>
      <div class="home-footer">
        <Footer/>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/shared/sidebar/Sidebar.vue';
import Footer from '@/components/shared/footer/Footer.vue';

const routes = [
  {id:0, name:"Home", route:"/"},
  {id:1, name:"Blog", route:"/blog/feed"},
  {id:2, name:"Studios", route:"/studios"},
  {id:3, name:"About", route:"/about"}
]

const links = [
  {id:4, name:"Podcast", link:"https://podcast.seafarers.cafe/"}
]

export default {
  name: 'Home',
  components: {
    Sidebar,
    Footer
  },
  data() {
    return {
      routes,
      links
    }
  }
}
</script>

<style lang="scss">
  @import '~@/../mdb/scss/index.free.scss';

  html, body {
    width: 100%;
    height: 100%;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  .grid-container {
    min-height: 100vh;
    display: grid;
    grid-template-areas: 
      'menu main main main main main main main'
      'menu main main main main main main main'
      'menu footer footer footer footer footer footer footer';
      grid-template-rows: auto 1fr auto;
  }

  .home-menu {
    grid-area: menu;
    background-color: whitesmoke;
    min-width: 8em;
  }

  .home-content {
    grid-area: main;
    padding: 1rem;
  }

  .home-footer {
    grid-area: footer;
  }
</style>
