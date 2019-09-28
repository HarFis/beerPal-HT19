<template>
  <div class="locations">
    <h1>List of {{ locations.length }} Locations</h1>
    <b-list-group>
      <location-item
        v-for="location in locations"
        :key="location._id"
        :location="location"
        @delete-location="deleteLocation"
        @edit-location="editLocation"
      ></location-item>
    </b-list-group>
  </div>
</template>

<script>
import { Api } from "@/Api";
import LocationItem from "@/components/LocationItem";
import Vue from "vue";

export default {
  name: "Locations",
  data() {
    return {
      locations: []
    };
  },
  mounted() {
    this.getLocations();
  },
  methods: {
    getLocations() {
      Api.get("/locations")
        .then(response => {
          this.locations = response.data.locations;
        })
        .catch(error => {
          this.locations = [];
          console.log(error);
        })
        .then(() => {
          // This code is always executed (after success or error).
        });
    },
    deleteLocation(id) {
      Api.delete(`/locations/${id}`)
        .then(response => {
          console.log(response.data.message);
          var index = this.locations.findIndex(location => location._id === id);
          this.locations.splice(index, 1);
        })
        .catch(error => {
          console.log(error);
        });
    },

    editLocation(id, newLocation) {
      Api.patch(`/locations/${id}`, newLocation)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  components: {
    LocationItem
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
.createButton {
  margin-bottom: 1em;
}
.locations {
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 2em;
}
</style>
