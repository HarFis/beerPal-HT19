<template>
<div class="createPost">
  <h1>
    <b-form>
      <div>
        <p>Beer: {{beerName}}</p>
        <b-form-select v-model="selectedBeer" :beers="beers" @change="setBrewery(selectedBeer)">
          <option name="Header1" :value="null">Please choose beer</option>
          <option name="beers" :value="beer._id" v-for="beer in beers" :key="beer._id">
            {{beer.name}}
            </option>
        </b-form-select>
      </div>
      <div class="mt-2">Brewery: {{ brewery }}</div>
    
    
      <div>
        <b-form-select v-model="score">
          <option name="Header2" :value="null">Please choose your score</option>
          <option name="1" :value="1">1</option>
          <option name="2" :value="2">2</option>
          <option name="3" :value="3">3</option>
          <option name="4" :value="4">4</option>
          <option name="5" :value="5">5</option>
          </b-form-select>
      </div>
      <p>Score: {{this.score}}</p>
      <div>Please write your review here</div>
      <b-form-group
        id="review"
        label-for="reviewInput">
        <b-form-input
        id="reviewInput"
        v-model="reviewText"
        type="text"
        placeholder="Write here..."
        > 
        </b-form-input>
      </b-form-group>
    
      

    </b-form>
    
  </h1>
</div>
</template>

<script>

import { Api } from '@/Api'

export default {
  name: 'CreatePost',
  data() {
    return {
      selectedBeer: null,
      score: null,
      brewery: null,
      beerName: null,
      reviewText: null,
      beers: []
    }
  },
  mounted() {
    this.getBeers()
  },
  methods: {
    getBeers() {
      Api.get('beers')
        .then(response => {
          this.beers = response.data.beers
        }).catch(error => {
          this.beers = []
          console.log(error)
        })
        .then(() => {
          // This code is always executed (after success or error).
        })
    },
    setBrewery(id){
      console.log(
        Api.get(`/beers/${id}`)
        .then(response => {
          this.brewery = response.data.brewery.name
          this.beerName = response.data.name
        })
        .catch(error => {
          console.log(error)
        })
      )
    }
  },
  components: {
    
  },
  computed: {
    computedBrewery(selected){
    }
  }

}
</script>

<style scoped>
.color{
    color: #42b983;
}

.createPost{
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 2em;
}
</style>
