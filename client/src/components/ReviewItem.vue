<template>
<b-list-group>
  <b-list-group-item>
   <!-- <img alt="Review" src="../assets/camel.jpg"> -->
    <b-container>
    <b-row>
    <b-col> Beer: {{ review.beer.name }} </b-col>
    <b-col> Score: <span class="badge badge-primary badge-pill">{{ review.score }}</span> points </b-col>
    <b-col> consumed on: {{ review.created }} <b-button type="button" class="close" @click="$emit('delete-review', review._id)">&times;</b-button></b-col>
    </b-row>
    <b-row v-show="review.textReview">
      <b-col>
      Textual review: {{ review.textReview }}
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
</style>
