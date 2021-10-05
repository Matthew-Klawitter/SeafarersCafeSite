<template>
  <div class="blog-admin-crud-entry">
    <p>
      Id: {{post.id}} -
      Title: {{post.title}} - 
      Author: {{post.author}}
      <span>
        <router-link :to="{path: '/admin/blog/view/' + post.id}">View | </router-link>
        <router-link :to="{path: '/admin/blog/update/' + post.id}">Edit | </router-link>
        <router-link :to="{path: '/admin/blog/delete/' + post.id}">Delete</router-link>
      </span>
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
  a {
    text-align: right;
  }
  span {
    display: inline;
    float: right;
  }
</style>