<template>
<div>
    <div class="breweryInfo">
        <img style="width: 25%" alt="Brewery" src="../assets/brewery.png">
        <br>
        <h2>{{ brewery.name }}</h2>
        <p v-if=" !brewery.adress">Adress: Not found </p>
        <p v-else>Adress: {{ brewery.adress}} </p>
        <p v-if=" !brewery.link">Web page: Not found </p>
        <p v-else>Web page: {{ brewery.link }} </p>
    </div>
    <div class="beerList">
        <h1>All {{ brewery.name }} beers: </h1>
        <b-list-group>
            <beer-item v-for="beer in beers" :key="beer._id" :beer="beer" @delete-beer="deleteBeer"></beer-item>
        </b-list-group>
    </div>
</div>
</template>

<script>
import { Api } from '@/Api'
import BeerItem from '@/components/BeerItem'

export default {
    name: 'BreweryInfo',
    props: ['breweryId'],

    data() {
        return {
            brewery: "",
            beers: []
        }
    },

    mounted() {
        this.getBrewery()
        this.getBeers()
    },

    methods: {
        getBrewery() {
            Api.get('breweries/' + this.breweryId)
                 .then(response => {
                     this.brewery = response.data
                }).catch(error =>{
                    this.brewery = []
                    console.log(error)
                })
        },
        getBeers() {
            Api.get('breweries/' + this.breweryId + '/beers')
                .then(response => {
                    this.beers = response.data.beers
                }).catch(error =>{
                    this.beers = []
                    console.log(error)
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
        }
    },
    components: {
        BeerItem
    }
}
</script>

<style scoped>

.breweryInfo {
  float: left;
  width: 44%;
  background: #885a10;
  border-radius: 25px;
  margin: 2%
}
.beerList {
  float: right;
  width: 43%;
  background: #885a10;
  margin: 2%;
  border-radius: 25px;
  padding: 1%;
} 

</style>
