<template>
    <b-list-group>
      <b-list-group-item >
        <b-container>
    <b-row>
      <b-col md=4>
          </b-col>
      <b-col class="text-left" md=4>
      <img id="beerGlas" alt="Beer" src="../assets/drinkingStanding.png" />User: {{ user.username }}</b-col>
      <b-col>
        <b-button variant="outline-primary" size="sm" router-link :to="'/users/' + user._id ">more details</b-button>
        
        &nbsp;
        <b-button variant="outline-danger"
              size="sm" @click="$emit('delete-user', user._id)">delete</b-button></b-col>
    </b-row>
        </b-container>
      </b-list-group-item>

      </b-list-group>
</template>

<script>

export default {
  name: 'user-item',
  props: ['user']
}
</script>

<style scoped>
img {
  max-height: 30px;
  margin-right: 10px;
}
</style>
