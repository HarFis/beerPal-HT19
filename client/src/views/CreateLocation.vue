<template>
  <form class="location-form" @submit.prevent="onSubmit">
    <p>
      <label for="name">Location's name: </label>
      <input id="name" v-model="name" placeholder="e.g. Hofbräuhaus" required/>
    </p>

    <p>
      <label for="typeOfLocation">Type of Location:</label>
      <select id="typeOfLocation" v-model="typeOfLocation">
        <option>Restaurant</option>
        <option>Bar</option>
        <option>Pub</option>
        <option>Club</option>
        <option>private</option>
      </select>
    </p>
    <p>
      <input type="submit" value="Submit" />
    </p>
  </form>
</template>

<script>
import { Api } from "@/Api"

export default {
  name: "CreateLocation",
  data() {
    return {
      name: null,
      typeOfLocation: null
    }
  },
  methods: {
    onSubmit() {
      if (this.name && this.typeOfLocation) {
        let Location = {
          name: this.name,
          typeOfLocation: this.typeOfLocation
        }
        Api.post("/locations", Location).catch(error => {
          console.log(error)
        })
        alert("form submitted")
        this.name = null
        this.typeOfLocation = null
      } else {
        if (!this.name) this.errors.push("Name required.")
        if (!this.typeOfLocation) this.errors.push("Type of Location is required.")
      }
    }
  }
}
</script>
