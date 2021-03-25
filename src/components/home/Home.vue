<template>
  <div id="home">
    <HomeHeader title="Seafarers' Cafe"/>
    <HomeFooter/>
  </div>
</template>

<script>
import HomeHeader from './components/HomeHeader.vue';
import HomeFooter from './components/HomeFooter.vue';

export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeFooter
  }
}
</script>

<style>

</style>