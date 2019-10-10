<template>
  <div>
    <vue-headful title="Locations - BeerPal" />
    <div class="locations">
      <h1>Locations</h1>

      <span v-if="!serverOK">
        <h3>
          <img style="max-width: 40px;" :src="require(`@/assets/warning.png`)" alt="warning" /> No connection to server. Please retry or contact administrator!
        </h3>
      </span>

      <span v-else>
        <h3>Current number of locations: {{ locations.length }}</h3>

        <b-button class="buttonClass" router-link to="/add-location">Add new location</b-button>
      </span>
      <b-list-group>
        <location-item
          v-for="location in locations"
          :key="location._id"
          :location="location"
          @delete-location="deleteLocation"
          @edit-location="editLocation"
        ></location-item>
      </b-list-group>
      <br />
      <b-button
        variant="danger"
        @click="deleteAllLocations"
        v-show="!(locations.length===0)"
      >Delete all locations</b-button>
    </div>
  </div>
</template>

<script>
import { Api } from "@/Api";
import LocationItem from "@/components/LocationItem";

export default {
  name: "Locations",
  data() {
    return {
      serverOK: true,
      show: false,
      locations: []
    };
  },
  created() {
    this.getLocations();
  },
  methods: {
    getLocations() {
      this.serverOK = true;
      Api.get("/locations")
        .then(response => {
          this.locations = response.data.locations;
        })
        .catch(error => {
          this.serverOK = false;
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
          this.getLocations();
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteAllLocations() {
      if (confirm("Are you sure you want to delete all locations?")) {
        Api.delete("locations")
          .then(response => {
            this.locations = [];
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },

  components: {
    LocationItem
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.createButton {
  margin-bottom: 1em;
}
.locations {
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 2em;
}
</style>
