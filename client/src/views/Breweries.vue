<template>
    <div class="breweryList">
      <h1>List of {{ breweries.length}} breweries</h1>
      <b-list-group>
        <brewery-item v-for="brewery in breweries" :key="brewery._id" :brewery="brewery" @delete-brewery="deleteBrewery"></brewery-item>
      </b-list-group>
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
        }
    }, 
    components: {
        BreweryItem
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
.createButton {
  margin-bottom: 1em;
}
.breweryList {
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 2em;
}
</style>
