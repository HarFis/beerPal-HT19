<template>
  <div>
      <b-card-group deck>
    
        <b-card>
        <div class="breweryInfo" >
        <img style="width: 25%" alt="Brewery" src="../../assets/brewery.png">
        <br>
        <h2>{{ brewery.name }}</h2>
        <p>Adress: <span v-if=" !brewery.adress">not available </span>
        <span v-else>{{ brewery.adress}} </span><br>
        Web page: <span v-if=" !brewery.link">not available </span>
        <span v-else> <b-link :href="'http://'+brewery.link" target="_blank"> {{brewery.link }}</b-link> </span></p>
        
        <div>
            <b-button variant="outline-info" v-b-modal.modal-1>edit</b-button>
            <b-modal id="modal-1" ref="modal-1" title="Edit brewery" ok-title="Submit" hide-footer>
                <edit-brewery :brewery="brewery" @set-brewery="setBrewery"/>
            </b-modal>
            &nbsp;
            <b-button variant="danger" @click="deleteBrewery(breweryId)">delete</b-button>
        </div>
        </div>
        </b-card>
    
    
        <b-card>
            <div v-if="!brewery.beers" class="beerList" >
        <h3>All {{ brewery.name }} beers: </h3>
        <b-list-group>
            <beer-item v-for="beer in beers" :key="beer._id" :beer="beer"></beer-item>
        </b-list-group>
        
    </div>
    </b-card>
      </b-card-group>

  </div>
</template>

<script>
import { Api } from "@/Api";
import BeerItem from "@/components/BeerItem";
import EditBrewery from "@/components/EditBrewery";

export default {
  name: "BreweryInfo",
  props: ["breweryId"],

  data() {
    return {
      brewery: "",
      beers: []
    };
  },

  mounted() {
    this.getBrewery();
    this.getBeers();
  },

  methods: {
    getBrewery() {
      Api.get("breweries/" + this.breweryId)
        .then(response => {
          this.brewery = response.data;
        })
        .catch(error => {
          this.brewery = [];
          console.log(error);
        });
    },
    setBrewery(newBrewery) {
      this.brewery.name = newBrewery.name;
      this.brewery.adress = newBrewery.adress;
      this.brewery.link = newBrewery.link;
      this.$refs["modal-1"].hide();
    },
    getBeers() {
      Api.get("breweries/" + this.breweryId + "/beers")
        .then(response => {
          this.beers = response.data.beers;
        })
        .catch(error => {
          this.beers = [];
          console.log(error);
        });
    },deleteBrewery(breweryId) {
        if(confirm('Are you sure you want to delete this brewery?')){
      Api.delete(`/breweries/${breweryId}`)
        .catch(error => {
          console.log(error)
        })
        .then(this.$router.push({path: '/breweries'}))
    }}
  },
  components: {
    BeerItem,
    EditBrewery
  }
};
</script>

<style scoped>
.breweryInfo { 
 border-radius: 20px;
  margin: 10px;

}
</style>
