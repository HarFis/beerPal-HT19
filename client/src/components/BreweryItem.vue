<template>
    <b-list-group-item>
    <img style="width: 5%" alt="Brewery" src="../assets/brewery.png">{{ brewery.name }}, Adress: {{ brewery.adress }}
    , Link: {{ brewery.link}}
    <router-link :to="'/breweries/' + brewery._id ">Brewery</router-link>
    <b-button type="button" class="close" @click="$emit('delete-brewery', brewery._id)">&times;</b-button>
    </b-list-group-item>
</template>

<script>

export default {
  name: 'brewery-item',
  props: ['brewery']
}
</script>

<style scoped>
img {
  width: 33px;
  margin-right: 10px;
}
</style>