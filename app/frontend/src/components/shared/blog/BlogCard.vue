<template>
    <div id="blog-card">
        <div class="blog-block-title">
            <router-link :to="{path: '/blog/' + post.id}"><h2>{{post.title}}</h2></router-link>
            <p><pre>  by {{post.author}} on {{post.createdAt}} (Edited: {{post.updatedAt}})</pre></p>
            <hr>
        </div>
        <div class="blog-block-content">
            <vue-markdown-plus>{{post.description}}</vue-markdown-plus>
        </div>
    </div>
</template>

<script>
import VueMarkdownPlus from 'vue-markdown-plus';

export default {
  props: {
    post: Object
  },
  components: {
    VueMarkdownPlus
  }
}
</script>

<style scoped>
  #blog-card {
    width: 100%;
    border: 1px solid rgb(40, 40, 40);
    background-color: whitesmoke;
  }
  .blog-block-title {
    width: 100%;
    padding-top: 1rem;
    padding-left: 1rem;
  }
  .blog-block-content {
    width: 100%;
    padding-top: .5rem;
    padding-left: 1rem;
  }
</style>