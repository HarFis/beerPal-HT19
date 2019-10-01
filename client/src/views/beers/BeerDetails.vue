<template>
  <div class="beer">
    <h1 id="headline">{{ beer.name }}</h1>
    <ul>
      <li>Type: {{ beer.type }}</li>
      <li>Alcohol/Vol: {{ beer.alcohol }}</li>
      <li>
        Average rating:
        <span v-if="beer.averageRating">{{ beer.averageRating }} points</span>
        <span id="warning" v-else>No ratings yet! Be the first to rate!</span>
      </li>
    </ul>
    <b-button variant="danger" @click="deleteBeer(beerID)">Delete this beer</b-button>
    <b-container v-if="reviews==0">
      <b-row>
        <p id="warning">No reviews yet. Be the first to review this beer!!</p>
      </b-row>
    </b-container>
    <b-container v-else>
      <b-list-group>
        <review-item v-for="review in reviews" :key="review._id" :review="review" @delete-review="deleteReview"></review-item>
      </b-list-group>
    </b-container>
  </div>
</template>

<script>
import { Api } from "@/Api";
import ReviewItem from "@/components/ReviewItem";
import router from "@/router";

export default {
  name: "BeerDetails",
  props: ["beerID"],

  data() {
    return {
      beer: "",
      reviews: []
    };
  },
  mounted() {
    this.getReviews();
    this.getBeer();
  },
  methods: {
    getBeer() {
      Api.get("beers/" + this.beerID)
        .then(response => {
          this.beer = response.data;
        })
        .catch(error => {
          this.beer = null;
          console.log(error);
        });
    },
    getReviews() {
      Api.get("beers/" + this.beerID + "/reviews/")
        .then(response => {
          this.reviews = response.data.reviews;
        })
        .catch(error => {
          this.reviews = [];
          console.log(error);
        });
    },
    deleteBeer(id) {
      if(confirm('Are you sure you want to delete this beer?')){
          Api.delete(`/beers/${id}`)
          .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
        .then(this.$router.push({path: '/beers'}))
        }},
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
    }

  },
  components: {
    ReviewItem
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
.createButton {
  margin-bottom: 1em;
}
.beer {
  color: darkslategray;
}

#headline {
  color: rgb(28, 52, 71);
  font-weight: 900;
}

#warning {
  color: crimson;
  font-weight: bold;
}
</style>
