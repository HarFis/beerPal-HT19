<template>
  <div class="beers">
      <h1>List of {{ beers.length}} beers</h1>
      <b-list-group>
        <beer-item v-for="beer in beers" :key="beer._id" :beer="beer" @delete-beer="deleteBeer"></beer-item>
      </b-list-group>
  </div>
</template>

<script>
import { Api } from '@/Api'
import BeerItem from '@/components/BeerItem'

export default {
  name: 'Beers',
  data() {
    return {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
.createButton {
  margin-bottom: 1em;
}
.beers {
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 2em;
}
</style>
