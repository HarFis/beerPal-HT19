<template>

  <div class="users">
    <h1>Users</h1>
          <h3>Current number of users: {{ users.length}}</h3>

      <b-button class="buttonClass" router-link to="/RegisterUser" tag="button">Create User</b-button>
    
    <b-list-group>
      <user-item v-for="user in users" :key="user._id" :user="user" @delete-user="deleteUser"></user-item>
    </b-list-group>
  </div>
</template>

<script>
import { Api } from '@/Api'
import UserItem from '@/components/UserItem'

export default {
  name: 'Users',
  data() {
    return {
      users: []
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      Api.get('users')
        .then(response => {
          this.users = response.data.users
        })
        .catch(error => {
          this.users = []
          console.log(error)
        })
        .then(() => {
          // This code is always executed (after success or error).
        })
    },
    deleteUser(id) {
      if (confirm('Are you sure?')) {
        Api.delete(`/users/${id}`)
          .then(response => {
            console.log(response.data.message)
            var index = this.users.findIndex(user => user._id === id)
            this.users.splice(index, 1)
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },
  components: {
    UserItem
  }
}
</script>

<style scoped>
.color{
    color: #42b983;
}

.users{
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 2em;
}
</style>
