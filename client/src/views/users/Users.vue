<template>
  <div>
    <vue-headful title="Users - BeerPal" />
    <div class="list">
      <h1>Users</h1>
      <h3 v-if="!serverOK">
        <img style="max-width: 40px;" :src="require(`@/assets/warning.png`)" alt="warning" /> No connection to server. Please retry or contact administrator!
      </h3>
      <span v-else>
        <h3>Current number of users: {{ users.length}}</h3>

        <b-button class="buttonClass" router-link to="/RegisterUser" tag="button">Create User</b-button>
      </span>

      <b-list-group>
        <user-item v-for="user in users" :key="user._id" :user="user" @delete-user="deleteUser"></user-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
import { Api } from "@/Api";
import UserItem from "@/components/UserItem";

export default {
  name: "Users",
  data() {
    return {
      serverOK: true,
      users: []
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.serverOK = true;
      Api.get("users")
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {
          this.serverOK = false;
          this.users = [];
          console.log(error);
        })
        .then(() => {
          // This code is always executed (after success or error).
        });
    },
    deleteUser(id) {
      if (confirm("Are you sure?")) {
        Api.delete(`/users/${id}`)
          .then(response => {
            console.log(response.data.message);
            var index = this.users.findIndex(user => user._id === id);
            this.users.splice(index, 1);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },
  components: {
    UserItem
  }
};
</script>

<style scoped>

</style>
