<template>
  <b-list-group>
    <b-list-group-item>
      <b-container>
        <b-row>
          <b-col>
            <p class="text-left">Location name: {{ location.name }}</p>
          </b-col>
          <b-col>Type of location: {{ location.typeOfLocation }}</b-col>
          <b-col>
            <b-dropdown
              variant="outline-info"
              id="dropdown-form"
              text="Edit"
              ref="dropdown"
              class="m-2"
            >
              <b-dropdown-text style="width: 350px;">Edit fields you want to update:</b-dropdown-text>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-form>
                <b-form-group label="Name" label-for="form-location-name" @submit.stop.prevent>
                  <b-form-input
                    v-model="form.name"
                    id="form-location-name"
                    size="sm"
                    placeholder="new location name"
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="Type" label-for="form-location-type">
                  <v-select
                    id="typeOfLocationNew"
                    v-model="form.typeOfLocation"
                    :options="['Restaurant', 'Bar', 'Pub','Club','private']"
                  ></v-select>
                </b-form-group>
                <b-button variant="info" size="sm" @click="onClick(location._id)">Save changes</b-button>
              </b-dropdown-form>
            </b-dropdown>

            <!-- <b-col> <b-button pill variant="outline-info" size="sm"  @click="$emit('edit-location', location._id)">edit</b-button></b-col> -->
            <b-button
              variant="outline-danger"
              @click="$emit('delete-location', location._id)"
            >delete</b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
export default {
  name: "location-item",
  props: ["location"],
  data() {
    return {
      form: {
        name: null,
        typeOfLocation: null
      }
    };
  },
  methods: {
    onClick(id) {
      console.log(id);
      let newLocation = {
        name: this.form.name,
        typeOfLocation: this.form.typeOfLocation
      };
      this.$emit("edit-location", id, newLocation);
      this.$refs.dropdown.hide(true);
      this.$forceUpdate();
    }
  }
};
</script>

<style scoped>
</style>
