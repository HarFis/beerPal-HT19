<template>
  <div class="beer">
      <h1>List of {{ beers.length}} beers</h1>
      <b-list-group>
       <!-- <review-item v-for="review in reviews" :key="review._id" :review="review"> </beer-item> -->
      </b-list-group>
  </div>
</template>

<script>
import { Api } from '@/Api'
import ReviewItem from '@/components/ReviewItem'

export default {
    name: 'Beer',
    data() {
        return beer
    }, 
    mounted() {
        this.getBeers() //<-- ID here!!
    },
    methods: {
        getBeers(id){
            Api.get('beers/:'+id)
            .then( response => {
                this.beer = response.data.beer
            }).catch(error =>{
                this.beer = []
                console.log(error)
            })
            .then(() => {
          // This code is always executed (after success or error).
            })
        }
        /*,
        deleteBeer(id) {
          Api.delete(`/beers/${id}`)
          .then(response => {
          var index = this.beers.findIndex(beer => beer._id === id)
          this.beers.splice(index, 1)
        })
        .catch(error => {
          console.log(error)
        })
        }*/
    }, 
    components: {
        ReviewItem
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
.beer{
  color: red;
}

</style>
