<template>
<div>
  <vue-headful
            title="Breweries - BeerPal"
        />
    <div class="breweryList">
      <h1>Breweries</h1>
      <h3>Current number of breweries: {{ breweries.length}}</h3>
      <b-button class="buttonClass" router-link to="/add-brewery">Add new brewery</b-button>
      <b-list-group>
        <brewery-item v-for="brewery in breweries" :key="brewery._id" :brewery="brewery" @delete-brewery="deleteBrewery"></brewery-item>
      </b-list-group>
       <br>
        <b-button variant="danger" @click="deleteAllBreweries" v-show="!(breweries.length===0)">Delete all Breweries</b-button>

    </div>
</div>
</template>

<script>
import { Api } from '@/Api'
import BreweryItem from '@/components/BreweryItem'

export default {
    name: 'Breweries',
    data() {
        return{
            breweries: []
        }
    }, 
    mounted() {
        this.getBreweries()
    },
    methods: {
        getBreweries(){
            Api.get('breweries')
            .then( response => {
                this.breweries = response.data.breweries
            }).catch(error =>{
                this.breweries = []
                console.log(error)
            })
            .then(() => {
          // This code is always executed (after success or error).
            })
        },
        deleteBrewery(id) {
          Api.delete(`/breweries/${id}`)
          .then(response => {
          var index = this.breweries.findIndex(brewery => brewery._id === id)
          this.breweries.splice(index, 1)
        })
        .catch(error => {
          console.log(error)
        })
        },

        deleteAllBreweries() {
        if(confirm('Are you sure you want to delete all breweries?')){
        Api.delete('breweries')
        .then(response =>{
          this.breweries = []
        })
        .catch(error =>{
          console.log(error)
        })
      }
    }
    }, 
    components: {
        BreweryItem
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.createButton {
  margin-bottom: 1em;
}
.breweryList {
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 2em;
}
</style>
