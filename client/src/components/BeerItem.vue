<template>
    <b-list-group-item>
    <img alt="Beer" src="../assets/beer.png">{{ beer.name }}, Alcohol: {{ beer.alcohol }}
    , Average Rating: {{ beer.averageRating}}
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
