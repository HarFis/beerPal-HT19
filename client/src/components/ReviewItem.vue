<template>
  <b-list-group>
    <b-list-group-item>
      <b-container>
        <b-row>
          <b-col>
            <p class="text-left"><span v-if="!(review.beer==null)">Beer: {{ review.beer.name }}</span>
            <span v-else>deleted Beer</span></p>
          </b-col>
          <b-col>
            Score:
            <span v-if="review.score===1"><img alt="1/5 beers" src="../assets/1av5.png"></span>
            <span v-else-if="review.score===2"><img alt="2/5 beers" src="../assets/2av5.png"></span>
            <span v-else-if="review.score===3"><img alt="3/5 beers" src="../assets/3av5.png"></span>
            <span v-else-if="review.score===4"><img alt="4/5 beers" src="../assets/4av5.png"></span>
            <span v-else><img alt="5/5 beers" src="../assets/5av5.png"></span>
          </b-col>
          <b-col>consumed on: {{ review.created }}</b-col>
          <b-col>
            <b-button variant="outline-info" router-link :to="'/reviews/edit/' + review._id">edit</b-button>
            &nbsp;
            <b-button variant="outline-danger" @click="$emit('delete-review', review._id)">delete</b-button>
          </b-col>
        </b-row>
        <b-row v-show="review.textReview">
          <b-col>
            <p class="text-left">
              BeerPals opinion:
              <span class="opinion">{{ review.textReview }}</span>
            </p>
          </b-col>
        </b-row>
      </b-container>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
export default {
  name: "review-item",
  props: ["review"],
};
</script>

<style scoped>
img {
  height: 25px;
  margin-right: 10px;
}

.opinion {
  font-family: Chalkduster, fantasy;
}
</style>
