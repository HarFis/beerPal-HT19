<template>
    <b-list-group-item>
    <p><img alt="Beer" src="../assets/beer.png">{{ beer.name }} <!--TO FIX <span v-show="beer.brewery._id">by {{ beer.brewery.name }} </span> -->
    <b-button pill variant="outline-info" size="sm" router-link :to="'/beers/' + beer._id ">more details</b-button> 
    <b-button type="button" class="close" @click="$emit('delete-beer', beer._id)">&times;</b-button></p>
    <span v-if=beer.averageRating>
    Average rating: <span class="badge badge-primary badge-pill">{{ beer.averageRating }}</span> points </span>
    <span v-else>The beer was not rated yet.</span>
    </b-list-group-item>
</template>

<script>

export default {
  name: 'beer-item',
  props: ['beer']
  }
</script>

<style scoped>
img {
  width: 33px;
  margin-right: 10px;
}
</style>
