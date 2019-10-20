<template>
  <div class="users">
    <h2>Register a new user</h2>
    <b-container>
      <b-row class="justify-content-md-center">
        <b-col md="6">
          <b-card>
            <b-form class="review-form text-left" @submit.prevent="onSubmit">
              <p>
                <label for="username">Username: </label>
                <b-form-input id="username" v-model="username" placeholder="Username" required />
              </p>

              <p>
                <label for="mail">Mail:</label>
                <b-form-input id="mail" v-model="mail" placeholder="E-mail Adress" required />
              </p>

              <p>
                <label for="password">Password:</label>
                <b-form-input
                  type="password"
                  id="password"
                  v-model="password"
                  placeholder="Password"
                  required
                />
              </p>
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
  name: "RegisterUser",
  data() {
    return {
      username: null,
      mail: null,
      password: null
    };
  },

  methods: {
    onSubmit() {
      var user = {
        username: this.username,
        mail: this.mail,
        password: this.password
      };
      Api.post("/users", user).then( response => {
        alert('User Created');
        //this.$router.push({path: '/users'})
        var that = this;
        setTimeout( function(){that.$router.push({ path: "/users" })}, 150)
      }).catch(error => {
        alert(error.response.data.message);
        console.log(error);
      });
      this.username = null;
      this.mail = null;
      this.password = null;
    }
  }
};
</script>

<style scoped>
.color {
  color: #42b983;
}

.users {
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 2em;
}
</style>
