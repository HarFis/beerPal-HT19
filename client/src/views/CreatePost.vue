<template>
  <div>
    <vue-headful title="Create a post - BeerPal" />
    <h2>Create new post</h2>

    <div class="createPost">
      <!-- THIS IS THE LOGIN POP-UP -->
      <div>
        <b-modal id="loginModal" hide-footer hide-header-close ref="loginModal" title="Login">
          <p>You need to be logged in to post</p>
          <b-form @submit.stop.prevent="onSubmitModal" @cancel="onCancelModal">
            <b-form-group id="input-username" label="Username:" label-for="username">
              <b-form-input
                id="username-input"
                v-model="form.username"
                required
                placeholder="Username..."
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-password" label="Password:" label-for="password" force-show="false" invalid-feedback="Wrong password."
                :state="valid">
              <b-form-input
                type="password"
                id="password-input"
                v-model="form.password"
                required
                placeholder="Password..."
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" value="Submit" variant="secondary">Submit</b-button>
          </b-form>
        </b-modal>
      </div>

      <!-- THIS IS THE FORM TO CREATE A POST -->
      <b-container>
        <b-row class="justify-content-md-center text-left">
          <b-col md="6">
            <b-card>
              <b-form @submit.prevent="onSubmit">
                <b-list-group flush>
                  <b-list-group-item>
                  <p>You are logged in as user: <span id="warning"> {{userName}}</span></p>
                </b-list-group-item>
                <b-list-group-item>
                  <p>Beer: {{beerName}}</p>
                  <b-form-select
                    v-model="selectedBeer"
                    :beers="beers"
                    @change="setBrewery(selectedBeer)"
                  >
                    <option name="Header1" :value="null">Please choose beer or add new below</option>
                    <option
                      name="beers"
                      :value="beer._id"
                      v-for="beer in beers"
                      :key="beer._id"
                    >{{beer.name}}</option>
                  </b-form-select>
                    <b-button v-b-modal.modalBeer class="buttonClass">Add new beer</b-button>
                    
                    <!-- MODAL create beer START -->
                    <b-modal
                      id="modalBeer"
                      ref="modalBeer"
                      title="Add new beer"
                      ok-title="Submit"
                      hide-footer
                    >
                      <create-beer-item @new-beer-added="newBeerHandler"></create-beer-item>
                    </b-modal>
                   <!-- MODAL create beer END -->

                <p>Brewery: {{ brewery }}</p>
                </b-list-group-item>
                <b-list-group-item>
                <p>Score: {{this.score}}</p>
                  <b-form-select v-model="score">
                    <option name="Header2" :value="null">Please choose your score</option>
                    <option name="1" :value="1">1</option>
                    <option name="2" :value="2">2</option>
                    <option name="3" :value="3">3</option>
                    <option name="4" :value="4">4</option>
                    <option name="5" :value="5">5</option>
                  </b-form-select><br><br>
                <p>Please write your review (optional):</p>
                <b-form-group id="review" label-for="reviewInput" description="maximum: 60 characters">
                  <b-form-input
                    id="reviewInput"
                    v-model="reviewText"
                    type="text"
                    placeholder="Write here..."
                  ></b-form-input>
                </b-form-group>
                </b-list-group-item>
                <b-list-group-item>
                <p>Location: {{location}}</p>
                <b-form-group>
                  <b-form-select
                    v-model="selectedLocation"
                    :locations="locations"
                    @change="setLocation(selectedLocation)"
                  >
                    <option name="Header3" :value="null">Please choose location</option>
                    <option
                      name="locations"
                      :value="location._id"
                      v-for="location in locations"
                      :key="location._id"
                    >{{location.name}}</option>
                  </b-form-select>
                </b-form-group>
<br>
                <b-button type="submit" variant="primary">Submit</b-button>
&nbsp;
                <b-button type="reset" variant="danger">Reset</b-button>
             </b-list-group-item>
                </b-list-group>
              </b-form>
               
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>


<script>
import { Api } from "@/Api";
import CreateBeerItem from "@/components/CreateBeerItem";

export default {
  name: "CreatePost",
  data() {
    return {
      valid: true,
      selectedBeer: null,
      selectedLocation: null,
      selectedUser: null,
      score: null,
      brewery: null,
      location: null,
      userName: null,
      beerName: null,
      reviewText: null,
      createdReview: null,
      beers: [],
      locations: [],
      users: [],
      date: new Date().toLocaleString(),
      form: {
        username: "",
        password: ""
      }
    };
  },
  mounted() {
    this.showModal(),
    this.getBeers(), this.getLocations(), this.getUsers()
  },
  methods: {
    showModal() {
      this.$refs["loginModal"].show();
    },
    hideModal() {
      this.$refs["loginModal"].hide();
    },
    getBeers() {
      Api.get("beers")
        .then(response => {
          this.beers = response.data.beers;
        })
        .catch(error => {
          this.beers = [];
          console.log(error);
        })
        .then(() => {
          // This code is always executed (after success or error).
        });
    },
    setBrewery(id) {
      console.log(
        Api.get(`/beers/${id}`)
          .then(response => {
            if (response.data.brewery) {
              this.brewery = response.data.brewery.name;
            } else {
              this.brewery = "n/a";
            }
            this.beerName = response.data.name;
          })
          .catch(error => {
            console.log(error);
          })
      );
    },
    getLocations() {
      Api.get("locations")
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
    setLocation(id) {
      console.log(
        Api.get(`/locations/${id}`)
          .then(response => {
            this.location = response.data.name;
          })
          .catch(error => {
            console.log(error);
          })
      );
    },
    setUser(id) {
      Api.get(`/users/${id}`)
        .then(response => {
          this.userName = response.data.username;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getUsers() {
      Api.get("users")
        .then(response => {
          this.users = response.data.users;
        })
        .catch(error => {
          this.users = [];
          console.log(error);
        })
        .then(() => {
          // This code is always executed (after success or error).
        });
    },
    onSubmit() {
      var review = {
        beerID: this.selectedBeer,
        score: this.score,
        textReview: this.reviewText,
      };
      var that = this;
     if (!review.beerID) {return(alert('Please Select a Beer'))}
     if(!review.score) {return(alert('Please Select a score'))}
      Api.post("/reviews", review)
        .then(response => {
          this.createdReview = response.data._id;
          var post = {
            review: this.createdReview,
            location: this.selectedLocation,
            postOwner: this.selectedUser
          };
          
          Api.post("posts", post)
            .then(
              alert("Post Created"),
              (this.selectedBeer = null),
              (this.selectedLocation = null),
              (this.selectedUser = null),
              (this.score = null),
              (this.brewery = null),
              (this.location = null),
              (this.userName = null),
              (this.beerName = null),
              (this.reviewText = null),
              //this.$router.push({ path: "/" }),
              setTimeout( function(){that.$router.push({ path: "/" })}, 100)
            )
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    },
    onSubmitModal(bvModalEvt) {
      this.valid = true;
      bvModalEvt.preventDefault();
      Api.get("users/name/" + this.form.username).then(response => {
        var foundUser = response.data;
        if (foundUser.password == this.form.password) {
          this.selectedUser = foundUser;
          this.setUser(foundUser._id);
          this.hideModal();
        }else{this.valid=false;}
      });
    },
    onCancelModal() {},
    newBeerHandler(newBeer) {
      console.log(newBeer._id);
      this.beers = [];

      //this.$forceUpdate();
      this.$refs["modalBeer"].hide();
      this.getBeers();
      this.selectedBeer = newBeer._id;
    }
  },
  components: {
    CreateBeerItem
  },
  computed: {
    computedBrewery(selected) {}
  }
};
</script>

<style scoped>

.createPost {
  font-weight: bold;
  font-size: medium;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 2em;
}
</style>
