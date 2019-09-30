<template>
<div>
  <h2>Create a new brewery</h2>
  <b-card>
    <b-form class="review-form" @submit.prevent="onSubmit">
      <p>
        <label for="name">Name:</label>
        <b-form-input id="name" v-model="name" placeholder="e.g Carlsberg Hof" required></b-form-input>
      </p>

      <p>
        <label for="adress">Adress:</label>
        <b-form-input id="adress" v-model="adress"></b-form-input>
      </p>

      <p>
        <label for="link">Link:</label>
        <b-form-input id="link" v-model="link"></b-form-input>
      </p>
      <p>
        <b-button type="submit" value="Submit">Submit</b-button>
      </p>

    </b-form>
    
  </b-card>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
    name: 'CreateBrewery',
    data() {
        return {
            name: null,
            adress: null,
            link: null,
        }
    },
    methods: {
        onSubmit() {
        var brewery = {
            name: this.name,
            adress: this.adress,
            link: this.link
        }
        Api.post('/breweries', brewery)
        .catch(error => {
          console.log(error)
        })
        this.name = null
        this.adress = null
        this.link = null
        
        alert("Created!");
        this.$router.push({path: '/breweries'})
        }
    }
  }

</script>
