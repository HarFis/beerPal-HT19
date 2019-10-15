<template>
  <b-list-group>
    <b-list-group-item v-if="post.review===null || post.review.beer===null">
      <!-- <img alt="Review" src="../assets/camel.jpg"> -->
      <b-container>
        <b-row>
          <b-col class="text-left">
            <span class="beer-titel" v-if="post.review.beer">{{ post.review.beer.name }}</span>
            <br />
            <span
              class="brewery-titel"
              v-if="post.review.beer.brewery"
            >{{ post.review.beer.brewery.name }}</span>
          </b-col>
          <b-col>
            Score:
            <span v-if="post.review.score===1">
              <img class="img-score" alt="1/5 beers" src="../assets/1av5.png" />
            </span>
            <span v-else-if="post.review.score===2">
              <img class="img-score" alt="2/5 beers" src="../assets/2av5.png" />
            </span>
            <span v-else-if="post.review.score===3">
              <img class="img-score" alt="3/5 beers" src="../assets/3av5.png" />
            </span>
            <span v-else-if="post.review.score===4">
              <img class="img-score" alt="4/5 beers" src="../assets/4av5.png" />
            </span>
            <span v-else>
              <img class="img-score" alt="5/5 beers" src="../assets/5av5.png" />
            </span>
          </b-col>
          <b-col>
            consumed on:
            <p>{{ changeFormat(this.post.review.created)}}</p>
          </b-col>

          <b-col>
            at:
            <p>{{ changeFormat2(this.post.review.created)}}</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="9">
            <p class="text-left" v-show="post.review.textReview">
              <span v-if="post.postOwner">{{ post.postOwner.username }}</span>
              <span v-else>Deleted user</span>'s comment: 
              <span class="font-review">{{ post.review.textReview }}</span>
            </p>
          </b-col>
          <b-col
            v-if="post.location"
            class="text-left"
          >Location: {{post.location.name}}</b-col>
        </b-row>
      </b-container>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import moment from "moment";

export default {
  name: "post-item",
  props: ["post"],
  data() {
    return {};
  },
  methods: {
    changeFormat(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    },
    changeFormat2(value) {
      if (value) {
        return moment(String(value)).format("h:mm:ss a");
      }
    }
  }
};
</script>

<style scoped>
</style>
