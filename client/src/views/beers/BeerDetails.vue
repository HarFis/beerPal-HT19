<template>
  <div>
    <b-card-group deck>
      <b-card>
        <div class="beer">
          <img alt="beer" src="../../assets/beer.png" />
          <br />
          <h2 id="headline">{{ beer.name }}</h2>

          <p>Type: {{ beer.type }}</p>
          <p>Alcohol/Vol: {{ beer.alcohol }}</p>
          <p>
            Average rating:
            <span v-if="beer.averageRating">{{ beer.averageRating }} points</span>
            <span id="warning" v-else>No ratings yet!</span>
          </p>

          <b-button variant="danger" @click="deleteBeer(beerID)">Delete this beer</b-button>
        </div>
      </b-card>
      <b-card>
        <div>
          <b-container v-if="reviews==0">
            <b-row>
              <p class="text-center" id="warning">No reviews yet.</p>
            </b-row>
          </b-container>
          <b-container v-else>
            <b-list-group>
              <review-item
                v-for="review in reviews"
                :key="review._id"
                :review="review"
                @delete-review="deleteReview"
                @edit-review="editReview"
              ></review-item>
            </b-list-group>
          </b-container>
        </div>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { Api } from "@/Api";
import ReviewItem from "@/components/ReviewItem";

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
      if (confirm("Are you sure you want to delete this beer?")) {
        Api.delete(`/beers/${id}`)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          })
          .then(this.$router.push({ path: "/beers" }));
      }
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
        var that = this;
        setTimeout(function(){
        that.getReviews();
        that.getBeer();
      }, 300)
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
      var that = this;
      setTimeout(function(){
        that.getReviews();
        that.getBeer();
      }, 300)
    }
  },
  components: {
    ReviewItem
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
