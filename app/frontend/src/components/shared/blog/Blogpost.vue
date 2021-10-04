<template>
    <div id='blogpost'>
         <div class="blog-block-title">
            <h2>{{post.title}}</h2>
            <p><pre>  by {{post.author}} on {{post.createdAt}} (Edited: {{post.updatedAt}})</pre></p>
            <hr>
        </div>
        <div class="blog-block-content">
            <vue-markdown-plus>{{post.content}}</vue-markdown-plus>
        </div>
    </div>
</template>

<script>
  import VueMarkdownPlus from 'vue-markdown-plus';

  export default {
    name: 'Blogpost',
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