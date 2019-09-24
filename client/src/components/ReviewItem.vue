<template>
<b-list-group>
  <b-list-group-item>
   <!-- <img alt="Review" src="../assets/camel.jpg"> -->
    A BeerPal drunk {{ review.beer.name }} on {{ review.created }}. He/She gave the beer {{ review.score }} points and wrote:
    {{ review.textReview }}
    <b-button type="button" class="close" @click="$emit('delete-review', review._id)">&times;</b-button>
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
