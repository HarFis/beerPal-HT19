<template>
  <div class="users">
    <h1>List of {{ users.length }} users</h1>
    <b-list-group>
      <user-item v-for="user in users" :key="user._id" :user="user" @delete-user="deleteuser"></user-item>
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
      Api.delete(`/users/${id}`)
        .then(response => {
          console.log(response.data.message)
          var index = this.users.findIndex(user => user._id === id)
          this.users.splice(index, 1)
        })
        .catch(error => {
          console.log(error)
        })
    },
    createUser() {
      var randomCamel = {
        color: this.getRandomColor(),
        position: this.getRandomInt(10)
      }
      Api.post('/camels', randomCamel)
        .then(response => {
          this.camels.push(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max)
    },
    getRandomColor() {
      var colors = ['orange', 'green', 'red', 'blue']
      var index = this.getRandomInt(colors.length)
      return colors[index]
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
