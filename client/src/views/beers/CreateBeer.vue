<template>
  <div>
    <h2>Create a new beer</h2>
    <b-card>
    <b-form class="review-form" @submit.prevent="onSubmit">
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name" required />
      </p>

      <p>
        <label for="type">Type</label>
        <textarea id="type" v-model="type"></textarea>
      </p>

      <p>
        <label for="alcohol">Alcohol</label>
        <textarea id="alcohol" v-model.number="alcohol"></textarea>
      </p>
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
      <p>
        <input type="submit" value="Submit" />
      </p>
    </b-form>
    </b-card>
  </div>
</template>

<script>
import { Api } from "@/Api";

export default {
  name: "CreateBeer",
  data() {
    return {
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
      var beer = {
        name: this.name,
        type: this.type,
        alcohol: this.alcohol,
        brewery: this.brewery
      };
      Api.post("/beers", beer).catch(error => {
        console.log(error);
      });
      this.name = null;
      this.type = null;
      this.alcohol = null;
      this.brewery = null;
      alert("Created!");
      this.$router.push({path: '/beers'})
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
