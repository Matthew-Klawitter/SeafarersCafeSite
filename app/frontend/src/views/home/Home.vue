<template>
  <div id="home">
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
  {id:1, name:"Blog", route:"/blog"},
  {id:2, name:"Studios", route:"/studios"},
  {id:3, name:"About", route:"/about"}
]

const links = [
  {id:0, name:"Podcast", link:"https://podcast.seafarers.cafe/"}
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

<style scoped>
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
  }

  .home-content {
    grid-area: main;
    padding-left: 1rem;
    padding-top: 1rem;
  }

  .home-footer {
    grid-area: footer;
  }
</style>