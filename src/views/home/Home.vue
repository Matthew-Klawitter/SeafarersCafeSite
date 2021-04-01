<template>
  <div id="home">
    <Header/>
    <div id="content">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/home/header/Header.vue';
import Footer from '@/components/home/footer/Footer.vue';

export default {
  name: 'Home',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
  #content {
    height: 100%;
  }
</style>