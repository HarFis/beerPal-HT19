<template>
<b-list-group>
  <b-list-group-item>
   <!-- <img alt="Review" src="../assets/camel.jpg"> -->
    <b-container>
    <b-row>
    <b-col> <p class="text-left">Beer: {{ post.review.beer.name }} </p></b-col>
    <b-col> Score: <span class="badge badge-primary badge-pill">{{ review.score }}</span> points </b-col>
    <b-col> consumed on: {{ review.created }} <b-button type="button" class="close" @click="$emit('delete-review', review._id)">&times;</b-button></b-col>
    </b-row>
    <b-row v-show="review.textReview">
      <b-col>
      <p class="text-left">BeerPals opinion: <span class="opinion">{{ review.textReview }}</span></p>
      </b-col>
    </b-row>
    </b-container>
  </b-list-group-item>
  </b-list-group>
</template>

<script>

export default {
  name: 'post-item',
  props: ['review'],

    data(){
    return{
        beerName: null,
        reviewID: null,
        beerID: null
    }
}, 
    mounted(){
        getReview()
    },
    methods:{
        getReview(){
            Api.get('users/'+this.userID)
            .then( response => {
                this.user = response.data
            }).catch(error =>{
                this.user = null
                console.log(error)
            })
        },
    }
}

</script>

<style scoped>

img {
  width: 33px;
  margin-right: 10px;
}

.opinion
{
  font-family: Chalkduster, fantasy ;
}

</style>
