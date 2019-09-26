<template>
<b-list-group>
  <b-list-group-item>
    <b-container>
    <b-row>
    <b-col> <p class="text-left">Location name: {{ location.name }} </p></b-col>
    <b-col> {{ location.typeOfLocation }} </b-col>
    <b-col> <b-button type="button" class="close" @click="$emit('delete-location', location._id)">&times;</b-button></b-col>
    </b-row>
    </b-container>
  </b-list-group-item>
  </b-list-group>
</template>

<script>

export default {
  name: 'location-item',
  props: ['location']
}
</script>

<style scoped>

</style>
