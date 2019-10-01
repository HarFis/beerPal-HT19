<template>
<div>
    <div class="breweryInfo">
        <b-card>
        <img style="width: 25%" alt="Brewery" src="../../assets/brewery.png">
        <br>
        <h2>{{ brewery.name }}</h2>
        <p v-if=" !brewery.adress">Adress: Not found </p>
        <p v-else>Adress: {{ brewery.adress}} </p>
        <p v-if=" !brewery.link">Web page: Not found </p>
        <p v-else>Web page: {{ brewery.link }} </p>
        
        <div>
            <b-button v-b-modal.modal-1>Edit</b-button>
            <b-modal id="modal-1" ref="modal-1" title="Edit brewery" ok-title="Submit" hide-footer>
                <edit-brewery :brewery="brewery" @set-brewery="setBrewery"/>
            </b-modal>
        </div>
        
        </b-card>
    </div>
    <div class="beerList">
        <b-card>
        <h1>All {{ brewery.name }} beers: </h1>
        <b-list-group>
            <beer-item v-for="beer in beers" :key="beer._id" :beer="beer" @delete-beer="deleteBeer"></beer-item>
        </b-list-group>
        </b-card>
    </div>
</div>
</template>

<script>
import { Api } from '@/Api'
import BeerItem from '@/components/BeerItem'
import EditBrewery from '@/components/EditBrewery'

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
        setBrewery(newBrewery){
            this.brewery.name = newBrewery.name
            this.brewery.adress = newBrewery.adress
            this.brewery.link = newBrewery.link
            this.$refs['modal-1'].hide()
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
        BeerItem,
        EditBrewery
    }
}
</script>

<style scoped>

.breweryInfo {
  float: left;
  width: 44%;
  background: #bdb6ac;
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
