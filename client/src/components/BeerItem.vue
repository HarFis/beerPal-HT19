<template>
    <b-list-group-item>
    <img alt="Beer" src="../assets/beer.png">{{ beer.name }}, Alcohol: {{ beer.alcohol }}
    , Average Rating: {{ beer.averageRating}}
    <b-button type="button" class="close" @click="$emit('delete-beer', beer._id)">&times;</b-button>
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
