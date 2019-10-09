<template>
  <div>
    <b-list-group>
      <b-list-group-item>
        <b-container>
          <b-row>
            <b-col md="5">
              <p class="text-left">
                <img id="map" alt="Location" src="../assets/map.png" />
                {{ location.name }}
              </p>
            </b-col>
            <b-col md="3" class="text-left">Type of location: {{ location.typeOfLocation }}</b-col>
            <b-col md="4">
              <!--
              <b-dropdown
                variant="outline-info"
                id="dropdown-left"
                right
                text="edit"
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
              </b-dropdown> -->

              <b-button ref="modal" variant="outline-info" size="sm" @click="showModal">edit</b-button>
              &nbsp;
              <b-button
                variant="outline-danger"
                size="sm"
                @click="$emit('delete-location', location._id)"
              >delete</b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-list-group-item>
    </b-list-group>

<!-- MODAL element S-T-A-R-T -->
    <b-modal
      ref="modal"
      title="Edit location's details:"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-form>
        <b-form-group label="Name" label-for="form-location-name" @submit.stop.prevent>
          <b-form-input
            v-model="form.name"
            id="form-location-name"
            size="sm"
            :placeholder="'e.g. '+location.name"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Type" label-for="form-location-typeOfLocation">
          <b-form-select id="typeOfLocation" v-model="form.typeOfLocation">
            <option :value="null">Choose...</option>
            <option>Restaurant</option>
            <option>Bar</option>
            <option>Pub</option>
            <option>Club</option>
            <option>private</option>
          </b-form-select>
        </b-form-group>
      </b-form>
    </b-modal>
  <!-- MODAL Element -E-N-D- -->

  </div>
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
    handleSubmit(id) {
      console.log(id);
      let newLocation = {
        name: this.form.name,
        typeOfLocation: this.form.typeOfLocation
      };
      this.$emit("edit-location", id, newLocation);
      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    },
    resetModal() {
      this.form.name = "";
      this.form.typeOfLocation = null;
    },
    showModal() {
      this.$refs["modal"].show();
    },
    hideModal() {
      this.$refs["modal"].hide();
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit(this.location._id);
    }
  }
};
</script>

<style scoped>
#map {
  width: 33px;
  margin-right: 10px;
}
</style>
