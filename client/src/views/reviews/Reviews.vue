<template>
  <div>
    <vue-headful title="Reviews - BeerPal" />
    <div class="list">
      <h1>Reviews</h1>
      <h3 v-if="!serverOK">
        <img style="max-width: 40px;" :src="require(`@/assets/warning.png`)" alt="warning" /> No connection to server. Please retry or contact administrator!
      </h3>
      <h3 v-else>Current number of reviews: {{ reviews.length }}</h3>
      <!-- <b-button type="button" class="createButton" @click="createReview()">Create Review</b-button> -->
      <b-list-group>
        <review-item
          v-for="review in reviews"
          :key="review._id"
          :review="review"
          @delete-review="deleteReview"
          @edit-review="editReview"
        ></review-item>
      </b-list-group>
      <br />
      <b-button
        variant="danger"
        @click="deleteAllReviews"
        v-show="!(reviews.length===0)"
      >Delete all reviews</b-button>
    </div>
  </div>
</template>

<script>
import { Api } from "@/Api";
import ReviewItem from "@/components/ReviewItem";

export default {
  name: "Reviews",
  data() {
    return {
      serverOK: true,
      reviews: []
    };
  },
  created() {
    this.getReviews();
  },
  methods: {
    getReviews() {
      this.serverOK = true;
      Api.get("reviews")
        .then(response => {
          this.reviews = response.data.reviews;
        })
        .catch(error => {
          this.serverOK = false;
          this.reviews = [];
          console.log(error);
        })
        .then(() => {
          // This code is always executed (after success or error).
        });
    },
    editReview(id, newReview) {
      Api.patch(`/reviews/${id}`, newReview)
        .then(response => {
          console.log(response.data);
          this.getReviews();
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteReview(id) {
      Api.delete(`/reviews/${id}`)
        .then(response => {
          console.log(response.data.message);
          var index = this.reviews.findIndex(review => review._id === id);
          this.reviews.splice(index, 1);
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteAllReviews() {
      if (confirm("Are you sure you want to delete all reviews?")) {
        Api.delete("reviews")
          .then(response => {
            this.reviews = [];
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },

  components: {
    ReviewItem
  }
};
</script>

<style scoped>
</style>
