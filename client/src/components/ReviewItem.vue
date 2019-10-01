<template>
  <b-list-group>
    <b-list-group-item>
      <b-container>
        <b-row>
          <b-col>
            <p class="text-left beer-titel">
              <span v-if="!(review.beer==null)">{{ review.beer.name }}</span>
              <span v-else>deleted Beer</span>
            </p>
          </b-col>
          <b-col>
            Score:
            <span v-if="review.score===1">
              <img class="img-score" alt="1/5 beers" src="../assets/1av5.png" />
            </span>
            <span v-else-if="review.score===2">
              <img class="img-score" alt="2/5 beers" src="../assets/2av5.png" />
            </span>
            <span v-else-if="review.score===3">
              <img class="img-score" alt="3/5 beers" src="../assets/3av5.png" />
            </span>
            <span v-else-if="review.score===4">
              <img class="img-score" alt="4/5 beers" src="../assets/4av5.png" />
            </span>
            <span v-else>
              <img class="img-score" alt="5/5 beers" src="../assets/5av5.png" />
            </span>
          </b-col>
          <b-col>consumed on: {{ changeFormat(this.review.created) }}</b-col>
          <b-col>
            <b-button variant="outline-info" router-link :to="'/reviews/edit/' + review._id">edit</b-button>&nbsp;
            <b-button variant="outline-danger" @click="$emit('delete-review', review._id)">delete</b-button>
          </b-col>
        </b-row>
        <b-row v-show="review.textReview">
          <b-col>
            <p class="text-left">
              Comment:
              <span class="font-review">{{ review.textReview }}</span>
            </p>
          </b-col>
        </b-row>
      </b-container>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import moment from "moment";

export default {
  name: "review-item",
  props: ["review"],
  methods: {
    changeFormat(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    }
  }
};
</script>

<style scoped>

</style>
