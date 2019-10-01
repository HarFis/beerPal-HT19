<template>
  <div>
    <div>
         
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import LoginComponent from '@compnent/LoginComponent.vue'

export default {
  name: 'LoginPage',
  

  data() {
    return {
      posts: [],
      slide: 0,
      sliding: null,
    }
  },
  mounted() {
    this.getPosts()
  },

  methods: {
    getPosts() {
      Api.get('posts')
        .then(response => {
          this.posts = []
          this.posts = response.data
        })
        .catch(error => {
          this.posts = []
          console.log(error)
        })
    },
    onSlideStart(slide){
      this.sliding=true
    },
    onSlideEnd(slide){
      this.sliding=false
    }
  },
  components: {
    PostItem
  }
}
</script>

<style>
.carouselarouselImg img {
  width: auto;
  height: 1024px;
  max-height: 480px;
}
</style>
