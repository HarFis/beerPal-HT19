<template>

  <div class="users">
      <h1>Register a User</h1>
  <div>
      <form class="register-form" @submit.prevent="onSubmit">
          <p>
          <label for ="username">Username</label>
          <input id="username" v-model="username" placeholder="name">
          </p>

          <p>
          <label for ="mail">Mail</label>
          <input id="mail" v-model="mail" placeholder="E-mail Adress">
          </p>

          <p>
             <label for ="password">password</label>
             <input type="password" id="password" v-model="password" placeholder="Password">
          </p>
          <p>
        <input type="submit" value ="Submit">
            </p>

          </form>
</div>
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
    createUser(user) {
      Api.post('/users', user)
        .then(response => {
          this.users.push(response.data)
        })
        .catch(error => {
          console.log(error)
        })
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
