<template>

    <form class="review-form" @submit.prevent="onSubmit">
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="type">Type</label>      
        <textarea id="type" v-model="type"></textarea>
      </p>

      <p>
        <label for="alcohol">Alcohol</label>      
        <textarea id="alcohol" v-model.number="alcohol"></textarea>
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    
    
      <b-form-select v-model="selected" class="mb-3">

      </b-form-select>

    </form>

</template>

<script>
import { Api } from '@/Api'

export default {
    name: 'CreateBeer',
    data() {
        return {
            name: null,
            type: null,
            alcohol: null,
            breweries: []
        }
    },
    methods: {
        onSubmit() {
        var beer = {
            name: this.name,
            type: this.type,
            alcohol: this.alcohol
        }
        Api.post('/beers', beer)
        .catch(error => {
          console.log(error)
        })
        this.name = null
        this.type = null
        this.alcohol = null
        },
        getBreweries(){
          Api.get('breweries')
            .then( response => {
                this.breweries = response.data.breweries
            }).catch(error =>{
                this.breweries = []
                console.log(error)
            })
        }
    }
}
</script>
