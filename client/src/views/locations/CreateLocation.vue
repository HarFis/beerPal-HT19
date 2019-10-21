<template>
  <div>
    <vue-headful title="Add location - BeerPal" />
    <h2>Add new location</h2>
    <b-container>
      <b-row class="justify-content-md-center">
        <b-col md="6">
          <b-card>
            <b-form class="location-form text-left" @submit.prevent="onSubmit">
              <p>
                <label for="name">Location's name:</label>
                <b-form-input id="name" v-model="name" placeholder="e.g. Hofbräuhaus" required />
              </p>

              <label for="typeOfLocation">Type of Location:</label>
              <b-form-select id="typeOfLocation" v-model="typeOfLocation" required>
                <option :value="null">Choose...</option>
                <option>Restaurant</option>
                <option>Bar</option>
                <option>Pub</option>
                <option>Club</option>
                <option>private</option>
              </b-form-select>

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
  name: "CreateLocation",
  data() {
    return {
      name: null,
      typeOfLocation: null
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.typeOfLocation) {
        let Location = {
          name: this.name,
          typeOfLocation: this.typeOfLocation
        };
        Api.post("/locations", Location).catch(error => {
          console.log(error);
        });
        alert("New Location successfully created!");
        this.name = null;
        this.typeOfLocation = null;
        //this.$router.push({ path: "/locations" });
        var that = this;
        setTimeout(function() {
          that.$router.push({ path: "/locations" });
        }, 150);
      } else {
        if (!this.name) this.errors.push("Name required.");
        if (!this.typeOfLocation)
          this.errors.push("Type of Location is required.");
      }
    }
  }
};
</script>
