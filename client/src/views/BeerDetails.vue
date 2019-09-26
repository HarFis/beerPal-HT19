<template>
  <div class="beer">
    <h1>This is {{ beer.name }}</h1>

    <b-container>
      <b-list-group>
       <review-item v-for="review in reviews" :key="review._id" :review="review"></review-item>
      </b-list-group>
    </b-container>
  </div>
</template>

<script>
import { Api } from '@/Api'
import ReviewItem from '@/components/ReviewItem'

export default {
    name: 'BeerDetails',
    props: ['beerID'],

    data() {
      return {
        beer: "",
        reviews: []
      }
    }, 
    mounted() {
        this.getReviews()
        this.getBeer() 
    },
    methods: {
        getBeer(){
            Api.get('beers/'+this.beerID)
            .then( response => {
                this.beer = response.data
            }).catch(error =>{
                this.beer = null
                console.log(error)
            })
        },
        getReviews(){
            Api.get('beers/' + this.beerID + '/reviews/')
            .then( response => {
                this.reviews = response.data.reviews
            }).catch(error =>{
                this.reviews = []
                console.log(error)
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
