<template>
  <b-list-group-item>
    <p>
      <img alt="Beer" src="../assets/beer.png" />
      {{ beer.name }}
      <span v-show="showBrewery">
        <span v-if="beer.brewery">by {{ beer.brewery.name }}</span>
      </span>
      <b-button
        variant="outline-info"
        size="sm"
        router-link
        :to="'/beers/' + beer._id "
      >more details</b-button>
      <b-button type="button" class="close" @click="$emit('delete-beer', beer._id)">&times;</b-button>
    </p>
    <span v-if="beer.averageRating">
      Average rating:
      <span class="badge badge-primary badge-pill">{{ beer.averageRating }}</span> points
    </span>
    <span v-else>The beer was not rated yet.</span>
  </b-list-group-item>
</template>

<script>
export default {
  name: "beer-item",
  props: ["beer", "showBrewery"]
};
</script>

<style scoped>
img {
  width: 33px;
  margin-right: 10px;
}
</style>
