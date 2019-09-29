<template>
  <b-list-group>
    <b-list-group-item>
      <b-container>
        <b-row>
          <b-col>
            <p class="text-left">Beer: {{ review.beer.name }}</p>
          </b-col>
          <b-col>
            Score:
            <span class="badge badge-primary badge-pill">{{ review.score }}</span> points
          </b-col>
          <b-col>consumed on: {{ review.created }}</b-col>
          <b-col>
            <b-button variant="outline-info" router-link :to="'/reviews/edit/' + review._id">edit</b-button> 
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
  props: ["review"]
};
</script>

<style scoped>
img {
  width: 33px;
  margin-right: 10px;
}

.opinion {
  font-family: Chalkduster, fantasy;
}
</style>
