<template>
  <div class="createPost">
    <h1>
      <!-- THIS IS THE LOGIN POP-UP -->
      <div>
        <b-modal id="loginModal"  hide-footer hide-header-close ref="loginModal" title="Login">
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

            <b-form-group id="input-password" label="Password:" label-for="password">
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

      <b-card>
        <b-form @submit.prevent="onSubmit">
          <div>
            <p>User: {{userName}}</p>
          </div>
          <div>
            <p>Beer: {{beerName}}</p>
            <b-form-select v-model="selectedBeer" :beers="beers" @change="setBrewery(selectedBeer)">
              <option name="Header1" :value="null">Please choose beer</option>
              <option
                name="beers"
                :value="beer._id"
                v-for="beer in beers"
                :key="beer._id"
              >{{beer.name}}</option>
            </b-form-select>
            <div>
            <b-button v-b-modal.modalBeer>Add new beer</b-button>
            <b-modal id="modalBeer" ref="modalBeer" title="Add new beer" ok-title="Submit" hide-footer>
                <create-beer-item @new-beer-added="newBeerHandler"></create-beer-item>
            </b-modal>
        </div>
          </div>
          <div class="mt-2">Brewery: {{ brewery }}</div>
          <p>Score: {{this.score}}</p>
          <div>
            <b-form-select v-model="score">
              <option name="Header2" :value="null">Please choose your score</option>
              <option name="1" :value="1">1</option>
              <option name="2" :value="2">2</option>
              <option name="3" :value="3">3</option>
              <option name="4" :value="4">4</option>
              <option name="5" :value="5">5</option>
            </b-form-select>
          </div>

          <div>Please write your review here</div>
          <b-form-group id="review" label-for="reviewInput">
            <b-form-input
              id="reviewInput"
              v-model="reviewText"
              type="text"
              placeholder="Write here..."
            ></b-form-input>
          </b-form-group>
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

          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </b-card>
    </h1>
  </div>
</template>


<script>

import { Api } from '@/Api'
import CreateBeerItem from '@/components/CreateBeerItem'

export default {
  name: "CreatePost",
  data() {
    return {
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
      dateAndTime: null, 
      form: {
        username: "",
        password: ""
      }
    };
  },
  mounted() {
    this.showModal(),
    this.getBeers(), this.getLocations(), this.getUsers(),
    this.setDateAndTime()
  },
  methods: {
    setDateAndTime(){
      var date = new Date().now();
      this.dateAndTime = date;
    },
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
            if(response.data.brewery){
              this.brewery = response.data.brewery.name;
            }else{
              this.brewery = "No brewery found"
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
          })
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
        created: this.dateAndTime

      };
      Api.post("/reviews", review)
        .then(response => {
          this.createdReview = response.data._id;
          var post = {
            review: this.createdReview,
            location: this.selectedLocation,
            postOwner: this.selectedUser,
            dateAndTime: this.dateAndTime
          };
          console.log(post.review);
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
              this.$router.push({path: '/'})
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
       bvModalEvt.preventDefault()
      Api.get("users/name/" + this.form.username).then(response => {
        var foundUser = response.data;
        if (foundUser.password == this.form.password) {
          this.selectedUser = foundUser;
          this.setUser(foundUser._id);
          this.hideModal();
        }
      });
    },
    onCancelModal() {},
    newBeerHandler(newBeer) {
        console.log(newBeer._id)
        this.beers = []
        
        //this.$forceUpdate();
        this.$refs['modalBeer'].hide()
        this.getBeers()
        this.selectedBeer = newBeer._id
        
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
.color {
  color: #42b983;
}

.createPost {
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 2em;
}
</style>
