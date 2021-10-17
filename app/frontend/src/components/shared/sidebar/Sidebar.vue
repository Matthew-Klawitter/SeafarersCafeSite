<template>
  <header>
    <div class="home-header-title">
      <img :src="require(`@/assets/logo.png`)" alt="Logo" width="100" height="100"/>
      <h2>{{title}}</h2>
      <hr>
    </div>
    <nav>
      <ul v-for="r in routes" :key="r.id">
        <li><router-link :to="r.route">{{ r.name }}</router-link></li>
      </ul>
      <hr>
      <ul v-for="l in links" :key="l.id">
        <li><a :href="l.link">{{ l.name }}</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  props: {
    title: String,
    routes: Array,
    links: Array
  }
}
</script>

<style scoped>
  header {
    text-align: left;
    background-color: whitesmoke;
  }

  .home-header-title {
    text-align: center;
    background-color: rgb(40, 40, 40);
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