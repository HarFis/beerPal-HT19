<template>
  <div>
    <div>
      <b-carousel
      id="homeCarousel"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      
      style="text-shadow: 2px 4px 4px #000;"
      fade
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd">

      <b-carousel-slide
        caption="When you want to relax..."
        text="Enjoy beer with your pals."
        img-src="https://images.squarespace-cdn.com/content/v1/5b1717b5a9e028b430240f15/1545270392722-RKIPUBCGHK6060L2FVVA/ke17ZwdGBToddI8pDm48kA47qaxzGU3oa60Mv3IrElh7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0jBK0T3M-v-AVkQFEHxhNgUudw45kiY-UQ73op4W9iSPFDhmgzum_ZisgY9UJzHOlA/beer+samples.png?format=2500w"
        style=" width:100%; height: 500px !important;"
      ></b-carousel-slide>

      <b-carousel-slide
        caption="When you want to rewind..."
        text="Enjoy beer with your pals."
        img-src="https://www.history.com/.image/t_share/MTU4NTE1Nzg2MDcwMTA3Mzk0/beer-oldest.jpg"
        style=" width:100%; height: 500px !important;"
      ></b-carousel-slide>

      <b-carousel-slide
        caption="When you want to feel at home..."
        text="Enjoy beer with your pals."
        img-src="https://www.connshg.com/Resources/b5f10bc2-4cd8-4ccf-be25-d8b538cf524c/bigstock-Beer-Cold-Craft-light-Beer-in-202781995.jpg"
        style=" width:100%; height: 500px !important;"
      ></b-carousel-slide>

      <b-carousel-slide
        caption="When you just want beer..."
        text="Enjoy beer with your pals."
        img-src="https://mondrian.mashable.com/2018%252F10%252F07%252F40%252F91e98805579249bbb0451c5a6f4256c6.af09a.jpg%252F1200x630.jpg?signature=hxJhg6l6eKzcolcV2wO_qNltn0Q="
        style=" width:100%; height: 500px !important;"
      ></b-carousel-slide>

      </b-carousel>
    </div>
      <b-button class="buttonClass" variant="secondary" href="/CreatePost/">CreatePost</b-button>
      <div>
        <b-container>
        <p>
      <post-item v-for="post in posts" :key="post._id" :post="post"></post-item>
        </p>
      </b-container>
      </div>
      <!-- Mobile (< 768px): stack columns by making one half-width and one full-width
           Desktop (>= 768px): keep both columns in same row in 4:8 ratio -->
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import PostItem from '@/components/PostItem'

export default {
  name: 'home',

  data() {
    return {
      posts: [],
      slide: 0,
      sliding: null
    }
  },
  mounted() {
    this.getOrderedPosts()
  },

  methods: {
    getOrderedPosts() {
      Api.get("posts?sort=1")
        .then(response => {
          this.posts = []
          this.posts = response.data
        })
        .catch(error => {
          this.posts = []
          console.log(error)
        })
    },
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
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

.buttonClass {
  margin-top: 2em;
  margin-bottom: 2em;

}


</style>
