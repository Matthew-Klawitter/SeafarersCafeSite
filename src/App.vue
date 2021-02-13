<template>
  <div id="app">
    <HomeHeader title="Seafarers' Cafe"/>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <HomeFooter/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import HomeHeader from './components/header/HomeHeader.vue'
import HomeFooter from './components/footer/HomeFooter.vue'

export default {
  name: 'App',
  components: {
    HomeHeader,
    HelloWorld,
    HomeFooter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
}
</style>
