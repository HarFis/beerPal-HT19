<template>
<b-list-group>
  <b-list-group-item>
   <!-- <img alt="Review" src="../assets/camel.jpg"> -->
    <b-container>
    <b-row>
    <b-col> <p class="text-left">Beer: {{ post.review.beer.name }} </p></b-col>
    <b-col> Score: <span class="badge badge-primary badge-pill">{{ post.review.score }}</span> points </b-col>
    <b-col> consumed on: {{ post.review.created }} </b-col>
    </b-row>
    <b-row v-show="post.review.textReview">
      <b-col>
      <p class="text-left">BeerPals opinion: <span class="opinion">{{ post.review.textReview }}</span></p>
      </b-col>
    </b-row>
    </b-container>
  </b-list-group-item>
  </b-list-group>
</template>

<script>

export default {
  name: 'post-item',
  props: ['post']
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
