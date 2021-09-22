<template>
    <div id="studio-card">
        <div class="studio-block-title">
            <h3>{{project.title}}</h3>
            <p>Created by: {{project.author}}</p>
            <a :href="project.link">Visit this project</a>
        </div>
        <div class="studio-block-content">
            <vue-markdown-plus>{{project.description}}</vue-markdown-plus>
        </div>
    </div>
</template>

<script>
import VueMarkdownPlus from 'vue-markdown-plus';

export default {
    props: {
        project: Object
    },
    components: {
      VueMarkdownPlus
    }
}
</script>

<style scoped>
  #studio-card {
    width: 100%;
    border: 1px solid rgb(40, 40, 40);
    background-color: whitesmoke;
  }
  .studio-block-title {
    width: 100%;
    border-bottom: 1px solid rgb(40, 40, 40);
    padding-top: 1rem;
    padding-left: 1rem;
  }
  .studio-block-content {
    width: 100%;
    padding-top: .5rem;
    padding-left: 1rem;
  }
</style>