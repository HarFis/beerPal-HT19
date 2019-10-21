<template>

<div>
  <vue-headful
            title="Add brewery - BeerPal"
        />
  <h2>Add new brewery</h2>
<b-container>
      <b-row class="justify-content-md-center">
        <b-col md="6">
          <b-card>
            <b-form class="review-form text-left" @submit.prevent="onSubmit">
              <p>
                <label for="name">Name:</label>
                <b-form-input
                  id="name"
                  v-model="name"
                  placeholder="e.g. Carlsberg Bryggeri"
                  required
                ></b-form-input>
              </p>
              <p>
                <label for="adress">Adress:</label>
                <b-form-input id="adress" v-model="adress"></b-form-input>
              </p>
              <label for="link">Link:</label>
              <b-form-input id="link" v-model="link" placeholder="e.g. www.carlsberg.se"></b-form-input>
              <b-button class="buttonClass" type="submit" value="Submit">Submit</b-button>&nbsp;
              <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { Api } from "@/Api";

export default {
  name: "CreateBrewery",
  data() {
    return {
      name: null,
      adress: null,
      link: null
    };
  },
  methods: {
    onSubmit() {
      var brewery = {
        name: this.name,
        adress: this.adress,
        link: this.link
      };
      Api.post("/breweries", brewery).catch(error => {
        console.log(error);
      });
      this.name = null;
      this.adress = null;
      this.link = null;

      alert("Created!");
      var that = this;
      setTimeout( function(){that.$router.push({ path: "/breweries" })}, 150)
    }
  }
};
</script>
