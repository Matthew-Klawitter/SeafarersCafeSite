<template>
  <div class="blog-admin-crud-entry">
    <p>
      Title: {{post.title}} | 
      Author: {{post.author}} | 
      Created: {{post.createdAt}} | 
      Edited: {{post.updatedAt}} | 
      <router-link :to="{path: '/admin/blog/view/' + post.id}">View | </router-link>
      <router-link :to="{path: '/admin/blog/update/' + post.id}">Edit | </router-link>
      <router-link :to="{path: '/admin/blog/delete/' + post.id}">Delete</router-link>
    </p>
  </div>    
</template>

<script>
export default {
  props: {
    post: Object
  }
}
</script>

<style scoped>

</style>