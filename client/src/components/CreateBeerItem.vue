<template>
  <div>
    <h2>Create a new beer</h2>
    <b-card>
      <b-form class="review-form" @submit.prevent="onSubmit">
        <p>
          <label for="name">Name:</label>
          <b-form-input id="name" v-model="name" placeholder="eg. Carlsberg Hof" required />
        </p>

        <p>
          <label for="type">Type:</label>
          <b-form-input id="type" v-model="type"></b-form-input>
        </p>

        <p>
          <label for="alcohol">Alcohol:</label>
          <b-form-input
            id="alcohol"
            v-model.number="alcohol"
            :state="valid"
          ></b-form-input>
        </p>
        <p>
          <label for="selectedBrewery">Brewery:</label>
          <b-form-select
            v-model="selectedBrewery"
            :breweries="breweries"
            @change="setBrewery(selectedBrewery)"
          >
            <option name="Header1" :value="null">Please choose a brewery</option>
            <option
              name="breweries"
              :value="brewery._id"
              v-for="brewery in breweries"
              :key="brewery._id"
            >{{ brewery.name }}</option>
          </b-form-select>
        </p>
        <b-button class="buttonClass" type="submit" value="Submit">Submit</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { Api } from "@/Api";

export default {
  name: "create-beer-item",
  data() {
    return {
      valid: true,
      newBeer: null,
      selectedBrewery: null,
      name: null,
      type: null,
      alcohol: null,
      brewery: null,
      breweries: []
    };
  },
  mounted() {
    this.getBreweries();
  },
  methods: {
    onSubmit() {
      var that = this;
      this.valid = true;
      if (!(this.alcohol === null)) {
        this.valid = /^[0-9.,]*$/.test(this.alcohol);
      }
      if (this.valid) {
        var beer = {
        name: this.name,
        type: this.type,
        alcohol: this.alcohol,
        brewery: this.brewery
      };
      Api.post("/beers", beer).then(response =>{
          this.newBeer = response.data
          console.log(response.data)
          console.log(this.newBeer)
          this.$emit('new-beer-added', this.newBeer)
      }).catch(error => {
        console.log(error);
      });
      this.name = null;
      this.type = null;
      this.alcohol = null;
      this.brewery = null;
      alert("Created!");
      }
    },
    getBreweries() {
      Api.get("breweries")
        .then(response => {
          this.breweries = response.data.breweries;
        })
        .catch(error => {
          this.breweries = [];
          console.log(error);
        });
    },
    setBrewery(id) {
      this.brewery = id;
    }
  }
};
</script>
