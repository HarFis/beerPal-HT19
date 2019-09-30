<template>
<div>
    <h1>Edit {{ brewery.name }}</h1>
    <form class="review-form" @submit.prevent="onSubmit">
      <p>
        <label for="newName">Name:</label>
        <input id="newName" v-model="newName" v-bind:placeholder="brewery.name" required>
      </p>

      <p>
        <label for="newAdress">Adress</label>
        <textarea id="newAdress" v-model="newAdress" v-bind:placeholder="brewery.adress"></textarea>
      </p>

      <p>
        <label for="newLink">Link</label>
        <textarea id="newLink" v-model="newLink" v-bind:placeholder="brewery.link"></textarea>
      </p>
      <p>
        <input type="submit" value="Submit">
      </p>

    </form>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
    name: 'CreateBrewery',
    props: ['breweryId'],
    data() {
        return {
            brewery: "",
            newName: null,
            newAdress: null,
            newLink: null,
        }
    },
    mounted() {
        this.getBrewery()
    },
    methods: {
        getBrewery() {
            Api.get('breweries/' + this.breweryId)
                 .then(response => {
                     this.brewery = response.data
                }).catch(error =>{
                    this.brewery = []
                    console.log(error)
                })
        },
        onSubmit() {
            var newBrewery = {
                name: this.newName,
                adress: this.newAdress,
                link: this.newLink
            }
            Api.put('/breweries/' + this.breweryId, newBrewery)
            .catch(error => {
                console.log(error)
            })
            this.newName = null
            this.newAdress = null
            this.newLink = null
            alert("Updated!");
          this.$router.push({path: '/breweries'})
        }
    }
  }

</script>
