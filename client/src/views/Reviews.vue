<template>
  <div class="reviews">
    <h1>List of {{ reviews.length }} reviews</h1>
    <!-- <b-button type="button" class="createButton" @click="createReview()">Create Review</b-button> -->
    <b-list-group>
      <review-item v-for="review in reviews" :key="review._id" :review="review" @delete-review="deleteReview"></review-item>
    </b-list-group>
  </div>
</template>

<script>
import { Api } from '@/Api'
import ReviewItem from '@/components/ReviewItem'

export default {
  name: 'Reviews',
  data() {
    return {
      reviews: []
    }
  },
  mounted() {
    this.getReviews()
  },
  methods: {
    getReviews() {
      Api.get('reviews')
        .then(response => {
          this.reviews = response.data.reviews
        })
        .catch(error => {
          this.reviews = []
          console.log(error)
        })
        .then(() => {
          // This code is always executed (after success or error).
        })
    },
    deleteReview(id) {
      /* Api.delete(`/reviews/${id}`)
        .then(response => {
          console.log(response.data.message)
          var index = this.reviews.findIndex(review => review._id === id)
          this.reviews.splice(index, 1)
        })
        .catch(error => {
          console.log(error)
        }
        )
        */ }},
  
  components: {
    ReviewItem
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
.createButton {
  margin-bottom: 1em;
}
.reviews {
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 2em;
}
</style>
