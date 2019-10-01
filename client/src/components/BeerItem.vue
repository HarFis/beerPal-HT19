<template>
  <b-list-group-item>
    <p>
      <img id="beerGlas" alt="Beer" src="../assets/beer.png" />
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
      <span v-if="beer.averageRating<=1.4"><img class="img-score" alt="1/5 beers" src="../assets/1av5.png"></span>
            <span v-else-if="beer.averageRating<=2.4"><img class="img-score" alt="2/5 beers" src="../assets/2av5.png"></span>
            <span v-else-if="beer.averageRating<=3.4"><img class="img-score" alt="3/5 beers" src="../assets/3av5.png"></span>
            <span v-else-if="beer.averageRating<=4.4"><img class="img-score" alt="4/5 beers" src="../assets/4av5.png"></span>
            <span v-else><img class="img-score" alt="5/5 beers" src="../assets/5av5.png"></span></span>
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
#beerGlas {
  width: 33px;
  margin-right: 10px;
}
</style>
