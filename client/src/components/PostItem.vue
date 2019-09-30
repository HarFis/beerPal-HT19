<template>
<b-list-group>
  <b-list-group-item>
   <!-- <img alt="Review" src="../assets/camel.jpg"> -->
    <b-container>
        <b-row>
    <b-col> <p class="text-left">Beer: {{ post.review.beer.name }} </p></b-col>
    <b-col> Score: <span class="badge badge-primary badge-pill">{{ post.review.score }}</span> points </b-col>
    <b-col> consumed on: <p>{{ changeFormat(this.post.review.created)}}</p>  </b-col>
    <b-col> at: <p>{{ changeFormat2(this.post.review.created)}}</p>  </b-col>
    </b-row> 
    <b-row v-show="post.review.textReview">
      <b-col>
      <p class="text-left">BeerPals opinion: <span class="opinion">{{ post.review.textReview }}</span></p>
      </b-col>
    </b-row>
    </b-container>
  </b-list-group-item>
  </b-list-group>
</template>

<script>
import moment from 'moment'

export default {
  name: 'post-item',
  props: ['post'],


  methods: {
      changeFormat(value){
      if (value) {
           return moment(String(value)).format('YYYY-MM-DD')
      }
      },
  changeFormat2(value){
      if (value) {
           return moment(String(value)).format('h:mm:ss a')
      }
    }
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
