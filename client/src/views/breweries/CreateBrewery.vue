<template>
<div>
  <h2>Create a new brewery</h2>
  <b-card>
    <b-form class="review-form" @submit.prevent="onSubmit">
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name" required>
      </p>

      <p>
        <label for="adress">Adress</label>
        <textarea id="adress" v-model="adress"></textarea>
      </p>

      <p>
        <label for="link">Link</label>
        <textarea id="link" v-model="link"></textarea>
      </p>
      <p>
        <input type="submit" value="Submit">
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
        }
    }
  }

</script>
