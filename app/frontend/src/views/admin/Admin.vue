<template>
  <div id="admin">
    <Header title="Seafarers Cafe Administration"/>
    <div id="content">
      <router-view/>
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

<style>

</style>