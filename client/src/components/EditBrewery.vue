<template>
  <div>
    <h1>{{ brewery.name }}</h1>
    <b-form class="review-form" @submit.prevent="onSubmit">
      <p>
        <label for="newName">Name:</label>
        <b-form-input id="newName" v-model="newName" v-bind:placeholder="brewery.name" required></b-form-input>
      </p>

      <p>
        <label for="newAdress">Adress</label>
        <b-form-input id="newAdress" v-model="newAdress" v-bind:placeholder="brewery.adress"></b-form-input>
      </p>

      <p>
        <label for="newLink">Link</label>
        <b-form-input id="newLink" v-model="newLink" v-bind:placeholder="brewery.link"></b-form-input>
      </p>
      <p>
        <b-button type="submit" value="Submit">Submit</b-button>
      </p>
    </b-form>
  </div>
</template>

<script>
import { Api } from "@/Api";

export default {
  name: "edit-brewery",
  props: ["brewery"],
  data() {
    return {
      newName: null,
      newAdress: null,
      newLink: null
    };
  },
  methods: {
    onSubmit() {
      var newBrewery = {
        name: this.newName,
        adress: this.newAdress,
        link: this.newLink
      };
      Api.put("/breweries/" + this.brewery._id, newBrewery).catch(error => {
        console.log(error);
      });
      this.newName = null;
      this.newAdress = null;
      this.newLink = null;
      alert("Updated!");
      this.$emit("set-brewery", newBrewery);
    }
  }
};
</script>
