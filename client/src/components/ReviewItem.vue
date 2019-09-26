<template>
<b-list-group>
  <b-list-group-item>
   <!-- <img alt="Review" src="../assets/camel.jpg"> -->
    <b-container>
    <b-row>
    <b-col> <p class="text-left">Beer: {{ review.beer.name }} </p></b-col>
    <b-col> Score: <span class="badge badge-primary badge-pill">{{ review.score }}</span> points </b-col>
    <b-col> consumed on: {{ review.created }} <b-button type="button" class="close" @click="$emit('delete-review', review._id)">&times;</b-button></b-col>
    </b-row>
    <b-row v-show="review.textReview">
      <b-col>
      <p class="text-left">BeerPals opinion: <span class="opinion">{{ review.textReview }}</span></p>
      </b-col>
    </b-row>
    </b-container>
  </b-list-group-item>
  </b-list-group>
</template>

<script>

export default {
  name: 'review-item',
  props: ['review']
}
</script>

<style scoped>

img {
  width: 33px;
  margin-right: 10px;
}

.opinion
{
  font-family: Chalkduster, fantasy ;
}

</style>
