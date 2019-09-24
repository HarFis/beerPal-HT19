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
            alcohol: null
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
        }
    }
}
</script>
