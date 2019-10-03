<template>
  <div>
    <vue-headful title="Create a beer - BeerPal" />
    <h2>Create a new beer</h2>
    <b-container>
      <b-row class="justify-content-md-center">
        <b-col md="6">
          <b-card>
            <b-form class="review-form text-left" @submit.prevent="onSubmit">
              <p>
                <label for="name">Beer's name:</label>
                <b-form-input id="name" v-model="name" placeholder="e.g. Carlsberg Hof" required />
              </p>

              <p>
                <label for="type">Type:</label>
                <b-form-input id="type" v-model="type" placeholder="e.g. Lager, Pils"></b-form-input>
              </p>

              <p>
                <label for="alcohol">Alcohol/Vol (in %):</label>
                <b-form-input id="alcohol" v-model.number="alcohol" placeholder="e.g. 2.3"></b-form-input>
              </p>Brewery:
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
              <b-button class="buttonClass" type="submit" value="Submit">Submit</b-button>
&nbsp;
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
  /*computed: {
      validation() {
        return /^[0-9]?[0-9]?[.]?[0-9]*$/.test(this.alcohol);
      }},*/
  methods: {
    /* validation(a)
    {
      var vali = /^[0-9.,]*$/.test(a);
      console.log(vali);
      return vali;
    }, */
    onSubmit() {
      var that = this;
      var val=true;
      if(!(this.alcohol===null))
      {
      val = /^[0-9.]*$/.test(this.alcohol);}
      if(val){
      var beer = {
        name: this.name,
        type: this.type,
        alcohol: this.alcohol,
        brewery: this.brewery
      };
      Api.post("/beers", beer)
        .then(function() {
          that.name = null;
          that.type = null;
          that.alcohol = null;
          that.brewery = null;
          alert("Created!");
          that.$router.push({ path: "/beers" });
        })
        .catch(error => {
          console.log(error);
        })}
        else {alert("Please use only numbers and \".\" for alcohol/vol!")};
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
