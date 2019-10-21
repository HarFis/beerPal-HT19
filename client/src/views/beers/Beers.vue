<template>
<div>
  <vue-headful
            title="Beers - BeerPal"
        />
  <div class="list">
      <h1>Beers</h1>
      <h3 v-if="!serverOK">
          <img style="max-width: 40px;" :src="require(`@/assets/warning.png`)" alt="warning" /> No connection to server. Please retry or contact administrator!
        </h3>
      <span v-else><h3>Current number of beers: {{ beers.length }}</h3>
      <b-button class="buttonClass" router-link to="/add-beer">Add new beer</b-button></span>
      <b-list-group>
        <beer-item v-for="beer in beers" :key="beer._id" :beer="beer" :showBrewery="showBrewery" @delete-beer="deleteBeer"></beer-item>
      </b-list-group>
      <br>
      <b-button variant="danger" @click="deleteAllBeers" v-show="!(beers.length===0)">Delete all beers</b-button>
  </div>
</div>
</template>

<script>
import { Api } from '@/Api'
import BeerItem from '@/components/BeerItem'

export default {
  name: 'Beers',
  data() {
    return {
      serverOK: true,
      beers: [],
      showBrewery: true
    }
  },
  created() {
    this.getBeers()
  },
  methods: {
    getBeers() {
      this.serverOK = true;
      Api.get('beers')
        .then(response => {
          this.beers = response.data.beers
        }).catch(error => {
          this.serverOK = false;
          this.beers = [];
          console.log(error);
        })
        .then(() => {
          // This code is always executed (after success or error).
        })
    },
    deleteBeer(id) {
      Api.delete(`/beers/${id}`)
        .then(response => {
          var index = this.beers.findIndex(beer => beer._id === id)
          this.beers.splice(index, 1)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteAllBeers() {
        if(confirm('Are you sure you want to delete all beers?')){
        Api.delete('beers')
        .then(response =>{
          this.beers = []
        })
        .catch(error =>{
          console.log(error)
        })
      }
    }
  },
  components: {
    BeerItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
