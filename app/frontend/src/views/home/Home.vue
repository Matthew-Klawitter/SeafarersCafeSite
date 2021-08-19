<template>
  <div id="home">
    <Header title="Seafarers Cafe"/>
    <div class="content">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/home/header/HomeHeader.vue';
import Footer from '@/components/home/footer/HomeFooter.vue';

export default {
  name: 'Home',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
  .content {
    height: 100%;
  }
</style>