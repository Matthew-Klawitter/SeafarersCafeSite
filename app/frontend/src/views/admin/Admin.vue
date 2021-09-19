<template>
  <div id="admin">
    <div class="col">
      <div class="left">
        <Header title="Administration"/>
      </div>
      <div class="right">
        <div class="content">
          <router-view/>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/admin/header/AdminHeader.vue';
import Footer from '@/components/admin/footer/AdminFooter.vue';

export default {
  name: 'Admin',
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped>
  /* Separating header and content into two columns */
  .col {
    width: 100%;
    height: 100%;
    position: relative;
    float: left;
  }

  .left {
    width: 10%;
    height: 100%;
    float: left;
  }

  .right {
    width: 80%;
    height: 100%;
    float: right;
    padding-left: 1em;
  }
</style>