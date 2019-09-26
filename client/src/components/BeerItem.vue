<template>
    <b-list-group-item>
    <img alt="Beer" src="../assets/beer.png">{{ beer.name }} <span v-show="beer.brewery._id">by {{ beer.brewery.name }} </span> 
    <b-button pill variant="outline-info" size="sm" router-link :to="'/beers/' + beer._id ">more details</b-button> <br>
    The beer has average rating: <span class="badge badge-primary badge-pill">{{ beer.averageRating }}</span> points
    <b-button type="button" class="close" @click="$emit('delete-beer', beer._id)">&times;</b-button>
    </b-list-group-item>
</template>

<script>

export default {
  name: 'beer-item',
  props: ['beer'],
  }
</script>

<style scoped>
img {
  width: 33px;
  margin-right: 10px;
}
</style>
