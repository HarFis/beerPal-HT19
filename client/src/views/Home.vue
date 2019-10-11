<template>
  <div>
    <vue-headful title="Home - BeerPal" description="Description from vue-headful" />
    <h3 v-if="!serverOK">
          <img style="max-width: 40px;" :src="require(`@/assets/warning.png`)" alt="warning" /> No connection to server. Please retry or contact administrator!
        </h3>
    <div>
      <b-carousel
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
        @sliding-end="onSlideEnd"
      >
        <b-carousel-slide
          caption="When you want to relax..."
          text="Enjoy beer with your pals."
          img-src="https://images.squarespace-cdn.com/content/v1/5b1717b5a9e028b430240f15/1545270392722-RKIPUBCGHK6060L2FVVA/ke17ZwdGBToddI8pDm48kA47qaxzGU3oa60Mv3IrElh7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0jBK0T3M-v-AVkQFEHxhNgUudw45kiY-UQ73op4W9iSPFDhmgzum_ZisgY9UJzHOlA/beer+samples.png?format=2500w"
          class="img-carousel"
        ></b-carousel-slide>

        <b-carousel-slide
          caption="When you want to rewind..."
          text="Enjoy beer with your pals."
          img-src="https://www.history.com/.image/t_share/MTU4NTE1Nzg2MDcwMTA3Mzk0/beer-oldest.jpg"
          class="img-carousel"
        ></b-carousel-slide>

        <b-carousel-slide
          caption="When you want to feel at home..."
          text="Enjoy beer with your pals."
          img-src="https://www.connshg.com/Resources/b5f10bc2-4cd8-4ccf-be25-d8b538cf524c/bigstock-Beer-Cold-Craft-light-Beer-in-202781995.jpg"
          class="img-carousel"
        ></b-carousel-slide>

        <b-carousel-slide
          caption="When you just want beer..."
          text="Enjoy beer with your pals."
          img-src="https://mondrian.mashable.com/2018%252F10%252F07%252F40%252F91e98805579249bbb0451c5a6f4256c6.af09a.jpg%252F1200x630.jpg?signature=hxJhg6l6eKzcolcV2wO_qNltn0Q="
          class="img-carousel"
        ></b-carousel-slide>
      </b-carousel>
    </div>
  
    <b-button v-if="serverOK" class="buttonClass" variant="secondary" href="/CreatePost/">CreatePost</b-button>
    <div>
      <b-container>
        <p>
          <post-item v-for="post in posts" :key="post._id" :post="post"></post-item>
        </p>
      </b-container>
    </div>
    <!-- Mobile (< 768px): stack columns by making one half-width and one full-width
    Desktop (>= 768px): keep both columns in same row in 4:8 ratio-->
    <b-container>
      <b-row>
        <b-col>
          <div v-if="this.currentPage > 1">
            <b-button class="buttonClass" variant="primary" @click="previousPage">Previous</b-button>
          </div>
        </b-col>
        <b-col>
          <div v-if="this.numberOfPosts > 5 && this.currentPage * 5 < this.numberOfPosts">
            <b-button class="buttonClass" variant="primary" @click="nextPage">Next</b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from "@/Api";
import PostItem from "@/components/PostItem";

export default {
  name: "home",

  data() {
    return {
      serverOK: true,
      numberOfPosts: null,
      perPage: 2,
      currentPage: 1,
      message: "",
      post: null,
      posts: [],
      slide: 0,
      sliding: null
    };
  },
  created() {
    this.getNumberOfPosts();
    this.getOrderedPosts();
  },

  methods: {
    getOrderedPosts() {
      this.serverOK = true;
      this.posts = [];
      Api.get("posts?sort=1&pageNo=" + this.currentPage)
        .then(response => {
          this.posts = [];
          this.posts = response.data;
        })
        .catch(error => {
          this.serverOK = false;
          this.posts = [];
          console.log(error);
        });
    },
    getNumberOfPosts() {
      Api.get("posts?count=1").then(response => {
        this.numberOfPosts = response.data;
      });
    },
    updatePosts() {
      Api.get("posts?sort=1&pageNo=" + this.currentPage)
        .then(response => {
          this.posts = response.data;
          this.scrollToTop();
        })
        .catch(error => {
          this.posts = [];
          console.log(error);
        });
    },

    nextPage() {
      this.currentPage++;
      this.updatePosts();
    },
    previousPage() {
      this.currentPage--;
      this.updatePosts();
    },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    scrollToTop() {
      window.scrollToTop(0,0);
    }
  },
  components: {
    PostItem
  }
};
</script>

<style>
.img-carousel {
  max-height: 350px;
  width: 100%;
  height: auto;
}

.buttonClass {
  margin-top: 2em;
  margin-bottom: 2em;
}
</style>
