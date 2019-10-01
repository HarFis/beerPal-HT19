<template>
    <div>
      <b-list-group-item>
      <img alt="Brewery" src="../assets/brewery.png">{{ brewery.name }}, Adress: {{ brewery.adress }}
      , Link: {{ brewery.link}}
      <b-button pill variant="outline-info" size="sm" router-link :to="'/breweries/'  + brewery._id ">more details</b-button>
      <b-button type="button" class="close" @click="$emit('delete-brewery', brewery._id)">&times;</b-button>
      </b-list-group-item>
    </div>
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
