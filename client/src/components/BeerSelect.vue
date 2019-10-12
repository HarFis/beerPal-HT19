<template>
  <b-list-group-item>
    <img alt="Beer" src="../assets/beer.png" />
    {{ beer.name }}, Alcohol: {{ beer.alcohol }}
    , Average Rating: {{ beer.averageRating}}
    <b-button pill variant="outline-info" size="sm" @click="$emit('find-brewery', beer._id)">Select</b-button>
  </b-list-group-item>
</template>

<script>
export default {
  name: "beer-select",
  props: ["beer"]
};
</script>

<style scoped>
img {
  width: 33px;
  margin-right: 10px;
}
</style>
